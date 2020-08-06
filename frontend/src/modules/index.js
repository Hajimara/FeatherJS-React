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
import backup from "./backup";

const rootReducer = combineReducers({
  loading,
  auth,
  user,
  board,
  write,
  comment,
  childComment,
  restore,
  notice,
  backup
});

export default rootReducer;
