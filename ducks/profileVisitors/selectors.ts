import { RootState } from "../rootReducer";

export const selectprofileVisitorLoading = (state: RootState) => state.profileVisitor.isLoading;
export const selectprofileVisitorError = (state: RootState) => state.profileVisitor.error;
export const selectprofileVisitorSuccess = (state: RootState) => state.profileVisitor.response;
