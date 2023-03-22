import { all } from "redux-saga/effects";
import { step1Saga } from "./regiserUser/step1";
import { step2Saga } from "./regiserUser/step2";
import { step3Saga } from "./regiserUser/step3";
import { step4Saga } from "./regiserUser/step4";
import { step5Saga } from "./regiserUser/step5";
import { watchLogin, watchLogout, watchSignup } from "./auth/saga";
import { partnerPrefferenceSaga } from "./partnerPreferrence";

function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchLogout(),
    step1Saga(),
    step2Saga(),
    step3Saga(),
    step4Saga(),
    step5Saga(),
    partnerPrefferenceSaga(),
  ]);
}

export default rootSaga;
