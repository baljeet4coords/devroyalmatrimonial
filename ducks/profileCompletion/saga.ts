// in your saga.ts file
import { takeLatest, put, select } from "redux-saga/effects";
import { updateProfileCompleteness } from "./actions";
import { ProfileCompletenessState } from "./reducer";
import { RootState } from "../rootReducer";

function* updateProfileCompletenessSaga() {
  const profileCompleteness: ProfileCompletenessState = yield select(
    (state: RootState) => state.profileComplete
  );
  const newProfileCompleteness = profileCompleteness.percentage + 20;
  yield put(updateProfileCompleteness(newProfileCompleteness));
}

export default function* profileCompletenessSaga() {
  yield takeLatest("NEW_PAGE_OF_REGISTRATION", updateProfileCompletenessSaga);
}
