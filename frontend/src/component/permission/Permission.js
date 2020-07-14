import React from "react";
import { Avatar, Button, Modal, Spin, Empty, Pagination, Switch, Table, Input, Space } from "antd";
import styled from "styled-components";
import CreateUserModal from "./CreateUserModal";
import { UserOutlined,SearchOutlined } from "@ant-design/icons";
import { date_to_str } from "../../lib/timeFormatter";

const Area = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: white;
  min-width: 1000px;
  min-height: 700px;
`;
const AreaWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  background-color: white;
`;

const TopArea = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: white;
`;

const LeftArea = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  width: 55%;
  height: 100%;
  margin: 40px 40px 0 40px;
  min-width: 600px;
`;
const RightArea = styled.div`
  width: 30%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  margin: 40px 40px 0 40px;
`;
const BottomArea = styled.div`
  width: 96.4%;
  height: auto;
  display: flex;
  justify-content: flex-end;
`;
const ListBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  width: 85%;
  height: 400px;
  margin: 20px;
  min-width: 550px;
`;

const UserProfileBox = styled.div`
  /* border: 1px solid rgba(0, 0, 0, 0.125); */
  /* border-radius: 3px; */
  width: 85%;
  height: 300px;
  margin: 20px auto;
  min-width: 200px;
`;

const SubTitle = styled.div`
  h1 {
    font-size: 24px;
    margin: 15px;
  }
`;

const Title = styled.div`
margin: 40px 40px 0 70px;
  font-size: 32px;
`;

const PermissionButton = styled(Button)`
  width: 30%;
  text-align: center;
  min-width: 32px;
  padding: 0;
`;

const CreateUserButton = styled(Button)`
  margin: 0 16px 0 0;
`;

const CreateAtStyled = styled.div`
  width: 44%;
  margin-left: 30px;
`;
const EmailStyled = styled.div`
  width: 25%;
  margin-left: 30px;
`;
const ModalStyled = styled(Modal)``;
const ListItemBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  width: 36%;
`;
const ListItem = styled.div``;
const ListItemMeta = styled.div``;
const AvatarStyled = styled(Avatar)`
  margin: 10px 15px;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: flex-end;
  width: 70%;
`;

const ListWrapper = styled.div`
  display: flex;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UserImageBox = styled.div`
  margin: 30px 0 5px 0;
`;
const UserNameBox = styled.div`
  margin: 5px;
`;
const UserEmailBox = styled.div`
  margin: 5px;
`;

const SwitchBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const SwitchItem = styled(Switch)`
  margin: 5px;
`;

const UpdateBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const UpdateButton = styled(Button)`
  margin: 20px 40px;
`;
const NoDataWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableBox = styled.div`
  margin: 40px 70px 70px 70px;
  width: 100%;
