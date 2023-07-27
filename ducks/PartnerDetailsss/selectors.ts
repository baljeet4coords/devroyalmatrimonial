import { RootState } from "../rootReducer";

export const selectpartnerDetailsLoading = (state: RootState) => state.partnerDetails.isLoading;
export const selectpartnerDetailsError = (state: RootState) => state.partnerDetails.error;
export const selectpartnerDetailsSuccess = (state: RootState) => state.partnerDetails.response;
