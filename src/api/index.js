import axios from 'axios';
import { stateToHTML } from 'draft-js-export-html';
import store from '../store';
import { setCookie, getCookie } from '../_cookie';
import { getValueFromParams } from '../helper';
import { getRequestUrl, getInterestingUrl, getLastPostsUrl, fetchData, authFetch } from './helpers';
import { adminAccess } from '../credentials';
import { cities } from '../fixtures';
import { urlRecources } from '../resources/url';
import { googleApiService } from '../resources';

export const request = {
  authUser: (param) => authFetch(param).then((response) => {
    if ('data' in response && 'status' in response.data && response.data.status === 403) {
      throw Error(response.data);
    }

    const userData = {
      email: response.user_email,
      token: response.token,
    }

    setCookie('userData', JSON.stringify(userData), 2);

    return {
      success: true,
    };
  }).catch(error => {
    return {
      success: false,
    };
  }),

  getUserData: () => {
    const userData = getCookie('userData');

    if (!userData) {
      return false;
    }

    const { token, email } = JSON.parse(userData);
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
        const responseUserData = {
          name: response.name,
          email: email,
          token: token,
          userID: response.id,
          phone: response.acf.phone,
          city: response.acf.city,
          imageUrl: response.acf.image,
        }

        setCookie('userData', JSON.stringify(responseUserData), 2);

        return responseUserData;
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

    const {
      editorState,
      title: displayTitle,
      price: priceValue,
      currency: currencyValue,
      category,
      subcategory,
      tags: topicTags,
      city,
      address,
      date,
      time: eventTime,
      currentTheme,
      register,
      phone,
      email,
    } = param;
    const description = stateToHTML(editorState.getCurrentContent());
    const { token } = JSON.parse(userData);

    return fetch(`${urlRecources.endpointUrl}posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: displayTitle,
        content: description,
        featured_media: imageID,
        categories: category,
        fields: {
          topic: currentTheme.label,
          cities: getValueFromParams(cities, city, 'id', 'name'),
          picture: imageID,
          price: priceValue,
          location: address,
          dateOf: date,
          currency: currencyValue,
          tags: topicTags,
          time: eventTime,
          register: register,
          phone: phone,
          email: email,
        },
      }),
    }).then(response => response.json());
  },

  getAuthorPosts: (param) => {
    const url = getRequestUrl(param);

    return fetchData(url, null);
  },

  getListPosts: (param) => {
    const url = getRequestUrl(param);
    const myHeaders = { cache: "force-cache" };

    return fetch(url, myHeaders).then((response) => {
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

  updatePostCountMembers: (event, userData, countmembers) => {
    if (!userData) {
      return false;
    }

    const { token } = userData;
    const { id: eventID } = event;

    const url = `${urlRecources.endpointUrl}posts/${eventID}`;

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fields: {
          countmembers: countmembers,
        },
      }),
    }).then(response => response.json());
  },

  updateEvent: (param, imageID) => {
    const userData = getCookie('userData');

    if (!userData) {
        return false;
    }

    const {
      editorState,
      title: displayTitle,
      price: priceValue,
      currency: currencyValue,
      category,
      subcategory,
      tags: topicTags,
      city,
      address,
      date,
      time: eventTime,
      currentTheme,
      register,
      phone,
      email,
      eventID,
    } = param;
    const description = stateToHTML(editorState.getCurrentContent());
    const { token } = JSON.parse(userData);
    const url = `${urlRecources.endpointUrl}posts/${eventID}`;

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: displayTitle,
        content: description,
        featured_media: imageID,
        categories: category,
        fields: {
          topic: currentTheme.label,
          cities: getValueFromParams(cities, city, 'id', 'name'),
          picture: imageID,
          price: priceValue,
          location: address,
          dateOf: date,
          currency: currencyValue,
          tags: topicTags,
          time: eventTime,
          register: register,
          phone: phone,
          email: email,
        },
      }),
    }).then(response => response.json());
  },
};
