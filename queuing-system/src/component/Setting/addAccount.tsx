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
import { Avatar, Card, Select, Input, Form, Typography, Layout, Menu, Breadcrumb, Button, Tooltip, Dropdown, Row, Col, Checkbox, InputNumber, message as notice } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { useState, useEffect } from 'react';
import Menubar from "../Menubar/Menubar";
import { Timestamp } from "firebase/firestore";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import {
    userSelector,
    add,
    get,
    update,
} from "../../store/reducers/userSlice";
import { roleSelector, getAll } from "../../store/reducers/roleSlice";
import { add as addDiary } from "../../store/reducers/diarySlice";
import   Notification  from "../Notification/Notification";

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
  interface formValue {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    role: string;
    name: string;
    isActive: boolean;
}

  const { Header, Content, Sider } = Layout;

    const isActiveValue = [
        true, false, undefined
    ]
    var randomItem = isActiveValue[Math.floor(Math.random()*isActiveValue.length)];

const AddAccount = () => {
    const idLogin = localStorage.getItem("userId");
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { authLoading, message, user, userLogin } = useAppSelector(userSelector);
    const { roles } = useAppSelector(roleSelector);

    const onFinish = (value: formValue) => {
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
                            username: userLogin ? userLogin.username : '',
                            ip: "127.0.0.1",
                            action: "Cập nhật thông tin tài khoản",
                            time: Timestamp.fromDate(new Date()),
                        })
                    );
                } else {
                    notice.error("Đã xảy ra lỗi", 3);
                }
            });
        } else {
            dispatch(add(value)).then((data) => {
                if (data.meta.requestStatus == "fulfilled") {
                    notice.success("Thêm thành công", 3);
                    navigate("/");
                    dispatch(
                        addDiary({
                            username: userLogin ? userLogin.username : '',
                            ip: "127.0.0.1",
                            action: "Thêm tài khoản",
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
        form.setFieldsValue({
            ...user,
            passwordConfirm: user?.password,
        });
    }, [user])
    useEffect(() => {
        dispatch(getAll());
        if (id) {
            dispatch(get(id));
        }
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
                        <Breadcrumb.Item>Cài đặt hệ thống</Breadcrumb.Item>
                        <Breadcrumb.Item href="/manage-account">Quản lý tài khoản</Breadcrumb.Item>
                        <Breadcrumb.Item>Thêm tài khoản</Breadcrumb.Item>
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
          margin: '31px 0rem 0 3rem',
        }}
      >
        <div
          className="site-layout-background"
        >
          <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Quản lý tài khoản</p>
        </div>
        <Row>
          <Col span={23}>
          <Form
            form={id ? form : undefined}
            name="user-add"
            onFinish={onFinish}
          layout="vertical"
          className="section">
            <Card style={{borderRadius:"20px",height:"650px"}}>
                <Row>
                    <Col>
                        <Typography.Title className="title" style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}>
                            Thông tin tài khoản
                        </Typography.Title>
                    </Col>
                </Row>
                    <Row>
                        <Col span={11}>
                        <Form.Item
                            name="name"
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập họ tên",
                                },
                            ]}                            
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Họ tên:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                        >
                            <Input
                                size="large"
                                placeholder="Nhập họ tên"
                                style={{height:"50px", borderRadius: "8px"}}
                            />
                        </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                        <Form.Item
                            name="username"
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên đăng nhập",
                                },
                            ]}
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
                        >
                            <Input
                                size="large"
                                placeholder="Nhập tên đăng nhập"
                                style={{height:"50px", borderRadius: "8px"}}
                            />
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                        <Form.Item
                            name="phoneNumber"
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại",
                                },
                            ]}
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Số điện thoại:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                        >
                            <Input
                                size="large"
                                placeholder="Nhập số điện thoại"
                                style={{height:"50px", borderRadius: "8px"}}
                            />
                        </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                        <Form.Item
                            name="password"
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu",
                                },
                            ]}
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
                        >
                            <Input.Password
                                size="large"
                                placeholder="Nhập mật khẩu"
                                style={{height:"50px", borderRadius: "8px"}}
                            />
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                        <Form.Item
                            name="email"
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    type:"email",
                                    message: "Vui lòng nhập email",
                                },
                            ]}
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Email:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                        >
                            <Input
                                autoComplete="false"
                                size="large"
                                placeholder="Nhập email"
                                style={{height:"50px", borderRadius: "8px"}}
                            />
                        </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                        <Form.Item
                            name="passwordConfirm"
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu",
                                },
                            ]}
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Nhập lại mật khẩu:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                        >
                            <Input.Password
                                size="large"
                                placeholder="Nhập mật khẩu"
                                style={{height:"50px", borderRadius: "8px"}}
                            />
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                        <Form.Item
                            name="role"
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Vai trò:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                        >
                            <Select
                                size="large"
                                placeholder="Chọn vai trò"
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
                                {roles.map((role) => {
                                    return (
                                        <Option key={role.id} value={role.id}>
                                            {role.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={11}>
                        <Form.Item
                            name="isActive"
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Tình trạng:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                        >
                            <Select
                                size="large"
                                placeholder="Chọn tình trạng"
                                defaultValue={true}
                                suffixIcon={
                                    <CaretDownOutlined
                                        style={{
                                            fontSize: "20px",
                                            color: "#FF7506",
                                        }}
                                    />
                                }
                            >
                                <Option key={1} value={true}>
                                    Hoạt động
                                </Option>
                                <Option key={2} value={false}>
                                    Ngưng hoạt động
                                </Option>
                            </Select>
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"30px"}}>
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
                        <Link to="/manage-account">Hủy bỏ</Link>
                    </Button>
                </Col>
                <Col>
                    <Button
                        size="large"
                        // type="primary"
                        style={{border:"none",borderRadius:"10px",color:"white",background:"#FF9138",height:"55px",width:"160px",fontSize:"18px"}}
                        htmlType="submit"
                        loading={authLoading}
                    >
                        {authLoading ? "" : id ? "Cập nhật" : "Thêm"}
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

export default AddAccount;