import { ICardViewResponseInterest } from "../../types/short-Block-Interest";
import { showInterestActions } from "./actions";
import { SHOWINTEREST, SHOWINTEREST_SUCCESS, SHOWINTEREST_FAILURE } from "./constants";

interface showInterestState {
  isLoading: boolean;
  response: {
    sentInterestCard: {
      output: number;
      message: string;
      jsonResponse: ICardViewResponseInterest[] | null;
      status: number;
    };
    reciveInterestCard: {
      output: number;
      message: string;
      jsonResponse: ICardViewResponseInterest[] | null;
      status: number;
    };
  } | null;
  error: string | null;
}

const initialState: showInterestState = {
  isLoading: true,
  response: {
    sentInterestCard: {
      output: 0,
      message: "",
      jsonResponse: null,
      status: 0,
    },
    reciveInterestCard: {
      output: 0,
      message: "",
      jsonResponse: null,
      status: 0,
    },
  },
  error: null,
};

export default function showInterestReducer(
  state = initialState,
  action: showInterestActions
): showInterestState {
  switch (action.type) {
    case SHOWINTEREST:
      return {
        ...state,
        isLoading: true,
      };
    case SHOWINTEREST_SUCCESS:
      return {
        ...state,
        response: action.response,
        error: null,
        isLoading: false,
      };
    case SHOWINTEREST_FAILURE:
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
