import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Andrew', 'Bestbier'),
          tally: Map({'Andrew': 5})
        })
      })
    }

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Andrew', 'Bestbier'],
        tally: {
          'Andrew': 5
        }
      }
    }))
  })

  it('handles SET_STATE with the initial state set to undefined', () => {
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Andrew', 'Bestbier'),
          tally: Map({'Andrew': 5})
        })
      })
    }

    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Andrew', 'Bestbier'],
        tally: {
          'Andrew': 5
        }
      }
    }))
  })
})
