import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
import "../GiveNumber/giveNumber.css";
import {
    CaretDownOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    PlusSquareFilled,
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Form, Modal, Typography, Statistic ,Select, Layout, Menu, MenuProps, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { useState } from 'react';
import { IWindowSize, useWindowSize } from "../Login/login";
import Menubar from "../Menubar/Menubar";
import { Link } from "react-router-dom";
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

  const { Text, Title } = Typography;
  const { Option } = Select;
  const { Header, Content, Footer, Sider } = Layout;


const ManageNumber = () => {
    const [modalVisible, setModalVisible] = useState(false);
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
                    margin: '24px 0 0 3rem',
                    }}
                >
                    <Card style={{width:"100rem",height:"30rem",marginTop:"4rem",borderRadius:"15px",boxShadow: "0px 2px 6px rgba(219, 219, 219, 0.5)"}}>
                    <div className="section">
            <Form name="provider-new" layout="vertical">
                <Title className="title">Quản lý cấp số</Title>
                <Card bordered>
                    <Row gutter={24}>
                        <Col span={8} offset={8}>
                            <Title
                                className="title"
                            >
                                Cấp số mới
                            </Title>
                            <Text className="label">
                                Dịch vụ khách hàng lựa chọn
                            </Text>
                            <Form.Item
                                name="id"
                                required={false}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select
                                    size="large"
                                    placeholder="Chọn dịch vụ"
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
                    </Row>
                    <Row
                        gutter={32}
                        justify="center"
                        className="buttonContainer"
                    >
                        <Col>
                            <Button
                                size="large"
                                type="primary"
                                ghost
                                className="button"
                            >
                                <Link to="/manage-number">Hủy bỏ</Link>
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                size="large"
                                type="primary"
                                className="button"
                                htmlType="submit"
                                onClick={() => setModalVisible(true)}
                            >
                                In số
                            </Button>
                            <Modal
                centered
                visible={modalVisible}
                bodyStyle={{ borderRadius: "10px"}}
                onCancel={() => setModalVisible(false)}
                width={470}
                footer={
                    <div className="footerModal">
                        <Typography.Text className="text">
                            {"Thời gian cấp:" + " 17:30 11/10/2021"}
                        </Typography.Text>
                        <Typography.Text className="text">
                            {"Hạn sử dụng:" + " 17:30 11/10/2021"}
                        </Typography.Text>
                    </div>
                }
                className="center"
            >
                <div className="contentModal">
                    <Typography.Text className="text">
                        Số thứ tự được cấp
                    </Typography.Text>
                    <Typography.Text className="number">
                        2001201
                    </Typography.Text>
                    <Typography.Text className="subtext">
                        Dv: Khám răng hàm mặt <b>(tại quầy số 1)</b>
                    </Typography.Text>
                </div>
            </Modal>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </div>
                    </Card>
                </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default ManageNumber;