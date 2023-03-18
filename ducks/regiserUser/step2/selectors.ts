import { RootState } from "../../rootReducer";

export const selectStep2Loading = (state: RootState) => state.registerStep2.isLoading;
export const selectStep2Error = (state: RootState) => state.registerStep2.error;
export const selectStep2Success = (state: RootState) => state.registerStep2.response;
