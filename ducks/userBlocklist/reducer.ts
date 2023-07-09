import { ICardViewResponse } from "../../types/short-Block-Interest";
import { blockListActions } from "./actions";
import { BLOCKLIST, BLOCKLIST_SUCCESS, BLOCKLIST_FAILURE } from "./constants";

interface blockListState {
  isLoading: boolean;
  response: {
    blocklistCard: {
      output: number;
      message: string;
      jsonResponse: ICardViewResponse[] | null;
      status: number;
    };
    blocklistedID: {
      output: number;
      message: string;
      jsonResponse: number[];
      status: number;
    };
  } | null;
  error: string | null;
}

const initialState: blockListState = {
  isLoading: true,
  response: {
    blocklistCard: {
      output: 0,
      message: "",
      jsonResponse: null,
      status: 0,
    },
    blocklistedID: {
      output: 0,
      message: "",
      jsonResponse: [],
      status: 0,
    },
  },
  error: null,
};

export default function blockListReducer(
  state = initialState,
  action: blockListActions
): blockListState {
  switch (action.type) {
    case BLOCKLIST:
      return {
        ...state,
        isLoading: true,
      };
    case BLOCKLIST_SUCCESS:
      return {
        ...state,
        response: action.response,
        error: null,
        isLoading: false,
      };
    case BLOCKLIST_FAILURE:
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
