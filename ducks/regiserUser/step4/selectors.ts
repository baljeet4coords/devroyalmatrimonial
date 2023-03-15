import { RootState } from "../../rootReducer";

export const selectStep4Loading = (state: RootState) => state.registerStep4.isLoading;
export const selectStep4Error = (state: RootState) => state.registerStep4.error;
export const selectStep4Success = (state: RootState) => state.registerStep4.response;
