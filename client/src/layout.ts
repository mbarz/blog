import * as $ from 'jquery';
import { Router } from './router';

export function layout() {
  if ($('#main').length) return $('#main');
  const body = $(document.body);
  const main = $('<div id="main">');
  body.append(main);

  const header = $('<header>');
  const h1 = $('<h1>muxes dev blog</h1>');
  h1.click(() => Router.route('/'));
  header.append(h1);
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
        const logoutLink = $(
          `<a href="/api/logout"><i class="fa fa-lock"></i></a>`
        );
        logoutLink.click(event => {
          event.preventDefault();
          fetch('/api/logout', {
            credentials: 'same-origin'
          }).then(() => {
            Router.route('/');
          });
        });
        spacer.after(logoutLink);
        spacer.after(createLink('/edit', '<i class="fa fa-edit"></i>'));
        spacer.after(createLink('/', '<i class="fa fa-list"></i>'));
      } else {
        spacer.after(createLink('/login', '<i class="fa fa-unlock"></i>'));
        spacer.after(createLink('/', '<i class="fa fa-list"></i>'));
      }
    });
  return main;
}

function createLink(target: string, text: string) {
  const link = $(`<a href="${target}">${text}</a>`);
  link.click(event => {
    event.preventDefault();
    Router.route(target);
  });
  return link;
}
