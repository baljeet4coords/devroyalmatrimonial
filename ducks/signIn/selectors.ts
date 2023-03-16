import { RootState } from '../rootReducer';

export const selectSignInLoading = (state: RootState) => state.signIn.isLoading;
export const selectSignInError = (state: RootState) => state.signIn.error;
export const selectSignInSuccess = (state: RootState) => state.signIn.response;
