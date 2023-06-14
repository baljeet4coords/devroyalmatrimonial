import { PrivacySettingsResponse } from "./types";
import {
  Privacy_Settings,
  Privacy_Settings_SUCCESS,
  Privacy_Settings_FAILURE,
} from "./constants";
import { PrivacySettingsActions } from "./actions";

interface PrivacySettingsState {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: PrivacySettingsResponse;
  } | null;
  error: string | null;
}

const initialState: PrivacySettingsState = {
  isLoading: false,
  response: null,
  error: null,
};

export default function step1Reducer(
  state = initialState,
  action: PrivacySettingsActions
): PrivacySettingsState {
  switch (action.type) {
    case Privacy_Settings:
      return {
        ...state,
        isLoading: true,
      };
    case Privacy_Settings_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
        error: null,
      };
    case Privacy_Settings_FAILURE:
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
