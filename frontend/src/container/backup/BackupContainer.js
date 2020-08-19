import React, { useEffect, useState } from "react";
import BackupComponent from "../../component/backup/BackupComponent";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { boardInitialize, boardFindAllThunk } from "../../modules/board";
import { commentInitialize, findAllCommentThunk } from "../../modules/comment";
import { restoreUploadThunk, restoreInitialize } from "../../modules/restore";
import axios from "axios";
import Cookies from "universal-cookie";
import FileSaver from "file-saver";
import download from "downloadjs";

function BackupContainer() {
  const dispatch = useDispatch();
  const [fileCount, setFileCount] = useState();
  const [restoreFile, setRestoreFile] = useState([]);
  const [backupLoading, setBackupLoading] = useState([]);
  const [boardIdList, setBoardIdList] = useState([]);

  const {
    user,
    boardFindAll,
    boardFindAllTotal,
    boardFindAllError,
    findAllComment,
    findAllCommentError,
    findAllCommentTotal,
    restoreLoading,
    restoreUpload,
    restoreUploadError
    // backupLoading,
  } = useSelector(({ auth, board, comment, loading, restore }) => ({
    user: auth.user,
    boardFindAll: board.boardFindAll,
    boardFindAllError: board.boardFindAllError,
    boardFindAllTotal: board.boardFindAllTotal,
    findAllComment: comment.findAllComment,
    findAllCommentError: comment.findAllCommentError,
    findAllCommentTotal: comment.findAllCommentTotal,
    restoreLoading: loading["restore/RESTORE_UPLOAD"],
    backupLoading: loading["backup/BACKUP_DOWNLOAD"],
    restoreUpload: restore.restoreUpload,
    restoreUploadError: restore.restoreUploadError,
  }));
  const cookies = new Cookies();

  useEffect(() => {
    return () => {
      dispatch(boardInitialize());
      dispatch(commentInitialize());
    };
  }, []);
  useEffect(()=>{
    if(restoreUploadError){
      if(restoreUploadError.error==='The file cannot be read.'){
        message.error('파일이 손상되었거나 Json형식의 파일이 아닙니다. 다시 시도해주세요')
        dispatch(restoreInitialize());
      }else if(restoreUploadError.error==='File type not matching.'){
        message.error('파일의 유형은 zip 또는 json 파일만 지원됩니다. 다시 시도해주세요')
        dispatch(restoreInitialize());
      }else{
        message.error('복구를 진행할 수 없습니다. 관리자에게 문의해주세요.')
        dispatch(restoreInitialize());
      }
    }
  },[restoreUploadError])
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
    if(restoreUpload){
      if (String(restoreUpload).includes("success")) {
        try {
          dispatch(boardFindAllThunk("backup"));
          dispatch(findAllCommentThunk("backup"));
          dispatch(restoreInitialize());
          message.success("데이터를 복구하였습니다.");
          setBoardIdList([]);
        } catch (error) {
          console.log(error);
          message.error(
            "데이터를 복구하는데 실패하였습니다. 관리자에게 문의해주세요"
          );
          dispatch(restoreInitialize());
          setBoardIdList([]);
        }
      } else if(String(restoreUpload).includes("exist")) {
        message.warning("이미 존재하는 데이터입니다.");
        dispatch(restoreInitialize());
        setBoardIdList([]);
      }else{
        message.error(
          "데이터를 복구하는데 실패하였습니다. 관리자에게 문의해주세요"
        );
        setBoardIdList([]);
      }
    }
  }, [dispatch, restoreUpload]);

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
    let dataStructure =  ['board','comment']
    formData.append("file", restoreFile[0]);
    formData.append("user", user._id);
    formData.append("dataStructure", dataStructure);
    try {
      dispatch(restoreUploadThunk(formData));
    } catch (error) {
      console.log(error);
    }
  };

  const onBackupSubmit = async (e) => {
    if(boardFindAll.length <1 && findAllComment.length <1){
      message.warning('백업 데이터가 없습니다.')
      return;
    }
    setBackupLoading(true);
    try {
      const options = {
        method: "POST",
        // responseType: "blob",
        headers: {
          Authorization: "Bearer " + cookies.get("access_token"),
        },
        data: { user: user._id, selectBoardId: boardIdList, dataStructure: ['board','comment'] },
        url: `http://localhost:3030/backup/`,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 0,
      };
        // timeout: 60*15*1000,

      await axios(options).then(async (response) => {
        console.log(response);
        console.log('response');
        // var blob = new Blob([response.data], {type: "application/zip"});
        // FileSaver.saveAs(blob, "backup.zip");
        // const url = window.URL.createObjectURL(
        //   new Blob([response.data], { type: "application/zip" })
        // );
        // const link = document.createElement("a");
        // link.href = url;
        // link.setAttribute("download", "backup.zip");
        // document.body.appendChild(link);
        // link.click();
        cookies.remove('download')
                cookies.remove('fileName')
        setBackupLoading(false);
      message.success('백업파일을 다운로드합니다.')
        const link = document.createElement("a");
        link.href = response.data;
        link.setAttribute("download", "backup.zip");
        document.body.appendChild(link);
        link.click();
        let downloadDivision = false;
        setTimeout(async()=>{
          let fileName = cookies.get('fileName');
          let download = cookies.get('download');
          if(download === 'success'){
            await axios.delete(`http://localhost:3030/backup?fileName=${fileName}`).then(()=>{
              console.log('remove server file ');
              cookies.remove('download')
              cookies.remove('fileName')
            })
          }else{
            message.error('서버와의 통신이 불안정합니다. 다시 시도해주세요.')
          }
        },2000)
       
    }).catch((error)=>{
      if(String(error).includes('500')){
        console.log(error);
        message.warning('백업 데이터가 없습니다.')
        setBackupLoading(false);
      }else{
        console.log(error);
      message.error('서버와의 통신이 불안정합니다. 다시 시도해주세요.')
      setBackupLoading(false);
      }
      
    });
    } catch (error) {
      console.log(error);
      message.error('서버와의 통신이 불안정합니다. 다시 시도해주세요.')
      setBackupLoading(false);
    }
    setBackupLoading(false);
  };

  const onFileRemove = (e) => {
    for (let index = 0; index < restoreFile.length; index++) {
      const compareFile = restoreFile[index];
      if (e.uid === compareFile.uid) {
        setRestoreFile(restoreFile.filter((item) => item.uid !== e.uid));
      } else {
      }
    }
  };

  const onChangeCheckBox = (e) => {
    let boardId = e.nativeEvent.target.dataset.id;
    let checked = e.target.checked;
    if(checked === true){
      setBoardIdList([...boardIdList , boardId]);
    }else{
      setBoardIdList(boardIdList.filter((item)=> item !== boardId));
    }
    console.log(boardIdList);
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
      boardFindAll={boardFindAll}
      findAllComment={findAllComment}
      onChangeCheckBox={onChangeCheckBox}
      boardIdList={boardIdList}
    />
  );
}

export default BackupContainer;
