import { finishLoading, startLoading } from "./loading";
import { childfindAllCommentApi } from "../lib/api/comment";

const CHILD_WRITE_COMMENT = "childComment/CHILD_WRITE_COMMENT";
const CHILD_WRITE_COMMENT_SUCCESS = "childComment/CHILD_WRITE_COMMENT_SUCCESS";
const CHILD_WRITE_COMMENT_FAILURE = "childComment/CHILD_WRITE_COMMENT_FAILURE";
const CHILD_WRITE_COMMENT_CHANGE = "childComment/CHILD_WRITE_COMMENT_CHANGE";
const CHILD_WRITE_INITIALIZE = "childComment/CHILD_WRITE_INITIALIZE";

const CHILD_COMMENT_INITIALIZE = "childComment/CHILD_COMMENT_INITIALIZE";

const CHILD_FIND_ALL_COMMENT = "childComment/CHILD_FIND_ALL_COMMENT";
const CHILD_FIND_ALL_COMMENT_SUCCESS =
  "childComment/CHILD_FIND_ALL_COMMENT_SUCCESS";
const CHILD_FIND_ALL_COMMENT_FAILURE =
  "childComment/CHILD_FIND_ALL_COMMENT_FAILURE";

const CHILD_FIND_ONE_COMMENT = "childComment/CHILD_FIND_ONE_COMMENT";
const CHILD_FIND_ONE_COMMENT_SUCCESS =
  "childComment/CHILD_FIND_ONE_COMMENT_SUCCESS";
const CHILD_FIND_ONE_COMMENT_FAILURE =
  "childComment/CHILD_FIND_ONE_COMMENT_FAILURE";

const CHILD_PATCH_INITIALIZE = "childComment/CHILD_PATCH_INITIALIZE";
const CHILD_PATCH_COMMENT_CHANGE = "childComment/CHILD_PATCH_COMMENT_CHANGE";

const CHILD_PATCH_COMMENT = "childComment/CHILD_PATCH_COMMENT";
const CHILD_PATCH_COMMENT_SUCCESS = "childComment/CHILD_PATCH_COMMENT_SUCCESS";
const CHILD_PATCH_COMMENT_FAILURE = "childComment/CHILD_PATCH_COMMENT_FAILURE";

const CHILD_REMOVE_COMMENT = "childComment/CHILD_REMOVE_COMMENT";
const CHILD_REMOVE_COMMENT_SUCCESS =
  "childComment/CHILD_REMOVE_COMMENT_SUCCESS";
const CHILD_REMOVE_COMMENT_FAILURE =
  "childComment/CHILD_REMOVE_COMMENT_FAILURE";
const CHILD_REMOVE_INITIALIZE = "childComment/CHILD_REMOVE_INITIALIZE";

const SET_PARENT_ID = "childComment/GET_PARENT_ID";

export const setParentId = (data) => {
  return { type: SET_PARENT_ID, payload: data };
};

export const childRemoveInitialize = () => {
  return { type: CHILD_REMOVE_INITIALIZE };
};

const childRemoveCommentSuccess = (response) => {
  return { type: CHILD_REMOVE_COMMENT_SUCCESS, payload: response };
};

const childRemoveCommentFailure = (error) => {
  return { type: CHILD_REMOVE_COMMENT_FAILURE, payload: error };
};

export const childRemoveCommentThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(CHILD_REMOVE_COMMENT));
  try {
    const response = await childRemoveCommentApi(data);
    dispatch(childRemoveCommentSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(childRemoveCommentFailure(error));
  }
  dispatch(finishLoading(CHILD_REMOVE_COMMENT));
};

const childPatchCommentSuccess = (response) => {
  return { type: CHILD_PATCH_COMMENT_SUCCESS, payload: response };
};

const childPatchCommentFailure = (error) => {
  return { type: CHILD_PATCH_COMMENT_FAILURE, payload: error };
};

export const childPatchCommentThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(CHILD_PATCH_COMMENT));
  try {
    const response = await childPatchCommentApi(data);
    dispatch(childPatchCommentSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(childPatchCommentFailure(error));
  }
  dispatch(finishLoading(CHILD_PATCH_COMMENT));
};

const childFindOneCommentSuccess = (response) => {
  return { type: CHILD_FIND_ONE_COMMENT_SUCCESS, payload: response };
};

const childFindOneCommentFailure = (error) => {
  return { type: CHILD_FIND_ONE_COMMENT_FAILURE, payload: error };
};

export const childFindOneCommentThunk = (data) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading(CHILD_FIND_ONE_COMMENT));
  try {
    const response = await childFindOneCommentApi(data);
    dispatch(childFindOneCommentSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(childFindOneCommentFailure(error));
  }
  dispatch(finishLoading(CHILD_FIND_ONE_COMMENT));
};

export const childPatchCommentInitialize = () => {
  return { type: CHILD_PATCH_INITIALIZE };
};

