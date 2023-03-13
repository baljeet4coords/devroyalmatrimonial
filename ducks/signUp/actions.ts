import { SignUpType } from "../../types/authentication";
import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "./constants";

interface SignUpAction {
  type: typeof SIGN_UP;
  payload: SignUpType;
}

interface SignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: {};
  };
}

interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE;
  error: string;
}

export const signUp = (payload: SignUpAction["payload"]): SignUpAction => ({
  type: SIGN_UP,
  payload,
});

export const signUpSuccess = (
  response: SignUpSuccessAction["response"]
): SignUpSuccessAction => ({
  type: SIGN_UP_SUCCESS,
  response,
});

export const signUpFailure = (
  error: SignUpFailureAction["error"]
): SignUpFailureAction => ({
  type: SIGN_UP_FAILURE,
  error,
});

export type SignUpActions =
  | SignUpAction
  | SignUpSuccessAction
  | SignUpFailureAction;
