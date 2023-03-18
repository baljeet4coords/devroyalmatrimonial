import { IRegisterStep3Response } from "../../../types/register/userRegister";
import { Step3Actions } from "./actions";
import { STEP_3, STEP_3_SUCCESS, STEP_3_FAILURE } from "./constants";

interface Step3State {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: IRegisterStep3Response;
  } | null;
  error: string | null;
}

const initialState: Step3State = {
  isLoading: false,
  response: null,
  error: null,
};

export default function step1Reducer(
  state = initialState,
  action: Step3Actions
): Step3State {
  switch (action.type) {
    case STEP_3:
      return {
        ...state,
        isLoading: true,
      };
    case STEP_3_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
        error: null,
      };
    case STEP_3_FAILURE:
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
