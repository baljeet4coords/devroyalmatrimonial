import { takeEvery, call, put } from "redux-saga/effects";
import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "./constants";
import axios from "axios";

import { SignInActions } from "./actions";

function* signInSaga(action: SignInActions): any {
  try {
    if (action.type === SIGN_IN) {
      if (action.payload.from === "mobile") {
        const response = yield call(
          axios.post,
          `${process.env.NEXT_PUBLIC_URL}/auth/signInMobile`,
          action.payload
        );
        const responseData = response.data;
        yield put({ type: SIGN_IN_SUCCESS, response: responseData });
      } else {
        const response = yield call(
          axios.post,
          `${process.env.NEXT_PUBLIC_URL}/auth/signInEmail`,
          action.payload
        );
        const responseData = response.data;
        yield put({ type: SIGN_IN_SUCCESS, response: responseData });
      }
    }
  } catch (error) {
    yield put({ type: SIGN_IN_FAILURE, error });
  }
}

export default function* rootSaga() {
  yield takeEvery(SIGN_IN, signInSaga);
}
