import { RootState } from "../rootReducer";

export const selectshowInterestLoading = (state: RootState) => state.showInterest.isLoading;
export const selectshowInterestError = (state: RootState) => state.showInterest.error;
export const selectshowInterestSuccess = (state: RootState) => state.showInterest.response;
