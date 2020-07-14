import React from "react";
import { Layout } from "antd";
import HeaderContainer from "../container/common/HeaderContainer";
import SidebarContainer from "../container/common/SidebarContainer";
import ContentComponent from "../component/common/ContentComponent";
import 'antd/dist/antd.css';
import HomeContainer from "../container/home/HomeContainer";

const layoutStyle = {
  height: 'inherit',
  width: 'inherit'
}
function HomePage() {
  return (
    <>
      <Layout style={layoutStyle}>
          <SidebarContainer />
        <Layout>
        <HeaderContainer />
          <ContentComponent>
            <HomeContainer/>
          </ContentComponent>
        </Layout>
      </Layout>
    </>
  );
}

export default HomePage;
