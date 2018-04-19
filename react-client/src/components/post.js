import React from 'react';
import marked from 'marked';
import * as Prism from './../lib/prism';

export class Post extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="blog-post">
        <header>
          <h1>
            #{this.props.post.id} {this.props.post.date} {this.props.post.title}
          </h1>
        </header>
        <div
          dangerouslySetInnerHTML={{ __html: marked(this.props.post.content) }}
        />
      </div>
    );
  }
}
