import { IRegisterStep1 } from "../../../types/register/userRegister";
import { STEP_1, STEP_1_SUCCESS, STEP_1_FAILURE } from "./constants";

interface Step1Action {
  type: typeof STEP_1;
  payload: IRegisterStep1;
}

interface Step1SuccessAction {
  type: typeof STEP_1_SUCCESS;
  response: {
    message: string;
  };
}

interface Step1FailureAction {
  type: typeof STEP_1_FAILURE;
  error: string;
}

export const signUp = (payload: Step1Action["payload"]): Step1Action => ({
  type: STEP_1,
  payload,
});

export const signUpSuccess = (
  response: Step1SuccessAction["response"]
): Step1SuccessAction => ({
  type: STEP_1_SUCCESS,
  response,
});

export const signUpFailure = (
  error: Step1FailureAction["error"]
): Step1FailureAction => ({
  type: STEP_1_FAILURE,
  error,
});

export type Step1Actions =
  | Step1Action
  | Step1SuccessAction
  | Step1FailureAction;
