// in your index.ts file
import profileCompletenessReducer from "./reducer";
import profileCompletenessSaga from "./saga";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  reducer: profileCompletenessReducer,
  saga: profileCompletenessSaga,
};
