import { takeEvery, call, put } from "redux-saga/effects";
import { STEP_4 } from "./constants";
import axios from "axios";

import { Step4Actions, step4Failure, step4Success } from "./actions";

function* step1Saga(action: Step4Actions): any {
  try {
    if (action.type === STEP_4) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step4`,
        action.payload
      );
      const responseData = response.data;
      yield put(step4Success(responseData));
    }
  } catch (error) {
    yield put(step4Failure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(STEP_4, step1Saga);
}
