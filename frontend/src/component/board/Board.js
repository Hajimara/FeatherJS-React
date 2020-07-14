import React from "react";
import styled from "styled-components";
import { Typography, Button, Spin, Avatar, List, Modal } from "antd";
import { Link } from "react-router-dom";

const Area = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  background-color: white;
  min-width: 1000px;
  min-height: 700px;
`;

const TopArea = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: white;
  position: relative;
`;

const TitleBox = styled.div`
  margin: 15px 40px 0 40px;
  font-size: 32px;
`;
const Title = styled.div`
margin: 40px 40px 0 70px;
/* margin: 40px 40px 0 40px; */
  font-size: 32px;
`;

const AreaWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  background-color: white;
  flex-direction: column;
  /* border: 1px solid rgba(0, 0, 0, 0.125); */
`;
const AreaCenter = styled.div`
margin: 0 70px;
`;
const BoardTitleBox = styled.div`
  margin: 20px 10px 0 0 ;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  padding: 1px;
  width: 100%;
  height: 40px;height: 32px;
`;
const BoardTitle = styled.div`
  padding: 0 15px;
  font-weight: 400;
  font-size: 18px;height: 32px;
`;

const BoardCategoryBox = styled.div`
  margin: 20px 0 0 0;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  padding: 5px;
  width: 5%;
  height: 32px;
  text-align: center;
`;

const BoardCategory = styled(Typography)``;

const BoardFileBox = styled.div`
  margin: 20px 0  0 0 ;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  width: 100%;
  height: auto;
`;
const BoardFile = styled.div`
  padding: 20px;
`;

const BoardBodyBox = styled.div`
  margin: 20px 0  0 0 ;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  width: 100%;
  height: 100%;
  min-height: 350px;
`;
const BoardBody = styled.div`
  padding: 20px;
  p {
    line-height: 1.1rem;
    margin:0;
  }
  blockquote{
    line-height: 1rem;
    margin:0;
  }

`;

const BoardButtonBox = styled.div`
  margin: 20px 0 0 0;
  border-radius: 3px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-end;
`;
const BoardButtonWrapper = styled.div``;
const BoardButton = styled(Button)`
  margin-left: 10px;
`;
const TopBoxWrapper = styled.div`
  display: flex;
  width: auto;
  flex-direction: row;
`;

const ProfileArea = styled.div`
  margin: 20px 0 0 0;
`;
const LinkBox = styled(Link)`
  text-decoration: none;
`;

const ListLine = styled.div`
  display: flex;
`;
function Board({
  boardFindOne,
  boardFindOneError,
  boardFindOneLoading,
  onRemove,
  user,
  onUpdate,
  modalVisible,
  onModal,
  cancelModal,
}) {
  return (
    <Area>
      <Spin tip="Loading..." spinning={boardFindOneLoading}>
        <TopArea>
            <Title>Board</Title>
        </TopArea>
        <AreaWrapper>
        <AreaCenter>
          <ProfileArea>
            {/* <AvatarBox>
            <AvatarImage></AvatarImage>
          </AvatarBox>
          <UserInfoBox>

          </UserInfoBox> */}
            {boardFindOne ? (
              <List.Item.Meta
                avatar={
                  <Avatar src={ boardFindOne && boardFindOne.author.image !== null && boardFindOne.author.image !== undefined ? (
                    `http://localhost:3030/user/${boardFindOne.author._id}?image=${boardFindOne.author.image}`
                  ) : (
                    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  )} />
                }
                title={boardFindOne.author.username}
                description={boardFindOne.author.email}
              />
            ) : (
              ""
            )}
          </ProfileArea>
          <TopBoxWrapper>
            <BoardTitleBox>
              <BoardTitle>
                {boardFindOne ? boardFindOne.title : ""}
              </BoardTitle>
            </BoardTitleBox>
            <BoardCategoryBox>
              <BoardCategory>
                {boardFindOne ? boardFindOne.category : ""}
              </BoardCategory>
            </BoardCategoryBox>
          </TopBoxWrapper>

          <BoardFileBox>
            <BoardFile>
              {boardFindOne && boardFindOne.file && !JSON.stringify(boardFindOne.file).includes('[]')? (
                <List
                  dataSource={boardFindOne.file}
                  renderItem={(item) => {
                    if (item.isDeleted) {
                      return;
                    }
                    return (
                      <ListLine key={item._id}>
                        <a
                          key={item._id}
                          href={`http://localhost:3030/board/${item._id}?serverFileName=${item.serverFileName}`}
                        >
                          {item.originalFileName}
                        </a>
                      </ListLine>
                    );
                  }}
                ></List>
              ) : (
                '업로드 된 파일이 없습니다.'
              )}
              {/* <a href={'http://localhost:3030/board/5f01e199f1ee384d839cbfad?serverFileName=1593958809602-%E2%80%94Pngtree%E2%80%94fire%20icon_4766825.png'}>dd</a> */}
            </BoardFile>
            {/* <BoardFile>{boardFindOne? <img src={`http://localhost:9000/${boardFindOne.file[0].serverFileName}`}></img>: ''}</BoardFile> */}
          </BoardFileBox>
          <BoardBodyBox>
            <BoardBody
              dangerouslySetInnerHTML={{
                __html: boardFindOne ? boardFindOne.body : "",
              }}
            ></BoardBody>
          </BoardBodyBox>
          <BoardButtonBox>
            <BoardButtonWrapper>
              {boardFindOne ? (
                <>
                  {user &&
                  (user.role.includes("super") ||
                    (user.role.includes("c") &&
                      user.email === boardFindOne.author.email)) ? (
                    <BoardButton onClick={onUpdate}>수정</BoardButton>
                  ) : (
                    <BoardButton disabled>수정</BoardButton>
                  )}
                  {user &&
                  (user.role.includes("super") ||
                    (user.role.includes("c") &&
                      user.email === boardFindOne.author.email)) ? (
                    <>
                      <Modal
                        visible={modalVisible}
                        onOk={onRemove}
                        onCancel={cancelModal}
                      >
                        <p>게시물을 삭제하시겠습니까?</p>
                      </Modal>
                      <BoardButton onClick={onModal}>삭제</BoardButton>
                    </>
                  ) : (
                    <BoardButton disabled onClick={onRemove}>
                      삭제
                    </BoardButton>
                  )}
                </>
              ) : (
                ""
              )}
            </BoardButtonWrapper>
          </BoardButtonBox>
          </AreaCenter>
        </AreaWrapper>
      </Spin>
    </Area>
  );
}

export default Board;
