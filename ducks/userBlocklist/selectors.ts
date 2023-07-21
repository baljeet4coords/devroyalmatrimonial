import { RootState } from "../rootReducer";

export const selectblockListLoading = (state: RootState) => state.blockList.isLoading;
export const selectblockListError = (state: RootState) => state.blockList.error;
export const selectblockListSuccess = (state: RootState) => state.blockList.response;
