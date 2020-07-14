import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../../component/login/Login";
import { loginThunk, errorReset } from "../../modules/auth";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const passwordRegExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const history = useHistory();
  const { auth, user, authError, loading } = useSelector(
    ({ auth, loading }) => ({
      auth: auth.auth,
      user: auth.user,
      authError: auth.error,
      loading: loading["auth/LOGIN"],
    })
  );

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === null || email === "") {
      setError("이메일을 입력해주세요.");
      return;
    }
    if (password === null || password === "") {
      setError("패스워드를 입력해주세요.");
      return;
    }
    if (!emailRegExp.test(email)) {
      setError("이메일 형식이 맞지 않습니다.");
      return;
    }
    if (!passwordRegExp.test(password)) {
      setError("패스워드 형식이 맞지 않습니다.");
      return;
    }
    setError("");
    dispatch(errorReset());
    dispatch(
      loginThunk({
        strategy: "local",
        email,
        password,
      })
    );
  };

  // 성공여부
  useEffect(() => {
    
    if (authError) {
      setError("아이디 또는 패스워드가 정확하지 않습니다.");
      return;
    }
    if (auth) {
    try {
        cookies.set("access_token", auth.user.token);
        history.push("/home");
      } catch (error) {
        console.log("cookies is not working");
      }
    }
  }, [auth, authError, history, dispatch]);

  // 토큰 유효 시 바로 로그인
  useEffect(() => {
    if (user) {
      history.push("/home");
    }
  }, [user]);

  return (
    <>
      <Login
        email={email}
        password={password}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
    </>
  );
}

export default LoginContainer;
