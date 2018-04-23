import { push } from 'react-router-redux';

export const RECEIVE_LOGIN_STATE = 'RECEIVE_LOGIN_STATE';
export const SEND_LOGIN = 'SEND_LOGIN';
export const RECEIVE_LOGIN_RESPONSE = 'RECEIVE_LOGIN_RESPONSE';

export const LOAD_POSTS = 'LOAD_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SAVE_POST = 'SAVE_POST';
export const RECEIVE_POST = 'RECEIVE_POST';

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
    return fetch('api/loggedin', { credentials: 'same-origin' })
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
    return fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'same-origin'
    }).then(response => {
      console.log(response);
      if (response.ok) {
        dispatch(receiveLoginResponse());
        dispatch(push('/'));
      } else {
        dispatch(receiveLoginResponse(response.statusText));
      }
    });
  };
}

export function logout() {
  return function(dispatch) {
    return fetch('api/logout', { credentials: 'same-origin' })
      .then(response => response.json())
      .then(data => {
        dispatch(receiveLoginState(false));
        dispatch(push('/'));
      });
  };
}

export function loadPosts({ start, limit }) {
  return function(dispatch) {
    dispatch(() => ({
      type: LOAD_POSTS,
      clean: !start
    }));

    let url = 'api/posts';
    const params = [];
    if (limit) params.push('limit=' + limit);
    if (start) params.push('start=' + start);
    if (params.length) url += '?' + params.join('&');

    return fetch(url, {
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(data => dispatch(receivePosts(data)));
  };
}
export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts
  };
}
export function savePost(post) {
  if (post.id) return updatePost(post);
  else return createPost(post);
}
export function createPost(post) {
  return function(dispatch) {
    dispatch(() => ({
      type: SAVE_POST
    }));

    let url = 'api/posts';

    return fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(post),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(response => response.json())
      .then(post => dispatch(receivePost(post)));
  };
}
export function updatePost(post) {
  return function(dispatch) {
    dispatch(() => ({
      type: SAVE_POST
    }));

    let url = `api/posts/${post.id}`;

    return fetch(url, {
      method: 'PUT',
      credentials: 'same-origin',
      body: JSON.stringify(post),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(response => response.json())
      .then(post => dispatch(receivePost(post)));
  };
}

export function receivePost() {
  return {
    type: RECEIVE_POST,
    post: post
  };
}
