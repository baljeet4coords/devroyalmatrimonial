import { takeEvery, call, put } from "redux-saga/effects";
import { STEP_3 } from "./constants";
import axios from "axios";

import { Step3Actions, step3Failure, step3Success } from "./actions";

function* step1Saga(action: Step3Actions): any {
  try {
    if (action.type === STEP_3) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step3`,
        action.payload
      );
      const responseData = response.data;
      yield put(step3Success(responseData));
    }
  } catch (error) {
    yield put(step3Failure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(STEP_3, step1Saga);
}
