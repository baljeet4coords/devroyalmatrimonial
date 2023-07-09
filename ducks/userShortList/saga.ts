import { takeEvery, call, put, all } from "redux-saga/effects";
import { SHORTLIST } from "./constants";
import axios from "axios";

import {
  shortListSuccess,
  shortListFailure,
  shortListActions,
} from "./actions";

function* shortListSaga(action: shortListActions): any {
  try {
    if (action.type === SHORTLIST) {
      const urls = [
        `${process.env.NEXT_PUBLIC_URL}/shortlist/getUserShortlistAndCard`,
        `${process.env.NEXT_PUBLIC_URL}/shortlist/getUserShortlist`,
      ];
      const requests = urls.map((url) => call(axios.post, url, action.payload));
      const [shortlistCard, shotlistedID] = yield all(requests);

      let allStepsObject = {
        shortlistCard: shortlistCard.data,
        shotlistedID: shotlistedID.data,
      };
      yield put(shortListSuccess(allStepsObject));
    }
  } catch (error) {
    yield put(shortListFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(SHORTLIST, shortListSaga);
}
