import axios from 'axios';
import { setCookie, getCookie } from '../_cookie';
import { setProfileData, getUniqueArray, getValueFromParams } from '../helper';
import { getRequestUrl, getInterestingUrl, getLastPostsUrl, fetchData, authFetch, eventRequest } from './helpers';
import { adminAccess, googleApiService } from '../credentials';
import { parseJSON, stringifyJSON } from '../helper/json';
import { urlRecources } from '../resources/url';
import { mainMenu } from '../resources/menu';
import { updatePagination } from '../redux/actions/paginationActions';
import { updateUserProfile } from '../redux/actions/userActions';
import { updateEventList, updateDetailPost, updateLastPost, eventLoading, eventLoaded, eventFailed } from '../redux/actions/eventActions';

export const fetchEventList = param => (dispatch) => {
  const url = getRequestUrl(param);
  const myHeaders = { cache: 'no-cache' };
  const EMPTY_RESULT_MSG = "Змініть ваш пошук, так як дані відсутні";

  dispatch(eventLoading());

  return fetch(url, myHeaders)
    .then((response) => {
      dispatch(updatePagination(response.headers.get('x-wp-totalpages')));

      return response.json();
    })
    .then((events) => {
      if (!events.length) {
        events.push({ empty: EMPTY_RESULT_MSG });
      }

      return dispatch(updateEventList(events));
    })
    .then(() => dispatch(eventLoaded()))
    .catch(() => dispatch(eventFailed(EMPTY_RESULT_MSG)));
};

export const fetchLastEvents = () => (dispatch) => {
  const url = getLastPostsUrl();

  return fetchData(url, null)
    .then((events) => dispatch(updateLastPost(events)))
    .catch(() => {
      return { success: false };
    });
};

export const fetchPageData = (pathname, pageID) =>{
  const fetchPageID = pageID || getValueFromParams(mainMenu, pathname, 'url', 'id');
  const url = `${urlRecources.endpointUrl}pages/${fetchPageID}`;

  return fetchData(url, null)
    .then((data) => {
      if (!data) {
        return { success: false };
      }

      const { content: { rendered: text } = {} } = data;

      return text;
    })
    .catch(() => {
      return { success: false };
    });
};

export const fetchEventDetail = (eventID) => (dispatch) => {
  const url = `${urlRecources.endpointUrl}posts/${eventID}?_embed`;

  dispatch(eventLoading());

  return fetchData(url, null)
    .then((post) => dispatch(updateDetailPost(post)))
    .then(() => dispatch(eventLoaded()))
    .catch(() => {
      dispatch(eventFailed());

      return { success: false };
    });
};

export const fetchProfileData = (bodyParam, userID) => (dispatch) => {
  const userData = getCookie('userData');

  if (!userData) {
    return new Promise((resolve, reject) => reject({ success: false }));
  }

  const { token } = parseJSON(userData);
  const url = `${urlRecources.endpointUrl}users/${userID}`;
  const param = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: stringifyJSON(bodyParam),
  };

  return fetchData(url, param)
    .then((response) => {
      const responseProfileData = setProfileData(response.description);
      responseProfileData.name = response.name;
      responseProfileData.userID = response.id;
      responseProfileData.email = response.email;

      return responseProfileData;
    })
    .then((profileData) => {
      setCookie('profileData', JSON.stringify(profileData), 2);
      dispatch(updateUserProfile(profileData));
    })
    .catch(() => {
      return { success: false };
    });
};

