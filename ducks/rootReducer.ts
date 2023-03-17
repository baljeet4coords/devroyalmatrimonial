import { combineReducers } from "redux";
import { signUpReducer } from "./signUp/index";
import { step1Reducer } from "./regiserUser/step1";
<<<<<<< HEAD
=======
import { step5Reducer } from "./regiserUser/step5";
import { step4Reducer } from "./regiserUser/step4";
>>>>>>> bae73d8d983436ac8a8891803edfa618b3618596

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  signUp: signUpReducer,
  registerStep1: step1Reducer,
<<<<<<< HEAD
=======
  registerStep4: step4Reducer,
  registerStep5: step5Reducer,
>>>>>>> bae73d8d983436ac8a8891803edfa618b3618596
});

export default rootReducer;
