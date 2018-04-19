import React from 'react';

// Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

// Router
import createHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux';

import { Header } from './components/header';
import { PostList } from './components/post-list';
import { Editor } from './components/editor';
import { Login } from './components/login';
import { NotFound } from './components/not-found';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({ router: routerReducer }),
  applyMiddleware(middleware)
);

export const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div id="main">
        <Header />
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/login" component={Login} />
          <Route path="/edit" component={Editor} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
);
