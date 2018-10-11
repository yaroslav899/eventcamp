import store from '../store';
import { categories, cities, free } from '../fixtures';

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
      let value = cities.find(item => item.url == initialParams.cities);
      initialParams.cities = value && value.id || '';
      store.dispatch({
        type: 'UPDATE_FILTER_CITY',
        cities: initialParams.cities,
      });
    }
  }
  if ('categories' in initialParams) {
    let value = categories.find(item => item.url == initialParams.categories);
    initialParams.categories = value && value.id || '';
    store.dispatch({
      type: 'UPDATE_FILTER_CATEGORY',
      categories: initialParams.categories,
    });
  }
  return;
};
