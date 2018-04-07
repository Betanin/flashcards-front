import { LOGIN } from './constants';
import { postLogin } from './endpoints';
import * as messageActions from '../../message/state/actions';
import { push } from '../../../common/router/actions';
import { authenticateUser, getJWTToken } from '../../../modules/auth';
import jwtDecode from 'jwt-decode';

export const login = (dispatch, ...postLoginOperations) => (values) => {

    return postLogin(values)
        .then(response => {

            if(response.status === 200) {
                authenticateUser(response.data.token);
                dispatch(messageActions.showMessage('INFO', 'Successful signin!'));                
                postLoginOperations.forEach(operation => operation());
                initSession(response.data.token)(dispatch);
            }

            if (response.status >= 400)
                throw new Error(response.data.error);

            return response;
        })
        .catch((response) => {
            dispatch(messageActions.showMessage('ERROR', response.message || 'Failed signin!'));
        });

}

export function recoverSession() {

    return async dispatch => {

        const jwtToken = getJWTToken();

        if(jwtToken) {
            try {
                await initSession(jwtToken)(dispatch);
                dispatch(messageActions.showMessage('INFO', 'Session active!'));
            } catch (err) {
                dispatch(push('/login'));
            }
        } else {
            dispatch(push('/login'));
        }
    }

}

export function initSession(token) {

    return async dispatch => {

        const decodedToken = jwtDecode(token);
        
        dispatch({
            type: LOGIN,
            payload: {
                email: decodedToken.data.email,
                name: decodedToken.data.name,
                token: token
            }
        });

        dispatch(push('/'));

    }

}

export const signup = (dispatch, ...preSignupOperations) => () => {

    preSignupOperations.forEach(operation => operation());

    return dispatch(push('/signup'));

}