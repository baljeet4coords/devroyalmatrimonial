import { ICardViewResponse } from "../../types/short-Block-Interest";
import { SHORTLIST, SHORTLIST_SUCCESS, SHORTLIST_FAILURE } from "./constants";

interface shortListAction {
  type: typeof SHORTLIST;
  payload: {
    userId?: number;
  };
}

interface shortListActionSuccessAction {
  type: typeof SHORTLIST_SUCCESS;
  response: {
    shortlistCard: {
      output: number;
      message: string;
      jsonResponse: ICardViewResponse[];
      status: number;
    };
    shotlistedID: {
      output: number;
      message: string;
      jsonResponse: number[];
      status: number;
    };
  } | null;
}

interface shortListActionFailureAction {
  type: typeof SHORTLIST_FAILURE;
  error: string | any;
}

export const shortListReq = (
  payload: shortListAction["payload"]
): shortListAction => ({
  type: SHORTLIST,
  payload,
});

export const shortListSuccess = (
  response: shortListActionSuccessAction["response"]
): shortListActionSuccessAction => ({
  type: SHORTLIST_SUCCESS,
  response,
});

export const shortListFailure = (
  error: shortListActionFailureAction["error"]
): shortListActionFailureAction => ({
  type: SHORTLIST_FAILURE,
  error,
});

export type shortListActions =
  | shortListAction
  | shortListActionSuccessAction
  | shortListActionFailureAction;
