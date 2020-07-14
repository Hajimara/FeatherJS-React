import React, { useState, useEffect } from "react";
import SidebarComponent from "../../component/common/SidebarComponent";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { logout, checkThunk } from "../../modules/auth";

function SidebarContainer() {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();
  const [currentPath,setCurrentPath] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const cookies = new Cookies();
  const { user } = useSelector(({ auth }) => ({ user: auth.user }));

  useEffect(()=>{
    setCurrentPath(match.path);
  },[])

  // useEffect(()=>{
  //   dispatch(checkThunk());
  // },[])
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

  const onModalCancel = () => {
    setModalVisible(() => false);
  };

  const onModal = () => {
    setModalVisible(() => true);
  };
  return (
    <>
      <SidebarComponent
        modalVisible={modalVisible}
        onModalConfirm={onModalConfirm}
        onModalCancel={onModalCancel}
        onModal={onModal}
        currentPath={currentPath}
        user={user}
      />
    </>
  );
}

export default SidebarContainer;
