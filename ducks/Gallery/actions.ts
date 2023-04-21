import { Gallery, GalleryResponse } from "./types";
import {
  GALLERY_GET,
  GALLERY_SUCCESS,
  GALLERY_FAILURE,
  GALLERY_POST,
  GALLERY_POST_SUCCESS,
  GALLERY_POST_FAILURE,
} from "./constants";

interface GalleryAction {
  type: typeof GALLERY_GET;
  payload?: Gallery;
}

interface GalleryActionPost {
  type: typeof GALLERY_POST;
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
interface GalleryActionPostSuccessAction {
  type: typeof GALLERY_POST_SUCCESS;
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
interface GalleryActionPostFailureAction {
  type: typeof GALLERY_POST_FAILURE;
  error: string | any;
}

export const galleryReq = (
  payload: GalleryAction["payload"]
): GalleryAction => ({
  type: GALLERY_GET,
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

export const galleryPostReq = (
  payload: GalleryActionPost["payload"]
): GalleryActionPost => ({
  type: GALLERY_POST,
  payload,
});

export const galleryPostSuccess = (
  response: GalleryActionPostSuccessAction["response"]
): GalleryActionPostSuccessAction => ({
  type: GALLERY_POST_SUCCESS,
  response,
});

export const galleryPostFailure = (
  error: GalleryActionPostFailureAction["error"]
): GalleryActionPostFailureAction => ({
  type: GALLERY_POST_FAILURE,
  error,
});

export type GalleryActions =
  | GalleryAction
  | GalleryActionPost
  | GalleryActionPostSuccessAction
  | GalleryActionSuccessAction
  | GalleryActionPostFailureAction
  | GalleryActionFailureAction;
