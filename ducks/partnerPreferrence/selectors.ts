import { RootState } from "../rootReducer";

export const selectPartnerPrefLoading = (state: RootState) => state.partnerPrefference.isLoading;
export const selectPartnerPrefError = (state: RootState) => state.partnerPrefference.error;
export const selectPartnerPrefSuccess = (state: RootState) => state.partnerPrefference.response;
