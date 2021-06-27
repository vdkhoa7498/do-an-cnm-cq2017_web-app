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
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const LayoutComponent = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuIndex, setMenuIndex] = useState(1);

  return (
    <div>
      <HeaderBar />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            onClick={(value) => {
              setMenuIndex(value.key);
              console.log(menuIndex);
            }}
            defaultSelectedKeys={["1"]}
          >
            <SubMenu key="sub2" icon={<ProjectOutlined />} title="Projects">
              <Menu.Item key="2">
                <Link to="/confirmed-projects">
                  <span>Confirmed Projects</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/unconfirmed-projects">
                  <span>Unconfirmed Projects</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<SwapOutlined />} title="Transactions">
              <Menu.Item key="9">
                <Link to="/donate-transactions">
                  <span>User Donation</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="10">
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
