import { combineReducers } from "redux";
import { signUpReducer } from "./signUp/index";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  signUp: signUpReducer,
});

export default rootReducer;
