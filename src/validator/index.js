import { validationRules } from './validationRules';
import { validationMethods } from './validationMethods';
import { validationMessage } from './validationMessage';

const defaultValidForm = {
  success: true,
  errorMsg: '',
};

export const formValidator = (fields) => {
  let isValidForm = defaultValidForm;

  for (let fieldName in fields) {
    const field = fields[fieldName];
    const rules = getValidationRules(field, fieldName);

    isValidForm = validateForm(field, fieldName, rules);

    if (!isValidForm.success) {
      return isValidForm;
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
};

const validateForm = (field, fieldName, rules) => {
  const { value: fieldValue, duplicate, name } = field;

  if (!rules || !rules.length) {
    return defaultValidForm;
  }

  for (let i = 0; i < rules.length; i++) {
    const validationRule = rules[i];
    const validationMethod = validationMethods[validationRule];

    if (!validationMethod) {
      continue;
    }

    const validateResult = validationMethod(fieldValue, duplicate);

    if (!validateResult.success) {
      validateResult.errorMsg = validationMessage[validationRule].replace('{0}', name || fieldName);
      validateResult.field = fieldName;

      return validateResult;
    }
  }

  return defaultValidForm;
};
