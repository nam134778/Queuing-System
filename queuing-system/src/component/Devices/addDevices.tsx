import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
import "../Devices/devices.css";
import {
    CaretDownOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Select, Input, Form, Typography, Layout, Menu, MenuProps, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { useState } from 'react';
import { IWindowSize, useWindowSize } from "../Login/login";
import Menubar from "../Menubar/Menubar";
import { Link } from "react-router-dom";
const { Option } = Select;

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


  const { Header, Content, Footer, Sider } = Layout;


const AddDevices = () => {
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
      <Menubar />
    </Sider>
    <Layout>
    <Header
                className="header"
                >
                    <Row>
                    <Col span={5}><h1>
                    Thông tin cá nhân
                    </h1>
                    </Col>
                        <Col span={15}></Col>
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
                    <Col span={3}>
                        <Row>
                        <Col span={6}>
                        <Avatar size="large" icon={<UserOutlined />} />
                        </Col >
                        <Col 
                        span={18}
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
          margin: '24px 0 0 4rem',
        }}
      >
        <div
          className="site-layout-background"
        >
          <p>Biểu đồ cấp số</p>
        </div>
        <Row>
          <Col span={22}>
          <Form layout="vertical" className="section">
            <Typography.Title className="title">
                Quản lý thiết bị
            </Typography.Title>
            <Card>
                <Row>
                    <Col>
                        <Typography.Title className="title">
                            Thông tin thiết bị
                        </Typography.Title>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    Mã thiết bị:
                                </Typography.Text>
                            }
                        >
                            <Input
                                size="large"
                                placeholder="Nhập mã thiết bị"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    Loại thiết bị:
                                </Typography.Text>
                            }
                        >
                            <Select
                                size="large"
                                placeholder="Chọn loại thiết bị"
                                suffixIcon={
                                    <CaretDownOutlined
                                        style={{
                                            fontSize: "20px",
                                            color: "#FF7506",
                                        }}
                                    />
                                }
                            >
                                <Option key={1} value={"kisok"}>
                                    {"Kisok"}
                                </Option>
                                <Option key={2} value={"Hệ thống"}>
                                    {"Hệ thống"}
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    Tên thiết bị:
                                </Typography.Text>
                            }
                        >
                            <Input
                                size="large"
                                placeholder="Nhập tên thiết bị"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    Tên đăng nhập:
                                </Typography.Text>
                            }
                        >
                            <Input size="large" placeholder="Nhập tài khoản" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    Địa chỉ IP:
                                </Typography.Text>
                            }
                        >
                            <Input size="large" placeholder="Nhập địa chỉ IP" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    Mật khẩu:
                                </Typography.Text>
                            }
                        >
                            <Input size="large" placeholder="Nhập mật khẩu" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    Dịch vụ sử dụng:
                                </Typography.Text>
                            }
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                size="large"
                                placeholder="Nhập dịch vụ sử dụng"
                            >
                                <Option key={1} value={"Khám tim mạch"}>
                                    Khám tim mạch
                                </Option>
                                <Option key={2} value={"Khám sản phụ khoa"}>
                                    Khám sản phụ khoa
                                </Option>
                                <Option key={3} value={"Khám răng hàm mặt "}>
                                    Khám răng hàm mặt
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
            <Row
                gutter={32}
                justify="center"
                className="buttonContainer"
            >
                <Col>
                    <Button
                        type="primary"
                        ghost
                        size="large"
                        className="button"
                    >  
                        <Link to="../">Hủy bỏ</Link>
                    </Button>
                </Col>
                <Col>
                    <Button
                        size="large"
                        type="primary"
                        className="button"
                    >
                        Thêm thiết bị
                    </Button>
                </Col>
            </Row>
        </Form>
          </Col>
          <Col span={2}>
            <Button
            style={{marginLeft:"1rem",height:"6rem",width:"4rem", position:"absolute",right:"0",textAlign:"center"}}
            >Thêm<br/>thiết bị</Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default AddDevices;