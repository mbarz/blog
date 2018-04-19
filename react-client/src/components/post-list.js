import React from 'react';
import { Post } from './post';

export class PostList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loaded: 0,
      posts: []
    };
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  componentDidMount() {
    Prism.highlightAll();
    this.loadNextPosts();
  }

  loadNextPosts(n = 5) {
    return this.loadPosts({ start: this.state.loaded, limit: n }).then(list => {
      this.setState({
        loaded: this.state.loaded + list.length,
        posts: [...this.state.posts, ...list]
      });
      return list;
    });
  }

  loadPosts({ start, limit } = {}) {
    let url = 'api/posts';
    const params = [];
    if (limit) params.push('limit=' + limit);
    if (start) params.push('start=' + start);
    if (params.length) url += '?' + params.join('&');
    return fetch(url, {
      credentials: 'same-origin'
    }).then(response => {
      if (!response.ok) throw new Error(`unable to load (${response.status})`);
      else return response.json();
    });
  }

  render() {
    return (
      <div className="posts">
        {this.state.posts.map(post => <Post post={post} key={post.id} />)}
        <div className="load-more-button" onClick={() => this.loadNextPosts()}>
          Mehr laden
        </div>
      </div>
    );
  }
}
