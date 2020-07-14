import React from "react";
import styled from "styled-components";
import {
  Divider,
  Tooltip,
  List,
  Comment,
  Input,
  Card,
  Avatar,
  Button,
  Pagination,
  Popconfirm,
} from "antd";
import moment from "moment";
import { date_to_str } from "../../lib/timeFormatter";
import { uuidv4 } from "../../lib/uuidCreator";

const Area = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  background-color: white;
  min-width: 1000px;
  min-height: 700px;
`;
const CommentWriteArea = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  justify-content: left;
  align-items: center;
`;
const CommentWriteBox = styled.div`
  display: flex;
  width: 60%;
  margin-left: 230px;
`;
const CommentWriteInput = styled(Input.TextArea)`
  width: 90%;
`;

const CommentArea = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UserInfo = styled(Card.Meta)`
  width: 25%;
`;

const CommentList = styled(List)`
  width: 70%;
`;

const ButtonBox = styled.div`
  width: 80px;
  height: inherit;
  display: flex;
  flex-direction: column-reverse;
`;

const ButtonWrite = styled(Button)`
  margin: 0 10px;
`;

const PaginationBox = styled.div`
  width: 65%;
  display: flex;
  justify-content: flex-end;
`;
const PaginationStyled = styled(Pagination)`
  margin: 20px 0;
`;

const PatchBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const PatchInput = styled(Input.TextArea)`
  width: 60%;
`;
const PatchButton = styled(Button)`
  margin-left: 10px;
`;

function ChildCommentComponent({
    user,
    parentId,
    childComment,
    onChangeField,
    onWriteComment
}) {
  const onChangeWrite = (e) => {
    onChangeField({ key: e.target.name, value: e.target.value });
  };

  return (
    <>
      <Area>
        <CommentWriteArea>
          <CommentWriteBox>
            {user ? (
              <>
                <UserInfo
                  avatar={
                    <Avatar
                      shape={
                        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      }
                    ></Avatar>
                  }
                  title={user.username}
                  description={user.role.includes("super") ? "admin" : "user"}
                />
                <CommentWriteInput
                  value={childComment}
                  name={"childComment"}
                  rows={4}
                  onChange={onChangeWrite}
                />
                <ButtonBox>
                  <ButtonWrite onClick={onWriteComment}>입력</ButtonWrite>
                </ButtonBox>
              </>
            ) : (
              ""
            )}
          </CommentWriteBox>
        </CommentWriteArea>
        <CommentArea>
          {/* {findAllComment ? (
            <CommentList
              className="comment-list"
              header={`${findAllCommentTotal} replies`}
              itemLayout="horizontal"
              dataSource={findAllComment}
              renderItem={(item) => {
                return (
                  <li>
                    {parentPatchUUID === item.createdAt ? (
                      <Comment
                        data-id={item.createdAt}
                        actions={
                          item.isDeleted
                            ? [
                                <span
                                  data-id={item.createdAt}
                                  data-dbid={item._id}
                                  onClick={onReplyTo}
                                  key="comment-basic-reply-to"
                                >
                                  Reply to
                                </span>,
                              ]
                            : [
                                <span
                                  data-id={item.createdAt}
                                  data-dbid={item._id}
                                  onClick={onReplyTo}
                                  key="comment-basic-reply-to"
                                >
                                  Reply to
                                </span>,
                                <span
                                  data-id={item.createdAt}
                                  data-dbid={item._id}
                                  onClick={swapPatchParentCommentCancel}
                                  key="comment-basic-like"
                                >
                                  수정
                                  <span className="comment-action"></span>
                                </span>,
                                <span
                                  data-id={item.createdAt}
                                  data-dbid={item._id}
                                  onClick={getRemoveId}
                                  key="comment-basic-dislike"
                                >
                                  <Popconfirm
                                    title="댓글을 삭제하시겠습니까?"
                                    onConfirm={onRemoveComment}
                                    // onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    삭제
                                  </Popconfirm>
                                  <span className="comment-action"></span>
                                </span>,
                              ]
                        }
                        author={item.author.username}
                        avatar={
                          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        }
                        content={
                          item.isDeleted ? (
                            "삭제된 댓글입니다.."
                          ) : (
                            <>
                              <PatchBox>
                                <PatchInput
                                  value={patchComment}
                                  onChange={onChangePatch}
                                ></PatchInput>
                                <PatchButton onClick={onPatchComment}>
                                  수정
                                </PatchButton>
                              </PatchBox>
                            </>
                          )
                        }
                        datetime={
                          <Tooltip
                            title={moment(
                              date_to_str(new Date(item.createdAt))
                            ).format("YYYY-MM-DD HH:mm:ss")}
                          >
                            <span>
                              {moment(
                                date_to_str(new Date(item.createdAt))
                              ).fromNow()}
                            </span>
                          </Tooltip>
                        }
                      />
                    ) : (
                      <Comment
                        data-id={item.createdAt}
                        actions={
                          item.isDeleted
                            ? [
                                <span
                                  data-id={item.createdAt}
                                  data-dbid={item._id}
                                  onClick={onReplyTo}
                                  key="comment-basic-reply-to"
                                >
                                  Reply to
                                </span>,
                              ]
                            : [
                                <span
                                  data-id={item.createdAt}
                                  data-dbid={item._id}
                                  onClick={onReplyTo}
                                  key="comment-basic-reply-to"
                                >
                                  Reply to
                                </span>,
                                <span
                                  data-id={item.createdAt}
                                  data-dbid={item._id}
                                  onClick={swapPatchParentComment}
                                  key="comment-basic-like"
                                >
                                  수정
                                  <span className="comment-action"></span>
                                </span>,
                                <span
                                  data-id={item.createdAt}
                                  data-dbid={item._id}
                                  onClick={getRemoveId}
                                  key="comment-basic-dislike"
                                >
                                  <Popconfirm
                                    title="댓글을 삭제하시겠습니까?"
                                    onConfirm={onRemoveComment}
                                    // onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    삭제
                                  </Popconfirm>
                                  <span className="comment-action"></span>
                                </span>,
                              ]
                        }
                        author={item.author.username}
                        avatar={
                          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        }
                        content={
                          item.isDeleted ? "삭제된 댓글입니다." : item.text
                        }
                        datetime={
                          <Tooltip
                            title={moment(
                              date_to_str(new Date(item.createdAt))
                            ).format("YYYY-MM-DD HH:mm:ss")}
                          >
                            <span>
                              {moment(
                                date_to_str(new Date(item.createdAt))
                              ).fromNow()}
                            </span>
                          </Tooltip>
                        }
                      />
                    )}
                  </li>
                );
              }}
            />
          ) : (
            ""
          )}
          {findAllComment ? (
            <PaginationBox>
              <PaginationStyled
                pageSize={5}
                onChange={onParentPagination}
                total={findAllCommentTotal}
              ></PaginationStyled>
            </PaginationBox>
          ) : (
            ""
          )} */}
        </CommentArea>
      </Area>
    </>
  );
}

export default ChildCommentComponent;
