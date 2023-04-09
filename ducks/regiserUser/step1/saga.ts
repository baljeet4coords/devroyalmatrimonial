import { takeEvery, call, put } from "redux-saga/effects";
import { STEP_1 } from "./constants";
import axios from "axios";

import { Step1Actions, step1Failure, step1Success } from "./actions";

function* step1Saga(action: Step1Actions): any {
  try {
    if (action.type === STEP_1) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step1`,
        action.payload
      );
      const responseData = response.data;
      
      yield put(step1Success(responseData));
    }
  } catch (error) {
    yield put(step1Failure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(STEP_1, step1Saga);
}

