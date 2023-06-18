import { takeEvery, call, put, all } from "redux-saga/effects";
import { MATCHMAKING } from "./constants";
import axios from "axios";

import {
  matchMakingSuccess,
  matchMakingFailure,
  MatchMakingActions,
} from "./actions";

function* myprofileSaga(action: MatchMakingActions): any {
  try {
    if (action.type === MATCHMAKING) {
      const response = yield call(
        axios.post,
        `http://dev.royalmatrimonial.com/api/matchmaking/getStrictMatchMaking`,
        action.payload
      );
      const responseData = response.data.output > 0 ? response.data : response.data[0];
      // console.log(responseData,'responseData saga');
      
      yield put(matchMakingSuccess(responseData));
    }
  } catch (error) {
    yield put(matchMakingFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(MATCHMAKING, myprofileSaga);
}
