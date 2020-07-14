import { startLoading, finishLoading } from "./loading";
import {
  noticeWriteApi,
  noticeFindAllApi,
  noticeFindOneApi,
  noticePatchApi,
  noticeRemoveApi
} from "../lib/api/notice";

const NOTICE_FIND_ALL = "notice/NOTICE_FIND_ALL";
const NOTICE_FIND_ALL_SUCCESS = "notice/NOTICE_FIND_ALL_SUCCESS";
const NOTICE_FIND_ALL_FAILURE = "notice/NOTICE_FIND_ALL_FAILURE";

const NOTICE_FIND_ONE = "notice/NOTICE_FIND_ONE";
const NOTICE_FIND_ONE_SUCCESS = "notice/NOTICE_FIND_ONE_SUCCESS";
const NOTICE_FIND_ONE_FAILURE = "notice/NOTICE_FIND_ONE_FAILURE";
const NOTICE_FIND_ONE_INITIALIZE = "notice/NOTICE_FIND_ONE_INITIALIZE";

const NOTICE_PATCH = "notice/NOTICE_PATCH";
const NOTICE_PATCH_SUCCESS = "notice/NOTICE_PATCH_SUCCESS";
const NOTICE_PATCH_FAILURE = "notice/NOTICE_PATCH_FAILURE";
const NOTICE_PATCH_INITIALIZE = "notice/NOTICE_PATCH_INITIALIZE";
const NOTCIE_PATCH_CHANGE = "notice/NOTCIE_PATCH_CHANGE";

const NOTICE_REMOVE = "user/NOTICE_REMOVE";
const NOTICE_REMOVE_SUCCESS = "user/NOTICE_REMOVE_SUCCESS";
const NOTICE_REMOVE_FAILURE = "user/NOTICE_REMOVE_FAILURE";
const NOTICE_REMOVE_INITIALIZE = "user/NOTICE_REMOVE_INITIALIZE";

const NOTICE_WRITE = "notice/NOTICE_WRITE";
const NOTICE_WRITE_SUCCESS = "notice/NOTICE_WRITE_SUCCESS";
const NOTICE_WRITE_FAILURE = "notice/NOTICE_WRITE_FAILURE";
const NOTICE_WRITE_INITIALIZE = "notice/NOTICE_WRITE_INITIALIZE";
const NOTICE_WRITE_CHANGE = "notice/NOTICE_WRITE_CHANGE";

const NOTICE_INITIALIZE = "notice/NOTICE_INITIALIZE";

const noticeRemoveSuccess = (response) => {
  return {
    type: NOTICE_REMOVE_SUCCESS,
    payload: response,
  };
};
const noticeRemoveFailure = (error) => {
  return {
    type: NOTICE_REMOVE_FAILURE,
    payload: error,
  };
};

export const noticeRemoveThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(NOTICE_REMOVE));
  try {
    const response = await noticeRemoveApi(data);
    dispatch(noticeRemoveSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(noticeRemoveFailure(error));
  }
  dispatch(finishLoading(NOTICE_REMOVE));
};

const noticePatchSuccess = (response) => {
  return {
    type: NOTICE_PATCH_SUCCESS,
    payload: response,
  };
};
const noticePatchFailure = (error) => {
  return {
    type: NOTICE_PATCH_FAILURE,
    payload: error,
  };
};

export const noticePatchThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(NOTICE_PATCH));
  try {
    const response = await noticePatchApi(data);
    dispatch(noticePatchSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(noticePatchFailure(error));
  }
  dispatch(finishLoading(NOTICE_PATCH));
};

const noticeFindOneSuccess = (response) => {
  return {
    type: NOTICE_FIND_ONE_SUCCESS,
    payload: response,
  };
};
const noticeFindOneFailure = (error) => {
  return {
    type: NOTICE_FIND_ONE_FAILURE,
    payload: error,
  };
};

export const noticeFindOneThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(NOTICE_FIND_ONE));
  try {
    const response = await noticeFindOneApi(data);
    dispatch(noticeFindOneSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(noticeFindOneFailure(error));
  }
  dispatch(finishLoading(NOTICE_FIND_ONE));
};

const noticeFindAllSuccess = (response) => {
  return {
    type: NOTICE_FIND_ALL_SUCCESS,
    payload: response,
  };
};
const noticeFindAllFailure = (error) => {
  return {
    type: NOTICE_FIND_ALL_FAILURE,
    payload: error,
  };
};

