import { defaultRules } from './validationRules';
import { validationMethods } from './validationMethods';

export const formValidator = (fields) => {
   let isValidForm = defaultValidForm;

   for (let fieldName in fields) {
     let field = fields[fieldName];

     if (fieldName in defaultRules){
         isValidForm = defaultValidateForm(field, fieldName);
     }

     if (!isValidForm.success) {
       return isValidForm;
       break;
     }

     isValidForm = customValidateForm(field, fieldName);

     if (!isValidForm.success) {
       return isValidForm;
       break;
     }
   }

   return isValidForm;
};

const defaultValidForm = {
    success: true,
    errorMsg: '',
}

const defaultValidateForm = (field, fieldName) => {
  const { value: fieldValue = ''} = field;
  const fieldDefaultRules = defaultRules[fieldName];
  const { rules, errorMsgs } = fieldDefaultRules;

  if (!rules || !rules.length){
    return defaultValidForm;
  }

  return validateForm(field, fieldName, rules, errorMsgs);
}

const customValidateForm = (field, fieldName) => {
  const { rules } = field;
  const fieldDefaultRules = defaultRules[fieldName] || defaultRules.custom;
  const { errorMsgs } = fieldDefaultRules;

  if (!rules || !rules.length){
    return defaultValidForm;
  }

  return validateForm(field, fieldName, rules, errorMsgs);
}

const validateForm = (field, fieldName, rules, errorMsgs) => {
	const { value: fieldValue, duplicate } = field;

	if (!rules){
    return defaultValidForm;
  }

  for (let i = 0; i < rules.length; i++) {
    let validationRule = rules[i];
    let validationMethod = validationMethods[validationRule];

    if (!validationMethod) {
      continue;
    }

    let validateResult = validationMethod(fieldValue, duplicate);

    if (!validateResult.success) {
      validateResult.errorMsg = errorMsgs[validationRule].replace('{0}', fieldName);
      validateResult.field = fieldName;

      return validateResult;
      break;
    }
  }

  return defaultValidForm;
}