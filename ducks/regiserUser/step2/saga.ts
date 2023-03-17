import { takeEvery, call, put } from "redux-saga/effects";
import { STEP_2, STEP_2_SUCCESS, STEP_2_FAILURE } from "./constants";
import axios from "axios";

import { Step2Actions, step2Failure, step2Success } from "./actions";

function* step2Saga(action: Step2Actions): any {
  try {
    if (action.type === STEP_2) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step2`,
        action.payload
      );
      const responseData = response.data;
      yield put(step2Success(responseData));
    }
  } catch (error) {
    yield put(step2Failure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(STEP_2, step2Saga);
}
