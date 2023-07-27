import { takeEvery, call, put, all } from "redux-saga/effects";
import { PARTNERDETAILS } from "./constants";
import axios from "axios";

import {
  partnerDetailsSuccess,
  partnerDetailsFailure,
  PartnerDetailsActions,
} from "./actions";

function* partnerDetailsSaga(action: PartnerDetailsActions): any {
  try {
    if (action.type === PARTNERDETAILS) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/userDetails/getPartnerDetails`,
        action.payload
      );

      const P1 = JSON.parse(response.data.jsonResponse.P1);
      const P2 = JSON.parse(response.data.jsonResponse.P2);
      const P3 = JSON.parse(response.data.jsonResponse.P3);
      const P4 = JSON.parse(response.data.jsonResponse.P4);
      const P5 = JSON.parse(response.data.jsonResponse.P5);
      const privacy = JSON.parse(response.data.jsonResponse.privacy);
      const interest = JSON.parse(response.data.jsonResponse.interest);

      const allResponse = {
        P1,
        P2,
        P3,
        P4,
        P5,
        privacy,
        interest,
      };

      yield put(partnerDetailsSuccess(allResponse));
    }
  } catch (error) {
    yield put(partnerDetailsFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(PARTNERDETAILS, partnerDetailsSaga);
}
