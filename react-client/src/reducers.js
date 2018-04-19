import { RECEIVE_LOGIN_STATE } from './actions';

export function authReducer(state = false, action) {
  switch (action.type) {
    case RECEIVE_LOGIN_STATE:
      return action.loggedIn;
    default:
      return state;
  }
}
