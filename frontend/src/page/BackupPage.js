import React from "react";
import { Layout } from "antd";
import HeaderContainer from "../container/common/HeaderContainer";
import SidebarContainer from "../container/common/SidebarContainer";
import ContentComponent from "../component/common/ContentComponent";
import 'antd/dist/antd.css';
import BackupContainer from "../container/backup/BackupContainer";

const layoutStyle = {
  height: 'inherit',
  width: 'inherit'
}
function BackupPage() {
  return (
    <>
      <Layout style={layoutStyle}>
          <SidebarContainer />
        <Layout>
        <HeaderContainer />
          <ContentComponent>
              <BackupContainer />
          </ContentComponent>
        </Layout>
      </Layout>
    </>
  );
}

export default BackupPage;
