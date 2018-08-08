import { endpointUrl, geoLookUpUrl, exchangeUrl } from '../urls';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import store from '../store';
import {getRequestUrl, getInterestingUrl, getLastPosts} from './helpers';

export let request = {
    createNewUser: function (param) {
        fetch('http://board.it-mir.net.ua/wp-json/jwt-auth/v1/token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                username: 'admin',
                password: 'boz792ik',
                jwt_auth_expire : '10'  
            })
        }).then(function (response) {
            return response.json();
        }).then(function (user) {
            fetch('http://board.it-mir.net.ua/wp-json/wp/v2/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify({
                    username: param.login,
                    email: param.email,
                    password: param.password,
                })
            }).then(function (response) {
                return response.json();
                console.log('1')
            });
            }).then(function () {
                //create a note in store
            });
    },
    getListPosts        :   function(param){
        let url = getRequestUrl(param);
        return fetch(url).then(function(response) {
                    store.dispatch({
                            type: 'PAGINATION_UPDATE',
                            count: response.headers.get('x-wp-totalpages')
                    });
                    return response.json()
                });
    },
    getPostDetail       :   function(eventID){
        let url = endpointUrl + 'posts/' + eventID + '?_embed';
        return fetch(url).then((response) => response.json());
    },
    getAddress          :   function(address){
        let url = geoLookUpUrl + 'address=' + address + '&key=AIzaSyCM7IwnppmyEPSZPDZIoTW8VKOMlS5peN4';
        return fetch(url).then((response) => response.json());
    },
    getExchangeData     :   function(){
        return fetch(exchangeUrl).then((response) => response.json());
    },
    getInterestingData  : function(param){
        let url = getInterestingUrl(param);
        return fetch(url).then(function(response) {
            return response.json()
        });
    },
    getLastPosts        : function(){
        let url = getLastPosts();
        return fetch(url).then((response) => response.json());
    }
};