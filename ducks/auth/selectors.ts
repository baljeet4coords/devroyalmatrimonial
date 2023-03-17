import { RootState } from "../rootReducer";

export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthSuccess = (state: RootState) => state.auth.response;
export const getToken = (state: RootState) => state.auth.response?.token;
export const getUserId = (state: RootState) => state.auth.response?.jsonResponse?.userid;
