export default function (authuserReducer = { state: {} }, action) {
    switch (action.type) {
        case 'UPDATE_USERAUTH':
            let state = {
                name: action.state.name,
                email: action.state.email,
                token: action.state.token
            }
            return { ...authuserReducer, state };
    }
    return authuserReducer;
};