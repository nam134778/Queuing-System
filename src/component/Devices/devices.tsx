import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
import "../Devices/devices.css";
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
import { Table, Divider, Tag } from 'antd';
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


const Devices = () => {
  const size = useWindowSize();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text:any) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags:any) => (
        <span>
          {tags.map((tag:any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text:any, record:any) => (
        <span>
          <a>Invite {record.name}</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
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
          <Row>
          <Col span={3}><h1>
          Thiết bị
        </h1>
        </Col>
            <Col span={13}></Col>
            <Col 
            span={1}>
            <Dropdown overlay={menu} trigger={['click']}>
                    <a onClick={e => e.preventDefault()}>
                        <Tooltip title="search">
                            <Button type="primary" shape="circle" className="bell-button" icon={<BellFilled className="bell"/>} />
                        </Tooltip>
                    </a>
                </Dropdown>
            </Col>
          <Col span={7}>
              <Row>
              <Col span={3}>
            <Avatar size="large" icon={<UserOutlined />} />
            </Col >
            <Col 
            span={21}
            style={{marginTop:"-0.7rem"}}
            >
            <h1>Nguyễn Thị Tần</h1>
            <h1 style={{marginTop:"-3rem"}}>Hello</h1>
            </Col>
              </Row>
          </Col>
          </Row>
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
        <Table columns={columns} dataSource={data} />
        </div>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default Devices;