import {
  expect
}
from 'chai'
import {
  List, Map
}
from 'immutable'

describe('immutibility', () => {

  describe('a number', () => {
    function addNumber(currentState) {
      return currentState + 1;
    }

    it('Numbers are immutable', () => {
      let state = 42;
      let newState = addNumber(state);

      expect(state).to.equal(42);
      expect(newState).to.equal(43);
    })
  })

  describe('a list', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('Lists are immutable', () => {
      let state = List.of('Harry Potter', 'LOTR', 'Hobbit');
      let nextState = addMovie(state, 'WW2');

      expect(state).to.equal(List.of('Harry Potter', 'LOTR', 'Hobbit'))
      expect(nextState).to.equal(List.of('Harry Potter', 'LOTR', 'Hobbit', 'WW2'))
    })
  })

  describe('a tree', () => {
    function addMovie(currentState, movie) {
      return currentState.set(
        'movies', currentState.get('movies').push(movie)
      )
    }

    it('maps or trees are immutable', () => {
      let state = Map({
        'movies': List.of('Abra', 'Cadabra')
      })

      let newState = addMovie(state, 'World');

      expect(state).to.equal(Map({
        'movies': List.of('Abra', 'Cadabra')
      }))

      expect(newState).to.equal(Map({
        'movies': List.of('Abra', 'Cadabra', 'World')
      }))
    })
  })
})
