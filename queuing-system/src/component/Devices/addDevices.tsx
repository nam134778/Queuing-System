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
                    Th??ng tin c?? nh??n
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
                        <h1>Nguy???n Th??? T???n</h1>
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
          <p>Bi???u ????? c???p s???</p>
        </div>
        <Row>
          <Col span={22}>
          <Form layout="vertical" className="section">
            <Typography.Title className="title">
                Qu???n l?? thi???t b???
            </Typography.Title>
            <Card>
                <Row>
                    <Col>
                        <Typography.Title className="title">
                            Th??ng tin thi???t b???
                        </Typography.Title>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    M?? thi???t b???:
                                </Typography.Text>
                            }
                        >
                            <Input
                                size="large"
                                placeholder="Nh???p m?? thi???t b???"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    Lo???i thi???t b???:
                                </Typography.Text>
                            }
                        >
                            <Select
                                size="large"
                                placeholder="Ch???n lo???i thi???t b???"
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
                                <Option key={2} value={"H??? th???ng"}>
                                    {"H??? th???ng"}
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    T??n thi???t b???:
                                </Typography.Text>
                            }
                        >
                            <Input
                                size="large"
                                placeholder="Nh???p t??n thi???t b???"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    T??n ????ng nh???p:
                                </Typography.Text>
                            }
                        >
                            <Input size="large" placeholder="Nh???p t??i kho???n" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    ?????a ch??? IP:
                                </Typography.Text>
                            }
                        >
                            <Input size="large" placeholder="Nh???p ?????a ch??? IP" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    M???t kh???u:
                                </Typography.Text>
                            }
                        >
                            <Input size="large" placeholder="Nh???p m???t kh???u" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={
                                <Typography.Text className="label">
                                    D???ch v??? s??? d???ng:
                                </Typography.Text>
                            }
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                size="large"
                                placeholder="Nh???p d???ch v??? s??? d???ng"
                            >
                                <Option key={1} value={"Kh??m tim m???ch"}>
                                    Kh??m tim m???ch
                                </Option>
                                <Option key={2} value={"Kh??m s???n ph??? khoa"}>
                                    Kh??m s???n ph??? khoa
                                </Option>
                                <Option key={3} value={"Kh??m r??ng h??m m???t "}>
                                    Kh??m r??ng h??m m???t
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
                        <Link to="../">H???y b???</Link>
                    </Button>
                </Col>
                <Col>
                    <Button
                        size="large"
                        type="primary"
                        className="button"
                    >
                        Th??m thi???t b???
                    </Button>
                </Col>
            </Row>
        </Form>
          </Col>
          <Col span={2}>
            <Button
            style={{marginLeft:"1rem",height:"6rem",width:"4rem", position:"absolute",right:"0",textAlign:"center"}}
            >Th??m<br/>thi???t b???</Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default AddDevices;