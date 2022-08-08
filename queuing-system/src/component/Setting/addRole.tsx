import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
import "../Devices/devices.css";
import "./addRole.css";
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
    roleSelector,
    addRole,
    get,
    update,
} from "../../store/reducers/roleSlice";
import { userSelector } from "../../store/reducers/userSlice";
import { add } from "../../store/reducers/diarySlice";
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
    name: string;
    description: string;
    authorityA: string[];
    authorityB: string[];
    authorityC: string[];
}

  const { Header, Content, Sider } = Layout;

    const isActiveValue = [
        true, false, undefined
    ]
    var randomItem = isActiveValue[Math.floor(Math.random()*isActiveValue.length)];

const AddRole = () => {
    const idLogin = localStorage.getItem("userId");
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, role } = useAppSelector(roleSelector);
    const { userLogin } = useAppSelector(userSelector);

    const onFinish = (value: formValue) => {
        if (id) {
            dispatch(
                update({
                    id,
                    ...value,
                    authorityA: value.authorityA ? value.authorityA : [],
                    authorityB: value.authorityB ? value.authorityB : [],
                    authorityC: value.authorityC ? value.authorityC : [],
                })
            ).then((data) => {
                if (data.meta.requestStatus == "fulfilled") {
                    dispatch(get(id));
                    notice.success("Cập nhật thành công", 3);
                    dispatch(
                        add({
                            username: userLogin ? userLogin.username : '',
                            ip: "127.0.0.1",
                            action: "Cập nhật thông tin vai trò ",
                            time: Timestamp.fromDate(new Date()),
                        })
                    );
                } else {
                    notice.error("Đã xảy ra lỗi", 3);
                }
            });
        } else {
            dispatch(
                addRole({
                    ...value,
                    authorityA: value.authorityA ? value.authorityA : [],
                    authorityB: value.authorityB ? value.authorityB : [],
                    authorityC: value.authorityC ? value.authorityC : [],
                })
            ).then((data) => {
                if (data.meta.requestStatus == "fulfilled") {
                    notice.success("Thêm thành công", 3);
                    navigate("../");
                    dispatch(
                        add({
                            username: userLogin ? userLogin.username : '',
                            ip: "127.0.0.1",
                            action: "Thêm vai trò ",
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
        form.setFieldsValue(role);
    }, [role])
    useEffect(() => {
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
                        <Breadcrumb.Item href="/manage-role">Quản lý vai trò</Breadcrumb.Item>
                        <Breadcrumb.Item>Thêm vai trò</Breadcrumb.Item>
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
          <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Danh sách vai trò</p>
        </div>
        <Row>
          <Col span={23}>
          <Form
            form={id ? form : undefined}
            name="role-add"
            onFinish={onFinish}
          layout="vertical"
          className="section">
            <Card style={{borderRadius:"20px",height:"650px"}}>
                <Row>
                    <Col>
                        <Typography.Title className="title" style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}>
                            Thông tin vai trò
                        </Typography.Title>
                    </Col>
                </Row>
                
                    <Row>
                        <Col span={11}>
                        <Row>
                            <Col span={24}>
                            <Form.Item
                            name="name"
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên vai trò",
                                },
                            ]}                            
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Tên vai trò:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                        >
                            <Input
                                size="large"
                                placeholder="Nhập tên vai trò"
                                style={{height:"50px", borderRadius: "8px"}}
                            />
                        </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                            <Form.Item
                            name="description"
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mô tả",
                                },
                            ]}                            
                            label={
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Mô tả:
                                </Typography.Text>
                            }
                        >
                            <Input.TextArea
                                size="large"
                                placeholder="Nhập mô tả"
                                style={{height:"200px", borderRadius: "8px"}}
                            />
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
                        </Col>
                        <Col span={1}></Col>
                        <Col span={12}>
                        <Form.Item
                               label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Phân quyền chức năng:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                                >
                                    <Card
                                        bordered={false}
                                        style={{background:"#fff2e7", height:"450px", overflowY:"scroll", borderRadius:"10px"}}
                                    >
                                        <div>
                                            <Typography.Title
                                            style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}
                                            >
                                                Nhóm chức năng A
                                            </Typography.Title>
                                            <Checkbox
                                            style={{marginBottom:"10px", fontSize:"18px", fontWeight:"600"}}
                                            >
                                                <Typography.Text>
                                                    Tất cả
                                                </Typography.Text>
                                            </Checkbox>
                                            <br />
                                            <Form.Item name="authorityA">
                                                <Checkbox.Group>
                                                    <Checkbox
                                                    style={{marginBottom:"10px", fontSize:"18px", fontWeight:"600"}}
                                                        value="ax"
                                                    >
                                                        <Typography.Text
                                                        >
                                                            Chức năng x
                                                        </Typography.Text>
                                                    </Checkbox>
                                                    <br />
                                                    <Checkbox
                                                    style={{marginBottom:"10px", fontSize:"18px", fontWeight:"600"}}
                                                        value="ay"
                                                    >
                                                        <Typography.Text
                                                        >
                                                            Chức năng y
                                                        </Typography.Text>
                                                    </Checkbox>
                                                    <br />
                                                    <Checkbox
                                                    style={{marginBottom:"10px", fontSize:"18px", fontWeight:"600"}}
                                                        value="az"
                                                    >
                                                        <Typography.Text
                                                        >
                                                            Chức năng z
                                                        </Typography.Text>
                                                    </Checkbox>
                                                </Checkbox.Group>
                                            </Form.Item>
                                        </div>

                                        <div>
                                            <Typography.Title
                                            style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}
                                            >
                                                Nhóm chức năng B
                                            </Typography.Title>
                                            <Checkbox
                                            style={{marginBottom:"10px", fontSize:"18px", fontWeight:"600"}}
                                            >
                                                <Typography.Text>
                                                    Tất cả
                                                </Typography.Text>
                                            </Checkbox>
                                            <br />
                                            <Form.Item name="authorityB">
                                                <Checkbox.Group>
                                                    <Checkbox
                                                    style={{marginBottom:"10px", fontSize:"18px", fontWeight:"600"}}
                                                        value="bx"
                                                    >
                                                        <Typography.Text
                                                        >
                                                            Chức năng x
                                                        </Typography.Text>
                                                    </Checkbox>
                                                    <br />
                                                    <Checkbox
                                                    style={{marginBottom:"10px", fontSize:"18px", fontWeight:"600"}}
                                                        value="by"
                                                    >
                                                        <Typography.Text
                                                        >
                                                            Chức năng y
                                                        </Typography.Text>
                                                    </Checkbox>
                                                    <br />
                                                    <Checkbox
                                                    style={{marginBottom:"10px", fontSize:"18px", fontWeight:"600"}}
                                                        value="bz"
                                                    >
                                                        <Typography.Text
                                                        >
                                                            Chức năng z
                                                        </Typography.Text>
                                                    </Checkbox>
                                                </Checkbox.Group>
                                            </Form.Item>
                                        </div>

                                        <div>
                                            <Typography.Title
                                            style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}
                                            >
                                                Nhóm chức năng C
                                            </Typography.Title>
                                            <Checkbox
                                            style={{marginBottom:"10px", fontSize:"18px", fontWeight:"600"}}
                                            >
                                                <Typography.Text>
                                                    Tất cả
                                                </Typography.Text>
                                            </Checkbox>
                                            <br />
                                            <Form.Item name="authorityC">
                                                <Checkbox.Group>
                                                    <Checkbox
                                                    style={{marginBottom:"10px", fontSize:"18px", fontWeight:"600"}}
                                                        value="cx"
                                                    >
                                                        <Typography.Text
                                                        >
                                                            Chức năng x
                                                        </Typography.Text>
                                                    </Checkbox>
                                                    <br />
                                                    <Checkbox
                                                    style={{marginBottom:"10px", fontSize:"18px", fontWeight:"600"}}
                                                        value="cy"
                                                    >
                                                        <Typography.Text
                                                        >
                                                            Chức năng y
                                                        </Typography.Text>
                                                    </Checkbox>
                                                    <br />
                                                    <Checkbox
                                                    style={{marginBottom:"10px", fontSize:"18px", fontWeight:"600"}} value="cz">
                                                        <Typography.Text
                                                        >
                                                            Chức năng z
                                                        </Typography.Text>
                                                    </Checkbox>
                                                </Checkbox.Group>
                                            </Form.Item>
                                        </div>
                                    </Card>
                                </Form.Item>
                        </Col>
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
                        loading={loading}
                    >
                        {loading ? "" : id ? "Cập nhật" : "Thêm"}
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

export default AddRole;