import React, { useEffect, useCallback, useState } from "react";
import Notice from "../../component/home/Notice";
import { useSelector, useDispatch } from "react-redux";
import {
  noticeWriteInitialize,
  noticeWriteChange,
  noticeWriteThunk,
  noticeFindAllThunk,
  noticeFindOneThunk,
  noticePatchitialize,
  noticePatchChange,
  noticePatchThunk,
  noticeRemoveThunk,
  noticeRemoveIntialize,
} from "../../modules/notice";
import { message } from "antd";
import { checkThunk } from "../../modules/auth";

const textRegExp = /^.{2,100}$/;

function NoticeContainer() {
  const dispatch = useDispatch();
  const [patchCreatedAt, setPatchCreatedAt] = useState();
  const [patchId, setPatchId] = useState();
  const [removeId, setRemoveId] = useState();

  const {
    userProfile,
    text,
    noticeWrite,
    noticeWriteError,
    noticeFindAll,
    noticeFindAllTotal,
    noticeFindAllError,
    noticeFindOne,
    noticeFindOneError,
    patchText,
    noticePatch,
    noticePatchError,
    noticeRemove,
noticeRemoveError,
  } = useSelector(({ auth, notice }) => ({
    userProfile: auth.user,
    text: notice.text,
    noticeWrite: notice.noticeWrite,
    noticeWriteError: notice.noticeWriteError,
    noticeFindAll: notice.noticeFindAll,
    noticeFindAllTotal: notice.noticeFindAllTotal,
    noticeFindAllError: notice.noticeFindAllError,
    noticeFindOne: notice.noticeFindOne,
    noticeFindOneError: notice.noticeFindOneError,
    patchText: notice.patchText,
    noticePatch: notice.noticePatch,
    noticePatchError: notice.noticePatchError,
    noticeRemove: notice.noticeRemove,
noticeRemoveError: notice.noticeRemoveError,
  }));

  
  useEffect(() => {
    dispatch(checkThunk());
  }, [dispatch]);

useEffect(() => {
  if (noticeRemove) {
    message.success("글을 삭제하였습니다.");
    dispatch(noticeRemoveIntialize());
    setRemoveId("");
    dispatch(noticeFindAllThunk());
    return;
  }
  if (noticeRemoveError) {
    message.error("글 삭제에 실패하였습니다.");
    dispatch(noticeRemoveIntialize());
    return;
  }
}, [noticeRemove, noticeRemoveError]);

  useEffect(() => {
    if (noticeFindOne) {
      dispatch(
        noticePatchChange({ key: "patchText", value: noticeFindOne.text })
      );
    }
  }, [noticeFindOne, dispatch]);

  useEffect(() => {
    if (noticePatch) {
      message.success("글을 수정하였습니다.");
      dispatch(noticePatchitialize());
      setPatchCreatedAt("");
      setPatchId("");
      dispatch(noticeFindAllThunk());
      return;
    }
    if (noticePatchError) {
      message.error("글 수정에 실패하였습니다.");
      dispatch(noticePatchitialize());
      return;
    }
  }, [noticePatch, noticePatchError]);

  useEffect(() => {
    if (noticeWrite) {
      message.success("글을 작성하였습니다.");
      dispatch(noticeWriteInitialize());
      dispatch(noticeFindAllThunk());
      return;
    }
    if (noticeWriteError) {
      message.error("글 작성에 실패하였습니다.");
      dispatch(noticeWriteInitialize());
      return;
    }
  }, [noticeWrite, noticeWriteError]);

  useEffect(() => {
    return () => {
      dispatch(noticeWriteInitialize());
    };
  }, []);

  useEffect(() => {
    dispatch(noticeFindAllThunk());
  }, []);

  const onChangeField = useCallback(
    (payload) => dispatch(noticeWriteChange(payload)),
    [dispatch]
  );

  const onChangePatchField = (e) => {
    dispatch(noticePatchChange({ key: "patchText", value: e.target.value }));
  };
  const onSubmit = () => {
    const data = {
      author: {
        _id: userProfile._id,
        username: userProfile.username,
        email: userProfile.email,
        image: userProfile.image,
      },
      text: text,
    };
    if (!textRegExp.test(data.text)) {
      message.warning("텍스트는 2~100자 제한입니다.");
      return;
    }
    dispatch(noticeWriteThunk(data));
  };

  const swapPatchCancel = () => {
    setPatchCreatedAt("");
    setPatchId("");
    dispatch(noticePatchitialize());
  };

  const swapPatch = (e) => {
    dispatch(noticeFindOneThunk(e.currentTarget.dataset.dbid));
    setPatchCreatedAt(e.currentTarget.dataset.id);
    setPatchId(e.currentTarget.dataset.dbid);
  };

  const patchSubmit = () => {
    const data = { _id: patchId, text: patchText };
    dispatch(noticePatchThunk(data));
    console.log(data);
  };

  const getRemoveId = (e) => {
    setRemoveId(e.currentTarget.dataset.dbid);
  }

  const onRemove = () => {
    dispatch(noticeRemoveThunk(removeId));
  }

  return (
    <Notice
      userProfile={userProfile}
      text={text}
      onChangeField={onChangeField}
      onSubmit={onSubmit}
      noticeFindAll={noticeFindAll}
      noticeFindAllTotal={noticeFindAllTotal}
      patchCreatedAt={patchCreatedAt}
      swapPatchCancel={swapPatchCancel}
      swapPatch={swapPatch}
      noticeFindOne={noticeFindOne}
      onChangePatchField={onChangePatchField}
      patchText={patchText}
      patchSubmit={patchSubmit}
      getRemoveId={getRemoveId}
      onRemove={onRemove}
    />
  );
}

export default NoticeContainer;
