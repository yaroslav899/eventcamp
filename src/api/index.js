import { urlRecources } from '../recources';
import store from '../store';
import { setCookie } from '../cookie';
import { adminAccess } from '../credentials';
import { getRequestUrl, getInterestingUrl, getLastPosts } from './helpers';

export let request = {
    createNewUser: function (param) {        
        return fetch(urlRecources.jwtRegister, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                username: adminAccess.login,
                password: adminAccess.password,
                jwt_auth_expire : '10'  
            })
        }).then(function (response) {
            return response.json();
        }).then(function (user) {                
            return fetch(urlRecources.getUsersUrl, {
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
            });

        });
    },
    getListPosts: function (param) {
        let url = getRequestUrl(param);
        return fetch(url).then(function(response) {
                    store.dispatch({
                            type: 'PAGINATION_UPDATE',
                            count: response.headers.get('x-wp-totalpages')
                    });
                    return response.json()
                });
    },
    getPostDetail: function (eventID) {            
        let url = urlRecources.endpointUrl + 'posts/' + eventID + '?_embed';
        return fetch(url).then((response) => response.json());
    },
    getAddress: function (address) {         
        let url = urlRecources.geoLookUpUrl + 'address=' + address + '&key=AIzaSyCM7IwnppmyEPSZPDZIoTW8VKOMlS5peN4';
        return fetch(url).then((response) => response.json());
    },
    getExchangeData: function () {        
        return fetch(urlRecources.exchangeUrl).then((response) => response.json());
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