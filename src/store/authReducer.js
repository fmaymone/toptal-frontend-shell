import * as AuthActions from '../store/actions/authActions'

export function AuthReducer(state = [], action) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS: {
      action.history.push("/users");
      return {
          ...state,
          loginResponse: action.loginResponse
      };
    }

    case AuthActions.LOGIN_ERROR: {
        return action.error;
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