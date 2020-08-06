import React, { useEffect, useState } from "react";
import BackupComponent from "../../component/backup/BackupComponent";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { boardInitialize, boardFindAllThunk } from "../../modules/board";
import { commentInitialize, findAllCommentThunk } from "../../modules/comment";
import { restoreUploadThunk } from "../../modules/restore";
import { backupDownloadThunk, backupInitialize } from "../../modules/backup";
import { saveAs } from 'file-saver';
import axios from 'axios';
import Cookies from "universal-cookie";

function BackupContainer() {
  const dispatch = useDispatch();
  const [fileCount, setFileCount] = useState();
  const [restoreFile, setRestoreFile] = useState([]);
  const [backupLoading, setBackupLoading] = useState([]);
  const {
    user,
    boardFindAll,
    boardFindAllTotal,
    boardFindAllError,
    findAllComment,
    findAllCommentError,
    findAllCommentTotal,
    restoreLoading,
    backupDownload,
    // backupLoading,
  } = useSelector(({ auth, board, comment, loading,backup }) => ({
    user: auth.user,
    boardFindAll: board.boardFindAll,
    boardFindAllError: board.boardFindAllError,
    boardFindAllTotal: board.boardFindAllTotal,
    findAllComment: comment.findAllComment,
    findAllCommentError: comment.findAllCommentError,
    findAllCommentTotal: comment.findAllCommentTotal,
    restoreLoading: loading["restore/RESTORE_UPLOAD"],
    backupLoading: loading["backup/BACKUP_DOWNLOAD"],
    backupDownload: backup.backupDownload
  }));
  const cookies = new Cookies();

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
    formData.append("file", restoreFile[0]);
    try {
      dispatch(restoreUploadThunk(user._id, formData));
    } catch (error) {
      console.log(error);
    }
  };
 

  const onBackupSubmit = async (e) => {
    setBackupLoading(true);
    try {
      
      const options = {
        method: "POST",
        responseType: "arraybuffer",
        headers: {
          Authorization: "Bearer " + cookies.get("access_token"),
        },
        data: { user: user._id },
        url: `http://localhost:3030/backup/`,
      }; 

      await axios(options).then((response)=>{
        console.log(response);

        const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/zip" })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "backup.zip");
          document.body.appendChild(link);
          link.click();
          setBackupLoading(false);
      })
    } catch (error) {
      console.log(error);
      setBackupLoading(false);
    }
    setBackupLoading(false);
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
      restoreLoading={restoreLoading}
      backupLoading={backupLoading}
      onBackupSubmit={onBackupSubmit}
    />
  );
}

export default BackupContainer;

