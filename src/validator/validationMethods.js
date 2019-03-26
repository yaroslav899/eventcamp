import { validationMsg } from './resources';
import { defaultRules } from './validationRules';

export const validationMethods = {
  isMandatory: (value) => {
    const result = {};

    result.success = !value ? false : true;

    return result;
  },
  isValidEmail: (value) => {
    const result = {};
    const { email: { regexp: regexpEmail } } = defaultRules;
    const isValid = regexpEmail.test(value);

    result.success = !isValid ? false : true;

    return result;
  },
  isValidPassword: (value) =>{
    const result = {};
    const { password: { regexp: regexpPassword } } = defaultRules;
    const isValid = regexpPassword.test(value);

    result.success = !isValid ? false : true;

    return result;
  },
  isPasswordMatch: (value, duplicate) => {
    const result = {};
    const isValid = (value !== duplicate) ? false : true;

    result.success = !isValid ? false : true;

    return result;
  },
};
