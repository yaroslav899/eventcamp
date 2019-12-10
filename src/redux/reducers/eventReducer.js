import { sortingOptions } from '../../fixtures';

const initialFilterState = {
  searchPhrase: '',
  events: [],
  categories: null,
  topics: null,
  cities: null,
  dateRange: {
    from: '',
    to: '',
  },
  lastEvents: [],
  event: {},
  sortingValue: sortingOptions[0],
  loader: false,
};

export default function (eventReducer = initialFilterState, action) {
  switch (action.type) {
    case 'UPDATE_EVENT_LIST':
      return { ...eventReducer, events: action.events };
    case 'UPDATE_FILTER_CATEGORY':
      return { ...eventReducer, categories: action.categories };
    case 'UPDATE_FILTER_CITY':
      return { ...eventReducer, cities: action.cities };
    case 'UPDATE_FILTER_TOPIC':
      return { ...eventReducer, topics: action.topics };
    case 'UPDATE_FILTER_DATERANGE':
      return { ...eventReducer, dateRange: action.dateRange };
    case 'UPDATE_SEARCH_PHRASE':
      return { ...eventReducer, searchPhrase: action.searchPhrase };
    case 'UPDATE_LAST_POSTS':
      return { ...eventReducer, lastEvents: action.lastEvents };
    case 'UPDATE_DETAIL_POST':
      return { ...eventReducer, event: action.event };
    case 'UPDATE_SORTING':
      return { ...eventReducer, sortingValue: action.sortingValue };
    case 'EVENT_LOAD_START':
      return { ...eventReducer, loader: true };
    case 'EVENT_LOAD_SUCCESS':
      return { ...eventReducer, loader: false };
    case 'EVENT_LOAD_FAILURE':
      return { ...eventReducer, loader: false };
    default:
      return eventReducer;
  }
}
