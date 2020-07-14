import { startLoading, finishLoading } from "./loading";
import { userLogin } from "../lib/api/auth";
import { checkStateApi } from "../lib/api/check";

const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";
const ERROR_RESET = "auth/ERROR_RESET";
const CHECK_STATE = "auth/CHECK_STATE";
const LOGOUT = "auth/LOGOUT";

export const logout = () => {
  return { type: LOGOUT };
};

const checkState = (response) => {
  return {
    type: CHECK_STATE,
    payload: response,
  };
};

export const errorReset = () => {
  return {
    type: ERROR_RESET,
    payload: null,
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};
export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const checkThunk = (data) => async (dispatch, getState) => {
  try {
    const response = await checkStateApi(data);
    dispatch(checkState(response.users));
  } catch (error) {
    console.log(error);
  }
};

export const loginThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(LOGIN));
  try {
    const response = await userLogin(data);
    dispatch(loginSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(loginFailure(error));
  }
  dispatch(finishLoading(LOGIN));
};

const initialState = {
  auth: null,
  error: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, auth: action.payload };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload };
    case ERROR_RESET:
      return { ...state, error: action.payload };
    case CHECK_STATE:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { auth: null, error: null, user: null };
    default:
      return state;
  }
};
