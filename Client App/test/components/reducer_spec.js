import {
  List, Map, fromJS
}
from 'immutable';
import {
  expect
}
from 'chai';

import reducer from '../../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Andrew', 'Bestbier'),
          tally: Map({
            'Andrew': 5
          })
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
          tally: Map({
            'Andrew': 5
          })
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

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 1
        }
      }
    });
    const action = {
      type: 'VOTE',
      entry: 'Trainspotting'
    };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 1
        }
      },
      hasVoted: 'Trainspotting'
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 1
        }
      }
    });
    const action = {
      type: 'VOTE',
      entry: 'Sunshine'
    };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          Trainspotting: 1
        }
      }
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
  const initialState = fromJS({
    vote: {
      pair: ['Trainspotting', '28 Days Later'],
      tally: {Trainspotting: 1}
    },
    hasVoted: 'Trainspotting'
  });
  const action = {
    type: 'SET_STATE',
    state: {
      vote: {
        pair: ['Sunshine', 'Slumdog Millionaire']
      }
    }
  };
  const nextState = reducer(initialState, action);

  expect(nextState).to.equal(fromJS({
    vote: {
      pair: ['Sunshine', 'Slumdog Millionaire']
    }
  }));
});
})
