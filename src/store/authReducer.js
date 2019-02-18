import * as AuthActions from '../store/actions/authActions'
//import { isAuthorised } from '../utils/auth';

export function AuthReducer(state = [], action) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS: {
      action.history.push("/trips");
      return {
          ...state,
          isAuthorised: true,
          loginResponse: action.loginResponse
      };
    }

    case AuthActions.LOGIN_ERROR: {
        return {
          isAuthorosed: false,
          error: action.error
        }
    }

    case AuthActions.SIGNUP_SUCCESS: {
        return { 
            ...state, 
            user: action.user
        };
    }
    default: {
      return state;
    }
  }
}