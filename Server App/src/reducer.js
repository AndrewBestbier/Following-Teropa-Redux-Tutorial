import {setEntries, next, vote, INITIAL_STATE} from './core';

/* Note the state = INITIAL_STATE. This is an ES6 way of having a default value if the state is undefined */
export default function reducer(state = INITIAL_STATE, action){
  switch(action.type){
    case 'SET_ENTRIES':
      return setEntries(state, action.entries)
    case 'NEXT':
      return next(state)
    case 'VOTE':
      return state.update('vote', voteState => vote(voteState, action.entry))
  }
  return state
}
