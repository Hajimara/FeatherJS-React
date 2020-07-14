import React from "react";
import { Layout, Popover, Button, Avatar, Modal } from "antd";
import styled from "styled-components";
import { UserOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Header } = Layout;

const HeaderStyled = styled(Header)`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.125);
  height: 80px;
  position: relative;
`;

const PopoverStyled = styled(Popover)`
  position: absolute;
  right: 35px;
  top: 20px;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;
const UserImageBox = styled.div`
  margin: 30px 0 5px 0;
`;
const UserNameBox = styled.div`
  margin: 5px;
  font-weight: 600;
`;
const UserEmailBox = styled.div`
  margin: 5px;
`;
const UserRoleBox = styled.div`
  margin: 5px;
`;

const LinkBox = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  /* margin: 15px 0 0 0 ; */
`;

const MyProfileLink = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.75);
`;

const Logout = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  :hover{
    cursor: pointer;
    opacity: 0.6;
  }
`;
const ModalStyled = styled(Modal)``;

function HeaderComponent({
  user,
  modalVisible,
  onModalConfirm,
  onModalCancel,
  onModal,
}) {
  return (
    <>
      <ModalStyled
        title="Logout"
        visible={modalVisible}
        onOk={onModalConfirm}
        onCancel={onModalCancel}
      >
        <p>로그아웃 하시겠습니까?</p>
      </ModalStyled>
      <HeaderStyled>
        <PopoverStyled
          placement="bottomRight"
          title={
            <LinkBox>
              <MyProfileLink to={"/myProfile"}>
                My Profile
                <ArrowRightOutlined />
              </MyProfileLink>
            </LinkBox>
          }
          content={
            user ? (
              <>
                <UserInfoBox>
                  <UserImageBox>
                    <Avatar
                      shape="square"
                      size={100}
                      src={
                        user && user.image !== null ? (
                          `http://localhost:3030/user/${user._id}?image=${user.image}`
                        ) : (
                          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        )
                      }
                    />
                  </UserImageBox>
                  <UserNameBox>{user.username}</UserNameBox>
                  {user.role[0] === "super" ? (
                    <UserRoleBox>admin</UserRoleBox>
                  ) : (
                    <UserRoleBox>user</UserRoleBox>
                  )}
                  <UserEmailBox>{user.email}</UserEmailBox>
                  <Logout onClick={onModal}>Logout</Logout>
                </UserInfoBox>
              </>
            ) : (
              ""
            )
          }
          trigger="click"
        >
          <Button>유저 프로필</Button>
        </PopoverStyled>
      </HeaderStyled>
    </>
  );
}

export default HeaderComponent;
