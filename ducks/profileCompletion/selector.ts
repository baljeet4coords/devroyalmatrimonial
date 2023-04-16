import { RootState } from "../rootReducer";

export const selectProfileCompletion = (state: RootState) =>
  state.profileComplete.percentage;
