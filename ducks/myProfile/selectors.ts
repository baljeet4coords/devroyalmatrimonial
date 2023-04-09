import { RootState } from "../rootReducer";

export const selectmyProfileLoading = (state: RootState) => state.registerStep1.isLoading;
export const selectmyProfileError = (state: RootState) => state.registerStep1.error;
export const selectmyProfileSuccess = (state: RootState) => state.registerStep1.response;
export const getProfilePicture = (state: RootState) => state.registerStep1.response?.jsonResponse.photo ?? "";
