import { GalleryResponse } from "./types";
import { GalleryActions } from "./actions";
import {
  GALLERY_GET,
  GALLERY_SUCCESS,
  GALLERY_FAILURE,
  GALLERY_POST,
  GALLERY_POST_SUCCESS,
  GALLERY_POST_FAILURE,
} from "./constants";

interface GalleryState {
  isLoading: boolean;
  response: {
    output: number;
    message: string;
    jsonResponse: GalleryResponse;
  } | null;
  error: string | null;
}

const initialState: GalleryState = {
  isLoading: false,
  response: null,
  error: null,
};

export default function GalleryReducer(
  state = initialState,
  action: GalleryActions
): GalleryState {
  switch (action.type) {
    case GALLERY_GET:
      return {
        ...state,
        isLoading: true,
      };
    case GALLERY_POST:
      return {
        ...state,
        isLoading: true,
      };
    case GALLERY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
        error: null,
      };
    case GALLERY_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
        error: null,
      };
    case GALLERY_FAILURE:
      return {
        ...state,
        isLoading: false,
        response: null,
        error: action.error,
      };
    case GALLERY_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        response: null,
        error: action.error,
      };
    default:
      return state;
  }
}
