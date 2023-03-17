import { combineReducers } from "redux";
import { step1Reducer } from "./regiserUser/step1";
import { step2Reducer } from "./regiserUser/step2/";
import { step3Reducer } from "./regiserUser/step3";
import { step5Reducer } from "./regiserUser/step5";
import { step4Reducer } from "./regiserUser/step4";
import authReducer from "./auth/reducer";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  auth: authReducer,
  registerStep1: step1Reducer,
  registerStep2: step2Reducer,
  registerStep3: step3Reducer,
  registerStep4: step4Reducer,
  registerStep5: step5Reducer,
});

export default rootReducer;
