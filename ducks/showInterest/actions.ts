import { ICardViewResponseInterest } from "../../types/short-Block-Interest";
import {
  SHOWINTEREST,
  SHOWINTEREST_SUCCESS,
  SHOWINTEREST_FAILURE,
} from "./constants";

interface showInterestAction {
  type: typeof SHOWINTEREST;
  payload: {
    userId: number;
  };
}

interface showInterestActionSuccessAction {
  type: typeof SHOWINTEREST_SUCCESS;
  response: {
    sentInterestCard: {
      output: number;
      message: string;
      jsonResponse: ICardViewResponseInterest[];
      status: number;
    };
    reciveInterestCard: {
      output: number;
      message: string;
      jsonResponse: ICardViewResponseInterest[];
      status: number;
    };
  };
}

interface showInterestActionFailureAction {
  type: typeof SHOWINTEREST_FAILURE;
  error: string | any;
}

export const showInterestReq = (
  payload: showInterestAction["payload"]
): showInterestAction => ({
  type: SHOWINTEREST,
  payload,
});

export const showInterestSuccess = (
  response: showInterestActionSuccessAction["response"]
): showInterestActionSuccessAction => ({
  type: SHOWINTEREST_SUCCESS,
  response,
});

export const showInterestFailure = (
  error: showInterestActionFailureAction["error"]
): showInterestActionFailureAction => ({
  type: SHOWINTEREST_FAILURE,
  error,
});

export type showInterestActions =
  | showInterestAction
  | showInterestActionSuccessAction
  | showInterestActionFailureAction;
