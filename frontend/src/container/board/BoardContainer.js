import React, { useEffect, useRef, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import Board from "../../component/board/Board";
import { useDispatch, useSelector } from "react-redux";
import { boardFindOneThunk, boardInitialize } from "../../modules/board";
import { boardRemoveApi, viewCounterApi } from "../../lib/api/board";
import { message } from "antd";
import { writeInitialize } from "../../modules/write";

function BoardContainer() {
  const { boardId } = useRouteMatch().params;
  const [modalVisible, setModalVisible] = useState(false);
  const viewCounterSwitch = useRef(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    boardFindOne,
    boardFindOneError,
    boardFindOneLoading,
    user,
  } = useSelector(({ board, loading, auth }) => ({
    user: auth.user,
    boardFindOne: board.boardFindOne,
    boardFindOneError: board.boardFindOneError,
    boardFindOneLoading: loading["board/BOARD_FIND_ONE"],
  }));
  // 리덕스 스토어 정리
  useEffect(() => {
    return () => {
      dispatch(boardInitialize());
      dispatch(writeInitialize());
    };
  }, []);

  useEffect(()=>{
      if(boardFindOneError){
        message.error('삭제되었거나 존재하지 않는 게시물입니다.')
        history.push('/board');
      }
  },[boardFindOneError]);

  // 데이터 불러오기
  useEffect(() => {
    dispatch(boardFindOneThunk(boardId));
  }, []);

  // useEffect(() => {
  //   // 권한 없을 시 바로 팅구기
  //   if (user) {
  //     // write
  //     if (user.role.includes("super") || user.role.includes("r")) {
  //       return;
  //     } else {
  //       message.warning("권한이 없는 사용자는 접근 불가합니다.");
  //       history.push("/");
  //       return;
  //     }
  //   }
  // }, [user, boardFindOne]);

  useEffect(() => {
    async function view() {
      if (!viewCounterSwitch) {
        viewCounterSwitch = true;
        return;
      }
      if (boardFindOne) {
        console.log({
          id: boardId,
          views: Number(boardFindOne.views) + 1,
        });
        
        await viewCounterApi({
          id: boardId,
          views: Number(boardFindOne.views) + 1,
        });
      }
    }
    view();
  }, [dispatch, boardFindOne]);

  const onRemove = async () => {
    try {
      const response = await boardRemoveApi(boardId);
      console.log(response);
      message.success("게시물이 삭제되었습니다.");
      setModalVisible(false);
      history.push("/board");
    } catch (error) {
      console.log(error);
    }
  };
  const onModal = () => {
    setModalVisible(true);
  };

  const cancelModal = () => {
    setModalVisible(false);
  };

  const onUpdate = () => {
    history.push(`/write/${boardFindOne._id}`);
  };
  return (
    <Board
      boardFindOne={boardFindOne}
      boardFindOneError={boardFindOneError}
      boardFindOneLoading={boardFindOneLoading}
      onRemove={onRemove}
      user={user}
      onUpdate={onUpdate}
      modalVisible={modalVisible}
      onModal={onModal}
cancelModal={cancelModal}
    />
  );
}

export default BoardContainer;
