export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function vote(entry) {
  return {
    type: 'VOTE',
    meta: {remote: true}, //For the remote_action_middleware. This is so that setState is not called.
    entry
  };
}

export function next() {
  return {
    meta: {remote: true}, //For the remote_action_middleware. This is so that setState is not called.
    type: 'NEXT'
  };
}
