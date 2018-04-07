require('chai').should();
import { reducer }  from './reducer';
import { OPEN_MENU, CLOSE_MENU } from './constants';

describe('home reducer', () => {

    const previousState = Object.freeze({
        menu: Object.freeze({
            status: 'CLOSED'
        })
    });

    it('opens and closes the menu', () => {

        let action = {
            type: OPEN_MENU
        };

        let state = reducer(previousState, action);

        state.menu.should.include({ status: 'OPENED' });

        action = {
            type: CLOSE_MENU
        };

        state = reducer(state, action);

        state.menu.should.include({ status: 'CLOSED' });
                
    });
    
    it('keeps the state at non managed actions', () => {

        const action = {
            type: 'ANY'
        };

        reducer(previousState, action).should.be.an('object')
            .and.deep.include(previousState);

    });

});