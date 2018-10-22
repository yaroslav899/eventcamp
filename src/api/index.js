import { urlRecources } from '../recources';
import store from '../store';
import { setCookie, getCookie } from '../cookie';
import { adminAccess } from '../credentials';
import { stateToHTML } from 'draft-js-export-html';
import {
  getRequestUrl,
  getInterestingUrl,
  getLastPosts,
  authFetch,
} from './helpers';

export const request = {

  authUser: function (param) {
    return authFetch(param).then(function (data) {
      setCookie('authData', JSON.stringify({
        token: data.token,
        user_display_name: data.user_display_name,
        user_nicename: data.user_nicename,
        user_email: data.user_email,
      }));
      return data;
    }).then(function (data) {
      store.dispatch({
        type: 'UPDATE_USERAUTH',
        state: {
          name: data.user_display_name,
          email: data.user_email,
          token: data.token,
        }
      });
    });
  },

  createNewUser: function (param) {
    return authFetch(adminAccess).then(function (user) {
      return fetch(`${urlRecources.mainUrl}${urlRecources.endpointUrl}users`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': 'Bearer ' + user.token,
        },
        body: JSON.stringify({
          username: param.login,
          email: param.email,
          password: param.password,
        })
      }).then(function (response) {
        return response.json();
      });

    });
  },

  getUser: function (param) {
    const userData = JSON.parse(getCookie('authData'));
    const { user_email } = userData;
    return fetch(urlRecources.mainUrl + urlRecources.endpointUrl + 'users/?search=' + user_email).then(function (response) {
      return response.json();
    });
  },

  createPost: function (param) {
    const userData = JSON.parse(getCookie('authData'));
    const {
      editorState,
      title,
      price,
      currency,
      category,
      subcategory,
      tags,
      city,
      address,
      date,
      time,
    } = param;
    const description = stateToHTML(editorState.getCurrentContent());
    const { token } = userData;
    return fetch(`${urlRecources.mainUrl}${urlRecources.endpointUrl}posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer' + token,
      },
      body: JSON.stringify({
        title: title,
        content: description,
        categories: category,
        acf: {
          cities: city,

        }
      })
    }).then(function (response) {
      return response.json()
    });
  },

  getAuthorPosts: function (param) {
    let url = getRequestUrl(param);
    return fetch(url).then(function (response) {
      return response.json()
    });
  },

  getListPosts: function (param) {
    let url = getRequestUrl(param);
    return fetch(url).then(function(response) {
      store.dispatch({
        type: 'UPDATE_PAGINATION',
        count: response.headers.get('x-wp-totalpages')
      });
      return response.json()
    });
  },

  getPostDetail: function (eventID) {
    let url = urlRecources.mainUrl + urlRecources.endpointUrl + 'posts/' + eventID + '?_embed';
    return fetch(url).then((response) => response.json());
  },

  getAddress: function (address) {
    let url = urlRecources.geoLookUpUrl + 'address=' + address + '&key=AIzaSyCM7IwnppmyEPSZPDZIoTW8VKOMlS5peN4';
    return fetch(url).then((response) => response.json());
  },

  getExchangeData: function () {
    return fetch(urlRecources.exchangeUrl).then((response) => response.json());
  },

  getInterestingData: function(param){
    let url = getInterestingUrl(param);
    return fetch(url).then(function(response) {
      return response.json()
    });
  },

  getLastPosts: function() {
    let url = getLastPosts();
    return fetch(url).then((response) => response.json());
  },

  getPage: function (pageID) {
    let url = urlRecources.mainUrl + urlRecources.endpointUrl + 'pages/' + pageID;
    return fetch(url).then((response) =>response.json());
  },
};