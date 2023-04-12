import { MyProfileResponse } from "./types";
import { MyProfileActions } from "./actions";
import { MYPROFILE, MYPROFILE_SUCCESS, MYPROFILE_FAILURE } from "./constants";

interface myProfileState {
  isLoading: boolean;
  response: {
    step1: {
      output: number;
      message: string;
      jsonResponse: MyProfileResponse;
    };
    step2: {
      output: number;
      message: string;
      jsonResponse: MyProfileResponse;
    };
    step3: {
      output: number;
      message: string;
      jsonResponse: MyProfileResponse;
    };
    step4: {
      output: number;
      message: string;
      jsonResponse: MyProfileResponse;
    };
    step5: {
      output: number;
      message: string;
      jsonResponse: MyProfileResponse;
    };
  };
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
