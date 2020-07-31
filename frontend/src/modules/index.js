import { combineReducers } from "redux";
import loading from "./loading";
import auth from "./auth";
import user from "./user";
import board from "./board";
import write from "./write";
import comment from "./comment";
import childComment from "./childComment";
import notice from "./notice";
import restore from "./restore";

const rootReducer = combineReducers({
  loading,
  auth,
  user,
  board,
  write,
  comment,
  childComment,
  restore,
  notice
});

export default rootReducer;
