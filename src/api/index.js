import axios from 'axios';
import store from '../store';
import { getCookie } from '../_cookie';
import { setProfileData, getUniqueArray } from '../helper';
import { getRequestUrl, getInterestingUrl, getLastPostsUrl, fetchData, authFetch, eventRequest } from './helpers';
import { adminAccess } from '../credentials';
import { parseJSON, stringifyJSON } from '../helper/json';
import { urlRecources } from '../resources/url';
import { googleApiService } from '../resources';

export const request = {
  authUser: (param) => authFetch(param)
    .then((response) => {
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
    })
    .catch(error => {
      return {
        success: false,
      };
    }
  ),

  updateProfile: (bodyParam, userID) => {
    const userData = getCookie('userData');

    if (!userData) {
        return false;
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

    //ToDo chack wordpress on email, which he sends when email was changed
    return fetchData(url, param)
      .then(response => {
        const responseProfileData = setProfileData(response.description);
        responseProfileData.name = response.name;
        responseProfileData.userID = response.id;
        responseProfileData.email = response.email;

        return {
          userProfile: responseProfileData,
          success: true,
        }
      });
  },

  getProfileData: () => {
    const userData = getCookie('userData');

    if (!userData) {
      return false;
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
        }
      });
  },

  createNewUser: (param) => authFetch(adminAccess).then((user) => {
    const url = `${urlRecources.endpointUrl}users`;
    const param = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        username: param.login,
        first_name: param.firstname || '',
        last_name: param.secondname || '',
        nickname: param.login,
        email: param.email,
        password: param.password,
      }),
    };

    return fetchData(url, param);
  }),

  createPost: (param, imageID) => {
    const userData = getCookie('userData');

    if (!userData) {
        return false;
    }

    return eventRequest(param, imageID, userData);
  },

  updateEvent: (param, imageID) => {
    const userData = getCookie('userData');

    if (!userData) {
        return false;
    }

    return eventRequest(param, imageID, userData);
  },

  getAuthorPosts: (param) => {
    const url = getRequestUrl(param);

    return fetchData(url, null);
  },

  getListPosts: (param) => {
    const url = getRequestUrl(param);
    const myHeaders = { cache: "force-cache" };

    return fetch(url, myHeaders).then((response) => {
      //ToDo change this approach, since api is not a good place for it
      store.dispatch({
        type: 'UPDATE_PAGINATION',
        count: response.headers.get('x-wp-totalpages'),
      });

      return response.json();
    }).then(data => {
      return data;
    });
  },

  getPostDetail: (eventID) => {
    const url = `${urlRecources.endpointUrl}posts/${eventID}?_embed`;

    return fetchData(url, null)
      .then(data => data);
  },

  getAddress: (address) => {
    const url = `${urlRecources.geoLookUpUrl}address=${address}&key=${googleApiService.key}`;

    return fetchData(url, null);
  },

  getExchangeData: () => {
    const url = urlRecources.exchangeUrl;

    return fetchData(url, null);
  },

  getInterestingData: (param, isTagActive) => {
    const url = getInterestingUrl(param, isTagActive);

    return fetchData(url, null);
  },

  getLastPosts: () => {
    const url = getLastPostsUrl();

    return fetchData(url, null);
  },

  getPage: (pageID) => {
    const url = `${urlRecources.endpointUrl}pages/${pageID}`;

    return fetchData(url, null);
  },

  uploadImage: (file) => {
    if (!file) {
      return new Promise();
    }

    const { token } = JSON.parse(getCookie('userData'));

    return axios.post(urlRecources.mediaResources, file, {
      headers: {
        'Content-Type': file.type,
        'Content-Disposition': 'attachment; filename=' + file.name + '',
        'Authorization': 'Bearer' + token,
        'Cache-Control': 'no-cache',
      }
    });
  },

  getTakingPartMemberEvents: (subscribed) => {
    let postIDs = getUniqueArray(subscribed.split(',')).join(',');
    const lastSymbol = postIDs.slice(-1);

    if (lastSymbol === ',') {
      postIDs = postIDs.replace(lastSymbol, '');
    }

    const url = `${urlRecources.endpointUrl}posts/?include=${postIDs}`;

    return fetchData(url, null);
  }
};
