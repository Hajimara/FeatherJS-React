import React, { useEffect, useState } from "react";
import MyProfile from "../../component/myProfile/MyProfile";
import { useDispatch, useSelector } from "react-redux";
import { checkThunk } from "../../modules/auth";
import { message } from "antd";
import {
  userPatchThunk,
  userPatchInitialize,
  userStoreInitialize,
  userPasswordChangeThunk,
} from "../../modules/user";
import { useHistory } from "react-router-dom";

const passwordRegExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
const usernameRegExp = /^[가-힣]|[a-zA-Z\s]+/;

function MyProfileContainer() {
  const dispatch = useDispatch();
  const [email, setEamil] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [imageFile, setImageFile] = useState();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();
  const {
    user,
    patchUser,
    patchUserError,
    loading,
    passwordChange,
    passwordChangeError,
    modalLoading,
  } = useSelector(({ auth, user, loading }) => ({
    user: auth.user,
    patchUser: user.patchUser,
    patchUserError: user.patchUserError,
    loading: loading["user/USER_PATCH"],
    passwordChange: user.passwordChange,
    passwordChangeError: user.passwordChangeError,
    modalLoading : loading['user/USER_PASSWORD_CHANGE']
  }));

  //스토어 정리
  useEffect(() => {
    return () => {
      dispatch(userStoreInitialize());
    };
  }, []);

  useEffect(() => {
    if (passwordChange) {
      message.success("비밀번호가 성공적으로 변경되었습니다.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setModalVisible(false);
      return;
    }
    if(String(passwordChangeError).includes('Validation failed') || String(passwordChangeError).includes('Invalid login')){
      message.error("현재 비밀번호가 정확하지 않습니다. 다시 입력해주세요.");
      return;
    }
    if (passwordChangeError) {
      message.error("비밀번호 변경에 실패했습니다. 관리자에게 문의해주세요.");
      return;
    }
  }, [passwordChange, passwordChangeError]);

  useEffect(() => {
    if (patchUser) {
      message.success("유저정보가 변경되었습니다.");
      dispatch(userPatchInitialize());
      history.push("/");
      return;
    }
    if (patchUserError) {
      if (String(patchUserError).includes("Invalid login")) {
        setError("비밀번호가 일치하지 않습니다.");
        dispatch(userPatchInitialize());
        return;
      }
      message.error(
        "유저정보 변경에 실패하였습니다. 관리자에게 문의해주세요."
      );
      dispatch(userPatchInitialize());
      return;
    }
  }, [patchUser, patchUserError]);

  useEffect(() => {
    dispatch(checkThunk());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setEamil(user.email);
      setUsername(user.username);
    }
  }, [user]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onPatchUserInfo = () => {
    setError("");
    const data = {
      _id: user._id,
      email,
      username,
      currentPassword:password,
      division: 'profile'
    };

    if (username === "") {
      setError("유저이름을 입력해주세요.");
      return;
    }
    if (email === "") {
      setError("이메일을 입력해주세요.");
      return;
    }
    if (password === "") {
      setError("패스워드을 입력해주세요.");
      return;
    }
    if (!usernameRegExp.test(username)) {
      setError("이름은 영문 또는 한글로 입력가능합니다.");
      return;
    }

    if (!passwordRegExp.test(password)) {
      setError("비밀번호는 영문, 숫자, 특수문자 8~15자리로 입력해주세요.");
      return;
    }
    let formData = new FormData();

    for (let key in data) formData.append(key, data[key]);
    if (imageFile && imageFile !== "") {
      formData.append("files", imageFile);
    }
    try {
      dispatch(userPatchThunk(data._id, formData));
    } catch (error) {
      console.log(error);
      message.error("프로필 변경에 실패했습니다.");
    }
  };
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        setImageFile({
          imageUrl,
        })
      );
    }
  };

  const onModalConfirm = () => {
    setPasswordError('');
    
    const data = {
      _id: user._id,
      email: user.email,
      currentPassword: currentPassword,
      password: newPassword,
      confirmPassword: confirmPassword,
      division: 'password'
    };

    console.log(data);
    
    if (data.currentPassword === "") {
      setPasswordError("현재 사용하는 패스워드을 입력해주세요.");
      return;
    }

    if (data.password === "") {
      setPasswordError("변경할 패스워드을 입력해주세요.");
      return;
    }

    if (data.confirmPassword === "") {
      setPasswordError("패스워드 확인을 입력해주세요.");
      return;
    }
    if (
      !passwordRegExp.test(data.currentPassword) &&
      !passwordRegExp.test(data.password) &&
      !passwordRegExp.test(data.confirmPassword)
    ) {
      setPasswordError("비밀번호는 영문, 숫자, 특수문자 8~15자리로 입력해주세요.");
      return;
    }
    if(data.currentPassword === data.password){
      setPasswordError("기존에 사용하던 비밀번호로 변경할 수 없습니다.");
      return;
    }

    dispatch(userPasswordChangeThunk(data));
  };

  const onModalCancel = () => {
    setPasswordError('');

    setModalVisible(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const onModal = () => {
    setModalVisible(true);
  };

  const onChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <MyProfile
      user={user}
      email={email}
      username={username}
      password={password}
      onChangeUsername={onChangeUsername}
      onPatchUserInfo={onPatchUserInfo}
      onChangePassword={onChangePassword}
      error={error}
      loading={loading}
      imageFile={imageFile}
      setImageFile={setImageFile}
      handleChange={handleChange}
      currentPassword={currentPassword}
      newPassword={newPassword}
      confirmPassword={confirmPassword}
      onModalConfirm={onModalConfirm}
      onModalCancel={onModalCancel}
      onModal={onModal}
      modalVisible={modalVisible}
      onChangeCurrentPassword={onChangeCurrentPassword}
      onChangeNewPassword={onChangeNewPassword}
      onChangeConfirmPassword={onChangeConfirmPassword}
      passwordError={passwordError}
      modalLoading={modalLoading}
    />
  );
}

export default MyProfileContainer;
