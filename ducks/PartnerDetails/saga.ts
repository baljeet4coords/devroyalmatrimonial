import { takeEvery, call, put, all } from "redux-saga/effects";
import { PARTNERDETAILS } from "./constants";
import axios from "axios";

import {
  partnerDetailsSuccess,
  partnerDetailsFailure,
  PartnerDetailsActions,
} from "./actions";
import { IProfileCompletionScore } from "../../types/register/userRegister";
import {
  IPartnerDetailsP1Response,
  IPartnerDetailsP2Response,
  IPartnerDetailsP3Response,
  IPartnerDetailsP4Response,
  IPartnerDetailsP5Response,
} from "../../types/PartnerDetails/partnerDetails";

interface privacy {
  privacy_show_name: string | null;
  privacy_show_photo: string | null;
  privacy_show_contact: string | null;
}
interface interest {
  Send: string | null;
  Recieve: string | null;
}

function* partnerDetailsSaga(action: PartnerDetailsActions): any {
  try {
    if (action.type === PARTNERDETAILS) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/userDetails/getPartnerDetails`,
        action.payload
      );

      const P1: IPartnerDetailsP1Response | null = JSON.parse(
        response.data.jsonResponse.P1
      );
      const P2: IPartnerDetailsP2Response | null = JSON.parse(
        response.data.jsonResponse.P2
      );
      const P3: IPartnerDetailsP3Response | null = JSON.parse(
        response.data.jsonResponse.P3
      );
      const P4: IPartnerDetailsP4Response | null = JSON.parse(
        response.data.jsonResponse.P4
      );
      const P5: IPartnerDetailsP5Response | null = JSON.parse(
        response.data.jsonResponse.P5
      );
      const Privacy: privacy = JSON.parse(response.data.jsonResponse.privacy);
      const interest: interest = JSON.parse(
        response.data.jsonResponse.interest
      );

      const status: string = response.data.status;
      const allResponse = {
        output: response.data.output,
        message: response.data.message,
        jsonResponse: {
          step1: P1,
          step2: P2,
          step3: P3,
          step4: P4,
          step5: P5,
          Privacy,
          interest,
        },
        status: status,
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
