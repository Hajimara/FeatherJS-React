import React, { useEffect, useState } from "react";
import BackupComponent from "../../component/backup/BackupComponent";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { boardInitialize, boardFindAllThunk } from "../../modules/board";
import { commentInitialize, findAllCommentThunk } from "../../modules/comment";
import { restoreUploadThunk } from "../../modules/restore";

function BackupContainer() {
  const dispatch = useDispatch();
  const [fileCount, setFileCount] = useState();
  const [restoreFile, setRestoreFile] = useState([]);
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

  useEffect(() => {
    if (boardFindAll) {
      let count = 0;
      for (let index = 0; index < boardFindAll.length; index++) {
        const element = boardFindAll[index];
        if (
          element.hasOwnProperty("file") &&
          element.file !== null &&
          element.file.length !== 0
        ) {
          count += element.file.length;
        }
      }
      setFileCount(count);
    }
  }, [boardFindAll]);

  const onSubmit = () => {
    let formData = new FormData();
    formData.append('file',restoreFile[0]);
    try {
      console.log(restoreFile);
      console.log(restoreFile[0]);
      
      console.log(user._id, formData);
      dispatch(restoreUploadThunk(user._id, formData));
    } catch (error) {
      console.log(error);
    }
  };
  const onFileRemove = (e) => {
    console.log(e.uid);
    for (let index = 0; index < restoreFile.length; index++) {
      const compareFile = restoreFile[index];
      if (e.uid === compareFile.uid) {
        setRestoreFile(restoreFile.filter((item) => item.uid !== e.uid));
      } else {
      }
    }
  };

  return (
    <BackupComponent
      boardFindAllTotal={boardFindAllTotal}
      findAllCommentTotal={findAllCommentTotal}
      fileCount={fileCount}
      user={user}
      onFileRemove={onFileRemove}
      setRestoreFile={setRestoreFile}
      restoreFile={restoreFile}
      onSubmit={onSubmit}
    />
  );
}

export default BackupContainer;
