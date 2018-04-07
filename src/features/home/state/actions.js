import { OPEN_MENU, CLOSE_MENU } from './constants';

export function openMenu() {
    
    return async dispatch => {
        dispatch({
            type: OPEN_MENU
        });
    };

}

export function closeMenu() {

    return async dispatch => {
        dispatch({
            type: CLOSE_MENU
        });
    };

}