import { ISearchByDataResponse } from "../../types/searchMatchmaking/searchMatchMaking";
import { SearchbyDataActions } from "./actions";
import {
  SEARCHBYDATA,
  SEARCHBYDATA_FAILURE,
  SEARCHBYDATA_SUCCESS,
} from "./constants";

interface searchByDataState {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: ISearchByDataResponse[] | null;
  } | null;
  error: string | null;
}

const initialState: searchByDataState = {
  isLoading: true,
  response: {
    output: 0,
    message: "",
    jsonResponse: null,
  },
  error: null,
};

export default function searchByDataReducer(
  state = initialState,
  action: SearchbyDataActions
): searchByDataState {
  switch (action.type) {
    case SEARCHBYDATA:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCHBYDATA_SUCCESS:
      return {
        ...state,
        response: action.response || null,
        error: null,
        isLoading: false,
      };
    case SEARCHBYDATA_FAILURE:
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
