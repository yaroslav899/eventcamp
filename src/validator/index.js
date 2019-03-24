import { defaultRules } from './validationRules';

const defaultValidForm = {
    success: true,
    errorMsg: '',
}

export const formValidator = (fields) => {
   let isValidForm = defaultValidForm;

   for (let fieldName in fields) {
     let field = fields[fieldName];

     if (fieldName in defaultRules){
         let fieldDefaultRules = defaultRules[fieldName];
         isValidForm = defaultValidateField(field, fieldName, fieldDefaultRules);
     }

     if (!isValidForm.success) {
       return isValidForm;
       break;
     }

     isValidForm = customValidateField(field, fieldName);

     if (!isValidForm.success) {
       return isValidForm;
       break;
     }
   }

   return isValidForm;
};

export const validateField = (fieldName, value) => {

}


const defaultValidateField = (field, fieldName, fieldDefaultRules) => {
  const { value: fieldValue = ''} = field;
  const {
    rules: defaultRules,
    errorMsgs: defaultErrorMsgs,
  } = fieldDefaultRules;

  for (let i = 0; i < defaultRules.length; i++) {
    let validationRule = defaultRules[i];
    let validationMethod = validateMethod[validationRule];

    if (!validationMethod) {
      continue;
    }

    let validateResult = validationMethod(fieldValue, '');

    if (!validateResult.success) {
      validateResult.errorMsg = defaultErrorMsgs[validationRule].replace('{0}', fieldName);
      validateResult.field = fieldName;

      return validateResult;
      break;
    }
  }

  return defaultValidForm;
}

const customValidateField = (field, fieldName) => {
  if (!field.rules){
    return defaultValidForm;
  }

  const {
    value,
    rules,
    duplicate = '',
  } = field;

  let validateResult = defaultValidForm;

  for (let i = 0; i < rules.length; i++) {
    let validationRule = rules[i];
    let validationMethod = validateMethod[validationRule];

    if (!validationMethod) {
     continue;
    }

    let validateResult = validationMethod(value, duplicate);

    if (!validateResult.success) {
      validateResult.field = fieldName;

      return validateResult;
      break;
    }

  }

  return defaultValidForm;
}

const validateMethod = {
    isMandatory: (value) => {
        const result = {};

        result.success = !value ? false : true;
        result.errorMsg = !value ? 'This field is mandatory. Please fill that' : '';

        return result;
    },
    isValidPassword: (value) =>{
        const result = {};
        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        const isValid = regexPassword.test(value);

        result.success = !isValid ? false : true;
        result.errorMsg = !isValid ? 'Check your password: Содержит не менее 8 символов' +
                'содержат не менее 1 цифры' +
                'содержат как минимум один символ нижнего регистра (a-z)'+
                'содержат как минимум 1 символ верхнего регистра (A-Z)' +
                'содержит только 0-9a-zA-Z' : '';

        return result;
    },
    isPasswordMatch: (value, duplicate) => {
        const result = {};
        const isValid = (value !== duplicate) ? false : true;

        result.success = !isValid ? false : true;
        result.errorMsg = !isValid ? 'Пароли не совпадают' : '';

        return result;
    },
}