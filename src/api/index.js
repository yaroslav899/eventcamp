import { urlRecources } from '../recources';
import store from '../store';
import { setCookie, getCookie } from '../cookie';
import { adminAccess } from '../credentials';
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

  createPost: function () {
    return fetch('http://board.it-mir.net.ua/wp-json/wp/v2/posts', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9ib2FyZC5pdC1taXIubmV0LnVhIiwiaWF0IjoxNTM5NjEyMjA4LCJuYmYiOjE1Mzk2MTIyMDgsImV4cCI6MTU0MDIxNzAwOCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.Iz0m08aVLTVGIg_ZaePulGQ2TfnYfPUr5ZAU0yNnHPs',
      },
      body: JSON.stringify({
        title: 'asdasSuper',
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
  }
};