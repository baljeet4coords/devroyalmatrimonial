import { MyProfileResponse } from "./types";
import { MyProfileActions } from "./actions";
import { MYPROFILE, MYPROFILE_SUCCESS, MYPROFILE_FAILURE } from "./constants";

interface myProfileState {
  isLoading: boolean;
  response: {
    step1: {
      output: number;
      message: string;
      jsonResponse: {} | null;
    };
    step2: {
      output: number;
      message: string;
      jsonResponse: {} | null;
    };
    step3: {
      output: number;
      message: string;
      jsonResponse: {} | null;
    };
    step4: {
      output: number;
      message: string;
      jsonResponse: {} | null;
    };
    step5: {
      output: number;
      message: string;
      jsonResponse: {} | null;
    };
  };
  error: string | null;
}

const initialState: myProfileState = {
  isLoading: false,
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
