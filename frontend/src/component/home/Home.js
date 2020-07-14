import React from "react";
import styled from "styled-components";
import { List, Avatar, Input, Button } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import InfiniteScroll from "react-infinite-scroller";
import { date_to_str } from "../../lib/timeFormatter";
import NoticeContainer from "../../container/home/NoticeContainer";
import { Link } from "react-router-dom";

const Area = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: white;
  min-width: 1000px;
  min-height: 700px;
  /* img {
    margin: auto 0;
  } */
`;
const AreaWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  background-color: white;
`;
const LeftArea = styled.div`
  /* border: 1px solid rgba(0, 0, 0, 0.125); */
  border-radius: 3px;
  width: 55%;
  height: 85%;
  margin: 40px 40px 0 40px;
  min-width: 600px;
  display: flex;
  flex-direction: column;
`;
const RightArea = styled.div`
  width: 30%;
  height: 85%;
  /* border: 1px solid rgba(0, 0, 0, 0.125); */
  border-radius: 3px;
  margin: 40px 50px 0 40px;
`;

const TitleArea = styled.div`
  width: 50%;
  height: 15%;
  /* border: 1px solid rgba(0, 0, 0, 0.125); */
  border-radius: 3px;
  margin: 40px 40px 0 40px;
`;

const BoardArea = styled.div`
  width: 85%;
  height: 37%;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  margin: 20px 40px 0 40px;
`;

const UserArea = styled.div`
  width: 85%;
  height: 37%;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  margin: 20px 40px 0 40px;
  display: flex;
  flex-direction: column;
`;

const SubTitleBox = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;
const SubTitle = styled.h1`
  margin: 5px 15px;
`;

const ListBox = styled.div`
  width: 100%;
  height: 100%;
`;

const EmailBox = styled.div`
  margin: 0 35px;
`;

const CreatedAtBox = styled.div`
  margin: 0 20px;
`;

const Title = styled.h1`
  margin: 10px 20px;
`;
const TextBox = styled.div`
  padding: 0 20px;
`;
const Text = styled(Paragraph)``;

const LinkText = styled(Link)`
  text-decoration: none;
  color: black;
`;

function Home({ findAllUser, userProfile, boardFindAll, boardFindAllError }) {
  return (
    <Area>
      <AreaWrapper>
        <LeftArea>
          <TitleArea>
            <Title>
              {userProfile ? userProfile.username : ""}님 환영합니다.
            </Title>
            <TextBox>
              <Text>
                현재 대시보드는 테스트용이며 <br /> 간단한 게시판, 댓글, 파일
                업로드 기능을 제공합니다.
              </Text>
            </TextBox>
          </TitleArea>
          {userProfile &&
          !userProfile.role.includes("r") &&
          !userProfile.role.includes("super") ? (
            ""
          ) : (
            <BoardArea>
              <SubTitleBox>
                <SubTitle>
                  <LinkText to={"/board"}>Board List</LinkText>
                </SubTitle>
              </SubTitleBox>

              <ListBox>
                {boardFindAll ? (
                  <List
                    size={"small"}
                    dataSource={boardFindAll}
                    renderItem={(item) => (
                      <List.Item key={item._id}>
                        <List.Item.Meta
                          title={item.author.username}
                          description={item.category}
                        />
                        <LinkText to={`/board/${item._id}`}>
                          <EmailBox>
                            {item.title.length > 30
                              ? `${String(item.title).substring(0, 30)}...`
                              : item.title}
                          </EmailBox>
                        </LinkText>
                        <CreatedAtBox>
                          {date_to_str(new Date(item.createdAt))}
                        </CreatedAtBox>
                      </List.Item>
                    )}
                  ></List>
                ) : (
                  <List />
                )}
              </ListBox>
            </BoardArea>
          )}
          {userProfile && !userProfile.role.includes("super") ? (
            ""
          ) : (
            <UserArea>
              <SubTitleBox>
                <SubTitle>
                  <LinkText to={`/setting`}>User List</LinkText>
                </SubTitle>
              </SubTitleBox>
              <ListBox>
                {findAllUser ? (
                  <List
                    size={"small"}
                    dataSource={findAllUser}
                    renderItem={(item) => (
                      <List.Item key={item.email}>
                        <List.Item.Meta
                          avatar={
                            <Avatar src={
                              item && item.image !== null ? (
                                `http://localhost:3030/user/${item._id}?image=${item.image}`
                              ) : (
                                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                              )
                            } />
                          }
                          title={item.username}
                          description={
                            item.role[0] === "super" ? "admin" : "user"
                          }
                        />
                        <EmailBox>{item.email}</EmailBox>
                        <CreatedAtBox>
                          {date_to_str(new Date(item.createdAt))}
                        </CreatedAtBox>
                      </List.Item>
                    )}
                  ></List>
                ) : (
                  <List />
                )}
              </ListBox>
            </UserArea>
          )}
        </LeftArea>
        <RightArea>
          {/* <InfiniteScroll> */}
          {userProfile && !userProfile.role.includes("super") ? (
            ""
          ) : (
            <NoticeContainer />
          )}
          {/* </InfiniteScroll> */}
        </RightArea>
      </AreaWrapper>
    </Area>
  );
}

export default Home;
