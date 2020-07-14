import { startLoading, finishLoading } from "./loading";
import { boardFindAllApi,boardFindOneApi } from "../lib/api/board";

const BOARD_FIND_ALL = "board/BOARD_FIND_ALL";
const BOARD_FIND_ALL_SUCCESS = "board/BOARD_FIND_ALL_SUCCESS";
const BOARD_FIND_ALL_FAILURE = "board/BOARD_FIND_ALL_FAILURE";

const BOARD_FIND_ONE = "board/BOARD_FIND_ONE";
const BOARD_FIND_ONE_SUCCESS = "board/BOARD_FIND_ONE_SUCCESS";
const BOARD_FIND_ONE_FAILURE = "board/BOARD_FIND_ONE_FAILURE";

const BOARD_INITIALIZE = "board/BOARD_INITIALIZE";

const boardFindOneSuccess = (response) => {
  return { type: BOARD_FIND_ONE_SUCCESS, payload: response };
};

const boardFindOneFailure = (error) => {
  return { type: BOARD_FIND_ONE_FAILURE, payload: error };
};

export const boardFindOneThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(BOARD_FIND_ONE));
  try {
    const response = await boardFindOneApi(data);
    dispatch(boardFindOneSuccess(response));
  } catch (error) {
    dispatch(boardFindOneFailure(error));
  }
  dispatch(finishLoading(BOARD_FIND_ONE));
};

export const boardInitialize = () => {
  return { type: BOARD_INITIALIZE };
};

const boardFindAllSuccess = (response) => {
  return { type: BOARD_FIND_ALL_SUCCESS, payload: response };
};

const boardFindAllFailure = (error) => {
  return { type: BOARD_FIND_ALL_FAILURE, payload: error };
};

export const boardFindAllThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(BOARD_FIND_ALL));
  try {
    const response = await boardFindAllApi(data);
    dispatch(boardFindAllSuccess(response));
  } catch (error) {
    dispatch(boardFindAllFailure(error));
  }
  dispatch(finishLoading(BOARD_FIND_ALL));
};

const initialState = {
  boardFindAll: null,
  boardFindAllTotal: null,
  boardFindAllError: null,
  boardFindOne: null,
  boardFindOneError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOARD_FIND_ONE_SUCCESS:
      return { ...state, boardFindOne: action.payload };
    case BOARD_FIND_ONE_FAILURE:
      return { ...state, boardFindOneError: action.payload };
    case BOARD_FIND_ALL_SUCCESS:
      return {
        ...state,
        boardFindAll: action.payload.data,
        boardFindAllTotal: action.payload.total,
      };
    case BOARD_FIND_ALL_FAILURE:
      return { ...state, boardFindAllError: action.payload };
    case BOARD_INITIALIZE:
      return {
        boardFindAll: null,
        boardFindAllError: null,
        boardFindAllTotal: null,
        boardFindOne: null,
        boardFindOneError: null,
      };
    default:
      return state;
  }
};
