import { MAKE_GUESS, CLEAR_BOARD, START_GAME, FINISH_GAME } from './constants';

const gameBuilder = (status, total, hit, miss) => {
    return {
        status,
        counter: {
            total,
            hit,
            miss
        }
    }
}

const flashcardBuilder = (id, word, image, hit) => {
    return {
        id,
        word,
        image,
        hit
    }
}

const initialState = {
    game: gameBuilder('WAITING', 0, 0, 0),
    flashCards: []
}

export const reducer = (state = initialState, action) => {
    
    let game = {};
    let flashCards = {};

    switch (action.type) {
        case START_GAME:
            game = gameBuilder('PLAYING', action.payload.flashCards.length, 0, 0);
            flashCards = action.payload.flashCards.map(card => 
                flashcardBuilder(card.id, card.word, card.image, 0)
            );
            return Object.assign({}, {game}, {flashCards});

        case FINISH_GAME:
            game = gameBuilder('FINISHED',
                state.game.counter.total, state.game.counter.hit, state.game.counter.miss);
            flashCards = state.flashCards.map(card => {
                return flashcardBuilder(card.id, card.word, card.image, card.hit);
            });
            return Object.assign({}, {game}, {flashCards});

        case CLEAR_BOARD:
            game = gameBuilder('WAITING', 0, 0, 0);
            flashCards = [];
            return Object.assign({}, {game}, {flashCards});

        case MAKE_GUESS:
            let flashCard = state.flashCards.find(card => card.id === action.payload.id);

            if (flashCard.hit !== 0)
                return state;

            let hit = 0;
            let miss = 0;
            if (flashCard.word.toUpperCase().trim() === action.payload.guess.toUpperCase().trim()) {
                hit = 1;
            } else {
                miss = 1;
            }
           
            game = gameBuilder(state.game.status, state.game.counter.total,
                state.game.counter.hit + hit, state.game.counter.miss + miss);

            flashCards = state.flashCards.map(card => {
                let cardHit = card.hit;
                if(card.id === flashCard.id)
                    cardHit = hit - miss;
                return flashcardBuilder(card.id, card.word, card.image, cardHit);
            });
            
            let returnValue = Object.assign({}, {game}, {flashCards});
            if((state.game.counter.hit || 0) + (state.game.counter.miss || 0) + 1 >= state.game.counter.total)
                returnValue = reducer(returnValue, { type: FINISH_GAME });

            return returnValue;
            
        default:
            return state;
    }

}