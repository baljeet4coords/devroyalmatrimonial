import { all } from "redux-saga/effects";
import { signUpSaga } from "./signUp/index";
import { step1Saga } from "./regiserUser/step1";
<<<<<<< HEAD

function* rootSaga() {
  yield all([signUpSaga(), step1Saga()]);
=======
import { step5Saga } from "./regiserUser/step5";
import { step4Saga } from "./regiserUser/step4";

function* rootSaga() {
  yield all([signUpSaga(), step1Saga(), step4Saga(), step5Saga()]);
>>>>>>> bae73d8d983436ac8a8891803edfa618b3618596
}

export default rootSaga;
