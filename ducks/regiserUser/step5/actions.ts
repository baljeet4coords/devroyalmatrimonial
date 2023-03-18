import {
  IRegisterStep5,
  IRegisterStep5Response,
} from "../../../types/register/userRegister";
import { STEP_5, STEP_5_SUCCESS, STEP_5_FAILURE } from "./constants";

interface Step5Action {
  type: typeof STEP_5;
  payload: IRegisterStep5;
}

interface Step5SuccessAction {
  type: typeof STEP_5_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: IRegisterStep5Response;
  };
}

interface Step5FailureAction {
  type: typeof STEP_5_FAILURE;
  error: string | any;
}

export const step5 = (payload: Step5Action["payload"]): Step5Action => ({
  type: STEP_5,
  payload,
});

export const step5Success = (
  response: Step5SuccessAction["response"]
): Step5SuccessAction => ({
  type: STEP_5_SUCCESS,
  response,
});

export const step5Failure = (
  error: Step5FailureAction["error"]
): Step5FailureAction => ({
  type: STEP_5_FAILURE,
  error,
});

export type Step5Actions =
  | Step5Action
  | Step5SuccessAction
  | Step5FailureAction;
