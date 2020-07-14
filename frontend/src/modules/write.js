import { writeApi } from "../lib/api/board";
import { startLoading, finishLoading } from "./loading";

const CHANGE_FIELD = "write/CHANGE_FIELD";
const INITIALIZE = "write/INITIALIZE";

const WRITE = "user/WRITE";
const WRITE_SUCCESS = "user/WRITE_SUCCESS";
const WRITE_FAILURE = "user/WRITE_FAILURE";

const writeSuccess = (response) => {
  return { type: WRITE_SUCCESS, payload: response };
};

const writeFailure = (error) => {
  return { type: WRITE_FAILURE, payload: error };
};

export const writeThunk = (data,dataId) => async (dispatch, getState) => {
  dispatch(startLoading(WRITE));
  try {
    const response = await writeApi(data,dataId);
    dispatch(writeSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(writeFailure(error));
  }
  dispatch(finishLoading(WRITE));
};

export const writeInitialize = () => {
  return { type: INITIALIZE };
};

export const changeField = ({ key, value }) => {
  return { type: CHANGE_FIELD, payload: { key, value } };
};

const initialState = {
  title: null,
  body: null,
  data: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      return { ...state, [action.payload.key]: action.payload.value };
    case INITIALIZE:
      return { title: null, body: null, data: null, error: null };
    case WRITE_SUCCESS:
      return { ...state, data: action.payload };
    case WRITE_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
