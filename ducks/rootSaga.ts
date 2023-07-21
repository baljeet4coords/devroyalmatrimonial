import { all } from "redux-saga/effects";
import { step1Saga } from "./regiserUser/step1";
import { step2Saga } from "./regiserUser/step2";
import { step3Saga } from "./regiserUser/step3";
import { step4Saga } from "./regiserUser/step4";
import { step5Saga } from "./regiserUser/step5";
import { watchLogin, watchLogout, watchSignup } from "./auth/saga";
import { partnerPrefferenceSaga } from "./partnerPreferrence";
import { privacySettingsSaga } from "./PrivacySetting";
import { myprofileSaga } from "./myProfile";
import { matchMakingSaga } from "./matchMaking";
import { gallerySaga, gallerySagaPost } from "./Gallery";
import { searchByDataSaga } from "./searchByData";
import { shortlistSaga } from "./userShortList";
import { blocklistSaga } from "./userBlocklist";
import { showInterestSaga } from "./showInterest";
import { partnerDetailsSaga } from "./PartnerDetails";

function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchLogout(),
    step1Saga(),
    step2Saga(),
    step3Saga(),
    step4Saga(),
    step5Saga(),
    partnerPrefferenceSaga(),
    privacySettingsSaga(),
    myprofileSaga(),
    matchMakingSaga(),
    searchByDataSaga(),
    gallerySaga(),
    gallerySagaPost(),
    shortlistSaga(),
    blocklistSaga(),
    showInterestSaga(),
    partnerDetailsSaga(),
  ]);
}

export default rootSaga;
