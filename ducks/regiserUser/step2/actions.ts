import {
  IRegisterStep2,
  IRegisterStep2Response,
} from "../../../types/register/userRegister";
import { STEP_2, STEP_2_SUCCESS, STEP_2_FAILURE } from "./constants";

interface Step2Action {
  type: typeof STEP_2;
  payload: IRegisterStep2;
}

interface Step2SuccessAction {
  type: typeof STEP_2_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: IRegisterStep2Response;
  };
}

interface Step2FailureAction {
  type: typeof STEP_2_FAILURE;
  error: string;
}

export const step2 = (payload: Step2Action["payload"]): Step2Action => ({
  type: STEP_2,
  payload,
});

export const step2Success = (
  response: Step2SuccessAction["response"]
): Step2SuccessAction => ({
  type: STEP_2_SUCCESS,
  response,
});

export const step2Failure = (
  error: Step2FailureAction["error"] | any
): Step2FailureAction => ({
  type: STEP_2_FAILURE,
  error,
});

export type Step2Actions =
  | Step2Action
  | Step2SuccessAction
  | Step2FailureAction;
