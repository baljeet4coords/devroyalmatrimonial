import { ICardViewResponse } from "../../types/short-Block-Interest";
import { BLOCKLIST, BLOCKLIST_SUCCESS, BLOCKLIST_FAILURE } from "./constants";

interface blockListAction {
  type: typeof BLOCKLIST;
  payload: {
    userId?: number;
  };
}

interface blockListActionSuccessAction {
  type: typeof BLOCKLIST_SUCCESS;
  response: {
    blocklistCard: {
      output: number;
      message: string;
      jsonResponse: ICardViewResponse[];
      status: number;
    };
    blocklistedID: {
      output: number;
      message: string;
      jsonResponse: number[];
      status: number;
    };
  } | null;
}

interface blockListActionFailureAction {
  type: typeof BLOCKLIST_FAILURE;
  error: string | any;
}

export const blockListReq = (
  payload: blockListAction["payload"]
): blockListAction => ({
  type: BLOCKLIST,
  payload,
});

export const blockListSuccess = (
  response: blockListActionSuccessAction["response"]
): blockListActionSuccessAction => ({
  type: BLOCKLIST_SUCCESS,
  response,
});

export const blockListFailure = (
  error: blockListActionFailureAction["error"]
): blockListActionFailureAction => ({
  type: BLOCKLIST_FAILURE,
  error,
});

export type blockListActions =
  | blockListAction
  | blockListActionSuccessAction
  | blockListActionFailureAction;
