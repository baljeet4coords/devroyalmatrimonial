// in your reducer.ts file
import {
  UPDATE_PROFILE_COMPLETENESS,
  UpdateProfileCompletenessAction,
} from "./constants";

export interface ProfileCompletenessState {
  percentage: number;
}

const initialState: ProfileCompletenessState = {
  percentage: 0,
};

const profileCompletenessReducer = (
  state = initialState,
  action: UpdateProfileCompletenessAction
): ProfileCompletenessState => {
  switch (action.type) {
    case UPDATE_PROFILE_COMPLETENESS:
      return {
        ...state,
        percentage: action.percentage,
      };
    default:
      return state;
  }
};

export default profileCompletenessReducer;
