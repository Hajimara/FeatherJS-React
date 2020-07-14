import { startLoading, finishLoading } from "./loading";
import { createUser } from "../lib/api/createUser";
import {
  findUserApi,
  findOneApi,
  userRoleUpdateApi,
  removeUserApi,
  patchUserApi,
  userPasswordChangeApi,
} from "../lib/api/user";

const USER_CREATE = "user/USER_CREATE";
const USER_CREATE_SUCCESS = "user/USER_CREATE_SUCCESS";
const USER_CREATE_FAILURE = "user/USER_CREATE_FAILURE";
const USER_INITIALIZE = "user/USER_INITIALIZE";
const ERROR_INITIALIZE = "user/ERROR_INITIALIZE";

const USER_ALL_FIND = "user/USER_ALL_FIND";
const USER_ALL_FIND_SUCCESS = "user/USER_ALL_FIND_SUCCESS";
const USER_ALL_FIND_FAILURE = "user/USER_ALL_FIND_FAILURE";

const USER_ONE_FIND = "user/USER_ONE_FIND";
const USER_ONE_FIND_SUCCESS = "user/USER_ONE_FIND_SUCCESS";
const USER_ONE_FIND_FAILURE = "user/USER_ONE_FIND_FAILURE";
const USER_ONE_FIND_INITIALIZE = "user/USER_ONE_FIND_INITIALIZE";

const USER_ROLE_UPDATE = "user/USER_ROLE_UPDATE";
const USER_ROLE_UPDATE_SUCCESS = "user/USER_ROLE_UPDATE_SUCCESS";
const USER_ROLE_UPDATE_FAILURE = "user/USER_ROLE_UPDATE_FAILURE";
const USER_ROLE_UPDATE_INITIALIZE = "user/USER_ROLE_UPDATE_INITIALIZE";

const USER_REMOVE = "user/USER_REMOVE";
const USER_REMOVE_SUCCESS = "user/USER_REMOVE_SUCCESS";
const USER_REMOVE_FAILURE = "user/USER_REMOVE_FAILURE";
const USER_REMOVE_INITIALIZE = "user/USER_REMOVE_INITIALIZE";

const USER_PATCH = "user/USER_PATCH";
const USER_PATCH_SUCCESS = "user/USER_PATCH_SUCCESS";
const USER_PATCH_FAILURE = "user/USER_PATCH_FAILURE";
const USER_PATCH_INITIALIZE = "user/USER_PATCH_INITIALIZE";

const USER_SOTRE_INITIALIZE = "user/USER_SOTRE_INITIALIZE";

const USER_PASSWORD_CHANGE = "user/USER_PASSWORD_CHANGE";
const USER_PASSWORD_CHANGE_SUCCESS = "user/USER_PASSWORD_CHANGE_SUCCESS";
const USER_PASSWORD_CHANGE_FAILURE = "user/USER_PASSWORD_CHANGE_FAILURE";
const USER_PASSWORD_CHANGE_INITIALIZE = "user/USER_PASSWORD_CHANGE_INITIALIZE";

export const userPasswordChangeInitialize = () => {
  return { type: USER_PASSWORD_CHANGE_INITIALIZE };
};

const userPasswordChangeSuccess = (response) => {
  return { type: USER_PASSWORD_CHANGE_SUCCESS, payload: response };
};

const userPasswordChangeFailure = (error) => {
  return { type: USER_PASSWORD_CHANGE_FAILURE, payload: error };
};

export const userPasswordChangeThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(USER_PASSWORD_CHANGE));
  try {
    const response = await userPasswordChangeApi(data);
    dispatch(userPasswordChangeSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(userPasswordChangeFailure(error));
  }
  dispatch(finishLoading(USER_PASSWORD_CHANGE));
};

export const userPatchInitialize = () => {
  return { type: USER_PATCH_INITIALIZE };
};

const userPatchSuccess = (response) => {
  return { type: USER_PATCH_SUCCESS, payload: response };
};

const userPatchFailure = (error) => {
  return { type: USER_PATCH_FAILURE, payload: error };
};

export const userPatchThunk = (id,data) => async (dispatch, getState) => {
  dispatch(startLoading(USER_PATCH));
  try {
    const response = await patchUserApi(id,data);
    dispatch(userPatchSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(userPatchFailure(error));
  }
  dispatch(finishLoading(USER_PATCH));
};

export const userRemoveInitialize = () => {
  return { type: USER_REMOVE_INITIALIZE };
};

const userRemoveSuccess = (response) => {
  return { type: USER_REMOVE_SUCCESS, payload: response };
};

const userRemoveFailure = (error) => {
  return { type: USER_REMOVE_FAILURE, payload: error };
};

export const userRemoveThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(USER_REMOVE));
  try {
    const response = await removeUserApi(data);
    dispatch(userRemoveSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(userRemoveFailure(error));
  }
  dispatch(finishLoading(USER_REMOVE));
};

export const userStoreInitialize = () => {
  return { type: USER_SOTRE_INITIALIZE };
};

const userRoleUpdateSuccess = (response) => {
  return { type: USER_ROLE_UPDATE_SUCCESS, payload: response };
};

const userRoleUpdateFailure = (error) => {
  return { type: USER_ROLE_UPDATE_FAILURE, payload: error };
};

export const userRoleUpdateThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(USER_ROLE_UPDATE));
  try {
    const response = await userRoleUpdateApi(data);
    dispatch(userRoleUpdateSuccess(response));
  } catch (error) {
    console.log(error);
    dispatch(userRoleUpdateFailure(error));
  }
  dispatch(finishLoading(USER_ROLE_UPDATE));
};

