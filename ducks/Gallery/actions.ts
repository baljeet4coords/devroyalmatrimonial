import { Gallery, GalleryResponse } from "./types";
import { GALLERY, GALLERY_SUCCESS, GALLERY_FAILURE } from "./constants";

interface GalleryAction {
  type: typeof GALLERY;
  payload?: Gallery;
}

interface GalleryActionSuccessAction {
  type: typeof GALLERY_SUCCESS;
  response: {
    output: number;
    message: string;
    jsonResponse: GalleryResponse;
  };
}

interface GalleryActionFailureAction {
  type: typeof GALLERY_FAILURE;
  error: string | any;
}

export const galleryReq = (
  payload: GalleryAction["payload"]
): GalleryAction => ({
  type: GALLERY,
  payload,
});

export const gallerySuccess = (
  response: GalleryActionSuccessAction["response"]
): GalleryActionSuccessAction => ({
  type: GALLERY_SUCCESS,
  response,
});

export const galleryFailure = (
  error: GalleryActionFailureAction["error"]
): GalleryActionFailureAction => ({
  type: GALLERY_FAILURE,
  error,
});

export type GalleryActions =
  | GalleryAction
  | GalleryActionSuccessAction
  | GalleryActionFailureAction;
