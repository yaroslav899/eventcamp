import store from '../store';
import { getCookie, deleteCookie } from '../_cookie';
import { categories, cities } from '../fixtures';

export const getValueFromParams = (values = [], id, searchParam, exitParam) => {
  const value = values.find(item => item[searchParam] === String(id));
  return value ? value[exitParam] : '';
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
  location.reload();
};

export const createMarkupText = (text) => {
  return { __html: text };
};

export const getUserData = () => {
  //ToDo optimize it
  const {
    user: {
      data: {
        id = null,
      } = {},
    } = {},
  } = store.getState();
  let userData = getCookie('userData');

  if (userData && !id) {
    userData = JSON.parse(userData);
    store.dispatch({
      type: 'UPDATE_USERDATA',
      data: userData
    });
  }

  return true;
};

export const getUniqueArray = (array) => {
    return [...new Set(array)];
}
