import { takeEvery, call, put } from "redux-saga/effects";
import { STEP_4, STEP_4_SUCCESS, STEP_4_FAILURE } from "./constants";
import axios from "axios";

import { Step4Actions } from "./actions";

function* step1Saga(action: Step4Actions): any {
  try {
    if (action.type === STEP_4) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step4`,
        action.payload
      );
      const responseData = response.data;
      yield put({ type: STEP_4_SUCCESS, response: responseData });
    }
  } catch (error) {
    yield put({ type: STEP_4_FAILURE, error });
  }
}

export default function* rootSaga() {
  yield takeEvery(STEP_4, step1Saga);
}