const userOneFindSuccess = (response) => {
  return { type: USER_ONE_FIND_SUCCESS, payload: response };
};

const userOneFindFailure = (error) => {
  return { type: USER_ONE_FIND_FAILURE, payload: error };
};

export const userOneFindThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(USER_ONE_FIND));
  try {
    const response = await findOneApi(data);
    dispatch(userOneFindSuccess(response));
  } catch (error) {
    dispatch(userOneFindFailure(error));
  }
  dispatch(finishLoading(USER_ONE_FIND));
};
export const userRoleUpdateInitialize = () => {
  return {
    type: USER_ROLE_UPDATE_INITIALIZE,
  };
};
export const userOneFindInitialize = () => {
  return {
    type: USER_ONE_FIND_INITIALIZE,
  };
};

export const userInitailize = () => {
  return {
    type: USER_INITIALIZE,
  };
};

export const errorInitailize = () => {
  return {
    type: ERROR_INITIALIZE,
  };
};

const userAllFindSuccess = (response) => {
  return { type: USER_ALL_FIND_SUCCESS, payload: response };
};

const userALlFindFailure = (error) => {
  return { type: USER_ALL_FIND_FAILURE, payload: error };
};

export const userAllFindThunk = (data) => async (dispatch, getState) => {
  dispatch(startLoading(USER_ALL_FIND));
  try {
    const response = await findUserApi(data);
    dispatch(userAllFindSuccess(response));
  } catch (error) {
    dispatch(userALlFindFailure(error));
  }
  dispatch(finishLoading(USER_ALL_FIND));
};
// const FIELD_CHANGE = "user/FIELD_CHANGE";

// export const changeField = ({ form, key, value }) => {
//   return { type: FIELD_CHANGE, payload: { form, key, value } };
// };
const userCreateSuccess = (response) => {
  return { type: USER_CREATE_SUCCESS, payload: response };
};

const userCreateFailure = (error) => {
  return { type: USER_CREATE_FAILURE, payload: error };
};

export const userCreateThunk = (data) => async (dispatch, setState) => {
  dispatch(startLoading(USER_CREATE));
  try {
    const response = await createUser(data);
    dispatch(userCreateSuccess(response));
  } catch (error) {
    dispatch(userCreateFailure(error));
  }
  dispatch(finishLoading(USER_CREATE));
};

const initialState = {
  //   input: {
  //     strategy: "local",
  //     username: "",
  //     email: "",
  //     password: "",
  //     pwConfirm: ""
  //   },
  findAllUser: null,
  findAllUserError: null,
  findAllTotal: null,
  findAllLength: null,
  findOneUser: null,
  findOneUserError: null,
  updateUser: null,
  updateError: null,
  removeUser: null,
  removeError: null,
  patchUser: null,
  patchUserError: null,
  user: null,
  error: null,
  passwordChange: null,
  passwordChangeError: null,
};




export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PASSWORD_CHANGE_INITIALIZE:
      return { ...state, passwordChange: null, passwordChangeError: null };
    case USER_PATCH_INITIALIZE:
      return { ...state, patchUser: null, patchUserError: null };
    case USER_REMOVE_INITIALIZE:
      return { ...state, removeUser: null, removeError: null };
    case USER_SOTRE_INITIALIZE:
      return {
        findAllUser: null,
        findAllUserError: null,
        findAllTotal: null,
        findAllLength: null,
        findOneUser: null,
        findOneUserError: null,
        updateUser: null,
        updateError: null,
        removeUser: null,
        removeError: null,
        patchUser: null,
        patchUserError: null,
        user: null,
        error: null,
        passwordChange: null,
        passwordChangeError: null,
      };
    case USER_ROLE_UPDATE_INITIALIZE:
      return { ...state, updateUser: null, updateError: null };
    case USER_PASSWORD_CHANGE_SUCCESS:
      return { ...state, passwordChange: action.payload };
    case USER_PASSWORD_CHANGE_FAILURE:
      return { ...state, passwordChangeError: action.payload };
    case USER_PATCH_SUCCESS:
      return { ...state, patchUser: action.payload };
    case USER_PATCH_FAILURE:
      return { ...state, patchUserError: action.payload };
    case USER_ROLE_UPDATE_SUCCESS:
      return { ...state, updateUser: action.payload };
    case USER_ROLE_UPDATE_FAILURE:
      return { ...state, updateError: action.payload };
    case USER_REMOVE_SUCCESS:
      return { ...state, removeUser: action.payload };
    case USER_REMOVE_FAILURE:
      return { ...state, removeError: action.payload };
    case USER_ONE_FIND_INITIALIZE:
      return { ...state, findOneUser: null };
    case USER_ONE_FIND_SUCCESS:
      return { ...state, findOneUser: action.payload.data[0] };
    case USER_ONE_FIND_FAILURE:
      return { ...state, findOneUserError: action.payload };
    case USER_CREATE_SUCCESS:
      return { ...state, user: action.payload };
    case USER_CREATE_FAILURE:
      return { ...state, error: action.payload };
    case USER_ALL_FIND_SUCCESS:
      return {
        ...state,
        findAllUser: action.payload.data,
        findAllTotal: action.payload.total,
        findAllLength: action.payload.length,
      };
    case USER_ALL_FIND_FAILURE:
      return { ...state, findAllUserError: action.payload };
    case USER_INITIALIZE:
      return { ...state, user: null };
    case ERROR_INITIALIZE:
      return { ...state, error: null };
    default:
      return state;
  }
};
