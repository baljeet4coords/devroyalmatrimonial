import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { step1Reducer } from "./regiserUser/step1";
import { step2Reducer } from "./regiserUser/step2/";
import { step3Reducer } from "./regiserUser/step3";
import { step5Reducer } from "./regiserUser/step5";
import { step4Reducer } from "./regiserUser/step4";
import authReducer from "./auth/reducer";
import { partnerPrefReducer } from "./partnerPreferrence/";
import { myprofileReducer } from "./myProfile/";
import profileCompletenessReducer from "./profileCompletion/reducer";

export type RootState = ReturnType<typeof rootReducer>;

const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  registerStep1: step1Reducer,
  registerStep2: step2Reducer,
  registerStep3: step3Reducer,
  registerStep4: step4Reducer,
  registerStep5: step5Reducer,
  partnerPrefference: partnerPrefReducer,
  myProfile: myprofileReducer,
  profileComplete: profileCompletenessReducer,
});

export default rootReducer;
