import * as $ from 'jquery';
import * as marked from 'marked';
// const Prism = require('./lib/prism');

import { layout } from './layout';
import { Post } from './post';

export function list() {
  return new ListPage().init();
}

class Loader {
  loaded = 0;

  constructor() {}

  loadPosts(options: { start?: number; limit?: number } = {}) {
    const url = new URL('api/posts', location.origin);
    if (options.limit)
      url.searchParams.append('limit', options.limit.toString());
    if (options.start)
      url.searchParams.append('start', options.start.toString());
    return fetch(url.toString(), {
      credentials: 'same-origin'
    }).then(response => {
      if (!response.ok) throw new Error(`unable to load (${response.status})`);
      else return response.json();
    });
  }

  loadNextPosts(n = 5) {
    return this.loadPosts({ start: this.loaded, limit: n }).then(list => {
      this.loaded += list.length;
      return list;
    });
  }
}

class ListPage {
  initialChunkSize = 10;
  chunkSize = 5;
  list = new PostList();
  loader = new Loader();

  constructor() {
    const nextLink = $('<div class="load-more-button">Mehr laden!</div>');
    nextLink.click(() => this.loadNext(this.chunkSize));
    this.list.postContainer.after(nextLink);
  }

  loadNext(n: number) {
    return this.loader
      .loadNextPosts(n)
      .then(posts => this.list.addPosts(posts));
  }

  async init() {
    await this.loadNext(this.initialChunkSize);
  }
}

class PostList {
  postContainer: JQuery<HTMLElement>;
  constructor() {
    const body = $(document.body);
    const main = layout();
    this.postContainer = $('<div>');
    this.postContainer.addClass('posts');
    main.append(this.postContainer);
  }

  addPosts(posts: Post[]) {
    posts.sort((p1, p2) => {
      const d1 = new Date(p1.date).getTime();
      const d2 = new Date(p2.date).getTime();
      return d2 - d1;
    });

    for (let p of posts) {
      this.addPost(p);
    }
    // Prism.highlightAll();
  }

  addPost(post: Post) {
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

    this.postContainer.append(postDiv);
  }
}
