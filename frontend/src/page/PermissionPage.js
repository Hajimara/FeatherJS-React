import React from "react";
import { Layout } from "antd";
import HeaderContainer from "../container/common/HeaderContainer";
import SidebarContainer from "../container/common/SidebarContainer";
import ContentComponent from "../component/common/ContentComponent";
import "antd/dist/antd.css";
import PermissionContainer from "../container/permission/PermissionContainer";

const layoutStyle = {
  height: "inherit",
  width: "inherit",
};
function PermissionPage() {
  return (
    <>
      <Layout style={layoutStyle}>
        <SidebarContainer />
        <Layout>
          <HeaderContainer />
          <ContentComponent>
            <PermissionContainer />
          </ContentComponent>
        </Layout>
      </Layout>
    </>
  );
}

export default PermissionPage;
