import { validationMsg } from './resources';

export const defaultRules = {
  email: {
    rules: ['isMandatory', 'isValidEmail'],
    regexp: /^.+@[^\.].*\.[a-z]{2,}$/,
    errorMsgs: {
        isMandatory: validationMsg.mandatory,
        isMandatory: validationMsg.nonValidEmail,
    },
  },
  login: {
    rules: ['isMandatory'],
    errorMsgs: {
        isMandatory: validationMsg.mandatory,
    },
  },
  password: {
    rules: ['isMandatory', 'isValidPassword'],
    regexp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    errorMsgs: {
        isMandatory: validationMsg.mandatory,
        isValidPassword: validationMsg.nonValidPassword,
    },
  },
  duplicatepassword: {
    rules: ['isMandatory', 'isValidPassword', 'isPasswordMatch'],
    errorMsgs: {
        isMandatory: validationMsg.mandatory,
        isValidPassword: validationMsg.nonValidPassword,
        isPasswordMatch: validationMsg.passwordsNotMatch,
    },
  },
  captcha: {
    rules: ['isMandatory'],
    errorMsgs: {
        isMandatory: validationMsg.mandatory,
    },
  },
  privacyChecked: {
    rules: ['isMandatory'],
    errorMsgs: {
        isMandatory: validationMsg.mandatory,
    },
  },
  custom: {
    errorMsgs: {
      isMandatory: validationMsg.mandatory,
    },
  },
};