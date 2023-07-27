import { takeEvery, call, put, all } from "redux-saga/effects";
import { BLOCKLIST } from "./constants";
import axios from "axios";

import {
  blockListSuccess,
  blockListFailure,
  blockListActions,
} from "./actions";

function* blockListSaga(action: blockListActions): any {
  try {
    if (action.type === BLOCKLIST) {
      const urls = [
        `${process.env.NEXT_PUBLIC_URL}/blockUser/getUserBlockListAndCard`,
        `${process.env.NEXT_PUBLIC_URL}/blockUser/getUserBlockList`,
      ];
      const requests = urls.map((url) => call(axios.post, url, action.payload));
      const [blockUserCard, blockUserID] = yield all(requests);

      let allStepsObject = {
        blocklistCard: blockUserCard.data,
        blocklistedID: blockUserID.data,
      };
      yield put(blockListSuccess(allStepsObject));
    }
  } catch (error) {
    yield put(blockListFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(BLOCKLIST, blockListSaga);
}