export const noticeFindAllThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(NOTICE_FIND_ALL));
  try {
    const response = await noticeFindAllApi(data);
    dispatch(noticeFindAllSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(noticeFindAllFailure(error));
  }
  dispatch(finishLoading(NOTICE_FIND_ALL));
};

export const noticePatchChange = ({ key, value }) => {
  return {
    type: NOTCIE_PATCH_CHANGE,
    payload: { key, value },
  };
};
export const noticeWriteChange = ({ key, value }) => {
  return {
    type: NOTICE_WRITE_CHANGE,
    payload: { key, value },
  };
};
const noticeWriteSuccess = (response) => {
  return {
    type: NOTICE_WRITE_SUCCESS,
    payload: response,
  };
};
const noticeWriteFailure = (error) => {
  return {
    type: NOTICE_WRITE_FAILURE,
    payload: error,
  };
};

export const noticeWriteThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(NOTICE_WRITE));
  try {
    const response = await noticeWriteApi(data);
    dispatch(noticeWriteSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(noticeWriteFailure(error));
  }
  dispatch(finishLoading(NOTICE_WRITE));
};

export const noticeRemoveIntialize = () => {
  return { type: NOTICE_REMOVE_INITIALIZE };
};

export const noticePatchitialize = () => {
  return { type: NOTICE_PATCH_INITIALIZE };
};

export const noticeFindOneitialize = () => {
  return { type: NOTICE_FIND_ONE_INITIALIZE };
};

export const noticeWriteInitialize = () => {
  return { type: NOTICE_WRITE_INITIALIZE };
};

export const noticeInitialize = () => {
  return { type: NOTICE_INITIALIZE };
};

const initialState = {
  text: null,
  noticeWrite: null,
  noticeWriteError: null,
  noticeFindAll: null,
  noticeFindAllTotal: null,
  noticeFindAllError: null,
  noticeFindOne: null,
  noticeFindOneError: null,
  noticePatch: null,
  noticePatchError: null,
  noticeRemove: null,
  noticeRemoveError: null,
  patchText: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTICE_REMOVE_SUCCESS:
      return { ...state, noticeRemove: action.payload };
    case NOTICE_REMOVE_FAILURE:
      return { ...state, noticeRemoveError: action.payload };
    case NOTICE_PATCH_SUCCESS:
      return { ...state, noticePatch: action.payload };
    case NOTICE_PATCH_FAILURE:
      return { ...state, noticePatchError: action.payload };
    case NOTCIE_PATCH_CHANGE:
      return { ...state, [action.payload.key]: action.payload.value };
    case NOTICE_WRITE_CHANGE:
      return { ...state, [action.payload.key]: action.payload.value };
    case NOTICE_FIND_ALL_SUCCESS:
      return {
        ...state,
        noticeFindAll: action.payload.data,
        noticeFindAllTotal: action.payload.total,
      };
    case NOTICE_FIND_ALL_FAILURE:
      return { ...state, noticeFindAllError: action.payload };
    case NOTICE_WRITE_SUCCESS:
      return { ...state, noticeWrite: action.payload };
    case NOTICE_WRITE_FAILURE:
      return { ...state, noticeWriteError: action.payload };
    case NOTICE_FIND_ONE_SUCCESS:
      return { ...state, noticeFindOne: action.payload };
    case NOTICE_FIND_ONE_FAILURE:
      return { ...state, noticeFindOneError: action.payload };
    case NOTICE_INITIALIZE:
      return {
        text: null,
        noticeWrite: null,
        noticeWriteError: null,
        noticeFindAll: null,
        noticeFindAllTotal: null,
        noticeFindAllError: null,
        noticeFindOne: null,
        noticeFindOneError: null,
        noticePatch: null,
        noticePatchError: null,
        noticeRemove: null,
        noticeRemoveError: null,
        patchText: null,
      };
    case NOTICE_PATCH_INITIALIZE:
      return {
        ...state,
        noticePatch: null,
        noticePatchError: null,
        patchText: null,
      };
    case NOTICE_FIND_ONE_INITIALIZE:
      return { ...state, noticeFindOne: null, noticeFindOneError: null };
    case NOTICE_WRITE_INITIALIZE:
      return {
        ...state,
        text: null,
        noticeWrite: null,
        noticeWriteError: null,
      };
      case NOTICE_REMOVE_INITIALIZE:
        return {
          ...state,
          noticeRemove: null,
          noticeRemoveError: null,
        };
    default:
      return state;
  }
};
