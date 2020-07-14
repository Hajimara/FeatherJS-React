import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderComponent from "../../component/common/HeaderComponent";
import { useHistory, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import { message } from "antd";
import { logout } from "../../modules/auth";

function HeaderContainer({ location }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const cookies = new Cookies();
  const { user } = useSelector(({ auth }) => ({
    user: auth.user,
  }));

  useEffect(() => {
    if (location.pathname === "/setting") {
      if (user || user !== null) {
        if (user.role[0] !== "super") {
          message.warning("Admin 이외 관리자는 접근할 수 없습니다.");
          history.push("/");
        }
      }
    }
  }, [history, location, dispatch, user]);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("access_token");
    if (!token) {
      history.push("/");
    }
  }, []);

  const onModalCancel = () => {
    setModalVisible(() => false);
  };

  const onModal = () => {
    setModalVisible(() => true);
  };

  const onModalConfirm = () => {
    try {
      if(cookies.get('access_token')){
       cookies.remove("access_token");
      }
 
     dispatch(logout());
     history.push('/');
     cookies.remove("access_token");
   } catch (error) {
      console.log(error);
    }
   };

  return (
    <>
      <HeaderComponent
        user={user}
        modalVisible={modalVisible}
        onModalConfirm={onModalConfirm}
        onModalCancel={onModalCancel}
        onModal={onModal}
      />
    </>
  );
}

export default withRouter(HeaderContainer);
