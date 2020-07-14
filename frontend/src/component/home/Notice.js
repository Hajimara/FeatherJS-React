import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { List, Button, Input, Avatar, Card, Pagination, Popconfirm, Comment, Tooltip, Form } from "antd";
import moment from 'moment';
import { date_to_str } from "../../lib/timeFormatter";
import { useDispatch } from "react-redux";
const NoticeArea = styled.div`
  width: 85%;
  height: 22%;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  margin: 20px 35px;
  display: flex;
  flex-direction: column;
`;
const UserInfo = styled.div`
  padding: 5px 10px;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;

const NoticeBottomWrapper = styled.div`
  margin: 20px;
`;

const InputBox = styled(Input)`
  width: 80%;
`;
const ButtonBox = styled(Button)`
  margin: 0 0 0 10px;
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

// const UserInfo = styled(Card.Meta)`
//   width: 25%;
// `;

const CommentList = styled(List)`
margin-top: 20px;
  width: 70%;
  .ant-list-items {
      height:470px;
      overflow: auto;
  }
`;

// const ButtonBox = styled.div`
//   width: 80px;
//   height: inherit;
//   display: flex;
//   flex-direction: column-reverse;
// `;

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
const InfinityScrollWrapper = styled.div`
/* overflow-y: auto; */
`;

// const UserInfo = styled(Card.Meta)`
//   width: 25%;
// `;

function Notice({
  userProfile,
  text,
  onChangeField,
  onSubmit,
  noticeFindAllTotal,
  noticeFindAll,
  patchCreatedAt,
  swapPatchCancel,
  swapPatch,
  noticeFindOne,
  onChangePatchField,
  patchText,
  patchSubmit,
  getRemoveId,
  onRemove
}) {
    const rootElement = useRef();
    const target = useRef();
    const dispatch =useDispatch();

  const onChange = (e) => {
    onChangeField({ key: "text", value: e.target.value });
  };

  const op =  {
    root: rootElement.current, // target의 상위 Element
    rootMargin: '0px', // default 0px
    threshold: 0.7 // 뷰포트 시야값
  }

  useEffect(()=>{
    
      
    const io = new IntersectionObserver(([entry])=>{
        console.log(entry);console.log(target.current);console.log(rootElement.current);
        
    },op);
    if (target.current) {
        io.observe(target.current);
      }
  
      return () => {
        if (target.current) {
          io.unobserve(target.current);
        }
      };
  },[target,op,dispatch])


  return (
    <NoticeArea >
      <UserInfo>
        {userProfile ? (
          <List.Item.Meta
            avatar={
              <Avatar src={userProfile && userProfile.image !== null ? (
                `http://localhost:3030/user/${userProfile._id}?image=${userProfile.image}`
              ) : (
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              )} />
            }
            title={userProfile.username}
            description={userProfile.email}
          />
        ) : (
          ""
        )}
      </UserInfo>
      <NoticeBottomWrapper>
          <Form onSubmitCapture={onSubmit}>
        <InputBox value={text} name={"text"} onChange={onChange} />
        <ButtonBox onClick={onSubmit}>입력</ButtonBox></Form>
      </NoticeBottomWrapper>
      <InfinityScrollWrapper ref={rootElement}>
      {noticeFindAll ? (
        <CommentList
            style={{width:'100%',hegiht:'400px'}}
          className="notice-list"
          //   header={`${noticeFindAllTotal} replies`}
          itemLayout="horizontal"
          dataSource={noticeFindAll}
          renderItem={(item) => {
            return (
              <li ref={target}>
                {/*  */}
                {patchCreatedAt === item.createdAt ? (
                  <Comment
                    data-id={item.createdAt}
                    actions={
                        userProfile&&
                      userProfile.role.includes("super") &&
                      userProfile &&
                      userProfile._id === item.author._id
                        ? [
                            <span
                              data-id={item.createdAt}
                              data-dbid={item._id}
                              onClick={swapPatchCancel}
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
                                onConfirm={onRemove}
                                // onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                              >
                                삭제
                              </Popconfirm>
                              <span className="comment-action"></span>
                            </span>,
                          ]
                        : []
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
                      item.isDeleted ? (
                        "삭제된 댓글입니다.."
                      ) : (
                        <>
                          <PatchBox>
                            <PatchInput
                              value={patchText}
                              onChange={onChangePatchField}
                            ></PatchInput>
                            <PatchButton onClick={patchSubmit}>수정</PatchButton>
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
                        userProfile&&
                      userProfile.role.includes("super") &&
                      userProfile &&
                      userProfile._id === item.author._id
                        ? [
                            <span
                              data-id={item.createdAt}
                              data-dbid={item._id}
                              onClick={swapPatch}
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
                                onConfirm={onRemove}
                                okText="Yes"
                                cancelText="No"
                              >
                                삭제
                              </Popconfirm>
                              <span className="comment-action"></span>
                            </span>,
                          ]
                        : []
                    }
                    author={item.author.username}
                    avatar={
                      item.author.image !== null && item.author.image !== undefined ? (
                        `http://localhost:3030/user/${item.author._id}?image=${item.author.image}`
                      ) : (
                        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      )
                    }
                    content={item.text}
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
      {/* {noticeFindAll} */}
      </InfinityScrollWrapper>
    </NoticeArea>
  );
}

export default Notice;
