import { SHOW, HIDE } from './constants';

export const reducer = (state = [], action) => {
    
    switch (action.type) {
        case SHOW:
            let showState = state.map((item) => Object.assign({}, item));
            showState.push({
                id: action.payload.id,
                type: action.payload.type,
                message: action.payload.message
            });
            return showState;
        case HIDE:
            let hideState = state
                .map((item) => Object.assign({}, item))
                .filter((message) => message.id !== action.payload.id);
            return hideState;
        default:
            return state;
    }

}