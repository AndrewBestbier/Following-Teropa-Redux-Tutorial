import React from 'react/addons';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';
import {List} from 'immutable';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = React.addons.TestUtils;

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(<Voting pair={[
      "Trainspotting", "28 Days Later"
    ]}/>);

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to
      .equal(2);
    expect(buttons[0].textContent).to
      .equal('Trainspotting');
    expect(buttons[1].textContent).to
      .equal('28 Days Later');
  });

  it('invokes a callback when one of the buttons is clicked', () => {
    let votedWith;

    /*
      Short-hand for:
      var vote = function(entry){
        return votedWith = entry;
      } */

    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(<Voting pair={[
      "Trainspotting", "28 Days Later"
    ]} vote={vote}/>);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to
      .equal('Trainspotting');
  });

  it('disables buttons when the user has voted', () => {
    const component = renderIntoDocument(<Voting pair={[
      "Trainspotting", "28 Days Later"
    ]} hasVoted="Trainspotting"/>);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');


    expect(buttons[0].hasAttribute('disabled')).to
      .equal(true);
    expect(buttons[1].hasAttribute('disabled')).to
      .equal(true);
  })

  it('adds label to the voted entry', () => {
  const component = renderIntoDocument(
    <Voting pair={["Trainspotting", "28 Days Later"]}
            hasVoted="Trainspotting" />
  );
  const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

  expect(buttons[0].textContent).to.contain('Voted');
});

it('renders just the winner when there is one', () => {
  const component = renderIntoDocument(
    <Voting winner="Trainspotting" />
  );
  const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
  expect(buttons.length).to.equal(0);

  const winner = React.findDOMNode(component.refs.winner);
  expect(winner).to.be.ok;
  expect(winner.textContent).to.contain('Trainspotting');
});

it('does update DOM when prop changes', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    const newPair = pair.set(0, 'Sunshine');
    component.setProps({pair: newPair});
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Sunshine');
  });



});
