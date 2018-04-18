import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const title = 'My Minimal Webpack Babel Setup';

ReactDOM.render(
  <div id="main">
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
    <div className="posts" />
    <div className="load-more-button">Mehr laden</div>
  </div>,
  document.getElementById('app')
);

module.hot.accept();
