// in your types.ts file
export const UPDATE_PROFILE_COMPLETENESS = "UPDATE_PROFILE_COMPLETENESS";

export interface UpdateProfileCompletenessAction {
  type: typeof UPDATE_PROFILE_COMPLETENESS;
  percentage: number;
}
