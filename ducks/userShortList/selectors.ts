import { RootState } from "../rootReducer";

export const selectshortListLoading = (state: RootState) => state.shortList.isLoading;
export const selectshortListError = (state: RootState) => state.shortList.error;
export const selectshortListSuccess = (state: RootState) => state.shortList.response;
