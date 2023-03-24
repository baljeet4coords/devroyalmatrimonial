import { PartnerPreferrenceResponse } from "./types";
import { PartnerPrefActions } from "./actions";
import { PARTNER_PREF, PARTNER_PREF_SUCCESS, PARTNER_PREF_FAILURE } from "./constants";

interface ParnterPrefState {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: PartnerPreferrenceResponse;
  } | null;
  error: string | null;
}

const initialState: ParnterPrefState = {
  isLoading: false,
  response: null,
  error: null,
};

export default function step1Reducer(
  state = initialState,
  action: PartnerPrefActions
): ParnterPrefState {
  switch (action.type) {
    case PARTNER_PREF:
      return {
        ...state,
        isLoading: true,
      };
    case PARTNER_PREF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
        error: null,
      };
    case PARTNER_PREF_FAILURE:
      return {
        ...state,
        isLoading: false,
        response: null,
        error: action.error,
      };
    default:
      return state;
  }
}
