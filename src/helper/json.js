export const parseJSON = (data, defaultValue = null) => {
  let valueObject = defaultValue;

  if (!data) {
    return valueObject;
  }

  try {
    valueObject = JSON.parse(data);
  } catch (e) {
    return valueObject;
  }

  return valueObject;
};

export const stringifyJSON = (data, defaultValue = '') => {
  const value = data || defaultValue;

  return JSON.stringify(value);
}