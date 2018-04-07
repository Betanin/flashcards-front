import { LOGIN } from './constants';

export const reducer = (state = {}, action) => {
    
    switch (action.type) {
        case LOGIN:
            return {
                email: action.payload.email,
                name: action.payload.name,
                token: action.payload.token
            };

        default:
            return state;
    }

}