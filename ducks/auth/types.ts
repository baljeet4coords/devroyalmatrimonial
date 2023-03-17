import { RMUser } from "./RMUser";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./constants";

export interface LoginType {
  from: string;
  emailId?: string;
  password: string;
  mobile?: string;
  isdCode?: string;
}
export interface AuthState {
  isLoading: boolean;
  response: LoginJsonResponse | SignUpJsonResponse | null;
  error: null;
}
export interface LoginJsonResponse {
  output: number;
  message: string;
  status: number;
  token: string;
  jsonResponse: RMUser | null;
}

export interface SignUpType {
  emailid: string;
  mobile: string;
  password: string;
}

export interface SignUpJsonResponse {
  output: number;
  message: string;
  status: number;
  token: string;
  jsonResponse: RMUser | null;
}

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: LoginType;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginJsonResponse;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

export interface SignupRequestAction {
  type: typeof SIGNUP_REQUEST;
  payload: SignUpType;
}

export interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS;
  payload: SignUpJsonResponse;
}

export interface SignupFailureAction {
  type: typeof SIGNUP_FAILURE;
  payload: string;
}

export interface LogoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export interface LogoutFailureAction {
  type: typeof LOGOUT_FAILURE;
  payload: string;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | SignupRequestAction
  | SignupSuccessAction
  | SignupFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction;
