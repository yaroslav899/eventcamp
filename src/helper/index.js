export const getValueFromParams = (values, id, searchParam, exitParam) => {
    var values = values.filter(function (item) {
        return item[searchParam] == id;
    })
    return values.length && values[0][exitParam] || '';
};