import {
  IRegisterStep1,
  IRegisterStep1Response,
} from "../../../types/register/userRegister";
import { STEP_1, STEP_1_SUCCESS, STEP_1_FAILURE } from "./constants";

interface Step1Action {
  type: typeof STEP_1;
  payload: IRegisterStep1;
}

interface Step1SuccessAction {
  type: typeof STEP_1_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: IRegisterStep1Response;
  };
}

interface Step1FailureAction {
  type: typeof STEP_1_FAILURE;
  error: string;
}

export const step1 = (payload: Step1Action["payload"]): Step1Action => ({
  type: STEP_1,
  payload,
});

export const step1Success = (
  response: Step1SuccessAction["response"]
): Step1SuccessAction => ({
  type: STEP_1_SUCCESS,
  response,
});

export const step1Failure = (
  error: Step1FailureAction["error"]
): Step1FailureAction => ({
  type: STEP_1_FAILURE,
  error,
});

export type Step1Actions =
  | Step1Action
  | Step1SuccessAction
  | Step1FailureAction;
