import { combineReducers } from "redux";
import { signUpReducer } from "./signUp/index";
import { step1Reducer } from "./regiserUser/step1";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  signUp: signUpReducer,
  registerStep1: step1Reducer,
});

export default rootReducer;
