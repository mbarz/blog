export const RECEIVE_LOGIN_STATE = 'RECEIVE_LOGIN_STATE';

export function receiveLoginState(loggedIn) {
  return {
    type: RECEIVE_LOGIN_STATE,
    loggedIn
  };
}

export function checkLogin() {
  return function(dispatch) {
    return fetch('api/loggedin', { credentials: 'same-origin' })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data;
      })
      .then(data => dispatch(receiveLoginState(data.isAuthenticated)));
  };
}

export function logout() {
  return function(dispatch) {
    return fetch('api/logout', { credentials: 'same-origin' })
      .then(response => response.json())
      .then(data => dispatch(receiveLoginState(false)));
  };
}
