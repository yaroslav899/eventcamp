export default function (paginationReducer = { count: [1] }, action) {
  switch (action.type) {
    case 'UPDATE_PAGINATION': {
      const count = [];
      for (let i = 1; i <= action.count; ++i) {
        count.push(i);
      }
      return { ...paginationReducer, count: count };
    }
    default:
      return paginationReducer;
  }
}
