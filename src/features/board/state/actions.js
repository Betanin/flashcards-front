import { MAKE_GUESS, CLEAR_BOARD, START_GAME, FINISH_GAME } from './constants';
import { getRaffleFlashcards } from './endpoints';
import * as homeActions from '../../home/state/actions';
import * as messageActions from '../../message/state/actions';
import { push } from '../../../common/router/actions';


export function makeGuess(id, guess) {

    return async dispatch => {

        dispatch({
            type: MAKE_GUESS,
            payload: {
                id,
                guess
            }
        });

    }

}

export function clearBoard() {

    return async dispatch => {

        dispatch({
            type: CLEAR_BOARD
        });
        
    }

}

export function startGame() {

    return async dispatch => {

        getRaffleFlashcards(process.env.CARDS_PER_BOARD)
            .then(response => {
                
                if (response.status === 200) {
                    const flashCards = [];

                    response.data.map(card => flashCards.push({
                        id: card._id,
                        word: card.word,
                        image: card.image
                    }));

                    dispatch(clearBoard());

                    dispatch({
                        type: START_GAME,
                        payload: {
                            flashCards                            
                        }
                    });
            
                    dispatch(homeActions.closeMenu());

                    dispatch(push('/board'));
                }

                if (response.status >= 400)
                    throw new Error(response.data.error);

                return response;
            })
            .catch((response) => {
                dispatch(messageActions.showMessage('ERROR', response.message || 'Error while board loading!'));
            });

    };

}

export function finishGame() {

    return async dispatch => {
        
        dispatch({
            type: FINISH_GAME
        });

        dispatch(push('/result'));

    };

}