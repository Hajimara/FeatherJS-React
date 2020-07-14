import React from "react";
import { Layout } from "antd";
import HeaderContainer from "../container/common/HeaderContainer";
import SidebarContainer from "../container/common/SidebarContainer";
import ContentComponent from "../component/common/ContentComponent";
import 'antd/dist/antd.css';
import BoardContainer from "../container/board/BoardContainer";
import CommentContainer from "../container/comment/CommentContaier";

const layoutStyle = {
  height: 'inherit',
  width: 'inherit'
}
function BoardPage() {
  return (
    <>
      <Layout style={layoutStyle}>
          <SidebarContainer />
        <Layout>
        <HeaderContainer />
          <ContentComponent>
              <BoardContainer />
              <CommentContainer />
          </ContentComponent>
        </Layout>
      </Layout>
    </>
  );
}

export default BoardPage;