`;

function Permission({
  modalVisible,
  onModalConfirm,
  onModalCancel,

  username,
  email,
  password,
  pwConfirm,
  onChangeUsername,
  onChangeEmail,
  onChangePassword,
  onChangePwConfirm,
  modalError,
  createLoading,

  onModalUser,

  findAllUser,
  findAllTotal,
  findOneUser,
  onData,
  onPagination,
  handleRoleUpdate,
  permissionModalVisible,
  onPermissionModalCancel,
  modalDivision,
  removeModalVisible,
  onRemoveModal,
  onRemoveCancel,
  onRemoveConfirm,
  onDivisionSwitch,
  onSearchUser,
  onChangeSearch,
  search,
  onClear
}) {
  const columns = [
    {
      title: "유저",
      dataIndex: "username",
      key: "username",
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      filterDropdown: ({dataIndex}) => (
        <div style={{ padding: 8 }}>
          <Input
           
            placeholder={`Search ${dataIndex}`}
            value={search}
            onChange={onChangeSearch}
            onPressEnter={onSearchUser}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={onSearchUser}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={onClear} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      // onFilter: (value, record) =>
      //   record[dataIndex]
      //     .toString()
      //     .toLowerCase()
      //     .includes(value.toLowerCase()),
    },
    {
      title: "권한",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "admin", value: "super" },
        { text: "user", value: "r" || "w" },
      ],
      // filteredValue: role.includes("super") ? "user" : "admin",
      onFilter: (value, record) => record.role.includes(value),
      render: (role) => {
        return (
          <div key={role}>{!role.includes("super") ? "user" : "admin"}</div>
        );
      },
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "등록일",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return <div key={createdAt}>{date_to_str(new Date(createdAt))}</div>;
      },
    },
    {
      title: "권한변경",
      dataIndex: "_id",
      key: "_id",
      render: (_id, data) => {
        return (
          <div key={_id}>
            {data.role[0] !== "super" ? (
              <PermissionButton data-id={data.email} onClick={onData}>
                선택
              </PermissionButton>
            ) : (
              <PermissionButton disabled data-id={data.email} onClick={onData}>
                선택
              </PermissionButton>
            )}
          </div>
        );
      },
    },
    {
      title: "유저삭제",
      dataIndex: "_id",
      key: "_id",
      render: (_id, data) => {
        return (
          <div key={_id}>
            {data.role[0] !== "super" ? (
              <PermissionButton data-id={_id} onClick={onRemoveModal}>
                삭제
              </PermissionButton>
            ) : (
              <PermissionButton disabled>삭제</PermissionButton>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Area>
        <TopArea>
          <Title>Setting</Title>
        </TopArea>
        <BottomArea>
          <CreateUserButton onClick={onModalUser}>유저생성</CreateUserButton>
        </BottomArea>
        <AreaWrapper>
          <TableBox>
            {findAllUser ? (
              <Table
                pagination={{
                  total: findAllUser.langth,
                  pageSize: 6,
                  onChange: onPagination,
                }}
                columns={columns}
                dataSource={findAllUser}
              />
            ) : (
              ""
            )}
          </TableBox>

        </AreaWrapper>
        
        <ModalStyled
          title={"Delete User"}
          visible={removeModalVisible}
          onOk={onRemoveConfirm}
          onCancel={onRemoveCancel}
        >
          유저를 삭제하시겠습니까?
        </ModalStyled>
        <ModalStyled
          title={modalDivision === "user" ? "Create User" : " Create Admin"}
          visible={modalVisible}
          onOk={onModalConfirm}
          onCancel={onModalCancel}
        >
          
            <Spin tip="Loading..." spinning={createLoading && createLoading ===true? true: false}>
              <CreateUserModal
                username={username}
                email={email}
                password={password}
                pwConfirm={pwConfirm}
                onChangeUsername={onChangeUsername}
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}
                onChangePwConfirm={onChangePwConfirm}
                modalError={modalError}
                createLoading={createLoading}
                modalDivision={modalDivision}
                onDivisionSwitch={onDivisionSwitch}
              />
            </Spin>
        </ModalStyled>
        <Modal
          title="User Role Update"
          visible={permissionModalVisible}
          onOk={handleRoleUpdate}
          onCancel={onPermissionModalCancel}
        >
          <UserProfileBox>
            {findOneUser ? (
              <>
                <UserInfoBox>
                  <UserImageBox>
                    <Avatar src={
                        findOneUser && findOneUser.image !== null ? (
                          `http://localhost:3030/user/${findOneUser._id}?image=${findOneUser.image}`
                        ) : (
                          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        ) }
                        size={100} icon={<UserOutlined />} />
                  </UserImageBox>
                  <UserNameBox>{findOneUser.username}</UserNameBox>
                  <UserEmailBox>{findOneUser.email}</UserEmailBox>
                </UserInfoBox>
                <SwitchBox>
                  {findOneUser.role.indexOf("r") !== -1 ? (
                    <SwitchItem
                      checkedChildren="읽기"
                      unCheckedChildren="읽기"
                      defaultChecked
                      data-id={"r"}
                    />
                  ) : (
                    <SwitchItem
                      checkedChildren="읽기"
                      unCheckedChildren="읽기"
                      data-id={"r"}
                    />
                  )}
                  {findOneUser.role.indexOf("c") !== -1 ? (
                    <SwitchItem
                      checkedChildren="쓰기"
                      unCheckedChildren="쓰기"
                      defaultChecked
                      data-id={"c"}
                    />
                  ) : (
                    <SwitchItem
                      checkedChildren="쓰기"
                      unCheckedChildren="쓰기"
                      data-id={"c"}
                    />
                  )}
                </SwitchBox>
                <UpdateBox></UpdateBox>
              </>
            ) : (
              <NoDataWrapper>
                <Empty />
              </NoDataWrapper>
            )}
          </UserProfileBox>
        </Modal>
      </Area>
    </>
  );
}

export default Permission;
