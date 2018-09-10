export const getValueFromParams = (values, id, searchParam, exitParam) => {
    var value = values.find(item => item[searchParam] == id);
    return value && value[exitParam] || '';
};