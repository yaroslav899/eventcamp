export default function (paginationReducer = { count: [1] }, action) {
  switch (action.type) {
    case 'PAGINATION_UPDATE': {
      const count = [];
      for (let i = 1; i <= action.count; ++i) {
        count.push(i);
      }
      return { ...paginationReducer, count: count };
    }
    default:
      return { ...paginationReducer, count: [1] };
  }
}
