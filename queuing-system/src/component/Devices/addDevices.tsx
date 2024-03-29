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
    import {
        Button,
        Card,
        Col,
        Form,
        Input,
        Row,
        Select,
        Typography,
        message as notice,
    } from "antd";
import { Avatar, Layout, Menu, Breadcrumb, Tooltip, Dropdown} from 'antd';
import { Table, Divider, Tag } from 'antd';
import { useState, useEffect } from 'react';
import Menubar from "../Menubar/Menubar";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import {
    deviceSelector,
} from "../../store/reducers/deviceSlice";
import {addDevice,
    get,
    update } from '../../store/actions/deviceActions';
import {
    serviceSelector,
    getAll,
} from "../../store/reducers/serviceSlice";
import { userSelector } from "../../store/reducers/userSlice";
import { add as addDiary } from "../../store/reducers/diarySlice";
import { Timestamp } from "firebase/firestore";
import   Notification  from "../Notification/Notification";
const { Option } = Select;


  interface formValue {
    code: string;
    name: string;
    username: string;
    password: string;
    type: string;
    ip: string;
    isActive: boolean;
    isConnect: boolean;
    services: string[];
}
  const { Header, Content, Sider } = Layout;

  const isActiveValue = [
    true, false
]
var randomItem = isActiveValue[Math.floor(Math.random()*isActiveValue.length)];
var randomItem2 = isActiveValue[Math.floor(Math.random()*isActiveValue.length)];
const AddDevices = () => {
    const idLogin = localStorage.getItem("userId");
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, device } = useAppSelector(deviceSelector);
    const { services } = useAppSelector(serviceSelector);
    const { userLogin } = useAppSelector(userSelector);
    const onFinish = (value: formValue) => {
        console.log(value);
        if (id) {
            dispatch(
                update({
                    id,
                    ...value,
                })
            ).then((data) => {
                if (data.meta.requestStatus == "fulfilled") {
                    dispatch(get(id));
                    notice.success("Cập nhật thành công", 3);
                    dispatch(
                        addDiary({
                            username: userLogin ? userLogin.username : "",
                            ip: "127.0.0.1",
                            action: "Cập nhật thông tin thiết bị",
                            time: Timestamp.fromDate(new Date()),
                        })
                    );
                } else {
                    notice.error("Đã xảy ra lỗi", 3);
                }
            });
        } else {
            dispatch(
                addDevice({...value, isActive: randomItem, isConnect: randomItem2})
            ).then((data) => {
                if (data.meta.requestStatus == "fulfilled") {
                    notice.success("Thêm thành công", 3);
                    navigate("../");
                    dispatch(
                        addDiary({
                            username: userLogin ? userLogin.username : "",
                            ip: "127.0.0.1",
                            action: "Thêm thiết bị",
                            time: Timestamp.fromDate(new Date()),
                        })
                    );
                } else {
                    notice.error("Đã xảy ra lỗi", 3);
                }
            });
        }
    };

    useEffect(() => {
        form.setFieldsValue(device);
    }, [device]);
    useEffect(() => {
        if (id) {
            dispatch(get(id));
        }
        dispatch(getAll())
    }, []);
    if (!idLogin) return <Navigate to="/login"></Navigate>;
    return (
        <div>
<Layout style={{"height":"100vh","fontFamily":"Nunito"}}>
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
                    <Col span={8}>                       
                     <Breadcrumb separator=">" style={{fontWeight:"700",fontSize:"20px",color: "#7E7D88"}}>
                        <Breadcrumb.Item>Thiết bị</Breadcrumb.Item>
                        <Breadcrumb.Item href="/devices">Danh sách thiết bị</Breadcrumb.Item>
                        <Breadcrumb.Item>Thêm thiết bị</Breadcrumb.Item>
                      </Breadcrumb>
                    </Col>
                        <Col span={12}></Col>
                        <Col 
                        span={1}>
                        <Notification />
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
          margin: '31px 0rem 0 3rem',
        }}
      >
        <div
          className="site-layout-background"
        >
          <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Quản lý thiết bị</p>
        </div>
        <Row>
          <Col span={23}>
          <Form layout="vertical" className="section" form={id ? form : undefined}
            onFinish={onFinish}>
            <Card style={{borderRadius:"20px",height:"650px", paddingLeft:"10px"}}>
                <Row>
                    <Col>
                        <Typography.Title className="title" style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}>
                            Thông tin thiết bị
                        </Typography.Title>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="code"
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Mã thiết bị:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mã thiết bị",
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Nhập mã thiết bị"
                                style={{height:"50px", borderRadius: "8px"}}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="type"
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Loại thiết bị:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
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
                                dropdownStyle={{height:"102px"}}
                            >
                                <Option key={1} value={"Kiosk"}>
                                    {"Kiosk"}
                                </Option>
                                <Option key={2} value={"DisplayCounter"}>
                                    {"Display Counter"}
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="name"
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Tên thiết bị:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên thiết bị",
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Nhập tên thiết bị"
                                style={{height:"50px", borderRadius: "8px"}}
                                // value={"abc"}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="username"
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Tên đăng nhập:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên đăng nhập",
                                },
                            ]}
                        >
                            <Input size="large" placeholder="Nhập tài khoản" style={{height:"50px", borderRadius: "8px"}}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="ip"
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Địa chỉ IP:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ ip",
                                },
                            ]}
                        >
                            <Input size="large" placeholder="Nhập địa chỉ IP" style={{height:"50px", borderRadius: "8px"}}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="password"
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Mật khẩu:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu",
                                },
                            ]}
                        >
                            <Input size="large" placeholder="Nhập mật khẩu" style={{height:"50px", borderRadius: "8px"}}/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="services"
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Dịch vụ sử dụng:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn dịch vụ sử dụng",
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                size="large"
                                placeholder="Nhập dịch vụ sử dụng"
                                dropdownStyle={{height:"270px"}}
                            >
                                {services.map(service => {
                                    return (
                                        <Option key={service.id} value={service.name}>
                                            {service.name}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginRight:"10px",color:"red"}}>
                        *
                    </Typography.Text>
                    <Typography.Text className="label" style={{fontSize:"18px",fontWeight:"600",color:"rgba(126, 125, 136, 1)"}}>
                        là những trường thông tin bắt buộc
                    </Typography.Text>
                </Row>
            </Card>
            <Row
                gutter={32}
                justify="center"
                style={{marginTop:"20px"}}
            >
                <Col>
                    <Button
                        // type="primary"
                        ghost
                        size="large"
                        className="button-cancel"
                        style={{borderColor:"#FF7506",borderRadius:"10px",color:"#FF7506",background:"rgba(255, 242, 231, 1)",height:"55px",width:"160px",fontSize:"18px"}}
                    >  
                        <Link to="/devices">Hủy bỏ</Link>
                    </Button>
                </Col>
                <Col>
                    <Button
                        size="large"
                        // type="primary"
                        style={{border:"none",borderRadius:"10px",color:"white",background:"#FF9138",height:"55px",width:"160px",fontSize:"18px"}}
                        htmlType="submit"
                        loading={loading}
                    >
                        {loading ? "" : id ? "Cập nhật" : "Thêm thiết bị"}
                    </Button>
                </Col>
            </Row>
        </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default AddDevices;