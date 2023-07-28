import { IProfileVisitorsResponse } from "../../types/ProfileVisitor/profileVisitors";
import { ICardViewResponseInterest } from "../../types/short-Block-Interest";
import {
  PROFILEVISITORS,
  PROFILEVISITORS_SUCCESS,
  PROFILEVISITORS_FAILURE,
} from "./constants";

interface profileVisitorAction {
  type: typeof PROFILEVISITORS;
  payload: {
    userId: number;
    maxVisitorId: number;
    limit: number;
  };
}

interface profileVisitorActionSuccessAction {
  type: typeof PROFILEVISITORS_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: IProfileVisitorsResponse[];
    status: number;
  };
}

interface profileVisitorActionFailureAction {
  type: typeof PROFILEVISITORS_FAILURE;
  error: string | any;
}

export const profileVisitorReq = (
  payload: profileVisitorAction["payload"]
): profileVisitorAction => ({
  type: PROFILEVISITORS,
  payload,
});

export const profileVisitorSuccess = (
  response: profileVisitorActionSuccessAction["response"]
): profileVisitorActionSuccessAction => ({
  type: PROFILEVISITORS_SUCCESS,
  response,
});

export const profileVisitorFailure = (
  error: profileVisitorActionFailureAction["error"]
): profileVisitorActionFailureAction => ({
  type: PROFILEVISITORS_FAILURE,
  error,
});

export type profileVisitorActions =
  | profileVisitorAction
  | profileVisitorActionSuccessAction
  | profileVisitorActionFailureAction;
