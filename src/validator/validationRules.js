export const defaultRules = {
  email: {
    rules: ['isMandatory'],
    errorMsgs: {
        isMandatory: 'Поле {0} является обязательным',
    }
  },
  login: {
    rules: ['isMandatory'],
    errorMsgs: {
        isMandatory: 'Поле {0} является обязательным',
    }
  },
  password: {
    rules: ['isMandatory', 'isValidPassword'],
    regexpPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    errorMsgs: {
        isMandatory: 'Поле {0} является обязательным',
        isValidPassword: 'Проверьте пароль:<br/>' +
            'Содержит не менее 8 символов<br/>' +
            'содержат не менее 1 цифры<br/>' +
            'содержат как минимум один символ нижнего регистра (a-z)<br/>'+
            'содержат как минимум 1 символ верхнего регистра (A-Z)<br/>' +
            'содержит только 0-9a-zA-Z',
    },
  },
  duplicatepassword: {
    rules: ['isMandatory', 'isValidPassword', 'isPasswordMatch'],
    errorMsgs: {
        isMandatory: 'The field {0} is mandatory. Please fill that',
        isValidPassword: 'Проверьте пароль:<br/>' +
            'Содержит не менее 8 символов' +
            'содержат не менее 1 цифры' +
            'содержат как минимум один символ нижнего регистра (a-z)'+
            'содержат как минимум 1 символ верхнего регистра (A-Z)' +
            'содержит только 0-9a-zA-Z',
        isPasswordMatch: 'Пароли не совпадают',
    },
  },
  captcha: {
    rules: ['isMandatory'],
    errorMsgs: {
        isMandatory: 'The field {0} is mandatory. Please fill that',
    }
  },
  privacyPolicy: {
    rules: ['isMandatory'],
    errorMsgs: {
        isMandatory: 'The field {0} is mandatory. Please fill that',
    }
  },
};