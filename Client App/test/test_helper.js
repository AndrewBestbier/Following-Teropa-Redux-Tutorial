/* I just copied this code and don't fully understand it. It's so we can setup a DOM for testing */

import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});


chai.use(chaiImmutable);
