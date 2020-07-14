import React from "react";
import { Layout, Typography, Menu } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
const { Sider } = Layout;
const { Title } = Typography;

const TitleWrapper = styled.div`
  margin: 18px auto;
  text-align: center;
  border-bottom: 1px solid #a0a0a0;
`;
const TitleStyled = styled(Title)`
  &&& {
    font-size: 24px;
    margin:25px 0 ;
    color: white;
  }
`;

const SiderStyle = styled(Sider)`
  &&& {
    height: 100%;
    min-width: 200px;
    min-height: inherit;
    background-color: #383e56;
  }
`;

const MenuStyled = styled(Menu)`
  position: absolute;
  right: 0;
  font-size: 1.25em;
  background-color: #383e56;
  color: white;
`;

const MenuItemStyled = styled(Menu.Item)`
  &&& {
    margin: 0 0 10px 0;
    padding: 5px;
    border-radius: 5px;
    height: 50px;
  }
`;

const LinkStyled = styled(Link)`
  &&& {
    color: white;
    text-decoration: none;
  }
`;
const MenuWrapper = styled.div``;


const MenuArea = styled.div`
  display: flex;
  justify-content:center;
`;
const NavBox = styled.div`
  display: flex;
  margin: 20px 10px;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
  opacity: ${(props) => (props.currentPath ? 0.6 : 1)};
`;
const Nav = styled.div`
  font-size: 1.25rem;
  color: white;
`;

const IconStyle = { fontSize: "1.25rem", padding: "6px 6px 6px 0", color: "white" };
function SidebarComponent({
 
  onModal,
  currentPath,
  user
}) {
  return (
    <>
      
      <SiderStyle>
        <TitleWrapper>
          <TitleStyled>Admin Board</TitleStyled>
        </TitleWrapper>

        <MenuArea>
          <MenuWrapper>
          {/* !role.includes("w") && !role.includes("super") */}
          <LinkStyled to="/home">
            <NavBox
              currentPath={String(currentPath).includes("/home") ? true : false}
            >
              <PieChartOutlined style={IconStyle} />
              <Nav>Dashboard</Nav>
            </NavBox>
          </LinkStyled>
          {user && !user.role.includes("r") && !user.role.includes("super") ? 

          ''
          : <LinkStyled to="/board">
          <NavBox
            currentPath={
              String(currentPath).includes("/board") ? true : false
            }
          >
            <DesktopOutlined style={IconStyle} />
            <Nav>Board</Nav>
          </NavBox>
        </LinkStyled>}
          {user && user.role.includes("super") ? 

          <LinkStyled to="/setting">
            <NavBox
              currentPath={
                String(currentPath).includes("/setting") ? true : false
              }
            >
              <ContainerOutlined style={IconStyle} />
              <Nav>Setting</Nav>
            </NavBox>
          </LinkStyled>
          : ''}
          {/* <NavBox onClick={onModal}>
            <AppstoreOutlined style={IconStyle} />
            <Nav>Logout</Nav>
          </NavBox> */}
          </MenuWrapper>
        </MenuArea>
      </SiderStyle>
    </>
  );
}

export default SidebarComponent;
