import { IRegisterStep5Response } from "../../../types/register/userRegister";
import { Step5Actions } from "./actions";
import { STEP_5, STEP_5_SUCCESS, STEP_5_FAILURE } from "./constants";

interface Step5State {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: IRegisterStep5Response;
  } | null;
  error: string | null;
}

const initialState: Step5State = {
  isLoading: false,
  response: null,
  error: null,
};

export default function step1Reducer(
  state = initialState,
  action: Step5Actions
): Step5State {
  switch (action.type) {
    case STEP_5:
      return {
        ...state,
        isLoading: true,
      };
    case STEP_5_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
        error: null,
      };
    case STEP_5_FAILURE:
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
