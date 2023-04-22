import { RootState } from "../rootReducer";

export const selectGalleryLoading = (state: RootState) => state.myProfileGallery.isLoading;
export const selectGalleryError = (state: RootState) => state.myProfileGallery.error;
export const selectGallerySuccess = (state: RootState) => state.myProfileGallery.response;
