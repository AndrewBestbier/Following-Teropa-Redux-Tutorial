import {
  Map, fromJS
}
from 'immutable';
import {
  expect
}
from 'chai';

import reducer from '../src/reducer';


describe('reducer', () => {

  it('has an initial state', () => {
    const action = {
      type: 'SET_ENTRIES',
      entries: ['A', 'B']
    }
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['A', 'B']
    }))
  })
  
  it('can be used with reduce', () => {
    const actions = [{
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', '28 Days Later']
    }, {
      type: 'NEXT'
    }, {
      type: 'VOTE',
      entry: 'Trainspotting'
    }, {
      type: 'VOTE',
      entry: '28 Days Later'
    }, {
      type: 'VOTE',
      entry: 'Trainspotting'
    }, {
      type: 'NEXT'
    }];

    /* Now here is the interesting part. We can use reduce. Don't get confused between reducer and reduce

      1) actions is the array above
      2) the reduce function is used. Each action is iterated through. the reducer() is applied to each result
      3) The initial starting point is Map(). Through each iteration, reducer(action) is used and the
          result is applied to Map(). This new result is used in subsequent iterations
    */
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Trainspotting'
    }));
  })


  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {
      type: 'SET_ENTRIES',
      entries: ['A', 'B', 'C', 'D']
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['A', 'B', 'C', 'D']
    }))
  })

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['A', 'B', 'C']
    })
    const action = {
      type: 'NEXT'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['A', 'B']
      },
      entries: ['C']
    }))
  })

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['A', 'B']
      },
      entries: ['C']
    })
    const action = {
      type: 'VOTE',
      entry: 'B'
    }
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['A', 'B'],
        talley: {
          "B": 1
        }
      },
      entries: ['C']
    }))
  })
})
