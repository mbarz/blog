import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Actions from './../actions';

const EditButton = () => (
  <Link to="/edit">
    <i className="fa fa-edit" />
  </Link>
);

const LoginButton = () => (
  <Link to="/login">
    <i className="fa fa-sign-in-alt" />
  </Link>
);

export class Header extends React.Component {
  componentDidMount() {
    this.props.checkLogin();
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <header>
        <h1>muxes dev blog</h1>
        <div className="spacer" />
        <Link to="/">
          <i className="fa fa-list" />
        </Link>
        {loggedIn ? <EditButton /> : null}
        {!loggedIn ? <LoginButton /> : null}
        {loggedIn ? (
          <a onClick={() => this.logout()} className="logout-button">
            <i className="fa fa-sign-out-alt" />
          </a>
        ) : null}
        <img src="https://travis-ci.org/mbarz/blog.svg?branch=master" />
      </header>
    );
  }

  logout() {
    this.props.logout();
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
