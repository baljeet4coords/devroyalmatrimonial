import { takeEvery, call, put } from "redux-saga/effects";
import { Privacy_Settings } from "./constants";
import axios from "axios";

import {
PrivacySettingsFailure,
PrivacySettingsActions,
PrivacySettingsSuccess
} from "./actions";

function* Privacy_SettingsSaga(action: PrivacySettingsActions): any {
  try {
    if (action.type === Privacy_Settings) {
      const responseData = action.payload;
      alert(responseData)
      // yield put(PrivacySettingsSuccess(responseData));
    }
  } catch (error) {
    yield put(PrivacySettingsFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(Privacy_Settings, Privacy_SettingsSaga);
}
