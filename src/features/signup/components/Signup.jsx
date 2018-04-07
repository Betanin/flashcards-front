import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { App } from '../../home/index';
import { signup, cancel } from '../state/actions';
import Box from '../../../common/components/Box';
import styles from './Signup.css';

const renderField = (
    type,
    name,
    labelId,
    labelDefault
) => (
        <div className={styles.fieldRow} >
            <div className={styles.fieldLabel}>
                <label >
                    <FormattedMessage
                        id={labelId}
                        defaultMessage={labelDefault} />:
            </label>
            </div>
            <Field name={name} component="input" type={type} className={styles.field} required />
        </div>
    );

const Signup = props => {

    const { handleSubmit, reset, destroy, pristine, submitting, dispatch } = props;

    const connectedSignup = signup(dispatch, reset);
    const connectedCancel = cancel(dispatch, reset, destroy);
    
    return (
        <App blockScreen={true}>
            <Box extraStyle={styles.container}>
                <form onSubmit={handleSubmit(connectedSignup)} className={styles.form}>
                    <div>
                        {renderField("text", "name", "signup.name", "Name")}
                        {renderField("email", "email", "signup.email", "E-Mail")}
                        {renderField("password", "password", "signup.password", "Password")}
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.button} disabled={pristine || submitting}>
                            <FormattedMessage
                                id="signup.signup"
                                defaultMessage="Signup" />
                        </button>
                        <button type="submit" className={styles.button} disabled={submitting} onClick={connectedCancel}>
                            <FormattedMessage
                                id="signup.cancel"
                                defaultMessage="Cancel" />
                        </button>
                    </div>
                </form>
            </Box>
        </App>
    );

}

const form = 'signup';

export default reduxForm({
    form,
    destroyOnUnmount: false
})(Signup);