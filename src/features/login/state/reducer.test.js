require('chai').should();
import { reducer } from './reducer';
import { LOGIN } from './constants';

describe('create reducer', () => {

    const previousState = Object.freeze({});

    it('sets email', () => {

        const action = {
            type: LOGIN,
            payload: {
                email: 'email@email.com'
            }
        };

        reducer(previousState, action).should.be.an('object')
            .and.include({ email: 'email@email.com' });

    });
    
    it('keeps the state at non managed actions', () => {

        const action = {
            type: 'ANY'
        };

        reducer(previousState, action).should.be.an('object')
            .and.deep.include(previousState);

    });
    
});