import {
  MenuFoldOutlined,
  BarChartOutlined,
  BugOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { useState } from "react"
import { Layout, Menu, theme, Button } from 'antd';
import React from 'react';
import style from "../../assets/css/adminScreen/dashboard.module.css"
import Feedback from "./Feedback"
import Statistic from './Statistic';
import CrawlerData from './CrawlerData';

const { Header, Content, Footer, Sider } = Layout;

function Dashboard() {
  const string_content = "content"
  const string_menu = "menu"
  const [collapsed, setCollapsed] = useState(JSON.parse(localStorage.getItem(string_menu)) || false);
  const [contentVisible, setContentVisible] = useState(parseInt(localStorage.getItem(string_content)) || 1)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const chooseContent = (indexContent) => {
    setContentVisible(indexContent)
    localStorage.setItem(string_content, indexContent)
  }

  const toggleMenu = () => {
    setCollapsed(!collapsed)
    localStorage.setItem(string_menu, !collapsed)
  }

  const renderContent = () => {
    switch(contentVisible){
      case 1:
        return <Statistic />
      case 2:
        return <CrawlerData />
      case 3:
        return <Feedback />
    }
  }

  return (
    <Layout hasSider className={style.dashboard}>
      <Sider
        width={250}
        trigger={null} collapsible collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className={style.logo}>{collapsed ? <img src='./schedule192.png' width="24" /> : "Schedule"}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[contentVisible.toString()]} items={[
          {
            key: "1",
            icon: <BarChartOutlined />,
            label: "Statistic",
            onClick: () => chooseContent(1)
          },
          {
            key: "2",
            icon: <BugOutlined />,
            label: "Crawler data",
            onClick: () => chooseContent(2)
          },
          {
            key: "3",
            icon: <MessageOutlined />,
            label: "Feedback",
            onClick: () => chooseContent(3)
          }
        ]} />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: ".2s"
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
        <Button className={style.trigger} shape='circle' icon={<MenuFoldOutlined />} onClick={toggleMenu} />
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            minHeight: 500
          }}
        >
          {renderContent()}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            color: "#fff",
            backgroundColor: "#181821"
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;