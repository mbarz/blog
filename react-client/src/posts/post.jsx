import React from 'react';
import marked from 'marked';

import * as Prism from './../lib/prism';

export class Post extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    const id = `post-content-${this.props.post.id}`;
    const contentElement = document.getElementById(id);
    if (contentElement) Prism.highlightAllUnder(contentElement);
  }

  render() {
    const { post } = this.props;
    const md = marked(post.content);
    return (
      <div className="blog-post">
        <header>
          <h1>
            #{post.id} {post.date} {post.title}
          </h1>
          <div className="spacer" />
          {post.public ? null : <i>(Preview)</i>}
        </header>
        <div
          id={'post-content-' + post.id}
          dangerouslySetInnerHTML={{ __html: md }}
        />
      </div>
    );
  }
}
