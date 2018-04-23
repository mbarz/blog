import {
  RECEIVE_LOGIN_STATE,
  SEND_LOGIN,
  RECEIVE_LOGIN_RESPONSE,
  LOAD_POSTS,
  RECEIVE_POST,
  RECEIVE_POSTS
} from './actions';
import { merge } from 'rxjs/operator/merge';

export function authReducer(state = { loggedIn: false }, action) {
  switch (action.type) {
    case RECEIVE_LOGIN_STATE:
      return { loggedIn: action.loggedIn };
    case SEND_LOGIN:
      return { loginError: null };
    case RECEIVE_LOGIN_RESPONSE:
      return { loggedIn: action.loggedIn, loginError: action.error };
    default:
      return state;
  }
}

export function postReducer(state = { posts: [], loading: false }, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return { loading: true, posts: action.clean ? [] : state.posts };
    case RECEIVE_POSTS:
      return { loading: false, posts: mergePosts(state.posts, action.posts) };
    case RECEIVE_POST:
      return { loading: false, posts: mergePosts(state.posts, [action.post]) };
    default:
      return state;
  }
}

function mergePosts(current, updated) {
  const result = [...current];
  for (const post of updated) replaceOrAdd(result, post);
  return result;
}

function replaceOrAdd(posts, post) {
  const index = posts.findIndex(item => item.id === post.id);
  if (index >= 0) posts.splice(index, 1, post);
  else posts.push(post);
}
