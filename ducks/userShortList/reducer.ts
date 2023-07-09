import { ICardViewResponse } from "../../types/short-Block-Interest";
import { shortListActions } from "./actions";
import { SHORTLIST, SHORTLIST_SUCCESS, SHORTLIST_FAILURE } from "./constants";

interface shortListState {
  isLoading: boolean;
  response: {
    shortlistCard: {
      output: number;
      message: string;
      jsonResponse: ICardViewResponse[] | null;
      status: number;
    };
    shotlistedID: {
      output: number;
      message: string;
      jsonResponse: number[];
      status: number;
    };
  } | null;
  error: string | null;
}

const initialState: shortListState = {
  isLoading: true,
  response: {
    shortlistCard: {
      output: 0,
      message: "",
      jsonResponse: null,
      status: 0,
    },
    shotlistedID: {
      output: 0,
      message: "",
      jsonResponse: [],
      status: 0,
    },
  },
  error: null,
};

export default function shortListReducer(
  state = initialState,
  action: shortListActions
): shortListState {
  switch (action.type) {
    case SHORTLIST:
      return {
        ...state,
        isLoading: true,
      };
    case SHORTLIST_SUCCESS:
      return {
        ...state,
        response: action.response,
        error: null,
        isLoading: false,
      };
    case SHORTLIST_FAILURE:
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
