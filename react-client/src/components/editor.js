import React from 'react';
import { connect } from 'react-redux';

class Editor extends React.Component {
  constructor() {
    super();

    const d = new Date();
    const off = d.getTimezoneOffset() * 60 * 1000;
    d.setTime(d.getTime() - off);
    const date = d.toISOString().substring(0, 10);
    this.state = {
      title: '',
      date,
      public: true
    };
  }

  render() {
    return (
      <div className="blog-post-editor">
        <header>
          <h1>Create New Post</h1>
          <div className="spacer" />
          <div>
            <select />
          </div>
        </header>
        <div>
          <input
            placeholder="title"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </div>
        <div>
          <input
            name="date"
            type="text"
            placeholder="date"
            value={this.state.date}
            onChange={e => this.setState({ date: e.target.value })}
          />
        </div>
        <div className="post-editor-content-row">
          <textarea id="post-content" name="content" cols="30" rows="10" />
        </div>
        <footer>
          <div>public</div>
          <input
            type="checkbox"
            name="public"
            checked={this.state.public}
            onChange={e => this.setState({ public: e.target.checked })}
          />
          <div className="spacer" />
          <button type="button" id="delete-button">
            Delete
          </button>
          <button type="submit">Ok</button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({ isLoggedIn: state.auth.loggedIn });
export default connect(mapStateToProps)(Editor);
