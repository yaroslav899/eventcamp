export const validationRules = {
  email: {
    rules: ['isMandatory', 'isValidEmail'],
    regexp: /^.+@[^\.].*\.[a-z]{2,}$/,
  },
  login: {
    rules: ['isMandatory'],
  },
  password: {
    rules: ['isMandatory', 'isValidPassword'],
    regexp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
  },
  duplicatepassword: {
    rules: ['isMandatory', 'isValidPassword', 'isPasswordMatch'],
    regexp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
  },
  captcha: {
    rules: ['isMandatory'],
  },
  privacyChecked: {
    rules: ['isMandatory'],
  },
};