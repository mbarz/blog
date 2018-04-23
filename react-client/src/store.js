import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import { authReducer, postReducer } from './reducers';

export const history = createHistory();

export const store = createStore(
  combineReducers({
    router: routerReducer,
    auth: authReducer,
    posts: postReducer
  }),
  applyMiddleware(ReduxThunk, routerMiddleware(history))
);

export default store;
