import {
  IRegisterStep1Response,
  IRegisterStep2Response,
  IRegisterStep3Response,
  IRegisterStep4Response,
  IRegisterStep5Response,
} from "../../types/register/userRegister";
import { MyProfileActions } from "./actions";
import { MYPROFILE, MYPROFILE_SUCCESS, MYPROFILE_FAILURE } from "./constants";

interface myProfileState {
  isLoading: boolean;
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
  error: string | null;
}

const initialState: myProfileState = {
  isLoading: false,
  response: null,
  error: null,
};

export default function myprofileReducer(
  state = initialState,
  action: MyProfileActions
): myProfileState {
  switch (action.type) {
    case MYPROFILE:
      return {
        ...state,
        isLoading: true,
      };
    case MYPROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
        error: null,
      };
    case MYPROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        response: null,
        error: action.error,
      };
    default:
      return state;
  }
}
