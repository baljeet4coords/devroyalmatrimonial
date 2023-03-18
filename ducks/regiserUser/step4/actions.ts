import {
  IRegisterStep4,
  IRegisterStep4Response,
} from "../../../types/register/userRegister";
import { STEP_4, STEP_4_SUCCESS, STEP_4_FAILURE } from "./constants";

interface Step4Action {
  type: typeof STEP_4;
  payload: IRegisterStep4;
}

interface Step4SuccessAction {
  type: typeof STEP_4_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: IRegisterStep4Response;
  };
}

interface Step4FailureAction {
  type: typeof STEP_4_FAILURE;
  error: string | any;
}

export const step4 = (payload: Step4Action["payload"]): Step4Action => ({
  type: STEP_4,
  payload,
});

export const step4Success = (
  response: Step4SuccessAction["response"]
): Step4SuccessAction => ({
  type: STEP_4_SUCCESS,
  response,
});

export const step4Failure = (
  error: Step4FailureAction["error"]
): Step4FailureAction => ({
  type: STEP_4_FAILURE,
  error,
});

export type Step4Actions =
  | Step4Action
  | Step4SuccessAction
  | Step4FailureAction;
