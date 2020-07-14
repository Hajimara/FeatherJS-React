import React from "react";
import { Layout } from "antd";
import HeaderContainer from "../container/common/HeaderContainer";
import SidebarContainer from "../container/common/SidebarContainer";
import ContentComponent from "../component/common/ContentComponent";
import "antd/dist/antd.css";
import MyProfileContainer from "../container/myProfile/MyProfileContainer";

const layoutStyle = {
  height: "inherit",
  width: "inherit",
};
function MyProfilePage() {
  return (
    <>
      <Layout style={layoutStyle}>
        <SidebarContainer />
        <Layout>
          <HeaderContainer />
          <ContentComponent>
            <MyProfileContainer />
          </ContentComponent>
        </Layout>
      </Layout>
    </>
  );
}

export default MyProfilePage;
