import React from 'react';

export const Header = () => (
  <header>
    <h1>muxes dev blog</h1>
    <div className="spacer" />
    <a href="/">
      <i className="fa fa-list" />
    </a>
    <a href="/login">
      <i className="fa fa-lock-open" />
    </a>
    <img src="https://travis-ci.org/mbarz/blog.svg?branch=master" />
  </header>
);
