import store from '../store';
import { getCookie, deleteCookie } from '../_cookie';
import { parseJSON } from './json';
import { categories, cities } from '../fixtures';
import { imageUrlRecources } from '../resources/url';

export const getValueFromParams = (values = [], id, searchParam, exitParam) => {
  const value = values.find(item => item[searchParam] === String(id));
  return value ? value[exitParam] : '';
};

export const getHistoryUrl = (type, selection) => {
  const status = getFilterState();

  let data;
  switch (type) {
    case 'categories':
      data = { name: 'categories', values: categories };
      break;
    case 'cities':
      data = { name: 'cities', values: cities };
      break;
    default:
      console.log("Error. Type wasn't found");
      return;
  }

  status[data.name] = getValueFromParams(data.values, selection ? selection.value : '', 'id', 'url');

  const selectCity = status.cities.length ? status.cities : 'any';
  const url = `/events/${selectCity}/${status.categories}`;

  return url;
};

export const updateFilterStore = (initialParams) => {
  if (!initialParams) return false;

  if ('cities' in initialParams) {
    if (initialParams.cities === 'any') {
      initialParams.cities = '';
    } else {
      const value = cities.find(item => item.url == initialParams.cities);
      initialParams.cities = value ? value.id : '';
      store.dispatch({
        type: 'UPDATE_FILTER_CITY',
        cities: initialParams.cities,
      });
    }
  }

  if ('categories' in initialParams) {
    const value = categories.find(item => item.url == initialParams.categories);
    initialParams.categories = value ? value.id : '';
    store.dispatch({
      type: 'UPDATE_FILTER_CATEGORY',
      categories: initialParams.categories,
    });
  }

  return true;
};

export const logout = () => {
  deleteCookie('userData');
  deleteCookie('profileData');

  location.reload();
};

export const createMarkupText = (text) => {
  return { __html: text };
};

export const getUserData = () => {
  const userData = parseJSON(getCookie('userData'));

  if (!userData) {
    deleteCookie('profileData');
    return false;
  }

  const profileData = parseJSON(getCookie('profileData'));

  store.dispatch({
    type: 'UPDATE_USERPROFILE',
    data: profileData,
  });

  return true;

};

export const getUniqueArray = (array) => {
  const uniqueArray = array.filter(el => (el !== null && el !== '' && el !== ' '));
  return [...new Set(uniqueArray)];
};

export const setProfileData = (data) => {
  const profileData = {};
  profileData.city = '';
  profileData.phone = '';
  profileData.subscribed = '';
  profileData.imageUrl = imageUrlRecources.noPhoto;

  if (!data || !data.length) {
    return profileData;
  }

  const { city, phone, imageUrl, subscribed } = parseJSON(data);
  profileData.city = city || profileData.city;
  profileData.phone = phone || profileData.phone;
  profileData.imageUrl = imageUrl || profileData.imageUrl;
  profileData.subscribed = subscribed || profileData.subscribed;

  return profileData;
};

const getFilterState = () => {
  const { categories: catFilter, cities: cityFilter } = store.getState().filterState;
  const categoryStatus = catFilter ? getValueFromParams(categories, catFilter[0], 'id', 'url') : '';
  const cityStatus = cityFilter ? getValueFromParams(cities, cityFilter[0], 'id', 'url') : '';

  return { categories: categoryStatus, cities: cityStatus };
};
