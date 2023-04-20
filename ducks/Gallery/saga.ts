import { takeEvery, call, put, select } from "redux-saga/effects";
import { GALLERY } from "./constants";
import axios from "axios";
import { RootState } from "../rootReducer";

import { gallerySuccess, galleryFailure, GalleryActions } from "./actions";
// import { useSelector } from "react-redux";

function* gallerySaga(action: GalleryActions): any {
  const GalleryRes = yield select(
    (state: RootState) => state.myProfileGallery.response
  );
  // const ImgArrayRes = GalleryRes?.jsonResponse?.galleryImages;


  try {
    if (action.type === GALLERY) {
      const response = yield call(
        axios.post,
        `${process.env.NEXT_PUBLIC_URL}/userImage/getUserImages`,
        action.payload
      );

      const responseData = response.data;
      console.log(
        GalleryRes?.response?.jsonResponse?.galleryImages,
        "GalleryRes"
      );
      yield put(gallerySuccess(responseData));
      // if (ImgArrayRes.length < 0) {
      // } else {
      //   yield put(gallerySuccess(responseData));
      // }
    }
  } catch (error) {
    yield put(galleryFailure(error));
  }
}

export default function* rootSaga() {
  yield takeEvery(GALLERY, gallerySaga);
}
