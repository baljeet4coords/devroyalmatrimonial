import { all } from "redux-saga/effects";
import { signUpSaga } from "./signUp/index";

function* rootSaga() {
  yield all([signUpSaga()]);
}

export default rootSaga;
