import { IRegisterStep2Response } from "../../../types/register/userRegister";
import { Step2Actions } from "./actions";
import { STEP_2, STEP_2_SUCCESS, STEP_2_FAILURE } from "./constants";

interface Step4State {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: IRegisterStep2Response;
  } | null;
  error: string | null;
}

const initialState: Step4State = {
  isLoading: false,
  response: null,
  error: null,
};

export default function step2Reducer(
  state = initialState,
  action: Step2Actions
): Step4State {
  switch (action.type) {
    case STEP_2:
      return {
        ...state,
        isLoading: true,
      };
    case STEP_2_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
        error: null,
      };
    case STEP_2_FAILURE:
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
