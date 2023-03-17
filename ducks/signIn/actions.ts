import { SignInType } from "../../types/authentication";
import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "./constants";

interface SignInAction {
  type: typeof SIGN_IN;
  payload: SignInType;
}

interface SignInSuccessAction {
  type: typeof SIGN_IN_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: {};
  };
}

interface SignInFailureAction {
  type: typeof SIGN_IN_FAILURE;
  error: string;
}

export const signUp = (payload: SignInAction["payload"]): SignInAction => ({
  type: SIGN_IN,
  payload,
});

export const signUpSuccess = (
  response: SignInSuccessAction["response"]
): SignInSuccessAction => ({
  type: SIGN_IN_SUCCESS,
  response,
});

export const signUpFailure = (
  error: SignInFailureAction["error"]
): SignInFailureAction => ({
  type: SIGN_IN_FAILURE,
  error,
});

export type SignInActions =
  | SignInAction
  | SignInSuccessAction
  | SignInFailureAction;
