import $ from 'jquery';
import marked from 'marked';
import * as Prism from './lib/prism';

import { layout } from './layout';

export function list() {
  return loadList().then(list => showList(list));
}

export function loadList() {
  return fetch('api/posts', {
    credentials: 'same-origin'
  }).then(response => {
    if (!response.ok) throw new Error(`unable to load (${response.status})`);
    else return response.json();
  });
}

export function showList(list) {
  list.sort((p1, p2) => {
    const d1 = new Date(p1.date).getTime();
    const d2 = new Date(p2.date).getTime();
    return d1 - d2;
  });

  const body = $(document.body);
  const main = layout();

  const postContainer = $('<div>');
  postContainer.addClass('posts');
  main.append(postContainer);

  for (let post of list) {
    printPost(post, postContainer);
  }
  Prism.highlightAll();
}

function printPost(post, container) {
  const postDiv = $('<div class="blog-post">');

  const header = $('<header>');
  header.html(`<h1>#${post.id} ${post.date} ${post.title}</h1>`);

  if (!post.public) {
    header.append('<div class="spacer"></div><div>(hidden)</div>');
  }
  postDiv.append(header);

  const contentDiv = $('<div>');
  contentDiv.html(marked(post.content));
  postDiv.append(contentDiv);

  container.prepend(postDiv);
}
