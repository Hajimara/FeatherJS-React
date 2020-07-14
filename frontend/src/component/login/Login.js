import React from "react";
import styled from "styled-components";
import { Input, Button } from "antd";

const LoginStyled = styled.div`
  width: inherit;
  height: inherit;
`;
const LoginWrapper = styled.div`
  width: 1100px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 3px;
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  margin: 40px;
`;
const Title = styled.h1``;
const MiddleWapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
const Layer = styled.div``;
const Text = styled.div``;
const InputStyled = styled(Input)``;
const ButtonWrapper = styled.div`
  width: 220px;
  display: flex;
  justify-content: flex-end;
`;
const ButtonStyled = styled(Button)``;
const CustomButton = styled.button`
    background-color: white;
    border-radius: 2px;
    border: 1px solid rgba(0,0,0,0.125);
    padding: 3px 13px;
`;
function Login({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  onSubmit,
  loading,
  error,
}) {
  return (
    <>
      <LoginStyled>
        <LoginWrapper>
          <LoginForm>
            <TitleWrapper>
              <Title>Admin Board Login</Title>
            </TitleWrapper>
            <form onSubmit={onSubmit}>
              <MiddleWapper>
                <Layer>
                  <Text>E-Mail</Text>
                  <InputStyled
                    name={"email"}
                    value={email}
                    onChange={handleEmailChange}
                  ></InputStyled>
                </Layer>
                <Layer>
                  <Text>Password</Text>
                  <InputStyled
                    type={'password'}
                    name={"password"}
                    value={password}
                    onChange={handlePasswordChange}
                  ></InputStyled>
                </Layer>
              </MiddleWapper>
              <ButtonWrapper>
                {loading ? (
                  <ButtonStyled loading>
                    Login
                  </ButtonStyled>
                ) : (
                  <CustomButton >Login</CustomButton>
                )}
              </ButtonWrapper>
            </form>
            {error ? <p style={{ color: "red" }}>{error}</p> : ""}
          </LoginForm>
        </LoginWrapper>
      </LoginStyled>
    </>
  );
}

export default Login;
