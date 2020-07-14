import React, { useState, useEffect } from "react";
import Permission from "../../component/permission/Permission";
import { useDispatch, useSelector } from "react-redux";
import {
  userCreateThunk,
  userInitailize,
  errorInitailize,
  userAllFindThunk,
  userOneFindThunk,
  userRoleUpdateThunk,
  userOneFindInitialize,
  userRoleUpdateInitialize,
  userStoreInitialize,
  userRemoveThunk,
  userRemoveInitialize,
} from "../../modules/user";
import { message } from "antd";

const emailRegExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const passwordRegExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
const usernameRegExp = /^[가-힣]|[a-zA-Z\s]+/;

function PermissionContainer() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [removeId, setRemoveId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [modalError, setModalError] = useState("");
  const [modalDivision, setModalDivision] = useState("");
  const [search, setSearch] = useState("");

  const {
    findAllUser,
    findAllUserLoading,
    findAllTotal,
    findOneUser,
    newUser,
    createError,
    createLoading,
    updateUser,
    updateError,
    removeUser,
    removeError
  } = useSelector(({ user, loading }) => ({
    removeUser: user.removeUser,
    removeError: user.removeError,
    updateUser: user.updateUser,
    updateError: user.updateError,
    findAllUser: user.findAllUser,
    findAllTotal: user.findAllTotal,
    findOneUser: user.findOneUser,
    newUser: user.user,
    createError: user.error,
    createLoading: loading["user/USER_CREATE"],
    findAllUserLoading: loading["user/USER_ALL_FIND"],
  }));

  // 페이지 스토어 정리
  useEffect(() => {
    return () => {
      dispatch(userStoreInitialize());
    };
  }, [dispatch]);

  // 업데이트 이후 처리
  useEffect(() => {
    if (updateUser) {
      message.success("업데이트가 완료되었습니다.");
    }
    if (updateError) {
      message.error("업데이트가 실패하였습니다.");
    }
    dispatch(userRoleUpdateInitialize());
  }, [updateUser, updateError, dispatch]);
  // 유저 리스트 가져오기
  useEffect(() => {
    dispatch(userAllFindThunk());
  }, [dispatch, newUser,removeUser]);

  // 유저 생성 이후 처리
  useEffect(() => {
    if (newUser) {
      message.success("유저가 생성되었습니다.");
      dispatch(userInitailize());
      setModalVisible(false);
      setUsername("");
      setEmail("");
      setPassword("");
      setPwConfirm("");
      setModalError("");
      return;
    }
    if (String(createError).includes('already exists')) {
      message.error("같은 이메일의 유저가 존재합니다.");
      dispatch(errorInitailize());
      return;
    }
    if (createError) {
      message.error("알 수 없는 에러가 발생하였습니다. 관리자에게 문의해주세요.");
      dispatch(errorInitailize());
      return;
    }
  }, [newUser, createError, dispatch]);

  // 엘리먼트 이벤트 처리
  const onData = (e) => {
    dispatch(userOneFindInitialize());
    const emailArg = e.currentTarget.dataset.id;
    dispatch(userOneFindThunk(emailArg));
    setPermissionModalVisible(() => true);
  };
  const onChangeUsername = (e) => {
    const { value } = e.target;
    setUsername(() => value);
  };
  const onChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(() => value);
  };
  const onChangePassword = (e) => {
    const { value } = e.target;
    setPassword(() => value);
  };
  const onChangePwConfirm = (e) => {
    const { value } = e.target;
    setPwConfirm(() => value);
  };

  const onModalConfirm = () => {
    setModalError("");
    if (username === "") {
      setModalError("유저이름을 입력해주세요.");
      return;
    }
    if (email === "") {
      setModalError("이메일을 입력해주세요.");
      return;
    }
    if (password === "") {
      setModalError("패스워드을 입력해주세요.");
      return;
    }
    if (pwConfirm === "") {
      setModalError("패스워드 확인을 입력해주세요.");
      return;
    }

    if (!usernameRegExp.test(username)) {
      setModalError("이름은 영문 또는 한글로 입력가능합니다.");
      return;
    }

    if (!emailRegExp.test(email)) {
      setModalError("이메일 형식이 맞지않습니다.");
      return;
    }
    if (!passwordRegExp.test(password)) {
      setModalError("영문, 숫자, 특수문자 8~15자리로 입력해주세요.");
      return;
    }
    if (password !== pwConfirm) {
      setModalError("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      dispatch(
        userCreateThunk({
          strategy: "local",
          username: username,
          email: email,
          password: password,
          role: modalDivision === 'user'? ["r"] : ["super"],
          image: null,
        })
      );
    } catch (error) {
      setModalError(error);
    }
  };
  const onModalCancel = () => {
    setModalVisible(() => false);
    setUsername("");
      setEmail("");
      setPassword("");
      setPwConfirm("");
      setModalError("");
  };

  const onModalUser = () => {
    setModalVisible(() => true);
    setModalDivision('user');
  };

  const onPermissionModalCancel = () => {
    setPermissionModalVisible(() => false);
  };

  const onRemoveModal = (e) => {
    const id = e.currentTarget.dataset.id;
    setRemoveModalVisible(() => true);
    setRemoveId(id);
  };

  const onRemoveCancel = () => {
    setRemoveModalVisible(() => false);
  };

  const onRemoveConfirm = () => {
    try {
      dispatch(userRemoveThunk(removeId));
    setRemoveModalVisible(() => false);
    message.success('유저를 삭제했습니다.');
      dispatch(userRemoveInitialize());
    } catch (error) {
      message.error('삭제에 실패했습니다. 관리자에게 문의해주세요.');
      dispatch(userRemoveInitialize());
    }

  }
  
  const onPagination = (e) => {
    dispatch(userAllFindThunk(e));
  };

  const handleRoleUpdate = () => {
    const checkList = window.document.getElementsByClassName(
      "ant-switch-checked"
    );
    let permissionList = [];

    try {
      Array.prototype.forEach.call(checkList, (data, index) => {
        permissionList.push(data.dataset.id);
      });
      const data = {
        permissionList,
        _id: findOneUser._id,
        data: findOneUser,
      };

      dispatch(userRoleUpdateThunk(data));
    setPermissionModalVisible(() => false);
    } catch (error) {
      console.log(error);
      message.error('업데이트 도중 에러가 발생했습니다.');
    }
  };

  const onDivisionSwitch = (e) => {
    if(e === true){
      setModalDivision('admin')
    }else {
      setModalDivision('user')
    }
  }

  const onSearchUser = () => {
    const data = {
      search: search
    }
    dispatch(userAllFindThunk(data))
  }

  const onChangeSearch = (e)=> {
    setSearch(e.target.value);
  }

  const onClear = () => {
    dispatch(userAllFindThunk())
setSearch('')
  }
  return (
    <Permission
      modalVisible={modalVisible}
      onModalConfirm={onModalConfirm}
      onModalCancel={onModalCancel}
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
      findAllUser={findAllUser}
      findAllTotal={findAllTotal}
      findAllUserLoading={findAllUserLoading}
      findOneUser={findOneUser}
      onData={onData}
      onPagination={onPagination}
      handleRoleUpdate={handleRoleUpdate}
      
      removeModalVisible={removeModalVisible}
      onModalUser={onModalUser}
      modalDivision={modalDivision}
      permissionModalVisible={permissionModalVisible}
      onPermissionModalCancel={onPermissionModalCancel}
      onRemoveModal={onRemoveModal}
      onRemoveCancel={onRemoveCancel}
      onRemoveConfirm={onRemoveConfirm}
      onDivisionSwitch={onDivisionSwitch}
      onSearchUser={onSearchUser}
      search={search}
      onChangeSearch={onChangeSearch}
      onClear={onClear}
    />
  );
}

export default PermissionContainer;
