import { startLoading, finishLoading } from "./loading";
import { restoreUploadApi } from "../lib/api/restore";

const RESTORE_UPLOAD = "restore/RESTORE_UPLOAD";
const RESTORE_UPLOAD_SUCCESS = "restore/RESTORE_UPLOAD_SUCCESS";
const RESTORE_UPLOAD_FAILURE = "restore/RESTORE_UPLOAD_FAILURE";
const RESTORE_UPLOAD_INITIALIZE = "restore/RESTORE_UPLOAD_INITIALIZE";

export const restoreInitialize = () => {
  return {
    type: RESTORE_UPLOAD,
  };
};

const restoreUploadSuccess = (response) => {
  return {
    type: RESTORE_UPLOAD_SUCCESS,
    payload: response,
  };
};

const restoreUploadFailure = (error) => {
  return {
    type: RESTORE_UPLOAD_FAILURE,
    payload: error,
  };
};

export const restoreUploadThunk = (_id, data) => async (dispatch, getState) => {
  dispatch(startLoading(RESTORE_UPLOAD));
  try {
    const response = await restoreUploadApi(_id, data);
    dispatch(restoreUploadSuccess(response));
  } catch (error) {
    dispatch(restoreUploadFailure(error));
  }
  dispatch(finishLoading(RESTORE_UPLOAD));
};

const initialState = {
  restoreUpload: null,
  restoreUploadError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_UPLOAD_INITIALIZE:
      return { restoreUpload: null, restoreUploadError: null };
    case RESTORE_UPLOAD_SUCCESS:
      return { ...state, restoreUpload: action.payload };
    case RESTORE_UPLOAD_FAILURE:
      return { ...state, restoreUploadError: action.payload };
    default:
      return state;
  }
};
