import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST, SIGNUP_REQUEST } from "./constants";
import axios from "axios";

import {
  AuthActions,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  signupFailure,
  signupSuccess,
} from "./actions";
import { persistor } from "../../store/stores";

function* loginSaga(action: AuthActions): any {
  try {
    if (action.type === LOGIN_REQUEST) {
      if (action.payload.from === "mobile") {
        const response = yield call(
          axios.post,
          `${process.env.NEXT_PUBLIC_URL}/auth/signInMobile`,
          action.payload
        );
        const responseData = response.data;
        console.log(responseData,"response Data success");
        yield put(loginSuccess(responseData));
      } else {
        const response = yield call(
          axios.post,
          `${process.env.NEXT_PUBLIC_URL}/auth/signInEmail`,
          action.payload
        );
        const responseData = response.data;
        yield put(loginSuccess(responseData));
      }
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* signUpSaga(action: AuthActions): any {
  try {
    if (action.type === SIGNUP_REQUEST) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/auth/signUp`,
        action.payload
      );
      const responseData = response.data;
      yield put(signupSuccess(responseData));
    }
  } catch (error) {
    yield put(signupFailure(error));
  }
}

function* logoutSaga() {
  try {
    yield call([persistor, "purge"]);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

export function* watchLogin() {
  yield takeLatest("LOGIN_REQUEST", loginSaga);
}

export function* watchSignup() {
  yield takeLatest("SIGNUP_REQUEST", signUpSaga);
}

export function* watchLogout() {
  yield takeLatest("LOGOUT_REQUEST", logoutSaga);
}
