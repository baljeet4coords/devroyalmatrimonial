import { SignInJsonResponse, SignInType } from "./types";
import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, LOGOUT } from "./constants";

interface SignInAction {
  type: typeof SIGN_IN;
  payload: SignInType;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface SignInSuccessAction {
  type: typeof SIGN_IN_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: SignInJsonResponse | null;
    status: number;
    token: string | null;
  } | null;
}

interface SignInFailureAction {
  type: typeof SIGN_IN_FAILURE;
  error: string;
}

export const signIn = (payload: SignInAction["payload"]): SignInAction => ({
  type: SIGN_IN,
  payload,
});

export const signInSuccess = (
  response: SignInSuccessAction["response"]
): SignInSuccessAction => ({
  type: SIGN_IN_SUCCESS,
  response,
});

export const signInFailure = (
  error: SignInFailureAction["error"]
): SignInFailureAction => ({
  type: SIGN_IN_FAILURE,
  error,
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});

export type SignInActions =
  | SignInAction
  | SignInSuccessAction
  | SignInFailureAction
  | LogoutAction;
