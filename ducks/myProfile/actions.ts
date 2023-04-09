import { MyProfile, MyProfileResponse } from "./types";
import { MYPROFILE, MYPROFILE_SUCCESS, MYPROFILE_FAILURE } from "./constants";

interface MyProfileAction {
  type: typeof MYPROFILE;
  payload: MyProfile;
}

interface MyProfileActionSuccessAction {
  type: typeof MYPROFILE_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: MyProfileResponse;
  };
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
