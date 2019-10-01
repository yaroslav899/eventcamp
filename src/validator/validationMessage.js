import { validationMsg } from './resources';

export const validationMessage = {
  isMandatory: validationMsg.mandatory,
  isValidEmail: validationMsg.nonValidEmail,
  isValidPassword: validationMsg.nonValidPassword,
  isPasswordMatch: validationMsg.passwordsNotMatch,
};
