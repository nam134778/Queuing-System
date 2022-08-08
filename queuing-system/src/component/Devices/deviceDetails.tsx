import React from "react";
import 'antd/dist/antd.css';
import "../Devices/devices.css";
import {
    CaretDownOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Select, Input, Form, Typography, Layout, Menu, Breadcrumb, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table, Divider, Tag } from 'antd';
import EditIcon from "../Icons/EditIcon";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { deviceSelector } from "../../store/reducers/deviceSlice";
import { get } from "../../store/actions/deviceActions";
import {
    serviceSelector,
    getAll as getAllService,
} from "../../store/reducers/serviceSlice";
import { userSelector } from "../../store/reducers/userSlice";
import Menubar from "../Menubar/Menubar";
import { Link, Navigate } from "react-router-dom";
import   Notification  from "../Notification/Notification";

const { Option } = Select;



  const { Header, Content, Footer, Sider } = Layout;

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

const DevicesDetails = () => {
    const idLogin = localStorage.getItem("userId");
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { loading, device } = useAppSelector(deviceSelector);
    const { services } = useAppSelector(serviceSelector);
    const { userLogin } = useAppSelector(userSelector);

    useEffect(() => {
        if (id) {
            dispatch(get(id));
            dispatch(getAllService());
        }
    }, [id]);
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
                        <Breadcrumb.Item>Chi tiết thiết bị</Breadcrumb.Item>
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
          <Col span={22}>
          <Form layout="vertical" className="section">
            <Card style={{borderRadius:"20px",height:"650px", paddingLeft:"10px"}}>
                <Row>
                    <Col>
                        <Typography.Title className="title" style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}>
                            Thông tin thiết bị
                        </Typography.Title>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <Col span={13}>
                        <Row>
                        <Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Mã thiết bị:</Typography.Text>
                        <Typography.Text style={{fontSize:"22px", marginLeft:"100px"}}> {device?.code}</Typography.Text>
                        </Row>
                    </Col>
                    <Col span={11}>
                        <Row>
                        <Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Loại thiết bị:</Typography.Text>
                        <Typography.Text style={{fontSize:"22px", marginLeft:"100px"}}> {device?.type}</Typography.Text>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <Col span={13}>
                        <Row>
                        <Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Tên thiết bị:</Typography.Text>
                        <Typography.Text style={{fontSize:"22px", marginLeft:"95px"}}> {device?.name}</Typography.Text>
                        </Row>
                    </Col>
                    <Col span={11}>
                        <Row>
                        <Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Tên đăng nhập:</Typography.Text>
                        <Typography.Text style={{fontSize:"22px", marginLeft:"70px"}}> {device?.username}</Typography.Text>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <Col span={13}>
                        <Row>
                        <Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Địa chỉ IP:</Typography.Text>
                        <Typography.Text style={{fontSize:"22px", marginLeft:"115px"}}> {device?.ip}</Typography.Text>
                        </Row>
                    </Col>
                    <Col span={11}>
                        <Row>
                        <Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Mật khẩu:</Typography.Text>
                        <Typography.Text style={{fontSize:"22px", marginLeft:"125px"}}> {device?.password}</Typography.Text>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <Col>
                        <Row>
                        <Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Dịch vụ sử dụng:</Typography.Text>
                        </Row>
                        <Row>
                        <Typography.Text style={{fontSize:"22px"}}>{device?.services
                                                .map((value) => {
                                                    // return services.find(
                                                    //     (service) =>
                                                    //         service.id == value
                                                    // )?.name;
                                                    return value
                                                })
                                                .join(", ")}</Typography.Text>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Form>
          </Col>
          <Col span={2}>
          <Button
            // type="primary"
            className="add"
            style={{marginLeft:"1rem",height:"100px",width:"80px", fontWeight:"700", position:"absolute",right:"0",textAlign:"center",background:"#FFF2E7"}}
            >
               <Link to={`/edit-device/${device?.id}`}><EditIcon /><br />
                Cập nhật<br/>thiết bị</Link></Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default DevicesDetails;