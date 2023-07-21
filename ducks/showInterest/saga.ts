import { takeEvery, call, put, all } from "redux-saga/effects";
import { SHOWINTEREST } from "./constants";
import axios from "axios";

import {
  showInterestSuccess,
  showInterestFailure,
  showInterestActions,
} from "./actions";

function* showInterestSaga(action: showInterestActions): any {
  try {
    if (action.type === SHOWINTEREST) {
      const directions = ["S", "R"];
      const url = `${process.env.NEXT_PUBLIC_URL}/interestList/getUserInterestListAndCard`;
      const requests = directions.map((direction) =>
        call(axios.post, url, {
          userId: action.payload.userId,
          direction: direction,
        })
      );
      const [sentInterestCard, reciveInterestCard] = yield all(requests);

      let allRequestObject = {
        sentInterestCard: sentInterestCard.data,
        reciveInterestCard: reciveInterestCard.data,
      };
      yield put(showInterestSuccess(allRequestObject));
    }
  } catch (error) {
    yield put(showInterestFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(SHOWINTEREST, showInterestSaga);
}
