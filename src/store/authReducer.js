import * as AuthActions from '../store/actions/authActions'

export function AuthReducer(state = [], action) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS: {
      action.history.push("/trips");
      return {
          ...state,
          isAuthorised: true,
          loginResponse: action.loginResponse.data,
          loginError: false
      };
    }

    case AuthActions.LOGIN_ERROR: {
        return {
          isAuthorised: false,
          error: action.error,
          loginError: true
        }
    }

    case AuthActions.LOGOUT: {
      action.history.push("/signin");
      return {
        ...state,
        isAuthorised: false,
        loginError: false
      }
  }

    case AuthActions.SIGNUP_SUCCESS: {
      action.history.push("/trips");
        return {
            ...state, 
            user: action.user,
            isAuthorised: true,
            loginResponse: action.signupResponse.data,
            loginError: false
        };
    }
    default: {
      return state;
    }
  }
}