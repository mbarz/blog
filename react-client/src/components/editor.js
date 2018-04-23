import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from './../actions';

class Editor extends React.Component {
  constructor() {
    super();
    this.state = this.initialState();
  }

  initialState() {
    const d = new Date();
    const off = d.getTimezoneOffset() * 60 * 1000;
    d.setTime(d.getTime() - off);
    const date = d.toISOString().substring(0, 10);
    return {
      post: { title: '', date, public: true, content: '', id: undefined }
    };
  }

  componentDidMount() {
    const { loadPosts } = this.props;
    loadPosts();
  }

  onSelection(e) {
    const value = e.target.value;
    const { posts } = this.props;
    if (value === 'new') {
      this.setState(this.initialState());
    } else {
      const post = posts.find(p => p.id === value);
      if (post) {
        this.setState({ post });
      }
    }
  }

  save() {
    const { savePost } = this.props;
    savePost(this.state.post);
  }

  delete() {
    const { deletePost } = this.props;
    deletePost(this.state.post);
  }

  updatePostProperty(name, value) {
    const post = { ...this.state.post };
    post[name] = value;
    this.setState({ post });
  }

  render() {
    const { posts, error } = this.props;
    return (
      <div className="blog-post-editor">
        <header>
          <h1>Create New Post</h1>
          <div className="spacer" />
          <div>
            <select onChange={e => this.onSelection(e)}>
              <option value={'new'}>Create New</option>
              {posts.map(post => (
                <option key={post.id} value={post.id}>
                  {post.id} - {post.title}
                </option>
              ))}
            </select>
          </div>
        </header>
        {error ? <div className="message error-message">{error}</div> : null}
        <div>
          <input
            placeholder="title"
            value={this.state.post.title}
            onChange={e => this.updatePostProperty('title', e.target.value)}
          />
        </div>
        <div>
          <input
            name="date"
            type="text"
            placeholder="date"
            value={this.state.post.date}
            onChange={e => this.updatePostProperty('date', e.target.value)}
          />
        </div>
        <div className="post-editor-content-row">
          <textarea
            id="post-content"
            name="content"
            cols="30"
            rows="10"
            value={this.state.post.content}
            onChange={e => this.updatePostProperty('content', e.target.value)}
          />
        </div>
        <footer>
          <div>public</div>
          <input
            type="checkbox"
            name="public"
            checked={this.state.post.public}
            onChange={e => this.updatePostProperty('public', e.target.checked)}
          />
          <div className="spacer" />
          <button
            disabled={this.state.post.id ? false : true}
            type="button"
            id="delete-button"
            onClick={e => this.delete()}
          >
            Delete
          </button>
          <button
            disabled={this.props.loading}
            type="submit"
            onClick={e => this.save()}
          >
            Ok
          </button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.loggedIn,
  posts: state.posts.posts,
  loading: state.posts.loading,
  error: state.posts.error
});
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
