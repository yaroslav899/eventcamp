export const updateEventList = events => ({
  type: 'UPDATE_EVENT_LIST',
  events,
});

export const updateFilterCategory = categories => ({
  type: 'UPDATE_FILTER_CATEGORY',
  categories,
});

export const updateFilterCity = cities => ({
  type: 'UPDATE_FILTER_CITY',
  cities,
});

export const updateFilterTopic = topics => ({
  type: 'UPDATE_FILTER_TOPIC',
  topics,
});

export const updateFilterDateRange = dateRange => ({
  type: 'UPDATE_FILTER_DATERANGE',
  dateRange,
});

export const updateSorting = sortingValue => ({
  type: 'UPDATE_SORTING',
  sortingValue,
});

export const updateSearchPhrase = searchPhrase => ({
  type: 'UPDATE_SEARCH_PHRASE',
  searchPhrase,
});

export const updateLastPost = lastEvents => ({
  type: 'UPDATE_LAST_POSTS',
  lastEvents,
});

export const updateDetailPost = event => ({
  type: 'UPDATE_DETAIL_POST',
  event,
});

export const eventLoading = () => ({ type: 'EVENT_LOAD_START' });

export const eventLoaded = () => ({ type: 'EVENT_LOAD_SUCCESS' });

export const eventFailed = (error) => ({
  type: 'EVENT_LOAD_FAILURE',
  error,
});
