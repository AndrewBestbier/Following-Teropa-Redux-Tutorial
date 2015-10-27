import {
  expect
}
from 'chai';
import {
  List, Map
}
from 'immutable';
import {
  setEntries, next, vote
}
from '../src/core';


describe('application logic', () => {

  describe('set entries', () => {
    it('adds entries to the state', () => {
      const state = Map();
      const entries = ['A', 'B', 'C'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('A', 'B', 'C')
      }))
    })
  })

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('A', 'B', 'C', 'D')
      });

      const newState = next(state);

      expect(newState).to.equal(Map({
        vote: Map({
          pair: List.of('A', 'B')
        }),
        entries: List.of('C', 'D')
      }));
    })

    it('puts the winner of the current vote into entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('A', 'B'),
          talley: Map({
            A: 4,
            B: 1
          })
        }),
        entries: List.of('C', 'D', 'E')
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('C', 'D')
        }),
        entries: List.of('E', 'A')
      }))
    })

    it('puts tied pairs back into entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('A', 'B'),
          talley: Map({
            A: 4,
            B: 4
          })
        }),
        entries: List.of('C', 'D', 'E')
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('C', 'D')
        }),
        entries: List.of('E', 'A', 'B')
      }))
    })

    it('marks a winner when there are no entries left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('A', 'B'),
          talley: Map({
            A: 5,
            B: 4
          })
        }),
        entries: List()
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        winner: 'A'
      }))
    })
  })

  describe('vote', () => {
    it('creates a tally for a NEW vote', () => {
      const state = Map({
        vote: Map({
          pair: List.of('A', 'B')
        }),
        entries: List()
      })

      const nextState = vote(state, 'A');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('A', 'B'),
          talley: Map({
            'A': 1
          })
        }),
        entries: List()
      }))

    })

    it('increments a previously created vote', () => {
      const state = Map({
        vote: Map({
          pair: List.of('A', 'B'),
          talley: Map({
            'A': 1,
            'B': 1
          })
        }),
        entries: List()
      })

      var newState = vote(state, 'B');

      expect(newState).to.equal(Map({
        vote: Map({
          pair: List.of('A', 'B'),
          talley: Map({
            'A': 1,
            'B': 2
          })
        }),
        entries: List()
      }))
    })
  })
})
