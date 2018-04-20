import {
  RECEIVE_LOGIN_STATE,
  SEND_LOGIN,
  RECEIVE_LOGIN_RESPONSE
} from './actions';

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
