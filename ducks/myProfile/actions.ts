import { MYPROFILE, MYPROFILE_SUCCESS, MYPROFILE_FAILURE } from "./constants";
import {
  IRegisterStep1Response,
  IRegisterStep2Response,
  IRegisterStep3Response,
  IRegisterStep4Response,
  IRegisterStep5Response,
} from "../../types/register/userRegister";

interface MyProfileAction {
  type: typeof MYPROFILE;
  payload: {
    actionType: "v";
    userId?: number;
  };
}

interface MyProfileActionSuccessAction {
  type: typeof MYPROFILE_SUCCESS;
  response: {
    step1: {
      output: number;
      message: string;
      jsonResponse: IRegisterStep1Response;
    };
    step2: {
      output: number;
      message: string;
      jsonResponse: IRegisterStep2Response;
    };
    step3: {
      output: number;
      message: string;
      jsonResponse: IRegisterStep3Response;
    };
    step4: {
      output: number;
      message: string;
      jsonResponse: IRegisterStep4Response;
    };
    step5: {
      output: number;
      message: string;
      jsonResponse: IRegisterStep5Response;
    };
  } | null;
}

interface MyProfileActionFailureAction {
  type: typeof MYPROFILE_FAILURE;
  error: string | any;
}

export const myProfileReq = (
  payload: MyProfileAction["payload"]
): MyProfileAction => ({
  type: MYPROFILE,
  payload,
});

export const myProfileSuccess = (
  response: MyProfileActionSuccessAction["response"]
): MyProfileActionSuccessAction => ({
  type: MYPROFILE_SUCCESS,
  response,
});

export const myProfileFailure = (
  error: MyProfileActionFailureAction["error"]
): MyProfileActionFailureAction => ({
  type: MYPROFILE_FAILURE,
  error,
});

export type MyProfileActions =
  | MyProfileAction
  | MyProfileActionSuccessAction
  | MyProfileActionFailureAction;
