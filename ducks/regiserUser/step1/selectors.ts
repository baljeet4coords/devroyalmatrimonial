import { RootState } from "../../rootReducer";

export const selectStep1Loading = (state: RootState) => state.registerStep1.isLoading;
export const selectStep1Error = (state: RootState) => state.registerStep1.error;
export const selectStep1Success = (state: RootState) => state.registerStep1.response;
export const getProfilePicture = (state: RootState) => state.registerStep1.response?.jsonResponse.photo;
