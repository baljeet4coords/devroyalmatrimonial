import { RootState } from "../rootReducer";

export const selectmyProfileLoading = (state: RootState) => state.myProfile.isLoading;
export const selectmyProfileError = (state: RootState) => state.myProfile.error;
export const selectmyProfileSuccess = (state: RootState) => state.myProfile.response;
