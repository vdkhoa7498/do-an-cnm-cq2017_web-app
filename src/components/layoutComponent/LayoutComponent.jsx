import React, { useState } from "react";
import "./styles.scss";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import HeaderBar from "../headerBar/HeaderBar";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ProjectOutlined,
  SwapOutlined,
  PicLeftOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const LayoutComponent = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuIndex, setMenuIndex] = useState(1);
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <div>
      <HeaderBar />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={["sub1"]}
            onClick={(value) => {
              setMenuIndex(value.key);
              console.log(menuIndex);
            }}
            defaultSelectedKeys={["1"]}
          >
            {isAuthenticated ? (
              <Menu.Item key="0">
                <Link to="/my-projects">
                  <PicLeftOutlined />
                  <span>My Project</span>
                </Link>
              </Menu.Item>
            ) : null}
            <SubMenu key="sub1" icon={<ProjectOutlined />} title="Projects">
              <Menu.Item key="1">
                <Link to="/confirmed-projects">
                  <span>Confirmed Projects</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/unconfirmed-projects">
                  <span>Unconfirmed Projects</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<SwapOutlined />} title="Transactions">
              <Menu.Item key="3">
                <Link to="/donate-transactions">
                  <span>User Donation</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/resend-transactions">
                  <span>Organization Resend</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 15, display: "flex" }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => {
                  setCollapsed(!collapsed);
                },
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 500,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutComponent;
