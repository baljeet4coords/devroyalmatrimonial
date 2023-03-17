import { RootState } from "../../rootReducer";

export const selectStep3Loading = (state: RootState) => state.registerStep3.isLoading;
export const selectStep3Error = (state: RootState) => state.registerStep3.error;
export const selectStep3Success = (state: RootState) => state.registerStep3.response;
