import $ from 'jquery';
import { route } from './renderer';

export function layout() {
  if ($('#main').length) return $('#main');
  const body = $(document.body);
  const main = $('<div id="main">');
  body.append(main);

  const header = $('<header>');
  header.append('<h1>muxes dev blog</h1>');
  const spacer = $(`<div class="spacer"></div>`);
  header.append(spacer);
  header.append(
    `<img src="https://travis-ci.org/mbarz/blog.svg?branch=master">`
  );
  main.append(header);
  fetch('api/loggedin', { credentials: 'same-origin' })
    .then(response => response.json())
    .then(data => {
      if (data.isAuthenticated) {
        spacer.after(createLink('/edit', 'editor'));
        spacer.after(createLink('/', 'list'));
      }
    });
  return main;
}

function createLink(target, text) {
  const listLink = $(`<a href="${target}">${text}</a>`);
  listLink.click(event => {
    event.preventDefault();
    route(target);
  });
  return listLink;
}
