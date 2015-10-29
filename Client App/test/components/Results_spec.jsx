import React from 'react/addons';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';
import {List, Map} from 'immutable';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} = React.addons.TestUtils;

describe('results', () => {
  it('it renders entries with vote counts or 0', () => {
    const pair = List.of('Andrew','Bestbier');
    const tally = Map({'Bestbier': 5});

    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );

    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [Andrew, Bestbier] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(Andrew).to.contain('Andrew');
    expect(Andrew).to.contain('0');
    expect(Bestbier).to.contain('Bestbier');
    expect(Bestbier).to.contain('5');
  })

  it('invokes the next callback when the next buttom is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('Trainspotting', '28 Days Later');
    const component = renderIntoDocument(
      <Results pair={pair}
               tally={Map()}
               next={next}/>
    );
    Simulate.click(React.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  })

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
    <Results winner="Trainspotting"
             pair={["Trainspotting", "28 Days Later"]}
             tally={Map()} />
    );
    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  })
})
