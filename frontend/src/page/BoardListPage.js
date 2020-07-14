import React from "react";
import { Layout } from "antd";
import HeaderContainer from "../container/common/HeaderContainer";
import SidebarContainer from "../container/common/SidebarContainer";
import ContentComponent from "../component/common/ContentComponent";
import 'antd/dist/antd.css';
import BoardListContainer from "../container/board/BoardListContainer";

const layoutStyle = {
  height: 'inherit',
  width: 'inherit'
}
function BoardListPage() {
  return (
    <>
      <Layout style={layoutStyle}>
          <SidebarContainer />
        <Layout>
        <HeaderContainer />
          <ContentComponent>
            <BoardListContainer/>
          </ContentComponent>
        </Layout>
      </Layout>
    </>
  );
}

export default BoardListPage;
