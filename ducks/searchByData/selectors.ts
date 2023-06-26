import { RootState } from "../rootReducer";

export const selectsearchByDataLoading = (state: RootState) => state.searchByData.isLoading;
export const selectsearchByDataError = (state: RootState) => state.searchByData.error;
export const selectsearchByDataSuccess = (state: RootState) => state.searchByData.response;
