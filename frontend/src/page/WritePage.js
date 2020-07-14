import React from "react";
import { Layout } from "antd";
import HeaderContainer from "../container/common/HeaderContainer";
import SidebarContainer from "../container/common/SidebarContainer";
import ContentComponent from "../component/common/ContentComponent";
import 'antd/dist/antd.css';
import WriteContainer from "../container/board/WriteContainer";

const layoutStyle = {
  height: 'inherit',
  width: 'inherit'
}
function WritePage() {
  return (
    <>
      <Layout style={layoutStyle}>
          <SidebarContainer />
        <Layout>
        <HeaderContainer />
          <ContentComponent>
            <WriteContainer></WriteContainer>
          </ContentComponent>
        </Layout>
      </Layout>
    </>
  );
}

export default WritePage;
