import { RootState } from "../../rootReducer";

export const selectStep5Loading = (state: RootState) => state.registerStep5.isLoading;
export const selectStep5Error = (state: RootState) => state.registerStep5.error;
export const selectStep5Success = (state: RootState) => state.registerStep5.response;
