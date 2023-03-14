import { combineReducers } from "redux";
import { signUpReducer } from "./signUp/index";
import { step1Reducer } from "./regiserUser/step1";
import { step5Reducer } from "./regiserUser/step5";
import { step4Reducer } from "./regiserUser/step4";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  signUp: signUpReducer,
  registerStep1: step1Reducer,
  registerStep4: step4Reducer,
  registerStep5: step5Reducer,
});

export default rootReducer;
