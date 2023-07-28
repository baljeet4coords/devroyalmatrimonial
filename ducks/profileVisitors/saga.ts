import { takeEvery, call, put, all, select } from "redux-saga/effects";
import { set, uniqBy } from "lodash";
import { PROFILEVISITORS } from "./constants";
import axios from "axios";

import {
  profileVisitorSuccess,
  profileVisitorFailure,
  profileVisitorActions,
} from "./actions";

function* profileVisitorSaga(action: profileVisitorActions): any {
  const previousSuccessData = yield select(
    (state) => state.profileVisitor?.response?.jsonResponse
  );
  try {
    if (action.type === PROFILEVISITORS) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/userDetails/getUserVisitorListAndCard`,
        action.payload
      );
      const responseData = response.data;

      const updatedJsonResponse = previousSuccessData && [
        ...responseData.jsonResponse,
        ...previousSuccessData,
      ];

      const updatedData = previousSuccessData && {
        ...responseData,
        jsonResponse: uniqBy(updatedJsonResponse, "visitorid"),
      };
      previousSuccessData != null &&
        console.log(updatedJsonResponse, updatedData, "updatedData");

      if (previousSuccessData === null) {
        yield put(profileVisitorSuccess(responseData));
      } else {
        yield put(profileVisitorSuccess(updatedData));
      }
    }
  } catch (error) {
    yield put(profileVisitorFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(PROFILEVISITORS, profileVisitorSaga);
}
