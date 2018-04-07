import { SHOW, HIDE } from './constants';
import uuid from 'uuid/v1';

export function showMessage(type, message) {
    
    return async dispatch => {
        const id = uuid();
        dispatch({
            type: SHOW,
            payload: {
                id,
                type,
                message
            }
        });
        setTimeout(() => dispatch(hideMessage(id)), 5000);
    };

}

export function hideMessage(id) {

    return async dispatch => {
        dispatch({
            type: HIDE,
            payload: {
                id
            }
        });
    };

}