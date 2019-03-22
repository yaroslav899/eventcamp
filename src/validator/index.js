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


     isValidForm = customValidateField(field, fieldName);

     if (!isValidForm.success) {
         isValidForm.field = fieldName;
         break;
     }
   }

   return isValidForm;
};

export const validateField = (fieldName, value) => {

}

const defaultValidateField = (field, fieldName, fieldDefaultRules) => {
    const defaultRules = fieldDefaultRules.rules;
    const defaultErrorMsgs = fieldDefaultRules.errorMsg;

    for (let i = 0; i < defaultRules.length; i++) {
        let rule = validateMethod[defaultRules[i]];

        if (!rule) {
            continue;
        }

        validateResult = rule(value, duplicate);

        let r = 0;
    }

    var t = 0;
}

const customValidateField = (field, fieldName) => {
    if (!field.rules){
        return defaultValidForm;
    }
    const {
        value,
        rules,
        duplicate,
      } = field;
    let validateResult = defaultValidForm;

    for (let i = 0; i < rules.length; i++) {
        let rule = validateMethod[rules[i]];

        if (!rule) {
            continue;
        }

        validateResult = rule(value, duplicate);

        if (!validateResult.success) {
            break;
        }
    }
    return validateResult;
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