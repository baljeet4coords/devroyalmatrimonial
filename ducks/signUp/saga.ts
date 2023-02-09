import { takeEvery, call, put } from "redux-saga/effects";
import { SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "./constants";
import axios from "axios";

import { SignUpActions } from "./actions";

function* signUpSaga(action: SignUpActions): any {
  try {
    if (action.type === SIGN_UP) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/auth/signUp`,
        action.payload
      );
      const responseData = yield response.json();
      yield put({ type: SIGN_UP_SUCCESS, response: responseData });
    }
  } catch (error) {
    yield put({ type: SIGN_UP_FAILURE, error });
  }
}

export default function* rootSaga() {
  yield takeEvery(SIGN_UP, signUpSaga);
}
