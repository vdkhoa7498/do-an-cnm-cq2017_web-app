import React, {useState} from 'react'
import './styles.scss'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import HeaderBar from '../headerBar/HeaderBar'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ProjectOutlined,
    SwapOutlined,
  } from '@ant-design/icons';
  
const { Header, Sider, Content } = Layout;

const LayoutComponent = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [menuIndex, setMenuIndex] = useState(1)

  return (
    <div style={{padding: 10}}>
        <HeaderBar/>
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" onClick={(value)=>{ setMenuIndex(value.key); console.log(menuIndex)}} defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to ="/projects">
                        <ProjectOutlined />
                        <span>Projects</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to ="/transactions">
                        <SwapOutlined />
                        <span>Transactions</span>
                    </Link>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 15, display: "flex",  }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: ()=>{setCollapsed(!collapsed)},
                })}
            </Header>
            <Content
                className="site-layout-background"
                style={{
                margin: '24px 16px',
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

export default LayoutComponent