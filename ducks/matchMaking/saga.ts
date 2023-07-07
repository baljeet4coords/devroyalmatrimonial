import { takeEvery, call, put, all, select } from "redux-saga/effects";
import { MATCHMAKING } from "./constants";
import axios from "axios";

import {
  matchMakingSuccess,
  matchMakingFailure,
  MatchMakingActions,
} from "./actions";

function* myprofileSaga(action: MatchMakingActions): any {
  const previousMatchMakingSuccess = yield select(
    (state) => state.matchMaking?.response?.jsonResponse
  );
  const output = yield select((state) => state.matchmaking?.response);
  try {
    if (action.type === MATCHMAKING) {
      // let response = yield call(
      //   axios.post,
      //   `http://dev.royalmatrimonial.com/api/matchmaking/getAllMatchMaking`,
      //   action.payload
      // );
      // if (responseData.jsonResponse != null) {
      //   response = yield call(
      //     axios.post,
      //     `http://dev.royalmatrimonial.com/api/matchmaking/getStrictMatchMaking`,
      //     action.payload
      //   );
      // }

      const response = yield call(
        axios.post,
        `http://dev.royalmatrimonial.com/api/matchmaking/getStrictMatchMaking`,
        action.payload
      );
      const responseData = response.data;
      let updatedData;
      if (responseData.jsonResponse === null) {
        updatedData = previousMatchMakingSuccess && {
          ...responseData,
          jsonResponse: [...previousMatchMakingSuccess],
          output: responseData.output,
        };
      } else {
        updatedData = previousMatchMakingSuccess && {
          ...responseData,
          output: responseData.output,
          jsonResponse: [
            ...previousMatchMakingSuccess,
            ...responseData.jsonResponse,
          ],
        };
      }
      previousMatchMakingSuccess != null &&
        console.log(updatedData, "updatedData");

      if (previousMatchMakingSuccess === null) {
        yield put(matchMakingSuccess(responseData));
      } else {
        yield put(matchMakingSuccess(updatedData));
      }
    }
  } catch (error) {
    yield put(matchMakingFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(MATCHMAKING, myprofileSaga);
}
