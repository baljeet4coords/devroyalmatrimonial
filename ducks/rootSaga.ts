import { all } from "redux-saga/effects";
import { signUpSaga } from "./signUp/index";
import { step1Saga } from "./regiserUser/step1";

function* rootSaga() {
  yield all([signUpSaga(), step1Saga()]);
}

export default rootSaga;
