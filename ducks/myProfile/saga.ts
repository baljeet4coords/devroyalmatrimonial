import { takeEvery, call, put } from "redux-saga/effects";
import { MYPROFILE } from "./constants";
import axios from "axios";

import {
  myProfileSuccess,
  myProfileFailure,
  MyProfileActions,
} from "./actions";

function* partnerPrefferenceSaga(action: MyProfileActions): any {
  try {
    if (action.type === MYPROFILE) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/userPartnerPreference/postPartnerPref`,
        action.payload
      );
      const responseData = response.data;
      yield put(myProfileSuccess(responseData));
    }
  } catch (error) {
    yield put(myProfileFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(MYPROFILE, partnerPrefferenceSaga);
}