export const request = {
  authUser: (param) => authFetch(param).then((response) => {
    if ('data' in response && 'status' in response.data && response.data.status === 403) {
      throw Error(response.data);
    }

    const userData = { token: response.token };
    const profileData = { name: response.user_display_name, email: response.user_email };

    return {
      userData,
      profileData,
      success: true,
    };
  }).catch(() => {
    return { success: false };
  }),

  updateProfile: (bodyParam, userID) => {
    const userData = getCookie('userData');

    if (!userData) {
      return new Promise((resolve, reject) => reject({ success: false }));
    }

    const { token } = parseJSON(userData);
    const url = `${urlRecources.endpointUrl}users/${userID}`;
    const param = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: stringifyJSON(bodyParam),
    };

    // ToDo check wordpress on email, which he sends when email was changed
    return fetchData(url, param)
      .then(response => {
        const responseProfileData = setProfileData(response.description);
        responseProfileData.name = response.name;
        responseProfileData.userID = response.id;
        responseProfileData.email = response.email;

        return {
          userProfile: responseProfileData,
          success: true,
        };
      }).catch(() => {
        return { success: false };
      });
  },

  getProfileData: () => {
    const userData = getCookie('userData');

    if (!userData) {
      return new Promise((resolve, reject) => reject({ success: false }));
    }

    const { token } = parseJSON(userData);
    const url = `${urlRecources.endpointUrl}users/me`;
    const param = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return fetchData(url, param)
      .then(response => {
        const responseProfileData = setProfileData(response.description);
        const profileData = getCookie('profileData');
        let responseEmail = '';

        if (profileData) {
          const { email = '' } = parseJSON(profileData);
          responseEmail = email;
        }

        responseProfileData.name = response.name;
        responseProfileData.userID = response.id;
        responseProfileData.email = responseEmail;

        return {
          userProfile: responseProfileData,
          success: true,
        };
      }).catch(() => {
        return { success: false };
      });
  },

  createNewUser: (profileData) => authFetch(adminAccess).then((user) => {
    const url = `${urlRecources.endpointUrl}users`;
    const param = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: stringifyJSON({
        username: profileData.login,
        first_name: profileData.firstname || '',
        last_name: profileData.secondname || '',
        nickname: profileData.login,
        email: profileData.email,
        password: profileData.password,
      }),
    };

    return fetchData(url, param).catch(() => {
      return { success: false };
    });
  }).catch(() => {
    return { success: false };
  }),

  createPost: (param, imageID) => {
    const userData = getCookie('userData');

    if (!userData) {
      return new Promise((resolve, reject) => reject({ success: false }));
    }

    return eventRequest(param, imageID, userData).catch(() => {
      return { success: false };
    });
  },

  updateEvent: (param, imageID) => {
    const userData = getCookie('userData');

    if (!userData) {
      return new Promise((resolve, reject) => reject({ success: false }));
    }

    return eventRequest(param, imageID, userData);
  },

  getAuthorPosts: (param) => {
    const url = getRequestUrl(param);

    return fetchData(url, null).catch(() => {
      return { success: false };
    });
  },

  getAddress: (address) => {
    const url = `${urlRecources.geoLookUpUrl}address=${address}&key=${googleApiService.ru.key}`;

    return fetchData(url, null);
  },

  getExchangeData: () => {
    const url = urlRecources.exchangeUrl;

    return fetchData(url, null).catch(() => {
      return { success: false };
    });
  },

  getInterestingData: (param, isTagActive) => {
    const url = getInterestingUrl(param, isTagActive);

    return fetchData(url, null).catch(() => {
      return { success: false };
    });
  },

  uploadImage: (file) => {
    if (!file) {
      return new Promise((resolve, reject) => reject({ success: false }));
    }

    const { token } = parseJSON(getCookie('userData'));

    return axios.post(urlRecources.mediaResources, file, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': file.type,
        'Content-Disposition': 'attachment; filename=' + file.name + '',
        'Authorization': 'Bearer' + token,
      }
    }).catch(() => {
      return { success: false };
    });
  },

  getTakingPartMemberEvents: (subscribed) => {
    let postIDs = getUniqueArray(subscribed.split(',')).join(',');

    if (!postIDs || !postIDs.length) {
      return new Promise((resolve, reject) => reject({ success: false }));
    }

    const lastSymbol = postIDs.slice(-1);

    if (lastSymbol === ',') {
      postIDs = postIDs.replace(lastSymbol, '');
    }

    const url = `${urlRecources.endpointUrl}posts/?include=${postIDs}`;

    return fetchData(url, null).catch(() => {
      return { success: false };
    });
  }
};
