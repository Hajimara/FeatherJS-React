import React, { useEffect, useState, useCallback } from "react";
import CommentComponent from "../../component/comment/CommentComponent";
import { useSelector, useDispatch } from "react-redux";
import { checkThunk } from "../../modules/auth";
import { message } from "antd";
import {
  commentInitialize,
  writeInitialize,
  writeCommentThunk,
  findAllCommentThunk,
  patchCommentChange,
  patchCommentInitialize,
  findOneCommentThunk,
  patchCommentThunk,
  removeInitialize,
  removeCommentThunk,
} from "../../modules/comment";
import { useRouteMatch } from "react-router-dom";
import { setParentId, childCommentInitialize } from "../../modules/childComment";

const commentRegExp = /^.{0,350}$/;

function CommentContainer() {
  const dispatch = useDispatch();
  const [parentComment, setParentComment] = useState();
//   const [childComment, setChildComment] = useState();
  const [parentPatchUUID, setParentPatchUUID] = useState();
  const [replyTo, setReplyTo] = useState('');
  const [patchId, setPatchId] = useState();
  const [removeObject, setRemoveObject] = useState();
  const match = useRouteMatch();
  const {
    user,
    writeComment,
    writeCommentError,
    findAllComment,
    findAllCommentError,
    findAllCommentTotal,
    patchComment,
    findOneComment,
    findOneCommentError,
    patchCommentResponse,
    patchCommentError,
    removeCommentResponse,
    removeCommentError,

    parentId,
    childComment,
  } = useSelector(({ auth, comment, childComment }) => ({
        parentId: childComment.parentId,
        patchComment: comment.patchComment,
    findAllCommentTotal: comment.findAllCommentTotal,
    findAllComment: comment.findAllComment,
    findAllCommentError: comment.findAllCommentError,
    user: auth.user,
    writeComment: comment.writeComment,
    writeCommentError: comment.writeCommentError,
    findOneComment: comment.findOneComment,
    findOneCommentError: comment.findOneCommentError,
    patchCommentResponse: comment.patchCommentResponse,
    patchCommentError: comment.patchCommentError,
    removeCommentResponse: comment.removeCommentResponse,
    removeCommentError: comment.removeCommentError,

    // childComment: childComment.childComment,
    // childWriteComment: childComment.childWriteComment,
    // childWriteCommentError: childComment.childWriteCommentError,
    // childPatchCommentResponse: childComment.childPatchCommentResponse,
    // childPatchCommentError: childComment.childPatchCommentError,
    // childRemoveCommentResponse: childComment.childRemoveCommentResponse,
    // childRemoveCommentError: childComment.childRemoveCommentError,
    // childFindAllComment: childComment.childFindAllComment,
    // childFindAllCommentTotal: childComment.childFindAllCommentTotal,
    // childFindAllCommentError: childComment.childFindAllCommentError,
    // childFindOneComment: childComment.childFindOneComment,
    // childFindOneCommentError: childComment.childFindOneCommentError,
    // childPatchComment: childComment.childPatchComment,
  }));

  useEffect(() => {
    if (removeCommentResponse) {
      message.success("댓글이 삭제되었습니다.");
      dispatch(removeInitialize());
      setRemoveObject('');
      return;
    }
    if (removeCommentError) {
      message.error("댓글 삭제에 실패하였습니다. 관리자에게 문의해주세요.");
      dispatch(removeInitialize());
      setRemoveObject('');
      return;
    }
  }, [removeCommentResponse, removeCommentError, dispatch]);
// 스토어 비우기
  useEffect(() => {
    return () => {
        dispatch(childCommentInitialize());
        dispatch(commentInitialize());
    };
  }, []);
  // 댓글 수정 후처리
  useEffect(() => {
    setParentPatchUUID("");
    dispatch(patchCommentInitialize());
  }, [patchCommentResponse, patchCommentError, dispatch]);
  //  댓글불러오기
  useEffect(() => {
    const data = {
      boardId: match.params.boardId,
      page: 1,
    };
    dispatch(findAllCommentThunk(data));
  }, [dispatch, writeComment, patchCommentResponse,removeCommentResponse]);

  //댓글 불러오기 후처리
  useEffect(() => {
    if (findAllComment) {
      return;
    }
    if (findAllCommentError) {
      message.error("댓글을 불러오는데 실패했습니다.");
    }
  }, [findAllComment, findAllCommentError]);

  //댓글 작성 후처리
  useEffect(() => {
    if (writeComment) {
      message.success("댓글을 작성하였습니다.");
      setParentComment("");
      dispatch(writeInitialize());
      return;
    }

    if (writeCommentError) {
      message.error("댓글 작성에 실패하였습니다. 관리자에게 문의해주세요.");
      setParentComment("");
      dispatch(writeInitialize());
      return;
    }
  }, [writeComment, writeCommentError, dispatch]);

  useEffect(() => {
    dispatch(checkThunk());
  }, [dispatch]);

  useEffect(() => {
    if (findOneComment) {
      onChangeField({ key: "patchComment", value: findOneComment.text });

      return;
    }
    if (findOneCommentError) {
      message.error("데이터를 가져오는데 실패하였습니다.");
      return;
    }
  }, [findOneComment, findOneCommentError]);
  const swapPatchParentComment = (e) => {
    dispatch(patchCommentInitialize());
    dispatch(findOneCommentThunk({_id : e.currentTarget.dataset.dbid}));
    setPatchId(e.currentTarget.dataset.dbid);
    setParentPatchUUID(e.currentTarget.dataset.id);
  };
  const swapPatchParentCommentCancel = (e) => {
    dispatch(patchCommentInitialize());
    setPatchId("");
    setParentPatchUUID("");
  };

  const onParentChange = (e) => {
    setParentComment(e.target.value);
  };

  const onChildChange = (e) => {
    setChildComment(e.target.value);
  };

  const onParentWirte = () => {
    console.log(user.image);
    
    const data = {
      page: 1,
      boardId: match.params.boardId,
      // 글자수 350 제한 !test
      author: {
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
      },
        parentCommentId: null,
        text: parentComment,
    };
    if(!commentRegExp.test(data.text)){
        message.warning('글자 수는 350자 이내로 작성해주시기 바랍니다.')
        return;
    }
    dispatch(writeCommentThunk(data));
  };

  const onChildWirte = () => {
    // 글자수 350 제한
    const data = {
      boardId: match.params.boardId,
      author: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      parentCommentId: { _id: data.parentCommentId, hasComment: "yes" },
      text: childComment,
    };
    if(!commentRegExp.test(data.text)){
        message.warning('글자 수는 350자 이내로 작성해주시기 바랍니다.')
        return;
    }
    dispatch(writeCommentThunk(data));
  };

  const onParentPagination = (e) => {
    const data = {
      boardId: match.params.boardId,
      page: e,
    };
    dispatch(findAllCommentThunk(data));
  };

  const onChangeField = useCallback(
    (payload) => dispatch(patchCommentChange(payload)),
    [dispatch]
  );

  const onPatchComment = () => {
    const data = {
      _id: patchId,
      author: { _id: findOneComment.author._id,
        username: findOneComment.author.username,
        email: findOneComment.author.email, 
        image: findOneComment.author.image,
      },
      text: patchComment,
    };
    if(!commentRegExp.test(data.text)){
        message.warning('글자 수는 350자 이내로 작성해주시기 바랍니다.')
        return;
    }
    dispatch(patchCommentThunk(data));
  };

  const getRemoveId = (e) => {
      setRemoveObject({
        _id: e.currentTarget.dataset.uid,
        email: e.currentTarget.dataset.email,
        username: e.currentTarget.dataset.uname,
        image: user.image,
      });
      setPatchId(e.currentTarget.dataset.dbid)
  }

 
  const onRemoveComment = (e) => {
      const data= {
        patchId: patchId,
        author: removeObject,
      };
      try {
        dispatch(removeCommentThunk(data));
      } catch (error) {
        message.error("댓글 삭제에 실패하였습니다. 관리자에게 문의해주세요.");
        console.log(error);
      }
  }
  const onReplyTo= (e) => {
      setPatchId('');
      setParentPatchUUID('')
      if(replyTo === ''){
        setReplyTo(e.currentTarget.dataset.dbid)
        dispatch(
            setParentId(e.currentTarget.dataset.dbid)
        );
    }else{
        dispatch(childCommentInitialize());
        setReplyTo('');
    }
  }

  return (
    <CommentComponent
      user={user}
      parentComment={parentComment}
      childComment={childComment}
      findAllComment={findAllComment}
      findAllCommentTotal={findAllCommentTotal}
      parentPatchUUID={parentPatchUUID}
      patchComment={patchComment}
      onChangeField={onChangeField}
      onParentChange={onParentChange}
      onChildChange={onChildChange}
      onParentWirte={onParentWirte}
      onChildWirte={onChildWirte}
      onParentPagination={onParentPagination}
      swapPatchParentComment={swapPatchParentComment}
      onPatchComment={onPatchComment}
      swapPatchParentCommentCancel={swapPatchParentCommentCancel}
      onRemoveComment={onRemoveComment}
      getRemoveId={getRemoveId}
      replyTo={replyTo}
      onReplyTo={onReplyTo}
      parentId={parentId}
    />
  );
}

export default CommentContainer;
