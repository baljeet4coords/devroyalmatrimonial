import { takeEvery, call, put } from "redux-saga/effects";
import { PARTNER_PREF } from "./constants";
import axios from "axios";

import {
  partnerPrefSuccess,
  partnerPrefFailure,
  PartnerPrefActions,
} from "./actions";

function* partnerPrefferenceSaga(action: PartnerPrefActions): any {
  try {
    if (action.type === PARTNER_PREF) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/userPartnerPreference/postPartnerPref`,
        action.payload
      );
      const responseData = response.data;
      yield put(partnerPrefSuccess(responseData));
    }
  } catch (error) {
    yield put(partnerPrefFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(PARTNER_PREF, partnerPrefferenceSaga);
}
