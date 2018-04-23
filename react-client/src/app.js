import React from 'react';
import { Provider } from 'react-redux';

import { Route, Switch } from 'react-router';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';

import Header from './layout/header';
import Editor from './editor/editor';
import Login from './auth/login';
import NotFound from './not-found/not-found';
import requireAuth from './auth/auth';
import PostList from './posts/post-list';

import store from './store';
import { history } from './store';

export const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div id="main">
        <Header />
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/login" component={Login} />
          <Route path="/edit" component={Editor} />
          <Route component={requireAuth(Editor)} path="/e" />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
);
