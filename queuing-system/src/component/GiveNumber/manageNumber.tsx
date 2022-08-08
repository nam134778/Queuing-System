import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
import "../GiveNumber/giveNumber.css";
import {
    CaretDownOutlined,
    UserOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Form, Modal, Input, Typography ,Select, Layout, Menu, Breadcrumb, Button, Tooltip, Dropdown, Row, Col, message as notice } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { useState, useEffect } from 'react';
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { useAppSelector, useAppDispatch } from "../../store";
import {
    giveNumberSelector,
    get,
    getAll,
    addgiveNumber,
} from "../../store/reducers/giveNumberSlice";
import {
    serviceSelector,
    getAll as getServices,
} from "../../store/reducers/serviceSlice";
import { userSelector } from "../../store/reducers/userSlice";
import { add as addDiary } from "../../store/reducers/diarySlice";
import Menubar from "../Menubar/Menubar";
import { Link, Navigate } from "react-router-dom";
import   Notification  from "../Notification/Notification";

interface formValue {
    name: string;
    phone: string;
    email: string | undefined;
}
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

const myStatus  = [
    "waiting", "used", "skip"
]
var randomItem = myStatus[Math.floor(Math.random()*myStatus.length)];
const mySystem  = [
    "Hệ thống", "Kiosk"
]
var randomItem2 = mySystem[Math.floor(Math.random()*mySystem.length)];
const ManageNumber = () => {
    const idLogin = localStorage.getItem("userId");
    const dispatch = useAppDispatch();
    const { loading, giveNumber} = useAppSelector(giveNumberSelector);
    const { services } = useAppSelector(serviceSelector);
    const { userLogin } = useAppSelector(userSelector);
    const [service, setService] = useState('');
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [number, setNumber] = useState(0);

    const onFinish = (value: formValue) => {
        let time = new Date();
        let timeExp = new Date();
        timeExp.setHours(time.getHours() + 1);
        dispatch(
            addgiveNumber({
                service: service,
                stt: 0,
                src: randomItem2,
                status: randomItem,
                timeGet: Timestamp.fromDate(time),
                timeExp: Timestamp.fromDate(timeExp),
                name: value.name,
                phoneNumber: value.phone,
                email: value.email ? value.email : ''
            })
        ).then((data) => {
            if (data.payload) {
                const id = data.payload as string;
                dispatch(get(id)).then(() => {setVisible(false);setVisible2(true)});
                notice.success("Lấy số thành công", 3);
                dispatch(getAll());
                dispatch(
                    addDiary({
                        username: userLogin ? userLogin.username : "UnKnown",
                        ip: "127.0.0.1",
                        action: "Lấy số",
                        time: Timestamp.fromDate(new Date()),
                    })
                );
            } else {
                notice.error("Đã xảy ra lỗi", 3);
            }
        });
    };

    useEffect(() => {
        dispatch(getServices());
        dispatch(getAll());
    }, []);

    if (!idLogin) return <Navigate to="/login"></Navigate>;
    return (
        <div>
            <Layout style={{"height":"100vh",fontFamily:"Nunito"}}>
                <Sider
                style={{background:"white"}}
                >
                    <Menubar />
                </Sider>
                <Layout>
                <Header
                className="header"
                >
                    <Row style={{marginTop:"25px"}}>
                    <Col span={6}>
                      <Breadcrumb separator=">" style={{fontWeight:"700",fontSize:"20px",color: "#7E7D88"}}>
                        <Breadcrumb.Item>Cấp số</Breadcrumb.Item>
                        <Breadcrumb.Item href="/give-number">Danh sách cấp số</Breadcrumb.Item>
                        <Breadcrumb.Item>Cấp số mới</Breadcrumb.Item>
                      </Breadcrumb>
                    </Col>
                        <Col span={14}></Col>
                        <Col 
                        span={1}>
                        <Notification />
                        </Col>
                    <Col span={3}>
                    <Row>
                        <Col span={6}>
                        <Link to='/profile'>
                        <Avatar size="large" icon={<UserOutlined />} />
                        </Link>
                        </Col >
                        <Col 
                        span={18}
                        style={{marginTop:"-0.7rem"}}
                        >
                        <Link to='/profile'>
                            <Row><Typography.Text>Xin chào</Typography.Text></Row>
                            <Row><Typography.Text  style={{marginTop:"-40px", fontWeight:"700"}}>{userLogin?.name}</Typography.Text ></Row>
                        </Link>
                        </Col>
                        </Row>
                    </Col>
                    </Row>
                </Header>
                <Content
                    style={{
                    margin: '31px 0 0 3rem',
                    }}
                >
                    <div
                        className="site-layout-background"
                    >
                        <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Quản lý cấp số</p>
                    </div>
                    <Row>
                        <Col span={23}>
                            <Form layout="vertical" className="section"  onFinish={() => setVisible(true)}>
                    <Card style={{borderRadius:"20px",height:"650px",boxShadow: "0px 2px 6px rgba(219, 219, 219, 0.5)"}}>
                    <Row gutter={24} style={{marginTop:"20px"}}>
                        <Col span={8} offset={8}>
                        <Typography.Title className="title" style={{fontSize:"40px",color:"#FF7506",fontWeight:"700",textAlign:"center"}}>
                            CẤP SỐ MỚI
                        </Typography.Title>
                            <Form.Item
                                name="id"
                                required={false}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                label={<Typography.Title className="title" style={{fontSize:"22px",fontWeight:"700", marginLeft:"110px"}}>
                                Dịch vụ khách hàng lựa chọn
                            </Typography.Title>}
                                style={{marginTop:"40px"}}
                            >
                                <Select
                                    size="large"
                                    placeholder="Chọn dịch vụ"
                                    onChange={(value) => setService(value)}
                                    suffixIcon={
                                        <CaretDownOutlined
                                            style={{
                                                fontSize: "20px",
                                                color: "#FF7506",
                                            }}
                                        />
                                    }dropdownStyle={{height:"280px"}}
                                >
                                    {services.map((service) => {
                                        return (
                                            <Option
                                                key={service.id}
                                                value={service.id}
                                            >
                                                {service.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row
                        gutter={32}
                        justify="center"
                        style={{marginTop:"50px"}}
                    >
                        <Col>
                            <Button
                                // type="primary"
                                ghost
                                size="large"
                                className="button-cancel"
                                style={{borderColor:"#FF7506",borderRadius:"10px",color:"#FF7506",background:"rgba(255, 242, 231, 1)",height:"55px",width:"160px",fontSize:"18px"}}
                            >  
                                <Link to="/give-number">Hủy bỏ</Link>
                            </Button>
                        </Col>
                        <Col>
                        <Button
                            size="large"
                            // type="primary"
                            style={{border:"none",borderRadius:"10px",color:"white",background:"#FF9138",height:"55px",width:"160px",fontSize:"18px"}}
                                htmlType="submit"
                            >
                                In số
                            </Button>
                        </Col>
                    </Row>
                    </Card>
                    </Form>
                    <Modal
                centered
                visible={visible2}
                bodyStyle={{ borderRadius: "10px"}}
                onCancel={() => setVisible2(false)}
                width={470}
                footer={
                    <div className="footerModal">
                        <Typography.Text className="text">
                        {"Thời gian cấp:" +
                                moment(giveNumber?.timeGet.toDate()).format(
                                    "HH:mm - DD/MM/YYYY"
                                )}
                        </Typography.Text>
                        <Typography.Text className="text">
                        {"Hạn sử dụng:" +
                                moment(giveNumber?.timeExp.toDate()).format(
                                    "HH:mm - DD/MM/YYYY"
                                )}
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
                    {number}
                    </Typography.Text>
                    <Typography.Text className="subtext">
                        Dv: {service} <b>(tại quầy số 1)</b>
                    </Typography.Text>
                </div>
            </Modal>
            <Modal
                centered
                closable={false}
                maskClosable={false}
                visible={visible}
                bodyStyle={{ borderRadius: "10px" }}
                onCancel={() => setVisible(false)}
                width={500}
                footer={null}
            >
                <Form className="formModal" layout="vertical" onFinish={onFinish} style={{fontFamily:"Nunito"}}>
                    <Typography.Title className="title" style={{textAlign:"center", color:"#FF7506"}}>
                        Thông tin đăng kí
                    </Typography.Title>
                    <Form.Item
                        name="name"
                        required={false}
                        label={<Typography.Text className="label">Họ và tên <span>*</span></Typography.Text>}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền họ tên",
                            },
                        ]}
                        >
                        <Input size="large" placeholder="Nhập họ tên của bạn" style={{borderRadius:"8px"}}/>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        required={false}
                        label={<Typography.Text className="label">Số điện thoại <span>*</span></Typography.Text>}
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền số điện thoại",
                            },
                        ]}
                        >
                        <Input size="large" placeholder="Nhập số điện thoại của bạn" style={{borderRadius:"8px"}}/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={<Typography.Text className="label">Email</Typography.Text>}
                        rules={[
                            {
                                type: 'email',
                                message: "Email không hợp lệ",
                            },
                        ]}
                        >
                        <Input size="large" placeholder="Nhập email của bạn" style={{borderRadius:"8px"}}/>
                    </Form.Item>
                    <Typography.Text className="note"><span>*</span> là trường thông tin bắt buộc</Typography.Text>
                    <Row
                        gutter={16}
                        justify="center"
                        style={{marginTop:"20px"}}
                    >
                        <Col>
                            <Button
                                size="large"
                                type="primary"
                                ghost
                                style={{borderColor:"#FF7506",borderRadius:"10px",color:"#FF7506",background:"rgba(255, 242, 231, 1)",height:"50px",width:"100px",fontSize:"18px"}}
                                onClick={() => setVisible(false)}
                            >
                                Hủy bỏ
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                size="large"
                                type="primary"
                                loading={loading}
                                style={{border:"none",borderRadius:"10px",color:"white",background:"#FF9138",height:"50px",width:"120px",fontSize:"18px"}}
                                htmlType="submit"
                            >
                                {loading ? "" : "Xác nhận"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
                        </Col>
                    </Row>
                </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default ManageNumber;