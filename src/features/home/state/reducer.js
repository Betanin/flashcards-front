import { OPEN_MENU, CLOSE_MENU } from './constants';

const menuBuilder = (status) => {
    return {
        menu: {
            status
        }        
    }
}

const initialState = menuBuilder('CLOSED');

export const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case OPEN_MENU:
            return Object.assign({}, state, menuBuilder('OPENED'));
        case CLOSE_MENU:
            return Object.assign({}, state, menuBuilder('CLOSED'));
        default:
            return state;
    }

}