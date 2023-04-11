import { takeEvery, call, put, all } from "redux-saga/effects";
import { MYPROFILE } from "./constants";
import axios from "axios";

import {
  myProfileSuccess,
  myProfileFailure,
  MyProfileActions,
} from "./actions";

function* myprofileSaga(action: MyProfileActions): any {
  try {
    if (action.type === MYPROFILE) {
      const urls = [
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step1`,
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step2`,
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step3`,
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step4`,
        `${process.env.NEXT_PUBLIC_URL}/registerUser/step5`,
      ];
      const requests = urls.map((url) => call(axios.post, url, action.payload));
      const [
        step1Response,
        step2Response,
        step3Response,
        step4Response,
        step5Response,
      ] = yield all(requests);
      const allStepsObject = {
        step1: step1Response.data,
        step2: step2Response.data,
        step3: step3Response.data,
        step4: step4Response.data,
        step5: step5Response.data,
      };
      console.log(allStepsObject);
      yield put(myProfileSuccess(allStepsObject));
    }
  } catch (error) {
    yield put(myProfileFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(MYPROFILE, myprofileSaga);
}
