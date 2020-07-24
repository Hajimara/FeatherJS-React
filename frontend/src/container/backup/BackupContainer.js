import React, { useEffect, useState } from "react";
import BackupComponent from "../../component/backup/BackupComponent";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { boardInitialize, boardFindAllThunk } from "../../modules/board";
import { commentInitialize, findAllCommentThunk } from "../../modules/comment";
import { childFindAllCommentThunk } from "../../modules/childComment";
import { backupDownloadThunk } from "../../modules/backup";

function BackupContainer() {
  const dispatch = useDispatch();
  const [fileCount, setFileCount] = useState();
  const {
    user,
    boardFindAll,
    boardFindAllTotal,
    boardFindAllError,
    findAllComment,
    findAllCommentError,
    findAllCommentTotal,
  } = useSelector(({ auth, board, comment }) => ({
    user: auth.user,
    boardFindAll: board.boardFindAll,
    boardFindAllError: board.boardFindAllError,
    boardFindAllTotal: board.boardFindAllTotal,
    findAllComment: comment.findAllComment,
    findAllCommentError: comment.findAllCommentError,
    findAllCommentTotal: comment.findAllCommentTotal,
  }));
  useEffect(() => {
    return () => {
      dispatch(boardInitialize());
      dispatch(commentInitialize());
    };
  }, []);
  useEffect(() => {
    try {
        dispatch(boardFindAllThunk("backup"));
        dispatch(findAllCommentThunk("backup"));
    } catch (error) {
      console.log(error);
      message.error("데이터를 불러오는데 실패하였습니다.");
    }
  }, [dispatch]);
  useEffect(()=>{
      if(boardFindAll){
          let count = 0;
          for (let index = 0; index < boardFindAll.length; index++) {
              const element = boardFindAll[index];
              if(element.hasOwnProperty('file') && element.file !== null && element.file.length !== 0){
                count+=element.file.length;
              }
          }
          setFileCount(count)
      }
  },[boardFindAll])

  const onBackupDownload = () => {
    try {
      dispatch(backupDownloadThunk(user));
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <BackupComponent
      boardFindAllTotal={boardFindAllTotal}
      findAllCommentTotal={findAllCommentTotal}
      fileCount={fileCount}
      onBackupDownload={onBackupDownload}
      user={user}
    />
  );
}

export default BackupContainer;
