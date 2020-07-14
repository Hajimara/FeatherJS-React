import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChildCommentComponent from "../../component/comment/ChildCommentComponent";
import { childWriteCommentChange, childWriteCommentThunk } from "../../modules/childComment";
import { useRouteMatch } from "react-router-dom";

const commentRegExp = /^.{0,350}$/;

function ChildCommentContainer() {
  const match = useRouteMatch();
  const dispatch = useDispatch();
    const {
        user,
        childComment,
        childWriteComment,
        childWriteCommentError,
        childPatchCommentResponse,
        childPatchCommentError,
        childRemoveCommentResponse,
        childRemoveCommentError,
        childFindAllComment,
        childFindAllCommentTotal,
        childFindAllCommentError,
        childFindOneComment,
        childFindOneCommentError,
        childPatchComment,
        parentId,
      } = useSelector(({ auth,childComment }) => ({
        parentId: childComment.parentId,
        user: auth.user,
        childComment: childComment.childComment,
        childWriteComment: childComment.childWriteComment,
        childWriteCommentError: childComment.childWriteCommentError,
        childPatchCommentResponse: childComment.childPatchCommentResponse,
        childPatchCommentError: childComment.childPatchCommentError,
        childRemoveCommentResponse: childComment.childRemoveCommentResponse,
        childRemoveCommentError: childComment.childRemoveCommentError,
        childFindAllComment: childComment.childFindAllComment,
        childFindAllCommentTotal: childComment.childFindAllCommentTotal,
        childFindAllCommentError: childComment.childFindAllCommentError,
        childFindOneComment: childComment.childFindOneComment,
        childFindOneCommentError: childComment.childFindOneCommentError,
        childPatchComment: childComment.childPatchComment,
      }));

      const onChangeField = useCallback(
        (payload) => dispatch(childWriteCommentChange(payload)),
        [dispatch]
      );

      const onWriteComment = () => {
        const data = {
            boardId: match.params.boardId,
            author: {
              _id: user._id,
              username: user.username,
              email: user.email,
            },
            parentCommentId: { _id: parentId, hasComment: "yes" },
            text: childComment,
          };
          if(!commentRegExp.test(data.text)){
              message.warning('글자 수는 350자 이내로 작성해주시기 바랍니다.')
              return;
          }
        dispatch(childWriteCommentThunk(data))
      }
        return (
          <ChildCommentComponent
            childComment={childComment}
            user={user}
            parentId={parentId}

            onChangeField={onChangeField}
            onWriteComment={onWriteComment}
          />
        );
}

export default ChildCommentContainer;