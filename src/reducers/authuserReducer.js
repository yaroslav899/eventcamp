const initialState = {
    isSuccessRegister: '',
    isSuccessAuth: '',
    token: '',
    login: '',
    pass: ''
};

export default function (authuserReducer = initialState, action) {
    switch (action.type) {
        case 'UPDATE_AUTHTOKEN':
            return { ...authuserReducer, token: action.token };
    }
    return authuserReducer;
};