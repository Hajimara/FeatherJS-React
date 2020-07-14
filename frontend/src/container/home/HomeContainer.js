import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "../../component/home/Home";
import { userStoreInitialize, userAllFindThunk } from "../../modules/user";
import { checkThunk } from "../../modules/auth";
import { boardInitialize, boardFindAllThunk } from "../../modules/board";

function HomeContainer() {
  const dispatch = useDispatch();
  const {
    findAllUser,
    userProfile,
    boardFindAll,
    boardFindAllError,
  } = useSelector(({ auth, user, board }) => ({
    findAllUser: user.findAllUser,
    boardFindAll: board.boardFindAll,
    boardFindAllError: board.boardFindAllError,
    userProfile: auth.user,
  }));

  // 유저 리스트 불러오기
  useEffect(() => {
    dispatch(userAllFindThunk("home"));
    dispatch(boardFindAllThunk("home"));
    dispatch(checkThunk());
  }, [dispatch]);

  // 페이지 스토어 정리
  useEffect(() => {
    return () => {
      dispatch(userStoreInitialize());
      dispatch(boardInitialize());
    };
  }, [dispatch]);

  return (
    <Home
      userProfile={userProfile}
      findAllUser={findAllUser}
      boardFindAll={boardFindAll}
      boardFindAllError={boardFindAllError}
    />
  );
}

export default HomeContainer;
