import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { App } from '../../home/index';
import Box from '../../../common/components/Box';
import styles from './Create.css';
import { submit, close } from '../state/actions';

const renderField = (
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
            <Field name={name} component="input" type="text" className={styles.field} />
        </div>
    );

const Create = props => {

    const { handleSubmit, reset, pristine, submitting, dispatch, imageUri } = props;

    const connectedSubmit = submit(dispatch, reset);
    const connectedClose = close(dispatch, reset);

    return (
        <App blockScreen={true}>
            <Box extraStyle={styles.container}>
                <div className={styles.imagecontainer}>
                    <img className={styles.image}
                        src={imageUri}
                        alt="card"
                    />
                </div>
                <form onSubmit={handleSubmit(connectedSubmit)} className={styles.form}>
                    <div>
                        {renderField("word", "create.word", "Word")}
                        {renderField("image", "create.image", "Image")}
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.button} disabled={pristine || submitting}>
                            <FormattedMessage
                                id="create.create"
                                defaultMessage="Create" />
                        </button>
                        <button type="submit" className={styles.button} disabled={submitting} onClick={connectedClose}>
                            <FormattedMessage
                                id="create.close"
                                defaultMessage="Close" />
                        </button>
                    </div>
                </form>
            </Box>
        </App>
    );

}

const form = 'create';

const CreateForm = reduxForm({
    form
})(Create);

const selector = formValueSelector(form);

export default connect(state => ({
    imageUri: selector(state, 'image')
}))(CreateForm);