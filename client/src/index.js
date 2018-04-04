import printMe from './print';
import { cube } from './math.js';
import $ from 'jquery';

import './style.css';

function component() {
  var element = $('<pre>');

  element.html(
    ['Hello Webpack!', `5 cubed is equal to ${cube(5)}`].join('\n\n')
  );
  element.addClass('hello');
  return element;
}

$(document.body).append(component());
