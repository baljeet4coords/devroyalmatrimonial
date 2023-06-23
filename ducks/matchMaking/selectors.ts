import { RootState } from "../rootReducer";

export const selectmatchMakingLoading = (state: RootState) => state.matchMaking.isLoading;
export const selectmatchMakingError = (state: RootState) => state.matchMaking.error;
export const selectmatchMakingSuccess = (state: RootState) => state.matchMaking.response;
