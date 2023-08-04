import { takeEvery, call, put, all, select } from "redux-saga/effects";
import { SEARCHBYDATA } from "./constants";
import axios from "axios";

import {
  searchByDataSuccess,
  searchByDataFailure,
  SearchbyDataActions,
} from "./actions";

function* SearchByDataSaga(action: SearchbyDataActions): any {
  const previousSearchByDataSuccess = yield select(
    (state) => state.searchByData?.response?.jsonResponse
  );
  try {
    if (action.type === SEARCHBYDATA) {
      const response = yield call(
        axios.post,
        `http://dev.royalmatrimonial.com/api/matchmaking/getSearchMatchMaking`,
        action.payload
      );
      const responseData = response.data;
      const updatedData = previousSearchByDataSuccess && {
        ...responseData,
        jsonResponse: [
          ...previousSearchByDataSuccess,
          ...responseData.jsonResponse,
        ],
      };
      previousSearchByDataSuccess != null &&
        console.log(updatedData, "updatedData");

      if (previousSearchByDataSuccess === null) {
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
  yield takeEvery(SEARCHBYDATA, SearchByDataSaga);
}
