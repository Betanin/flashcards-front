import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { App } from '../../home/index';
import { startGame } from '../../board/index';
import styles from './Welcome.css';

class Welcome extends Component {

    render() {
        const { startGame } = this.props;

        return (
            <App>
                <div className={styles.box}>
                    <p className={styles.greetings}>
                        <FormattedMessage
                            id="welcome.greetings"
                            defaultMessage="Welcome!" />
                    </p>
                    <p className={styles.text}>
                        <FormattedMessage
                            id="welcome.text"
                            defaultMessage="Let's get started" />
                    </p>
                    <button className={styles.play} onClick={startGame}>
                        <FormattedMessage
                            id="welcome.play"
                            defaultMessage="Play" />
                    </button>
                </div>
            </App>
        );
    }

}

Welcome.propTypes = {
    startGame: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
    return {
        startGame: () => {
            dispatch(startGame());
        }
    }
}

Welcome = withRouter(connect(undefined, mapDispatchToProps)(Welcome));

export default Welcome;