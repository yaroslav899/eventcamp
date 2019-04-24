import axios from 'axios';
import { stateToHTML } from 'draft-js-export-html';
import store from '../store';
import { setCookie, getCookie } from '../_cookie';
import { getValueFromParams } from '../helper';
import {
  getRequestUrl,
  getInterestingUrl,
  getLastPostsUrl,
  authFetch,
} from './helpers';
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
      name: response.user_display_name,
      email: response.user_email,
      token: response.token,
    }

    setCookie('userData', JSON.stringify(userData), 2);

    store.dispatch({
      type: 'UPDATE_USERDATA',
      data: userData,
    });

    return true;

  }).catch(error => {
    return false;
  }),

  createNewUser: (param) => authFetch(adminAccess).then((user) => {
    const url = `${urlRecources.endpointUrl}users`;

    return fetch(url, {
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
    }).then(response => response.json());
  }),

  getUserID: () => {
    const authData = getCookie('userData');

    if (!authData) {
        return false;
    }

    const { email: userEmail } = JSON.parse(authData);

    return fetch(`${urlRecources.endpointUrl}users/?search=${userEmail}`)
      .then(response => response.json())
      .then(response => {
        if (response.length) {
          return response[0].id;
        }

      	return null;
      });
  },

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

    return fetch(url).then(response => response.json());
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

    return fetch(url)
      .then(response => response.json())
      .then(data => data);
  },

  getAddress: (address) => {
    const url = `${urlRecources.geoLookUpUrl}address=${address}&key=${googleApiService.key}`;

    return fetch(url).then(response => response.json());
  },

  getExchangeData: () => {
    const url = urlRecources.exchangeUrl;

    return fetch(url).then(response => response.json());
  },

  getInterestingData: (param, isTagActive) => {
    const url = getInterestingUrl(param, isTagActive);

    return fetch(url).then(response => response.json());
  },

  getLastPosts: () => {
    const url = getLastPostsUrl();

    return fetch(url).then(response => response.json());
  },

  getPage: (pageID) => {
    const url = `${urlRecources.endpointUrl}pages/${pageID}`;

    return fetch(url).then(response => response.json());
  },

  uploadImage: (file) => {
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
};
