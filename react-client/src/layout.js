import React from 'react';
import { Header } from './header';
import { PostList } from './post-list';

export const Layout = () => (
  <div id="main">
    <Header />
    <PostList />
  </div>
);
