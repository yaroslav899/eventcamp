import {endpointUrl, geoLookUpUrl, exchangeUrl} from '../urls';
import store from '../store';
import {getRequestUrl, getInterestingUrl, getLastPosts} from './helpers';

export let request = {
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