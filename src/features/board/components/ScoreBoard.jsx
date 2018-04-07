import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styles from './ScoreBoard.css';

class ScoreBoard extends Component {

    render() {
        const { counter } = this.props;

        return (
            <div className={styles.scoreboard}>
                <p className={[styles.counter, styles.hit].join(' ')}>
                    <FormattedMessage
                        id="board.scoreboard.hits"
                        defaultMessage="Hits" />: <b>{counter.hit}</b>
                </p>
                <p className={[styles.counter, styles.miss].join(' ')}>
                    <FormattedMessage
                        id="board.scoreboard.misses"
                        defaultMessage="Misses" />: <b>{counter.miss}</b>
                </p>
            </div>
        )
    }

}

ScoreBoard.propTypes = {
    counter: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        counter: state.board.game.counter
    };
};

ScoreBoard = withRouter(connect(mapStateToProps)(ScoreBoard));

export default ScoreBoard;