import {
  IRegisterStep3,
  IRegisterStep3Response,
} from "../../../types/register/userRegister";
import { STEP_3, STEP_3_SUCCESS, STEP_3_FAILURE } from "./constants";

interface Step3Action {
  type: typeof STEP_3;
  payload: IRegisterStep3;
}

interface Step3SuccessAction {
  type: typeof STEP_3_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: IRegisterStep3Response;
  };
}

interface Step3FailureAction {
  type: typeof STEP_3_FAILURE;
  error: string;
}

export const step3 = (payload: Step3Action["payload"]): Step3Action => ({
  type: STEP_3,
  payload,
});

export const step3Success = (
  response: Step3SuccessAction["response"]
): Step3SuccessAction => ({
  type: STEP_3_SUCCESS,
  response,
});

export const step3Failure = (
  error: Step3FailureAction["error"] | any
): Step3FailureAction => ({
  type: STEP_3_FAILURE,
  error,
});

export type Step3Actions =
  | Step3Action
  | Step3SuccessAction
  | Step3FailureAction;
