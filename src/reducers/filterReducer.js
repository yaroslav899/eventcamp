const initialFilterState = {
  list: [],
  categories: null,
  topics: null,
  cities: null,
  dateRange: {
    from: '',
    to: '',
  },
};

export default function (filterReducer = initialFilterState, action) {
  switch (action.type) {
    case 'UPDATE_EVENT_LIST':
      return { ...filterReducer, list: action.list };
    case 'UPDATE_FILTER_CATEGORY':
      return { ...filterReducer, categories: action.categories };
    case 'UPDATE_FILTER_CITY':
      return { ...filterReducer, cities: action.cities };
    case 'UPDATE_FILTER_TOPIC':
        return { ...filterReducer, topics: action.topics };
    case 'UPDATE_FILTER_DATERANGE':
      return { ...filterReducer, dateRange: action.dateRange };
    default:
      return filterReducer;
  }
}
