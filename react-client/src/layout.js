import React from 'react';
import { Header } from './header';

export const Layout = () => (
  <div id="main">
    <Header />
    <div className="posts" />
    <div className="load-more-button">Mehr laden</div>
  </div>
);
