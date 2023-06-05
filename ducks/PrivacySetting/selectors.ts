import { RootState } from "../rootReducer";

export const selectPrivacySettingsLoading = (state: RootState) => state.privacySettings.isLoading;
export const selectPrivacySettingsError = (state: RootState) => state.privacySettings.error;
export const selectPrivacySettingsSuccess = (state: RootState) => state.privacySettings.response;
