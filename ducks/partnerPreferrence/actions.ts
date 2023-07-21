import { PartnerPreferrence, PartnerPreferrenceResponse } from "./types";
import {
  PARTNER_PREF,
  PARTNER_PREF_SUCCESS,
  PARTNER_PREF_FAILURE,
} from "./constants";

interface PartnerPrefAction {
  type: typeof PARTNER_PREF;
  payload: PartnerPreferrence;
}

interface PartnerPrefActionSuccessAction {
  type: typeof PARTNER_PREF_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: PartnerPreferrenceResponse;
  };
}

interface PartnerPrefActionFailureAction {
  type: typeof PARTNER_PREF_FAILURE;
  error: string | any;
}

export const partnerPrefReq = (
  payload: PartnerPrefAction["payload"]
): PartnerPrefAction => ({
  type: PARTNER_PREF,
  payload,
});

export const partnerPrefSuccess = (
  response: PartnerPrefActionSuccessAction["response"]
): PartnerPrefActionSuccessAction => ({
  type: PARTNER_PREF_SUCCESS,
  response,
});

export const partnerPrefFailure = (
  error: PartnerPrefActionFailureAction["error"]
): PartnerPrefActionFailureAction => ({
  type: PARTNER_PREF_FAILURE,
  error,
});

export type PartnerPrefActions =
  | PartnerPrefAction
  | PartnerPrefActionSuccessAction
  | PartnerPrefActionFailureAction;
