import React from "react";
import styled from "styled-components";
import { Input, Switch } from "antd";


const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ModalBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ModalBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  
`;

const LeftArea = styled.div``;
const RightArea = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputBox = styled(Input)`
  width: 150px;
  margin-bottom: 10px;
`;
const TextBox = styled.div`
  height: 32px;
  padding: 4px 11px;
  margin-bottom: 10px;
`;

const SwitchBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
  
`;
function CreateUserModal({
  username,
  email,
  password,
  pwConfirm,
  onChangeUsername,
  onChangeEmail,
  onChangePassword,
  onChangePwConfirm,
  modalError,
  modalDivision,
  onDivisionSwitch
}) {
  return (
    <>
      <ModalWrapper>
        <ModalBox>
          <ModalBoxWrapper>
          <LeftArea>
            <TextBox>User name</TextBox>
            <TextBox>E-mail</TextBox>
            <TextBox>Password</TextBox>
            <TextBox>Password Confirm</TextBox>
          </LeftArea>
          <RightArea>
            <InputBox
              name={"username"}
              onChange={onChangeUsername}
              value={username}
            />
            <InputBox name={"email"} onChange={onChangeEmail} value={email} />
            <InputBox
              type={"password"}
              name={"password"}
              onChange={onChangePassword}
              value={password}
            />
            <InputBox
              type={"password"}
              name={"pwConfirm"}
              onChange={onChangePwConfirm}
              value={pwConfirm}
            />
          </RightArea>
          </ModalBoxWrapper>
          <SwitchBox>
            <Switch
              checkedChildren="Admin"
              unCheckedChildren="User"
              onClick={onDivisionSwitch}
            />
          </SwitchBox>
        </ModalBox>

        {modalError ? <p style={{ color: "red" }}>{modalError}</p> : ""}
      </ModalWrapper>
    </>
  );
}

export default CreateUserModal;
