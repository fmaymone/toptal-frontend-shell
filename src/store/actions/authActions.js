import { authService } from '../../services/toptal-api'
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions'
//SignUp
export const SIGNUP_SUCCESS = '[Trip] SIGNUP_SUCCESS'
export const SIGNUP_ERROR = '[Trip] SIGNUP_ERROR'

//Login
export const LOGIN = '[Trip] LOGIN'
export const LOGIN_SUCCESS = '[Trip] LOGIN_SUCCESS'
export const LOGIN_ERROR = '[Trip] LOGIN_ERROR'
export const LOGOUT = '[Trip] LOGOUT'

export function SignUpSuccess(user, signupResponse, history) {
  return {
    type: SIGNUP_SUCCESS,
    user: user,
    signupResponse,
    history
  }
}

export function SignUpError() {
  return {
    type: SIGNUP_ERROR
  }
}

export function SignUp(name, email, password, password_confirmation, history) {
  return (dispatch, getState) => {
    return authService.signUp(name, email, password, password_confirmation).then(res => {
      if (res) {
        dispatch(SignUpSuccess({ name: name, email: email, password: password }, res, history));
        history.push("/trips");
      } else {
        dispatch(SignUpError());
      }
    });
  }
}

export function LoginSuccess(loginResponse, history) {
  return {
    type: LOGIN_SUCCESS,
    loginResponse,
    history
  }
}

export function LoginError(error) {
  return {
    type: LOGIN_ERROR,
    error: error
  }
}

export function Logout(history) {
  return (dispatch, getState) => {
    authService.logout();
    dispatch({
      type: LOGOUT,
      history
    });
    history.push("/signin");
  }
} 

export function Login(email, password, history) {
  return (dispatch, getState) => {
    dispatch({
      type: LOGIN
    });
    authService.login(email, password).then(res => {
      dispatch(LoginSuccess(res, history));
      history.push("/trips");
    }).catch(err => {
      dispatch(LoginError(err));
      dispatch(setDialogIsOpen('login_error', true))
    });
  }
}
