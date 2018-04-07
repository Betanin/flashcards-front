import { postFlashcard } from './endpoints';
import * as messageActions from '../../message/state/actions';
import { push } from '../../../common/router/actions';


export function open() {

    return async dispatch => {

        dispatch(push('/create'));

    }

}

export const close = (dispatch, ...preCloseOperations) => () => {

    preCloseOperations.forEach(operation => operation());

    return dispatch(push('/'));

}

export const submit = (dispatch, ...postSubmitOperations) => (values) => {

    return postFlashcard(values)
        .then(response => {

            if(response.status === 200) {
                dispatch(messageActions.showMessage('INFO', 'Card created successfully!'));
                postSubmitOperations.forEach(operation => operation());
            }

            if (response.status >= 400)
                throw new Error(response.data.error);

            return response;
        })
        .catch((response) => {
            dispatch(messageActions.showMessage('ERROR', response.message || 'Card not created!'));
        });

}