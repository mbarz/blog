import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Post } from './post';
import * as Prism from './../lib/prism';
import * as Actions from './../actions';

class PostList extends React.Component {
  constructor(props) {
    super();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  componentDidMount() {
    const { loadPosts, posts } = this.props;
    if (posts.length > 0) Prism.highlightAll();
    else loadPosts({ start: 0, limit: 5 });
  }

  loadNextPosts(n = 5) {
    const { loadPosts, posts } = this.props;
    loadPosts({ start: posts.length, limit: n });
  }

  render() {
    const { posts, error } = this.props;
    return (
      <div className="posts">
        {error ? <div className="message error-message">{error}</div> : null}
        {posts.map(post => <Post post={post} key={post.id} />)}
        <div className="load-more-button" onClick={() => this.loadNextPosts()}>
          Mehr laden
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.posts,
    error: state.posts.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
