export const updateEventList = (list) => ({
  type: 'UPDATE_EVENT_LIST',
  list,
});

export const updateFilterCategory = (categories) => ({
  type: 'UPDATE_FILTER_CATEGORY',
  categories,
});

export const updateFilterCity = (cities) => ({
  type: 'UPDATE_FILTER_CITY',
  cities,
});

export const updateFilterTopic = (topics) => ({
  type: 'UPDATE_FILTER_TOPIC',
  topics,
});

export const updateFilterDateRange = (dateRange) => ({
  type: 'UPDATE_FILTER_DATERANGE',
  dateRange,
});

export const updateSearchPhrase = (searchPhrase) => ({
  type: 'UPDATE_SEARCH_PHRASE',
  searchPhrase,
});