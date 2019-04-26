import { validationRules } from './validationRules';
import { validationMethods } from './validationMethods';
import { validationMessage } from './validationMessage';

const defaultValidForm = {
  success: true,
  errorMsg: '',
}

export const formValidator = (fields) => {
   let isValidForm = defaultValidForm;

   for (let fieldName in fields) {
     let field = fields[fieldName];
     let rules = getValidationRules(field, fieldName);

     isValidForm = validateForm(field, fieldName, rules);

     if (!isValidForm.success) {
       return isValidForm;
       break;
     }
   }

   return isValidForm;
};

const getValidationRules = (field, fieldName) => {
  const { rules } = field;

  if (fieldName in validationRules) {
    const fieldDefaultRules = validationRules[fieldName];

    return fieldDefaultRules.rules;
  }

  return rules;
}

const validateForm = (field, fieldName, rules) => {
  const { value: fieldValue, duplicate, name } = field;

  if (!rules || !rules.length) {
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
      validateResult.errorMsg = validationMessage[validationRule].replace('{0}', name || fieldName);
      validateResult.field = fieldName;

      return validateResult;
      break;
    }
  }

  return defaultValidForm;
}