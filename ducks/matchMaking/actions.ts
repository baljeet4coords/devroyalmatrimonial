import { IMatchMakingResponse } from "../../types/matchmaking/matchmaking";
import {
  MATCHMAKING,
  MATCHMAKING_SUCCESS,
  MATCHMAKING_FAILURE,
} from "./constants";


interface MatchMakingAction {
  type: typeof MATCHMAKING;
  payload: {
    userId: number;
    maxUserId: number;
    limit: number;
    viceVersa: number;
    excludedUsers: string;
  };
}

interface MatchMakingActionSuccessAction {
  type: typeof MATCHMAKING_SUCCESS;
  response: {
    output: number;
    message: string;
    status: number;
    jsonResponse: IMatchMakingResponse[];
  } | null;
}

interface MatchMakingActionFailureAction {
  type: typeof MATCHMAKING_FAILURE;
  error: string | any;
}

export const matchMakingReq = (
  payload: MatchMakingAction["payload"]
): MatchMakingAction => ({
  type: MATCHMAKING,
  payload,
});

export const matchMakingSuccess = (
  response: MatchMakingActionSuccessAction["response"]
): MatchMakingActionSuccessAction => ({
  type: MATCHMAKING_SUCCESS,
  response,
});

export const matchMakingFailure = (
  error: MatchMakingActionFailureAction["error"]
): MatchMakingActionFailureAction => ({
  type: MATCHMAKING_FAILURE,
  error,
});

export type MatchMakingActions =
  | MatchMakingAction
  | MatchMakingActionSuccessAction
  | MatchMakingActionFailureAction;
