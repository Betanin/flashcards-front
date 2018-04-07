import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { App } from '../../home/index';
import { startGame } from '../../board/index';
import Box from '../../../common/components/Box';
import styles from './Result.css';

class Result extends Component {

    render() {
        const { counter, startGame } = this.props;

        return (
            <App blockScreen={true}>
                <Box extraStyle={styles.container}>
                    {(counter.hit === counter.total)
                        ? <p className={styles.title}>
                            <FormattedMessage
                                id="result.congrats"
                                defaultMessage="Congratulations!" />
                        </p>
                        : <p className={styles.title}>
                        <FormattedMessage
                            id="result.fails"
                            defaultMessage="You lose!" />
                        </p>}
                    <p className={styles.hits}>
                        <FormattedMessage
                            id="result.hits"
                            defaultMessage="Hits" />: {counter.hit}
                    </p>
                    <p className={styles.misses}>
                        <FormattedMessage
                            id="result.misses"
                            defaultMessage="Misses" />: {counter.miss}
                    </p>
                    <p className={styles.effectiveness}>
                        <FormattedMessage
                            id="result.effectiveness"
                            defaultMessage="Effectiveness" />: {(counter.hit / counter.total * 100).toFixed(2)}%
                    </p>
                    <button className={styles.replay} onClick={startGame}>
                        <FormattedMessage
                                id="result.play_again"
                                defaultMessage="Play Again" />
                    </button>
                </Box>
            </App>
        );
    }

}

Result.propTypes = {
    counter: PropTypes.object.isRequired,
    startGame: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        counter: state.board.game.counter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        startGame: () => {
            dispatch(startGame());
        }
    }
}

Result = withRouter(connect(mapStateToProps, mapDispatchToProps)(Result));

export default Result;