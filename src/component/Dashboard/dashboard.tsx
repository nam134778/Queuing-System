import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
import "../Dashboard/dashboard.css";
import { Line } from '@ant-design/charts';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    PieChartOutlined,
    SettingOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Layout, Menu, MenuProps, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { useState } from 'react';
import { IWindowSize, useWindowSize } from "../Login/login";

const menu = (
    <Menu
      items={[
        {
          label: <a href="https://www.antgroup.com">1st menu item</a>,
          key: '0',
        },
        {
          label: <a href="https://www.aliyun.com">2nd menu item</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
      ]}
    />
  );

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem('Dashboard', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Option 3', '3', <ContainerOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Option 3', '3', <ContainerOutlined />),
  
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  ];
  const onClick: MenuProps['onClick'] = e => {
    console.log('click', e);
  };
  const { Header, Content, Footer, Sider } = Layout;


const Dashboard = () => {
  const size = useWindowSize();
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };
    return (
        <div>
<Layout style={{"height":"100vh"}}>
    <Sider
    style={{background:"white"}}
    >
            <div className="logo">
          <img src={imagelogo} className="logoalta"/>
        </div>
      <Menu
        className="hover"
        theme="light"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
          (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`,
          }),
        )}
      />
    </Sider>
    <Layout>
      <Header
      className="header"
      >
        <h1>
          Dashboard 
        </h1>
      </Header>
      <Content
        style={{
          margin: '24px 16px 0 3rem',
        }}
      >
        <div
          className="site-layout-background"
        >
          <p>Biểu đồ cấp số</p>
        </div>
        <div>
        <Row gutter={16}>
      <Col span={6}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={6}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
        </div>
    {/* <Line {...config} /> */}
      </Content>
    </Layout>
    <Sider
        width={(size.width < 1050) ? 250 : 400}
        style={{background:"white"}}
        >
        <Row style={{marginTop:"1rem"}}>
            <Col span={10}></Col>
            <Col 
            span={3}>
            <Dropdown overlay={menu} trigger={['click']}>
                    <a onClick={e => e.preventDefault()}>
                        <Tooltip title="search">
                            <Button type="primary" shape="circle" className="bell-button" icon={<BellFilled className="bell"/>} />
                        </Tooltip>
                    </a>
                </Dropdown>
            </Col>
            <Col>
            <Avatar size="large" icon={<UserOutlined />} />
            </Col>
            <Col style={{
              marginLeft:"0.5em"
            }}>
            <span>Nguyễn Thị Tần</span><br/>
            <span>Hello</span>
            </Col>
        </Row>
        <Row>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
        </Row>
        <Row>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
        </Row>
        <Row>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
        </Row>
    </Sider>
  </Layout>
        </div>
    )
}

export default Dashboard;