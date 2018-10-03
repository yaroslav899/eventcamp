export const getValueFromParams = (values = [], id, searchParam, exitParam) => {
  const value = values.find(item => item[searchParam] === String(id));
  return value ? value[exitParam] : '';
};
