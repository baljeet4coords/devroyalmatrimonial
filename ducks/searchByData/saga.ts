import { takeEvery, call, put, all, select } from "redux-saga/effects";
import { SEARCHBYDATA } from "./constants";
import axios from "axios";

import {
  searchByDataSuccess,
  searchByDataFailure,
  SearchbyDataActions,
} from "./actions";

function* myprofileSaga(action: SearchbyDataActions): any {
  const previousMatchMakingSuccess = yield select(
    (state) => state.matchMaking?.response?.jsonResponse
  );
  const output = yield select((state) => state.matchmaking?.response);
  try {
    if (action.type === SEARCHBYDATA) {
      const response = yield call(
        axios.post,
        `http://dev.royalmatrimonial.com/api/matchmaking/getStrictMatchMaking`,
        action.payload
      );
      const responseData = response.data;
      const updatedData = previousMatchMakingSuccess && {
        ...responseData,
        jsonResponse: [
          ...previousMatchMakingSuccess,
          ...responseData.jsonResponse,
        ],
      };
      previousMatchMakingSuccess != null &&
        console.log(updatedData, "updatedData");

      if (previousMatchMakingSuccess === null) {
        yield put(searchByDataSuccess(responseData));
      } else {
        yield put(searchByDataSuccess(updatedData));
      }
    }
  } catch (error) {
    yield put(searchByDataFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(SEARCHBYDATA, myprofileSaga);
}
