import { takeEvery, call, put } from "redux-saga/effects";
import { STEP_5 } from "./constants";
import axios from "axios";

import { Step5Actions, step5Failure, step5Success } from "./actions";

function* step1Saga(action: Step5Actions): any {
  try {
    if (action.type === STEP_5) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step5`,
        action.payload
      );
      const responseData = response.data;
      yield put(step5Success(responseData));
    }
  } catch (error) {
    yield put(step5Failure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(STEP_5, step1Saga);
}
