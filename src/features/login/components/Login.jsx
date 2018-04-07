import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { App } from '../../home/index';
import { login, signup } from '../state/actions';
import Box from '../../../common/components/Box';
import styles from './Login.css';

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

const Login = props => {

    const { handleSubmit, reset, destroy, pristine, submitting, dispatch } = props;

    const connectedLogin = login(dispatch, reset);
    const connectedSignup = signup(dispatch, reset, destroy);
    
    return (
        <App blockScreen={true}>
            <Box extraStyle={styles.container}>
                <form onSubmit={handleSubmit(connectedLogin)} className={styles.form}>
                    <div>
                        {renderField("email", "email", "login.email", "E-Mail")}
                        {renderField("password", "password", "login.password", "Password")}
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.button} disabled={pristine || submitting}>
                            <FormattedMessage
                                id="login.login"
                                defaultMessage="Login" />
                        </button>
                        <a className={styles.link} disabled={submitting} onClick={connectedSignup}>
                            <FormattedMessage
                                id="login.signup"
                                defaultMessage="Signup" />
                        </a>
                    </div>
                </form>
            </Box>
        </App>
    );

}

const form = 'login';

export default reduxForm({
    form,
    destroyOnUnmount: false
})(Login);