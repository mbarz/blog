import { push } from 'react-router-redux';

export const RECEIVE_LOGIN_STATE = 'RECEIVE_LOGIN_STATE';
export const SEND_LOGIN = 'SEND_LOGIN';
export const RECEIVE_LOGIN_RESPONSE = 'RECEIVE_LOGIN_RESPONSE';

export const LOAD_POSTS = 'LOAD_POSTS';
export const DELETE_POST = 'LOAD_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SAVE_POST = 'SAVE_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_DELETION = 'RECEIVE_POST_DELETION';
export const RECEIVE_ERROR = 'RECEIVE_ERROR';

import store from './store';
import config from './config';

const credentials = 'include';

function throwIfNotOk(response) {
  if (!response.ok) throw Error(`${response.status} - ${response.statusText}`);
  return response;
}

export function receiveLoginState(loggedIn) {
  return {
    type: RECEIVE_LOGIN_STATE,
    loggedIn
  };
}

export function startLogin() {
  return {
    type: SEND_LOGIN
  };
}

export function receiveLoginResponse(error) {
  return {
    type: RECEIVE_LOGIN_RESPONSE,
    loggedIn: error ? false : true,
    error
  };
}

export function checkLogin() {
  return function(dispatch) {
    return fetch(`${config.api}/loggedin`, {
      credentials: credentials
    })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .then(data => dispatch(receiveLoginState(data.isAuthenticated)));
  };
}

export function login(username, password) {
  return function(dispatch) {
    dispatch(startLogin());
    return fetch(`${config.api}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: credentials
    }).then(response => {
      console.log(response);
      if (response.ok) {
        dispatch(receiveLoginResponse());
        dispatch(push('/edit'));
      } else {
        dispatch(receiveLoginResponse(response.statusText));
      }
    });
  };
}

function startSave() {
  return {
    type: SAVE_POST
  };
}

export function logout() {
  return function(dispatch) {
    return fetch(`${config.api}logout`, { credentials: credentials })
      .then(response => response.json())
      .then(data => {
        dispatch(receiveLoginState(false));
        dispatch(push('/'));
      });
  };
}

export function loadPosts({ start, limit } = {}) {
  return function(dispatch) {
    dispatch(() => ({
      type: LOAD_POSTS,
      clean: !start
    }));

    let url = `${config.api}/posts`;
    const params = [];
    if (limit) params.push('limit=' + limit);
    if (start) params.push('start=' + start);
    if (params.length) url += '?' + params.join('&');

    return fetch(url, {
      credentials: credentials
    })
      .then(throwIfNotOk)
      .then(response => response.json())
      .then(data => dispatch(receivePosts(data)))
      .catch(error => dispatch(receiveError(error)));
  };
}
export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts
  };
}
export function receiveError(error) {
  return {
    type: RECEIVE_ERROR,
    error: error
  };
}

function receivePostDeletion(post) {
  return {
    type: RECEIVE_POST_DELETION,
    post: post
  };
}

function startPostDelete() {
  return {
    type: DELETE_POST
  };
}
export function savePost(post) {
  if (post.id) return updatePost(post);
  else return createPost(post);
}
export function createPost(post) {
  return function(dispatch) {
    dispatch(startSave());

    let url = `${config.api}/posts`;

    return fetch(url, {
      method: 'POST',
      credentials: credentials,
      body: JSON.stringify(post),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(throwIfNotOk)
      .then(response => response.json())
      .then(data => dispatch(receivePost(data)))
      .catch(error => dispatch(receiveError(error)));
  };
}
export function updatePost(post) {
  return function(dispatch) {
    dispatch(startSave());

    let url = `${config.api}/posts/${post.id}`;

    return fetch(url, {
      method: 'PUT',
      credentials: credentials,
      body: JSON.stringify(post),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(throwIfNotOk)
      .then(response => response.json())
      .then(post => dispatch(receivePost(post)))
      .catch(error => dispatch(receiveError(error)));
  };
}

export function deletePost(post) {
  return function(dispatch) {
    dispatch(startPostDelete());
    let url = `${config.api}/posts/${post.id}`;
    return fetch(url, {
      method: 'DELETE',
      credentials: credentials
    })
      .then(throwIfNotOk)
      .then(response => response.json())
      .then(() => dispatch(receivePostDeletion(post)))
      .catch(error => dispatch(receiveError(error)));
  };
}

export function receivePost(post) {
  return {
    type: RECEIVE_POST,
    post
  };
}
