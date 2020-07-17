import React, { useEffect, useCallback, useState } from "react";
import Write from "../../component/board/Write";
import { useDispatch, useSelector } from "react-redux";
import { changeField, writeInitialize, writeThunk } from "../../modules/write";
import { message } from "antd";
import { useHistory, useRouteMatch } from "react-router-dom";
import { boardFindOneThunk, boardInitialize } from "../../modules/board";
import Fobidden from "../../authorization/Fobidden";

const titleRegExp = /^.{4,60}$/;
const bodyRegExp = /^.{10,2000}$/;

function WriteContainer() {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();
  const [fileList, setFileList] = useState([]);
  const [category, setCategory] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleteFileId, setDeleteFileId] = useState([]);
  const {
    title,
    body,
    user,
    response,
    error,
    boardFindOne,
    boardFindOneError,
    boardFindOneLoading,
    writeLoading,
  } = useSelector(({ write, auth, board, loading }) => ({
    user: auth.user,
    title: write.title,
    body: write.body,
    response: write.data,
    error: write.error,
    boardFindOne: board.boardFindOne,
    boardFindOneError: board.boardFindOneError,
    boardFindOneLoading: loading["board/BOARD_FIND_ONE"],
    writeLoading: loading["user/WRITE"],
  }));

  // boardId 감지 후 데이터 가져오기
  useEffect(() => {
    if (match.params.hasOwnProperty("boardId")) {
      setIsUpdate(true);
      dispatch(boardFindOneThunk(match.params.boardId));
    }
  }, []);

  // useEffect(() => {
  //   if(writeLoading){
  //   console.log('d');

  //     var xhr = new window.XMLHttpRequest();
  //     // upload progress
  //     console.log(xhr);
      
  //     xhr.addEventListener(
  //       "progress",
  //       function (evt) {
  //         console.log(evt);
          
  //         if (evt.lengthComputable) {
  //           var percentComplete = evt.loaded / evt.total;
  //           console.log(
  //             "upload progress: ",
  //             Math.round(percentComplete * 100) + "%"
  //           );
  //         }
  //       },
  //       false
  //     );
  //   }
  // },[writeLoading]);

  useEffect(() => {
    // 권한 없을 시 바로 팅구기
    // 어드민 제외 자기 게시물 아닐 경우 바로 팅구기
    if (user && boardFindOne) {
      // write
      if (user.role.includes("super") || user.role.includes("c")) {
        if (match.path === "/write/:boardId") {
          if (boardFindOne) {
            if (
              user.role.includes("super") ||
              user.email === boardFindOne.author.email
            ) {
              return;
            } else {
              // message.warning("다른 사용자는 접근 불가합니다.");
              // history.push("/");
              return <Fobidden />;
            }
          }
        }
        return;
      } else {
        if (match.path === "/write") {
          // message.warning("권한이 없는 사용자는 접근 불가합니다.");
          // history.push("/");
          return <Fobidden />;
        }
      }
    }
  }, [user, boardFindOne]);

  useEffect(() => {
    if(boardFindOne){
      if (response) {
        history.push(`/board/${response._id}`);
        message.success("게시물을 등록하였습니다.");
        return;
      }
    }else if(!boardFindOne){
      if (response) {
        console.log(response._id);
        history.push(`/board`);
        message.success("게시물을 등록하였습니다.");
        return;
      }
    }
    
    if (String(error).includes("Unauthorized user")) {
      console.log(error);
      message.error("게시물 등록 권한이 없습니다.");
      return;
    }
    if (String(error).includes("File too large")) {
      console.log(error);
      message.error("파일 크기는 5MB로 제한되어있습니다.");
      return;
    }
    if (String(error).includes("File not found.")) {
      console.log(error);
      message.error("파일을 찾을 수 없습니다.");
      return;
    }
    if (error) {
      console.log(error);
      message.error("게시물을 등록에 실패하였습니다.");
      return;
    }
  }, [response, error, dispatch]);
  // 리덕스 정리
  useEffect(() => {
    return () => {
      dispatch(boardInitialize());
      dispatch(writeInitialize());
    };
  }, [dispatch]);

  useEffect(() => {
    if (boardFindOne) {
      dispatch(
        onChangeField({
          key: "title",
          value: boardFindOne.title,
        })
      );
      setCategory(boardFindOne.category);
    }
  }, [dispatch, boardFindOne]);

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch]
  );
  const onFileChange = () => {
    let file = window.document.getElementById("file").files[0].type;
    console.log(file);
    if (
      file !== "text/csv" &&
      file !== "image/png" &&
      file !== "image/jpeg" &&
      file !== "image/jpg" &&
      file !== "text/plain"
    ) {
      setFileList([]);
      message.warning("사용할 수 없는 파일 형식입니다.");
    }
  };

  const onSubmit = () => {
    let data = null;

    if (boardFindOne) {
      data = {
        _id: boardFindOne._id,
        title,
        body,
        user_id: boardFindOne.author._id,
        username: boardFindOne.author.username,
        email: boardFindOne.author.email,
        image: boardFindOne.author.image,
        category: category,
        attachment: null,
        updatedAt: new Date(),
      };
      console.log(data);
    } else {
      data = {
        title,
        body,
        user_id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        category: category,
        attachment: null,
      };
    }
    // || data.title === null
    if (
      !titleRegExp.test(data.title) ||
      data.title === null ||
      data.title === ""
    ) {
      // 제목 검증
      message.warning("제목의 글자수를 확인해주세요.");
      return;
    }
    // || data.body === null || data.body === ""
    // console.log(data.body);
    if (!bodyRegExp.test(data.body) || data.body === null || data.body === "") {
      // 바디 검증
      message.warning("내용의 글자수를 확인해주세요.");
      return;
    }
    if (data.category === undefined || data.category === "") {
      // 카테고리 검증
      message.warning("카테고리를 선택해주세요.");
      return;
    }
    let formData = new FormData();
    // 파일 검증 추가
    fileList.forEach((file) => {
      formData.append("files", file);
    });
    for (let key in data) {
      formData.append(key, data[key]);
    }

    try {
      if (boardFindOne) {
        if (deleteFileId !== []) {
          formData.append("deleteFileId", JSON.stringify(deleteFileId));
        }
        formData.append("fileArray", JSON.stringify(boardFindOne.file));
        dispatch(writeThunk(formData, boardFindOne._id));
      } else {
        dispatch(writeThunk(formData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (e) => {
    setCategory(e);
  };

  const onDeleteId = (e) => {
    console.log(deleteFileId);
    const eid = e.currentTarget.dataset.id;
    if (deleteFileId.includes(eid)) {
      setDeleteFileId(deleteFileId.filter((item) => item !== eid));
    } else {
      setDeleteFileId(() => deleteFileId.concat(eid));
    }
  };

  const onFileRemove = (e) => {
    console.log(e.uid);
    for (let index = 0; index < fileList.length; index++) {
      const compareFile = fileList[index];
      if (e.uid === compareFile.uid) {
        setFileList(fileList.filter((item) => item.uid !== e.uid));
      } else {
      }
    }
  };

  return (
    <Write
      onFileRemove={onFileRemove}
      onSubmit={onSubmit}
      onChangeField={onChangeField}
      title={title}
      body={body}
      handleCategory={handleCategory}
      isUpdate={isUpdate}
      boardFindOne={boardFindOne}
      boardFindOneError={boardFindOneError}
      boardFindOneLoading={boardFindOneLoading}
      category={category}
      onFileChange={onFileChange}
      fileList={fileList}
      setFileList={setFileList}
      deleteFileId={deleteFileId}
      onDeleteId={onDeleteId}
      writeLoading={writeLoading}
    />
  );
}

export default WriteContainer;
