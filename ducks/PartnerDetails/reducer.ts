import {
  IPartnerDetailsP1Response,
  IPartnerDetailsP2Response,
  IPartnerDetailsP3Response,
  IPartnerDetailsP4Response,
  IPartnerDetailsP5Response,
} from "../../types/PartnerDetails/partnerDetails";
import { PartnerDetailsActions } from "./actions";
import {
  PARTNERDETAILS,
  PARTNERDETAILS_SUCCESS,
  PARTNERDETAILS_FAILURE,
} from "./constants";

interface PartnerDetailState {
  isLoading: boolean;
  response: {
    jsonResponse: {
      step1: IPartnerDetailsP1Response | null;
      step2: IPartnerDetailsP2Response | null;
      step3: IPartnerDetailsP3Response | null;
      step4: IPartnerDetailsP4Response | null;
      step5: IPartnerDetailsP5Response | null;
      Privacy: {
        privacy_show_name: string | null;
        privacy_show_photo: string | null;
        privacy_show_contact: string | null;
      };
      interest: { Send: string | null; Recieve: string | null };
    };
  } | null;
  error: string | null;
}

const initialState: PartnerDetailState = {
  isLoading: true,
  response: {
    jsonResponse: {
      step1: null,
      step2: null,
      step3: null,
      step4: null,
      step5: null,
      Privacy: {
        privacy_show_name: null,
        privacy_show_photo: null,
        privacy_show_contact: null,
      },
      interest: { Send: null, Recieve: null },
    },
  },
  error: null,
};

export default function myprofileReducer(
  state = initialState,
  action: PartnerDetailsActions
): PartnerDetailState {
  switch (action.type) {
    case PARTNERDETAILS:
      return {
        ...state,
        isLoading: true,
      };
    case PARTNERDETAILS_SUCCESS:
      return {
        ...state,
        response: action.response,
        error: null,
        isLoading: false,
      };
    case PARTNERDETAILS_FAILURE:
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
