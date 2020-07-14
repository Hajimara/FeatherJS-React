import React from "react";
import styled from "styled-components";
import { Button, Input, Upload, Modal, Spin } from "antd";
const Area = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  background-color: white;
  min-width: 1000px;
  min-height: 700px;
`;
const AreaWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: white;
`;

const TopArea = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: white;
`;
const Title = styled.div`
  margin: 40px 40px 0 70px;
  font-size: 32px;
`;
const UserImageBox = styled.div`
  display: flex;
  position: relative;
  height: auto;
  width: 180px;
  align-items: center;
  justify-content: center;
  button {
    margin-left: 10px;
  }
`;

const MiddleArea = styled.div`
    margin: 0 70px;

  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
width: auto;
  height: auto;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImageButton = styled(Button)`
  margin-left: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
`;
const LeftArea = styled.div``;
const RightArea = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputBox = styled(Input)`
  width: 180px;
  margin-bottom: 10px;
`;
const TextBox = styled.div`
  height: 32px;
  padding: 4px 11px;
  margin-bottom: 10px;
`;
const UserWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ConfirmBox = styled.div`
  width: 265px;
  display: flex;
  justify-content: flex-end;
`;
const ConfirmButton = styled(Button)``;
const ModalStyled = styled(Modal)``;
const PasswordBox = styled.div`
margin: 0 70px 10px 0;
display:flex;
justify-content: flex-end;
width: auto;
  height: auto;
  button {
  }
`;
function MyProfile({
  user,
  email,
  username,
  password,
  onChangeUsername,
  onPatchUserInfo,
  onChangePassword,
  error,
  loading,
  imageFile,
  setImageFile,
  handleChange,
  currentPassword,
  newPassword,
  confirmPassword,
  onModalConfirm,
  onModalCancel,
  onModal,
  modalVisible,
  onChangeCurrentPassword,
  onChangeNewPassword,
  onChangeConfirmPassword,
  passwordError,
  modalLoading
}) {
  return (
    <Area>
      <AreaWrapper>
        <TopArea>
          <Title>My Profile</Title>
        </TopArea>
        <Spin spinning={loading && loading === true ? true : false} tip={'loading...'}>
        <PasswordBox>
          <Button onClick={onModal}>비밀번호 변경 </Button>
        </PasswordBox>
        <MiddleArea>
          <ImageWrapper>
            <UserImageBox>
              <Upload
                name="files"
                className="avatar-uploader"
                // showUploadList={true}
                listType="picture"
                accept={"image/*"}
                multiple={false}
                beforeUpload={(file) => {
                  let isElement = window.document.getElementsByClassName(
                    "ant-upload-list-item ant-upload-list-item-undefined ant-upload-list-item-list-type-picture"
                  );
                  if (isElement.length === 0) {
                    setImageFile(file);
                  } else {
                    let removeElement = window.document.getElementsByClassName(
                      "ant-upload-list-item ant-upload-list-item-undefined ant-upload-list-item-list-type-picture"
                    )[0];
                    removeElement.parentNode.remove();
                  }
                  return false;
                }}
                onChange={handleChange}
              >
                <Button>프로필사진 업로드</Button>
              </Upload>
            </UserImageBox>
          </ImageWrapper>
          <UserInfoBox>
            <UserWrapper>
              <LeftArea>
                <TextBox>E-Mail</TextBox>
                <TextBox>Name</TextBox>
                <TextBox>Password</TextBox>
              </LeftArea>
              <RightArea>
                <InputBox
                  name={"email"}
                  //   onChange={onChangeEmail}
                  value={email}
                  disabled
                />
                <InputBox
                  name={"username"}
                  onChange={onChangeUsername}
                  value={username}
                />

                <InputBox
                  type={"password"}
                  name={"password"}
                  onChange={onChangePassword}
                  value={password}
                />
              </RightArea>
            </UserWrapper>
            <ConfirmBox>
              <ConfirmButton onClick={onPatchUserInfo}>변경</ConfirmButton>
            </ConfirmBox>
            {error ? <p style={{ color: "red" }}>{error}</p> : ""}
          </UserInfoBox>
        </MiddleArea>
        </Spin>
      </AreaWrapper>
      <ModalStyled
        title={"Change Password"}
        visible={modalVisible}
        onOk={onModalConfirm}
        onCancel={onModalCancel}
      >
          <Spin spinning={modalLoading && modalLoading === true ? true : false} tip={'loading...'}>

        <UserWrapper>
          <LeftArea>
            <TextBox>Current Password</TextBox>
            <br />
            <TextBox>New Password</TextBox>
            <TextBox>Confirm Password</TextBox>
          </LeftArea>
          <RightArea>
            <InputBox
              type={"password"}
              name={"currentPassword"}
                onChange={onChangeCurrentPassword}
              value={currentPassword}
            />
            <br />
            <InputBox
              type={"password"}
              name={"newPassword"}
              onChange={onChangeNewPassword}
              value={newPassword}
            />

            <InputBox
              type={"password"}
              type={"password"}
              name={"confirmPassword"}
              onChange={onChangeConfirmPassword}
              value={confirmPassword}
            />
          </RightArea>
         
        </UserWrapper>
        {passwordError ? <p style={{color: 'red', textAlign:'center'}}>{passwordError}</p> : ''}
        </Spin>
      </ModalStyled>
      {/* <Spin tip="Loading..." spinning={loading}>
      </Spin> */}
    </Area>
  );
}

export default MyProfile;
