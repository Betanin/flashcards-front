import { combineReducers } from 'redux';
import * as form from 'redux-form';
import * as router from './router/reducer';
import * as home from '../features/home/state/reducer';
import * as board from '../features/board/state/reducer';
import * as message from '../features/message/state/reducer';
import * as login from '../features/login/state/reducer';

const reducerMap = {
    form: form.reducer,
    home: home.reducer,
    board: board.reducer,
    router: router.reducer,
    messages: message.reducer,
    login: login.reducer
};

export default combineReducers(reducerMap);