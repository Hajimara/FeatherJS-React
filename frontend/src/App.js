import React, { useRef, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import "./lib/style/App.css";
import LoginPage from "./page/LoginPage";
import PermissionPage from "./page/PermissionPage";
import BoardListPage from "./page/BoardListPage";
import BoardPage from "./page/BoardPage";
import WritePage from "./page/WritePage";
import MyProfilePage from "./page/MyProfilePage";
import AdminRoute from "./authorization/AdminRoute";
import ReadRoute from "./authorization/ReadRoute";
import WriteRoute from "./authorization/WriteRoute";
import { useSelector, useDispatch } from "react-redux";
import { checkThunk } from "./modules/auth";
import NotFound from "./authorization/NotFound";
import BackupPage from "./page/BackupPage";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => ({
    user: auth.user,
  }));
  const useComponentWillMount = func => {
    const willMount = useRef(true);
    if (willMount.current) {
      func();
    }
    useComponentDidMount(() => {
      willMount.current = false;
    });
  };
  
  const useComponentDidMount = func => useEffect(func, []);
  useComponentWillMount(() => dispatch(checkThunk()));
  // useComponentDidMount(() => console.log("didMount"));

  return (
    <Switch>
      <Route component={LoginPage} path="/" exact />
      <Route component={HomePage} path="/home" />
      <AdminRoute
        role={user ? user.role : ""}
        component={PermissionPage}
        path="/setting"
      />
      <ReadRoute
        role={user ? user.role : ""}
        component={BoardListPage}
        path="/board"
        exact
      />
      <ReadRoute
        role={user ? user.role : ""}
        component={BoardPage}
        path="/board/:boardId"
      />
      <WriteRoute
        role={user ? user.role : ""}
        component={WritePage}
        path="/write"
        exact
      />
      <WriteRoute
        role={user ? user.role : ""}
        component={WritePage}
        path="/write/:boardId"
      />
      <AdminRoute
        role={user ? user.role : ""}
        component={BackupPage}
        path="/backup"
      />
      <Route component={MyProfilePage} path="/myProfile" />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
