import { takeEvery, call, put } from "redux-saga/effects";
import { STEP_1, STEP_1_SUCCESS, STEP_1_FAILURE } from "./constants";
import axios from "axios";

import { Step1Actions } from "./actions";

function* step1Saga(action: Step1Actions): any {
  try {
    if (action.type === STEP_1) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step1`,
        action.payload
      );
      const responseData = response.data;
      yield put({ type: STEP_1_SUCCESS, response: responseData });
    }
  } catch (error) {
    yield put({ type: STEP_1_FAILURE, error });
  }
}

export default function* rootSaga() {
  yield takeEvery(STEP_1, step1Saga);
}
