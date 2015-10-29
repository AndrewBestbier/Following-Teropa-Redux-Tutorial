import {
  List, Map
}
from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

/*
  #Final round

  entries: (none)
  getWinners: A
  Then concatenated to: A
  if length ===1 then A is the winner
  else return entries

  #Single winner:

  entries: A,B,C,D
  getWinners: E
  Then they are concatenated to: A,B,C,D,E
  vote becomes A,B by take(2)
  entries becomes C,D,E

  #Multiple winners:

  entries: A,B,C,D
  getWinners: E,F
  Then they are concatenated to: A,B,C,D,E,F
  vote becomes A,B by take(2)
  entries becomes C,D,E,F


*/

function getWinners(vote) {
  //If no votes exist yet
  if (!vote) {
    return [];
  }

  //Getting values
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);

  //Logic
  if (aVotes > bVotes) {
    return [a];
  } else if (aVotes < bVotes) {
    return [b];
  } else {
    return [a, b];
  }
}

export function next(state) {
  const entries = state.get('entries').concat(getWinners(state.get('vote'))) //Read two logic flows above

  if (entries.size === 1) {
    //We could have just returned: Map({winner: entries.first()})
    //But it is good practise to morph the old state instead of returning a new one
    return state.remove('vote').remove('entries').set('winner', entries.first())
  } else {
    return state.merge({
      vote: Map({
        pair: entries.take(2)
      }),
      entries: entries.skip(2)
    })
  }

}


/*
Using updateIn makes this pleasingly succinct. What the code expresses is
"reach into the nested data structure path ['vote', 'tally', 'Trainspotting'],
and apply this function there. If there are keys missing along the path,
create new Maps in their place. If the value at the end is missing, initialize it with 0".
*/
export function vote(voteState, entry) {
  return voteState.updateIn(['tally', entry], 0, tally => tally + 1)
}

//The Initial state of the application
export const INITIAL_STATE = Map();
