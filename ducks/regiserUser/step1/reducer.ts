import { IRegisterStep1Response } from "../../../types/register/userRegister";
import { Step1Actions } from "./actions";
import { STEP_1, STEP_1_SUCCESS, STEP_1_FAILURE } from "./constants";

interface Step1State {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: IRegisterStep1Response;
  } | null;
  error: string | null;
}

const initialState: Step1State = {
  isLoading: false,
  response: null,
  error: null,
};

export default function step1Reducer(
  state = initialState,
  action: Step1Actions
): Step1State {
  switch (action.type) {
    case STEP_1:
      return {
        ...state,
        isLoading: true,
      };
    case STEP_1_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
        error: null,
      };
    case STEP_1_FAILURE:
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
