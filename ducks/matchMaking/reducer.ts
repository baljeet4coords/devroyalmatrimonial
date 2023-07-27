import { ICardResponse } from "../../types/cardResponse/cardResponse";
import { MatchMakingActions } from "./actions";
import {
  MATCHMAKING,
  MATCHMAKING_FAILURE,
  MATCHMAKING_SUCCESS,
} from "./constants";

interface matchMakingState {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: ICardResponse[] | null;
  } | null;
  error: string | null;
}

const initialState: matchMakingState = {
  isLoading: true,
  response: {
    output: 0,
    message: "",
    jsonResponse: null,
  },
  error: null,
};

export default function myprofileReducer(
  state = initialState,
  action: MatchMakingActions
): matchMakingState {
  switch (action.type) {
    case MATCHMAKING:
      return {
        ...state,
        isLoading: true,
      };
    case MATCHMAKING_SUCCESS:
      return {
        ...state,
        response: action.response || null,
        error: null,
        isLoading: false,
      };
    case MATCHMAKING_FAILURE:
      return {
        ...state,
        response: null,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
}
