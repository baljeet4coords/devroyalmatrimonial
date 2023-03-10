import { Step1Actions } from "./actions";
import { STEP_1, STEP_1_SUCCESS, STEP_1_FAILURE } from "./constants";

interface SignUpState {
  isLoading: boolean;
  response: {
    message: string;
  } | null;
  error: string | null;
}

const initialState: SignUpState = {
  isLoading: false,
  response: null,
  error: null,
};

export default function signUpReducer(
  state = initialState,
  action: Step1Actions
): SignUpState {
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
