import { all } from "redux-saga/effects";
import { signUpSaga } from "./signUp/index";
import { step1Saga } from "./regiserUser/step1";
import { step5Saga } from "./regiserUser/step5";
import { step4Saga } from "./regiserUser/step4";

function* rootSaga() {
  yield all([signUpSaga(), step1Saga(), step4Saga(), step5Saga()]);
}

export default rootSaga;
