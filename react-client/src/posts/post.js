import React from 'react';
import marked from 'marked';

export class Post extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { post } = this.props;
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
          dangerouslySetInnerHTML={{ __html: marked(this.props.post.content) }}
        />
      </div>
    );
  }
}
