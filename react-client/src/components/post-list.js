import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Post } from './post';

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
    const { posts } = this.props;
    return (
      <div className="posts">
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
    posts: state.posts.posts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
