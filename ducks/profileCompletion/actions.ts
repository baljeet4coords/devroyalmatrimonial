// in your actions.ts file
import {
  UPDATE_PROFILE_COMPLETENESS,
  UpdateProfileCompletenessAction,
} from "./constants";

export const updateProfileCompleteness = (
  percentage: number
): UpdateProfileCompletenessAction => ({
  type: UPDATE_PROFILE_COMPLETENESS,
  percentage,
});
