import {
  ISearchByDataPayload,
  ISearchByDataResponse,
} from "../../types/searchMatchmaking/searchMatchMaking";
import {
  SEARCHBYDATA,
  SEARCHBYDATA_SUCCESS,
  SEARCHBYDATA_FAILURE,
} from "./constants";

interface SearchbyDataAction {
  type: typeof SEARCHBYDATA;
  payload: ISearchByDataPayload;
}

interface SearchbyDataActionSuccessAction {
  type: typeof SEARCHBYDATA_SUCCESS;
  response: {
    output: number;
    message: string;
    status: number;
    jsonResponse: ISearchByDataResponse[];
  } | null;
}

interface SearchbyDataActionFailureAction {
  type: typeof SEARCHBYDATA_FAILURE;
  error: string | any;
}

export const searchByDataReq = (
  payload: SearchbyDataAction["payload"]
): SearchbyDataAction => ({
  type: SEARCHBYDATA,
  payload,
});

export const searchByDataSuccess = (
  response: SearchbyDataActionSuccessAction["response"]
): SearchbyDataActionSuccessAction => ({
  type: SEARCHBYDATA_SUCCESS,
  response,
});

export const searchByDataFailure = (
  error: SearchbyDataActionFailureAction["error"]
): SearchbyDataActionFailureAction => ({
  type: SEARCHBYDATA_FAILURE,
  error,
});

export type SearchbyDataActions =
  | SearchbyDataAction
  | SearchbyDataActionSuccessAction
  | SearchbyDataActionFailureAction;
