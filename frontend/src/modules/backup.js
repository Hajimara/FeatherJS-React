import { startLoading, finishLoading } from "./loading";
import { backupDownloadApi } from "../lib/api/backup";
import { backupDownloadSocketApi } from "../lib/api/backup_socket";

const BACKUP_DOWNLOAD = "backup/BACKUP_DOWNLOAD";
const BACKUP_DOWNLOAD_SUCCESS = "backup/BACKUP_DOWNLOAD_SUCCESS";
const BACKUP_DOWNLOAD_FAILURE = "backup/BACKUP_DOWNLOAD_FAILURE";
const BACKUP_DOWNLOAD_INITIALIZE = "backup/BACKUP_DOWNLOAD_INITIALIZE";

export const backupInitialize = () => {
  return {
    type: BACKUP_DOWNLOAD,
  };
};

const backupDownloadSuccess = (response) => {
  return {
    type: BACKUP_DOWNLOAD_SUCCESS,
    payload: response,
  };
};

const backupDownloadFailure = (error) => {
  return {
    type: BACKUP_DOWNLOAD_FAILURE,
    payload: error,
  };
};

export const backupDownloadThunk = (_id, data) => async (dispatch, getState) => {
  dispatch(startLoading(BACKUP_DOWNLOAD));
  try {
    const response = await backupDownloadApi(_id, data);
    dispatch(backupDownloadSuccess(response));
  } catch (error) {
    dispatch(backupDownloadFailure(error));
  }
  dispatch(finishLoading(BACKUP_DOWNLOAD));
};

// export const backupDownloadThunk = (_id, data) => async (dispatch, getState) => {
//     dispatch(startLoading(BACKUP_DOWNLOAD));
//     try {
//       const response = await backupDownloadSocketApi(_id, data);
//       dispatch(backupDownloadSuccess(response));
//     } catch (error) {
//       dispatch(backupDownloadFailure(error));
//     }
//     dispatch(finishLoading(BACKUP_DOWNLOAD));
//   };

const initialState = {
  backupDownload: null,
  backupDownloadError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BACKUP_DOWNLOAD_INITIALIZE:
      return { backupDownload: null, backupDownloadError: null };
    case BACKUP_DOWNLOAD_SUCCESS:
      return { ...state, backupDownload: action.payload };
    case BACKUP_DOWNLOAD_FAILURE:
      return { ...state, backupDownloadError: action.payload };
    default:
      return state;
  }
};
