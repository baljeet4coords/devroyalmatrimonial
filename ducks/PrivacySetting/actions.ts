import { PrivacySettings, PrivacySettingsResponse } from "./types";
import { Privacy_Settings, Privacy_Settings_SUCCESS, Privacy_Settings_FAILURE } from "./constants";

interface PrivacySettingsAction {
  type: typeof Privacy_Settings;
  payload: PrivacySettings;
}

interface PrivacySettingsActionSuccessAction {
  type: typeof Privacy_Settings_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: PrivacySettingsResponse;
  };
}

interface PrivacySettingsActionFailureAction {
  type: typeof Privacy_Settings_FAILURE;
  error: string | any;
}

export const PrivacySettingsReq = (payload: PrivacySettingsAction["payload"]): PrivacySettingsAction => ({
  type: Privacy_Settings,
  payload,
});

export const PrivacySettingsSuccess = (
  response: PrivacySettingsActionSuccessAction["response"]
): PrivacySettingsActionSuccessAction => ({
  type: Privacy_Settings_SUCCESS,
  response,
});

export const PrivacySettingsFailure = (
  error: PrivacySettingsActionFailureAction["error"]
): PrivacySettingsActionFailureAction => ({
  type: Privacy_Settings_FAILURE,
  error,
});

export type PrivacySettingsActions =
  | PrivacySettingsAction
  | PrivacySettingsActionSuccessAction
  | PrivacySettingsActionFailureAction;
