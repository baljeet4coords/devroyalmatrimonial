import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "./constants";
import {
  LoginFailureAction,
  LoginJsonResponse,
  LoginRequestAction,
  LoginSuccessAction,
  LoginType,
  LogoutFailureAction,
  LogoutRequestAction,
  LogoutSuccessAction,
  SignUpJsonResponse,
  SignUpType,
  SignupFailureAction,
  SignupRequestAction,
  SignupSuccessAction,
} from "./types";

export const loginRequest = (payload: LoginType): LoginRequestAction => ({
  type: LOGIN_REQUEST,
  payload: payload,
});

export const loginSuccess = (user: LoginJsonResponse): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: any): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const signupRequest = (payload: SignUpType): SignupRequestAction => ({
  type: SIGNUP_REQUEST,
  payload: payload,
});

export const signupSuccess = (
  user: SignUpJsonResponse
): SignupSuccessAction => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error: any): SignupFailureAction => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const logoutRequest = (): LogoutRequestAction => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = (): LogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error: any): LogoutFailureAction => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

export type AuthActions =
  | LoginRequestAction
  | LoginFailureAction
  | LoginSuccessAction
  | SignupRequestAction
  | SignupFailureAction
  | SignupSuccessAction
  | LogoutRequestAction
  | LogoutFailureAction
  | LogoutSuccessAction;
