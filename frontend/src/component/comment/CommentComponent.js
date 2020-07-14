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

const Area = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  background-color: white;
  min-width: 1000px;
  min-height: 700px;
  margin-bottom: 40px;

`;
const AreaCenter = styled.div`
  margin: 0 70px;
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
  width: 100%;
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
  width: 10%;
`;

const CommentList = styled(List)`
  width: 100%;
`;

const ButtonBox = styled.div`
  width: auto;
  height: inherit;
  display: flex;
  flex-direction: column-reverse;
`;

const ButtonWrite = styled(Button)`
  margin: 0  0 0 10px;
`;

const PaginationBox = styled.div`
  width: 100%;
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
  width: 100%;
`;
const PatchButton = styled(Button)`
  margin-left: 10px;
`;

function CommentComponent({
  user,
  parentComment,
  childComment,
  onParentChange,
  onChildChange,
  onParentWirte,
  onChildWirte,
  findAllComment,
  findAllCommentTotal,
  onParentPagination,
  swapPatchParentComment,
  parentPatchUUID,
  onChangeField,
  patchComment,
  onPatchComment,
  swapPatchParentCommentCancel,
  onRemoveComment,
  getRemoveId,
  replyTo,
  onReplyTo,
  parentId,
  onRemoveData,
  onChangePatchField,
}) {
  const onChangePatch = (e) => {
    onChangeField({ key: "patchComment", value: e.target.value });
  };

  return (
    <>
      <Area>
        <Divider orientation="left">Comment</Divider>
        <AreaCenter>
        <CommentWriteArea>
          <CommentWriteBox>
            {user ? (
              <>
                <UserInfo
                  avatar={
                    <Avatar
                    style={{marginTop: '5px'}}
                      // shape={}
                      src={user && user.image !== null ? (
                        `http://localhost:3030/user/${user._id}?image=${user.image}`
                      ) : ("https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png")}
                    ></Avatar>
                  }
                  title={user.username}
                  description={user.role.includes("super") ? "admin" : "user"}
                />
                <CommentWriteInput
                  value={parentComment}
                  name={parentComment}
                  rows={4}
                  onChange={onParentChange}
                  // value={'commentText'}
                />
                <ButtonBox>
                  <ButtonWrite onClick={onParentWirte}>입력</ButtonWrite>
                </ButtonBox>
              </>
            ) : (
              ""
            )}
          </CommentWriteBox>
        </CommentWriteArea>
        <CommentArea>
          {findAllComment ? (
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
                        actions={user.role.includes("super") || (user && user._id === item.author._id) ? item.isDeleted
                          ? [
                              // <span
                              //   data-id={item.createdAt}
                              //   data-dbid={item._id}
                              //   onClick={onReplyTo}
                              //   key="comment-basic-reply-to"
                              // >
                              //   Reply to
                              // </span>,
                            ]
                          : [
                              // <span
                              //   data-id={item.createdAt}
                              //   data-dbid={item._id}
                              //   onClick={onReplyTo}
                              //   key="comment-basic-reply-to"
                              // >
                              //   Reply to
                              // </span>,
                              
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
                                data-eamil={item.email}
                                data-uid={item.author._id}
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
                            ]: ""}
                        author={item.author.username}
                        avatar={
                          item.author.image !== null&& item.author.image !== undefined ? (
                            `http://localhost:3030/user/${item.author._id}?image=${item.author.image}`
                          ) : (
                            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          )
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
                        actions={user.role.includes("super") || (user && user._id === item.author._id) ? item.isDeleted
                          ? [
                              // <span
                              //   data-id={item.createdAt}
                              //   data-dbid={item._id}
                              //   onClick={onReplyTo}
                              //   key="comment-basic-reply-to"
                              // >
                              //   Reply to
                              // </span>,
                            ]
                          : [
                              // <span
                              //   data-id={item.createdAt}
                              //   data-dbid={item._id}
                              //   onClick={onReplyTo}
                              //   key="comment-basic-reply-to"
                              // >
                              //   Reply to
                              // </span>,
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
                                data-email={item.author.email}
                                data-uname={item.author.username}
                                data-uid={item.author._id}
                                data-dbid={item._id}
                                onClick={getRemoveId}
                                key="comment-basic-dislike"
                              >
                                <Popconfirm
                                  title="댓글을 삭제하시겠습니까?"
                                  onConfirm={onRemoveComment}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  삭제
                                </Popconfirm>
                                <span className="comment-action"></span>
                              </span>,
                            ]: ""
                          
                        }
                        author={item.author.username}
                        avatar={
                           item.author.image !== null&& item.author.image !== undefined ? (
                            `http://localhost:3030/user/${item.author._id}?image=${item.author.image}`
                          ) : (
                            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          )
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
                    {/* {parentId === item._id ? <ChildCommentContainer />  : ''} */}
                  </li>
                );
              }}
            />
          ) : (
            ""
          )}
          {findAllComment && findAllCommentTotal > 5 ? (
            <PaginationBox>
              <PaginationStyled
                pageSize={5}
                onChange={onParentPagination}
                total={findAllCommentTotal}
              ></PaginationStyled>
            </PaginationBox>
          ) : (
            ""
          )}
        </CommentArea>
        </AreaCenter>
      </Area>
    </>
  );
}

export default CommentComponent;
