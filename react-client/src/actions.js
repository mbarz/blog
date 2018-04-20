import { push } from 'react-router-redux';

export const RECEIVE_LOGIN_STATE = 'RECEIVE_LOGIN_STATE';
export const SEND_LOGIN = 'SEND_LOGIN';
export const RECEIVE_LOGIN_RESPONSE = 'RECEIVE_LOGIN_RESPONSE';

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
      .then(data => dispatch(receiveLoginState(false)));
  };
}
