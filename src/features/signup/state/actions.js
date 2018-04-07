import { postSignup } from './endpoints';
import * as messageActions from '../../message/state/actions';
import { push } from '../../../common/router/actions';

export const signup = (dispatch, ...postSubmitOperations) => (values) => {

    return postSignup(values)
        .then(response => {

            if(response.status === 200) {
                dispatch(messageActions.showMessage('INFO', 'Successful signup!'));
                postSubmitOperations.forEach(operation => operation());
                dispatch(push('/login'));
            }

            if (response.status >= 400)
                throw new Error(response.data.error);

            return response;
        })
        .catch((response) => {
            dispatch(messageActions.showMessage('ERROR', response.message || 'Failed signup!'));
        });

}

export const cancel = (dispatch, ...preCancelOperations) => (values) => {

    preCancelOperations.forEach(operation => operation());

    return dispatch(push('/login'));

}