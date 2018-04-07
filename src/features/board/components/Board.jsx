import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { App } from '../../home/index';
import FlashCard from './FlashCard';
import ScoreBoard from './ScoreBoard'
import * as actions from '../state/actions';
import styles from './Board.css';

class Board extends Component { 

    render() {
        const { flashCards, makeGuess } = this.props;              

        return (
            <App>                
                <div>
                    <div className={styles.board}>
                        {flashCards.map(flashCard => <FlashCard key={flashCard.id} flashCard={flashCard} makeGuess={makeGuess} />)}
                    </div>
                    <ScoreBoard />
                </div>
            </App>
        );
    }

}

Board.propTypes = {
    flashCards: PropTypes.array.isRequired,
    makeGuess: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        flashCards: state.board.flashCards
    };
};

const mapDispatchToProps = dispatch => {
    return {
        makeGuess: (id, guess) => {            
            dispatch(actions.makeGuess(id, guess));
        }
    }
}

Board = withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));

export default Board;