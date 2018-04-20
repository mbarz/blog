import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './../actions';

export class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.login();
  }

  login() {
    this.props.login(this.state.username, this.state.password);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { loginError } = this.props.auth;
    return (
      <div>
        <form className="login-form" onSubmit={e => this.onSubmit(e)}>
          <input
            type="text"
            name="username"
            placeholder="name"
            required
            onChange={e => this.handleUsernameChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={e => this.handlePasswordChange(e)}
          />
          <button type="submit">Login</button>

          {loginError ? (
            <div className="message error-message">{loginError}</div>
          ) : null}
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login: Actions.login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
