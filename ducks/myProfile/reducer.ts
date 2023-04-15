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
      jsonResponse: IRegisterStep1Response | null;
    };
    step2: {
      output: number;
      message: string;
      jsonResponse: IRegisterStep2Response | null;
    };
    step3: {
      output: number;
      message: string;
      jsonResponse: IRegisterStep3Response | null;
    };
    step4: {
      output: number;
      message: string;
      jsonResponse: IRegisterStep4Response | null;
    };
    step5: {
      output: number;
      message: string;
      jsonResponse: IRegisterStep5Response | null;
    };
  } | null;
  error: string | null;
}

const initialState: myProfileState = {
  isLoading: true,
  response: {
    step1: {
      output: 0,
      message: "",
      jsonResponse: null,
    },
    step2: {
      output: 0,
      message: "",
      jsonResponse: null,
    },
    step3: {
      output: 0,
      message: "",
      jsonResponse: null,
    },
    step4: {
      output: 0,
      message: "",
      jsonResponse: null,
    },
    step5: {
      output: 0,
      message: "",
      jsonResponse: null,
    },
  },
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
        response: action.response,
        error: null,
        isLoading: false,
      };
    case MYPROFILE_FAILURE:
      return {
        ...state,
        response: null,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
}
