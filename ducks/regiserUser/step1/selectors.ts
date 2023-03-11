import { RootState } from '../../rootReducer';

export const selectSignUpLoading = (state: RootState) => state.signUp.isLoading;
export const selectSignUpError = (state: RootState) => state.signUp.error;
export const selectSignUpSuccess = (state: RootState) => state.signUp.response;
