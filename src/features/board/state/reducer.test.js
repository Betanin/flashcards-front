const chai = require("chai");
chai.should();
chai.use(require('chai-subset'));

import { reducer } from './reducer';
import { MAKE_GUESS, CLEAR_BOARD, START_GAME, FINISH_GAME } from './constants';

describe('board reducer', () => {

    const previousState = Object.freeze({
        game: Object.freeze({
            status: 'WAITING',
            counter: Object.freeze({
                hit: 0,
                miss: 0,
                total: 3
            })
        }),
        flashCards: [
            Object.freeze({
                id: '2165446565216',
                word: 'earth',
                image: 'http://images.com/earth.jpg',
                hit: 0
            }),
            Object.freeze({
                id: '1321654646542',
                word: 'mountain',
                image: 'http://images.com/mountain.jpg',
                hit: 0
            }),
            Object.freeze({
                id: '51654626546546',
                word: 'lake',
                image: 'http://images.com/lake.jpg',
                hit: 0
            })
        ]
    });

    it('guesses the word', () => {

        const action = {
            type: MAKE_GUESS,
            payload: {
                id: '2165446565216',
                guess: 'earth'
            }
        };

        reducer(previousState, action).flashCards.should.containSubset([{ id: '2165446565216', hit: 1 }]);

    });
    
    it('guesses the word upper case', () => {

        const action = {
            type: MAKE_GUESS,
            payload: {
                id: '51654626546546',
                guess: 'LAKE'
            }
        };

        let newState = reducer(previousState, action);

        reducer(newState, action).should.deep.contain(newState);
            
    });

    it('misses the word', () => {

        const action = {
            type: MAKE_GUESS,
            payload: {
                id: '1321654646542',
                guess: 'mountaine'
            }
        };

        reducer(previousState, action).flashCards.should.containSubset([{ id: '1321654646542', hit: -1 }]);

    });

    it('tries to guess an already guessed word', () => {

        const action = {
            type: MAKE_GUESS,
            payload: {
                id: '1321654646542',
                guess: 'mountaine'
            }
        };

        reducer(previousState, action).flashCards.should.containSubset([{ id: '1321654646542', hit: -1 }]);

    });

    it('finishes automatically the game', () => {

        const actions = [];
        
        actions.push({
            type: MAKE_GUESS,
            payload: {
                id: '1321654646542',
                guess: 'mountaine'
            }
        });

        actions.push({
            type: MAKE_GUESS,
            payload: {
                id: '2165446565216',
                guess: 'earth'
            }
        });

        actions.push({
            type: MAKE_GUESS,
            payload: {
                id: '51654626546546',
                guess: 'lake'
            }
        });

        let state = previousState;
        actions.forEach(action => state = reducer(state, action));
        state.game.should.contain({ status: 'FINISHED' });

    });

    it('starts and finishes a game', () => {

        let action = {
            type: START_GAME,
            payload: {
                flashCards: [{
                    id: '2165446565216',
                    word: 'earth',
                    image: 'http://images.com/earth.jpg'
                }]
            }
        };


        const state = reducer(previousState, action);
        state.game.should.contain({ status: 'PLAYING' });
        state.flashCards.should.containSubset([{ id: '2165446565216', word: 'earth', image: 'http://images.com/earth.jpg' }]);

        action = {
            type: FINISH_GAME,
            payload: {
                flashCards: []
            }
        };

        reducer(previousState, action).game.should.contain({ status: 'FINISHED' });
                
    });

    it('clears the board', () => {

        const nextState = {
            game: {
                status: 'WAITING',
                counter: {
                    hit: 0,
                    miss: 0,
                    total: 0
                }
            },
            flashCards: []
        };

        const action = {
            type: CLEAR_BOARD
        };

        reducer(previousState, action).should.deep.include(nextState);

    });

    it('keeps the state at non managed actions', () => {

        const action = {
            type: 'ANY'
        };

        reducer(previousState, action).should.be.an('object')
            .and.deep.include(previousState);

    });
    
});