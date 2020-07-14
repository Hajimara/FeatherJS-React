import React from "react";
import { Layout } from "antd";
const { Content } = Layout;

const contentStyle = {
  padding: "45px",
  minHeight: "280px",
};

function ContentComponent({ children }) {
  return (
    <>
      <Content style={contentStyle}>{children}</Content>
    </>
  );
}

export default ContentComponent;
