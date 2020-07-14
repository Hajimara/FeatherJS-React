import { finishLoading, startLoading } from "./loading";
import {
  writeCommentApi,
  findAllCommentApi,
  findOneCommentApi,
  patchCommentApi,
  removeCommentApi,
} from "../lib/api/comment";

const WRITE_COMMENT = "comment/WRITE_COMMENT";
const WRITE_COMMENT_SUCCESS = "comment/WRITE_COMMENT_SUCCESS";
const WRITE_COMMENT_FAILURE = "comment/WRITE_COMMENT_FAILURE";
const WRITE_INITIALIZE = "comment/WRITE_INITIALIZE";

const COMMENT_INITIALIZE = "comment/COMMENT_INITIALIZE";

const FIND_ALL_COMMENT = "comment/FIND_ALL_COMMENT";
const FIND_ALL_COMMENT_SUCCESS = "comment/FIND_ALL_COMMENT_SUCCESS";
const FIND_ALL_COMMENT_FAILURE = "comment/FIND_ALL_COMMENT_FAILURE";

const FIND_ONE_COMMENT = "comment/FIND_ONE_COMMENT";
const FIND_ONE_COMMENT_SUCCESS = "comment/FIND_ONE_COMMENT_SUCCESS";
const FIND_ONE_COMMENT_FAILURE = "comment/FIND_ONE_COMMENT_FAILURE";

const PATCH_INITIALIZE = "comment/PATCH_INITIALIZE";
const PATCH_COMMENT_CHANGE = "comment/PATCH_COMMENT_CHANGE";

const PATCH_COMMENT = "comment/PATCH_COMMENT";
const PATCH_COMMENT_SUCCESS = "comment/PATCH_COMMENT_SUCCESS";
const PATCH_COMMENT_FAILURE = "comment/PATCH_COMMENT_FAILURE";

const REMOVE_COMMENT = "comment/REMOVE_COMMENT";
const REMOVE_COMMENT_SUCCESS = "comment/REMOVE_COMMENT_SUCCESS";
const REMOVE_COMMENT_FAILURE = "comment/REMOVE_COMMENT_FAILURE";
const REMOVE_INITIALIZE = "comment/REMOVE_INITIALIZE";

export const removeInitialize = () => {
  return { type: REMOVE_INITIALIZE };
};

const removeCommentSuccess = (response) => {
  return { type: REMOVE_COMMENT_SUCCESS, payload: response };
};

const removeCommentFailure = (error) => {
  return { type: REMOVE_COMMENT_FAILURE, payload: error };
};

export const removeCommentThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(REMOVE_COMMENT));
  try {
    const response = await removeCommentApi(data);
    dispatch(removeCommentSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(removeCommentFailure(error));
  }
  dispatch(finishLoading(REMOVE_COMMENT));
};

const patchCommentSuccess = (response) => {
  return { type: PATCH_COMMENT_SUCCESS, payload: response };
};

const patchCommentFailure = (error) => {
  return { type: PATCH_COMMENT_FAILURE, payload: error };
};

export const patchCommentThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(PATCH_COMMENT));
  try {
    const response = await patchCommentApi(data);
    dispatch(patchCommentSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(patchCommentFailure(error));
  }
  dispatch(finishLoading(PATCH_COMMENT));
};

const findOneCommentSuccess = (response) => {
  return { type: FIND_ONE_COMMENT_SUCCESS, payload: response };
};

const findOneCommentFailure = (error) => {
  return { type: FIND_ONE_COMMENT_FAILURE, payload: error };
};

export const findOneCommentThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(FIND_ONE_COMMENT));
  try {
    const response = await findOneCommentApi(data);
    dispatch(findOneCommentSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(findOneCommentFailure(error));
  }
  dispatch(finishLoading(FIND_ONE_COMMENT));
};

export const patchCommentInitialize = () => {
  return { type: PATCH_INITIALIZE };
};

