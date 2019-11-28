export const updatePagination = count => ({
  type: 'UPDATE_PAGINATION',
  count,
});

export const updateActivePage = activePageNumber => ({
  type: 'UPDATE_ACTIVE_PAGE',
  activePageNumber,
});
