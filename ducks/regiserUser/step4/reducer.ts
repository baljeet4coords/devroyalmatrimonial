import {
  IRegisterStep4Response,
  IRegisterStep5Response,
} from "../../../types/register/userRegister";
import { Step4Actions } from "./actions";
import { STEP_4, STEP_4_SUCCESS, STEP_4_FAILURE } from "./constants";

interface Step4State {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: IRegisterStep4Response;
  } | null;
  error: string | null;
}

const initialState: Step4State = {
  isLoading: false,
  response: null,
  error: null,
};

export default function step1Reducer(
  state = initialState,
  action: Step4Actions
): Step4State {
  switch (action.type) {
    case STEP_4:
      return {
        ...state,
        isLoading: true,
      };
    case STEP_4_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
        error: null,
      };
    case STEP_4_FAILURE:
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