export const childPatchCommentChange = ({ key, value }) => {
  return {
    type: CHILD_PATCH_COMMENT_CHANGE,
    payload: { key, value },
  };
};
const childFindAllCommentSuccess = (response) => {
  return { type: CHILD_FIND_ALL_COMMENT_SUCCESS, payload: response };
};

const childFindAllCommentFailure = (error) => {
  return { type: CHILD_FIND_ALL_COMMENT_FAILURE, payload: error };
};

export const childFindAllCommentThunk = (data) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading(CHILD_FIND_ALL_COMMENT));
  try {
    const response = await childfindAllCommentApi(data);
    dispatch(childFindAllCommentSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(childFindAllCommentFailure(error));
  }
  dispatch(finishLoading(CHILD_FIND_ALL_COMMENT));
};

export const childCommentInitialize = () => {
  return { type: CHILD_COMMENT_INITIALIZE };
};

export const childWriteInitialize = () => {
  return { type: CHILD_WRITE_INITIALIZE };
};

export const childWriteCommentChange = ({ key, value }) => {
    return {
      type: CHILD_WRITE_COMMENT_CHANGE,
      payload: { key, value },
    };
  };

const childWriteCommentSuccess = (response) => {
  return { type: CHILD_WRITE_COMMENT_SUCCESS, payload: response };
};

const childWriteCommentFailure = (error) => {
  return { type: CHILD_WRITE_COMMENT_FAILURE, payload: error };
};

export const childWriteCommentThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(CHILD_WRITE_COMMENT));
  try {
    const response = await childWriteCommentApi(data);
    dispatch(childWriteCommentSuccess(response));
  } catch (error) {
    dispatch(childWriteCommentFailure(error));
  }
  dispatch(finishLoading(CHILD_WRITE_COMMENT));
};

const initialState = {
  childComment: null,
  childWriteComment: null,
  childWriteCommentError: null,
  childPatchCommentResponse: null,
  childPatchCommentError: null,
  childRemoveCommentResponse: null,
  childRemoveCommentError: null,
  childFindAllComment: null,
  childFindAllCommentTotal: null,
  childFindAllCommentError: null,
  childFindOneComment: null,
  childFindOneCommentError: null,
  childPatchComment: null,
  parentId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PARENT_ID:
      return { ...state, parentId: action.payload };
    case CHILD_REMOVE_COMMENT_SUCCESS:
      return { ...state, childRemoveCommentResponse: action.payload };
    case CHILD_REMOVE_COMMENT_FAILURE:
      return { ...state, childRemoveCommentError: action.payload };
    case CHILD_PATCH_COMMENT_SUCCESS:
      return { ...state, childPatchCommentResponse: action.payload };
    case CHILD_PATCH_COMMENT_FAILURE:
      return { ...state, childPatchCommentError: action.payload };
    case CHILD_FIND_ONE_COMMENT_SUCCESS:
      return { ...state, childFindOneComment: action.payload };
    case CHILD_FIND_ONE_COMMENT_FAILURE:
      return { ...state, childFindOneCommentError: action.payload };
    case CHILD_FIND_ALL_COMMENT_SUCCESS:
      return {
        ...state,
        childFindAllComment: action.payload.data,
        childFindAllCommentTotal: action.payload.total,
      };
    case CHILD_FIND_ALL_COMMENT_FAILURE:
      return { ...state, childFindAllCommentError: action.payload };
    case CHILD_WRITE_COMMENT_SUCCESS:
      return { ...state, childWriteComment: action.payload };
    case CHILD_WRITE_COMMENT_FAILURE:
      return { ...state, childWriteCommentError: action.payload };
    case CHILD_WRITE_COMMENT_CHANGE:
      return { ...state, [action.payload.key]: action.payload.value };
    case CHILD_PATCH_COMMENT_CHANGE:
      return { ...state, [action.payload.key]: action.payload.value };
    case CHILD_REMOVE_INITIALIZE:
      return {
        ...state,
        childRemoveCommentResponse: null,
        childRemoveCommentError: null,
      };
    case CHILD_PATCH_INITIALIZE:
      return {
        ...state,
        childPatchCommentResponse: null,
        childPatchCommentError: null,
        childPatchComment: null,
      };
    case CHILD_WRITE_INITIALIZE:
      return {
        ...state,
        childComment: null,
        childWriteComment: null,
        childWriteCommentError: null,
      };
    case CHILD_COMMENT_INITIALIZE:
      return {
        childComment: null,
        childWriteComment: null,
        childWriteCommentError: null,
        childPatchCommentResponse: null,
        childPatchCommentError: null,
        childRemoveCommentResponse: null,
        childRemoveCommentError: null,
        childFindAllComment: null,
        childFindAllCommentTotal: null,
        childFindAllCommentError: null,
        childFindOneComment: null,
        childFindOneCommentError: null,
        childPatchComment: null,
        parentId: null,
      };
    default:
      return state;
  }
};
