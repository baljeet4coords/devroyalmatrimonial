import { SignUpActions } from "./actions";
import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "./constants";

interface SignUpState {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: {} | null;
    status: number;
    token: string;
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
  action: SignUpActions
): SignUpState {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
        error: null,
      };
    case SIGN_UP_FAILURE:
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
