import store from '../store';
import { getCookie, deleteCookie } from '../_cookie';
import { categories, cities } from '../fixtures';

export const getValueFromParams = (values = [], id, searchParam, exitParam) => {
  const value = values.find(item => item[searchParam] === String(id));
  return value ? value[exitParam] : '';
};

export const updateFilterStore = (initialParams) => {
  if (!initialParams) return;
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
};

export const logout = () => {
  deleteCookie('userData');
  location.reload();
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
  if (userData) {
  	userData = JSON.parse(userData);
  	const requestUser = fetch(`${urlRecources.endpointUrl}users/?search=${response.user_email}`)
  }

  if (id) {
    return id;
  }

  let userData = getCookie('userData');

  if (userData && !id) {
    userData = JSON.parse(userData);
    store.dispatch({
      type: 'UPDATE_USERDATA',
      data: userData
    });
  }

  return userData.id;

  return fetch(`${urlRecources.endpointUrl}users/?search=${response.user_email}`)
  .then(data => data.json())
  .then(data => {
    const userData = {
      name: response.user_display_name,
      email: response.user_email,
      token: response.token,
      id: data.length ? data[0].id : null
    }

    setCookie('userData', JSON.stringify(userData), 2);
    store.dispatch({
      type: 'UPDATE_USERDATA',
      data: userData,
    });

    return true;
  });
};

export const getUniqueArray = (array) => {
    return [...new Set(array)];
}
