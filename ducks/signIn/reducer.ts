import { SignInActions } from "./actions";
import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "./constants";
import { SignInJsonResponse } from "./types";

interface SignInState {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: SignInJsonResponse | null;
    status: number;
    token: string | null;
  } | null;
  error: string | null;
}

const initialState: SignInState = {
  isLoading: false,
  response: null,
  error: null,
};

export default function signUpReducer(
  state = initialState,
  action: SignInActions
): SignInState {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
        error: null,
      };
    case SIGN_IN_FAILURE:
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
