import {
  IPartnerDetailsP1Response,
  IPartnerDetailsP2Response,
  IPartnerDetailsP3Response,
  IPartnerDetailsP4Response,
  IPartnerDetailsP5Response,
} from "../../types/PartnerDetails/partnerDetails";
import {
  PARTNERDETAILS,
  PARTNERDETAILS_SUCCESS,
  PARTNERDETAILS_FAILURE,
} from "./constants";

interface PartnerDetailsAction {
  type: typeof PARTNERDETAILS;
  payload: {
    userId?: number;
    partnerId?: number;
  };
}

interface PartnerDetailsActionSuccessAction {
  type: typeof PARTNERDETAILS_SUCCESS;
  response: {
    P1: IPartnerDetailsP1Response | null;
    P2: IPartnerDetailsP2Response | null;
    P3: IPartnerDetailsP3Response | null;
    P4: IPartnerDetailsP4Response | null;
    P5: IPartnerDetailsP5Response | null;
    privacy: {
      privacy_show_name: string | null;
      privacy_show_photo: string | null;
      privacy_show_contact: string | null;
    };
    interest: { Send: string | null; Recieve: string | null };
  } | null;
}

interface PartnerDetailsActionFailureAction {
  type: typeof PARTNERDETAILS_FAILURE;
  error: string | any;
}

export const partnerDetailsReq = (
  payload: PartnerDetailsAction["payload"]
): PartnerDetailsAction => ({
  type: PARTNERDETAILS,
  payload,
});

export const partnerDetailsSuccess = (
  response: PartnerDetailsActionSuccessAction["response"]
): PartnerDetailsActionSuccessAction => ({
  type: PARTNERDETAILS_SUCCESS,
  response,
});

export const partnerDetailsFailure = (
  error: PartnerDetailsActionFailureAction["error"]
): PartnerDetailsActionFailureAction => ({
  type: PARTNERDETAILS_FAILURE,
  error,
});

export type PartnerDetailsActions =
  | PartnerDetailsAction
  | PartnerDetailsActionSuccessAction
  | PartnerDetailsActionFailureAction;