export const patchCommentChange = ({ key, value }) => {
  return {
    type: PATCH_COMMENT_CHANGE,
    payload: { key, value },
  };
};
const findAllCommentSuccess = (response) => {
  return { type: FIND_ALL_COMMENT_SUCCESS, payload: response };
};

const findAllCommentFailure = (error) => {
  return { type: FIND_ALL_COMMENT_FAILURE, payload: error };
};

export const findAllCommentThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(FIND_ALL_COMMENT));
  try {
    const response = await findAllCommentApi(data);
    dispatch(findAllCommentSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(findAllCommentFailure(error));
  }
  dispatch(finishLoading(FIND_ALL_COMMENT));
};

export const commentInitialize = () => {
  return { type: COMMENT_INITIALIZE };
};

export const writeInitialize = () => {
  return { type: WRITE_INITIALIZE };
};

const writeCommentSuccess = (response) => {
  return { type: WRITE_COMMENT_SUCCESS, payload: response };
};

const writeCommentFailure = (error) => {
  return { type: WRITE_COMMENT_FAILURE, payload: error };
};

export const writeCommentThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(WRITE_COMMENT));
  try {
    const response = await writeCommentApi(data);
    dispatch(writeCommentSuccess(response));
  } catch (error) {
    dispatch(writeCommentFailure(error));
  }
  dispatch(finishLoading(WRITE_COMMENT));
};

const initialState = {
  comment: null,
  writeComment: null,
  writeCommentError: null,
  patchCommentResponse: null,
  patchCommentError: null,
  removeCommentResponse: null,
  removeCommentError: null,
  findAllComment: null,
  findAllCommentTotal: null,
  findAllCommentError: null,
  findOneComment: null,
  findOneCommentError: null,
  patchComment: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_COMMENT_SUCCESS:
      return { ...state, removeCommentResponse: action.payload };
    case REMOVE_COMMENT_FAILURE:
      return { ...state, removeCommentError: action.payload };
    case PATCH_COMMENT_SUCCESS:
      return { ...state, patchCommentResponse: action.payload };
    case PATCH_COMMENT_FAILURE:
      return { ...state, patchCommentError: action.payload };
    case FIND_ONE_COMMENT_SUCCESS:
      return { ...state, findOneComment: action.payload };
    case FIND_ONE_COMMENT_FAILURE:
      return { ...state, findOneCommentError: action.payload };
    case FIND_ALL_COMMENT_SUCCESS:
      return {
        ...state,
        findAllComment: action.payload.data,
        findAllCommentTotal: action.payload.total,
      };
    case FIND_ALL_COMMENT_FAILURE:
      return { ...state, findAllCommentError: action.payload };
    case WRITE_COMMENT_SUCCESS:
      return { ...state, writeComment: action.payload };
    case WRITE_COMMENT_FAILURE:
      return { ...state, writeCommentError: action.payload };
    case PATCH_COMMENT_CHANGE:
      return { ...state, [action.payload.key]: action.payload.value };
    case REMOVE_INITIALIZE:
      return {
        ...state,
        removeCommentResponse: null,
        removeCommentError: null,
      };
    case PATCH_INITIALIZE:
      return {
        ...state,
        patchComment: null,
        patchCommentResponse: null,
        patchCommentError: null,
      };
    case WRITE_INITIALIZE:
      return {
        ...state,
        comment: null,
        writeComment: null,
        writeCommentError: null,
      };
    case COMMENT_INITIALIZE:
      return {
        comment: null,
        writeComment: null,
        writeCommentError: null,
        patchCommentResponse: null,
        patchCommentError: null,
        findAllComment: null,
        findAllCommentTotal: null,
        findAllCommentError: null,
        findOneComment: null,
        findOneCommentError: null,
        patchComment: null,
        removeCommentResponse: null,
        removeCommentError: null,
      };
    default:
      return state;
  }
};
