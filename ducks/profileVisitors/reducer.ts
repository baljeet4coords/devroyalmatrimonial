import { IProfileVisitorsResponse } from "../../types/ProfileVisitor/profileVisitors";
import { profileVisitorActions } from "./actions";
import {
  PROFILEVISITORS,
  PROFILEVISITORS_SUCCESS,
  PROFILEVISITORS_FAILURE,
} from "./constants";

interface profileVisitorState {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: IProfileVisitorsResponse[] | null;
    status: number;
  } | null;
  error: string | null;
}

const initialState: profileVisitorState = {
  isLoading: true,
  response: {
    output: 0,
    message: "",
    jsonResponse: null,
    status: 0,
  },
  error: null,
};

export default function profileVisitorReducer(
  state = initialState,
  action: profileVisitorActions
): profileVisitorState {
  switch (action.type) {
    case PROFILEVISITORS:
      return {
        ...state,
        isLoading: true,
      };
    case PROFILEVISITORS_SUCCESS:
      return {
        ...state,
        response: action.response,
        error: null,
        isLoading: false,
      };
    case PROFILEVISITORS_FAILURE:
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
