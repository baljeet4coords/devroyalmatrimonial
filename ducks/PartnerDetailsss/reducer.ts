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

interface partnerDetailsState {
  isLoading: boolean;
  output: number;
  message: string;
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
  status: number;
  error: string | null;
}

const initialState: partnerDetailsState = {
  isLoading: true,
  output: 0,
  message: "",
  response: {
    P1: null,
    P2: null,
    P3: null,
    P4: null,
    P5: null,
    privacy: {
      privacy_show_name: null,
      privacy_show_photo: null,
      privacy_show_contact: null,
    },
    interest: { Send: null, Recieve: null },
  },
  status: 0,
  error: null,
};

export default function partnerDetailsReducer(
  state = initialState,
  action: PartnerDetailsActions
): partnerDetailsState {
  switch (action.type) {
    case PARTNERDETAILS:
      return {
        ...state,
        isLoading: true,
      };
    case PARTNERDETAILS_SUCCESS:
      return {
        ...state,
        //@ts-ignore
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
