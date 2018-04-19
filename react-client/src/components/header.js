import React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>muxes dev blog</h1>
        <div className="spacer" />
        <Link to="/">
          <i className="fa fa-list" />
        </Link>
        <Link to="/edit">
          <i className="fa fa-edit" />
        </Link>
        <Link to="/login">
          <i className="fa fa-sign-in-alt" />
        </Link>
        <a>
          <i className="fa fa-sign-out-alt" />
        </a>
        <img src="https://travis-ci.org/mbarz/blog.svg?branch=master" />
      </header>
    );
  }
}
