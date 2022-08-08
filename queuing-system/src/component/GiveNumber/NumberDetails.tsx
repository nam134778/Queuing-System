import React from "react";
import 'antd/dist/antd.css';
import "../Devices/devices.css";
import {
    CaretDownOutlined,
    UploadOutlined,
    RollbackOutlined,
    VideoCameraOutlined,
    UserOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Badge, Card, Select, Input, Form, Typography, Layout, Menu, Breadcrumb, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import {
    giveNumberSelector,
    get,
} from "../../store/reducers/giveNumberSlice";
import {
    serviceSelector,
    getAll as getAllService,
} from "../../store/reducers/serviceSlice";
import { userSelector } from "../../store/reducers/userSlice";
import EditIcon from "../Icons/EditIcon";
import { useState, useEffect } from 'react';
import Menubar from "../Menubar/Menubar";
import { Link, Navigate } from "react-router-dom";
import   Notification  from "../Notification/Notification";
import RollbackIcon from "../Icons/RollbackIcon";

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

const NumberDetails = () => {
  const idLogin = localStorage.getItem("userId");
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { loading, giveNumber } = useAppSelector(giveNumberSelector);
    const { userLogin } = useAppSelector(userSelector);

    useEffect(() => {
        if (id) {
            dispatch(get(id));
        }
        console.log(giveNumber);
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
                        <Breadcrumb.Item href="/give-number">Danh sách cấp số</Breadcrumb.Item>
                        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
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
          <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Quản lý cấp số</p>
        </div>
        <Row>
          <Col span={22}>
          <Form layout="vertical" className="section">
            <Card style={{borderRadius:"20px",height:"650px", paddingLeft:"10px"}}>
                <Row>
                    <Col>
                        <Typography.Title className="title" style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}>
                            Thông tin cấp số
                        </Typography.Title>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <Col span={13}>
                        <Row>
                        <Col span={6}><Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Họ tên:</Typography.Text></Col>
                        <Col><Typography.Text style={{fontSize:"22px"}}> {giveNumber?.name}</Typography.Text></Col>
                        </Row>
                    </Col>
                    <Col span={11}>
                    <Row>
                        <Col span={6}><Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Nguồn cấp:</Typography.Text></Col>
                        <Col><Typography.Text style={{fontSize:"22px"}}> {giveNumber?.src}</Typography.Text></Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                <Col span={13}>
                        <Row>
                        <Col span={6}><Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Tên dịch vụ:</Typography.Text></Col>
                        <Col><Typography.Text style={{fontSize:"22px"}}>{
                                                    // services.find(
                                                    //     (service) =>
                                                    //         service.id == giveNumber?.service
                                                    // )?.name
                                                    giveNumber?.service
                                                }</Typography.Text></Col>
                        </Row>
                    </Col>
                    <Col span={11}>
                    <Row>
                        <Col span={6}><Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Trạng thái:</Typography.Text></Col>
                        <Col><Typography.Text style={{fontSize:"22px"}}>
                        <Badge style={{fontSize:"22px"}} color={giveNumber?.status == "skip" ? 'volcano' : giveNumber?.status == "waiting" ? 'blue' : 'rgb(190, 190, 190)'} />
                        {giveNumber?.status == "waiting"
                        ? "Đang chờ"
                        : giveNumber?.status ==
                          "used"
                        ? "Đã sử dụng"
                        : "Bỏ qua"}
                        </Typography.Text></Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                <Col span={13}>
                        <Row>
                        <Col span={6}><Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Số thứ tự:</Typography.Text></Col>
                        <Col><Typography.Text style={{fontSize:"22px"}}> {giveNumber?.number}</Typography.Text></Col>
                        </Row>
                    </Col>
                    <Col span={11}>
                    <Row>
                        <Col span={6}><Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Số điện thoại:</Typography.Text></Col>
                        <Col><Typography.Text style={{fontSize:"22px"}}> {giveNumber?.phoneNumber}</Typography.Text></Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                <Col span={13}>
                        <Row>
                        <Col span={6}><Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Thời gian cấp:</Typography.Text></Col>
                        <Col><Typography.Text style={{fontSize:"22px"}}>{moment(
                    giveNumber?.timeGet.toDate()
                ).format("HH:mm - DD/MM/YYYY")}</Typography.Text></Col>
                        </Row>
                    </Col>
                    <Col span={11}>
                    <Row>
                        <Col span={6}><Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Địa chỉ Email:</Typography.Text></Col>
                        <Col><Typography.Text style={{fontSize:"22px"}}> {giveNumber?.email}</Typography.Text></Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                <Col span={13}>
                        <Row>
                        <Col span={6}><Typography.Text style={{fontSize:"22px", fontWeight:"700"}}>Hạn sử dụng:</Typography.Text></Col>
                        <Col><Typography.Text style={{fontSize:"22px"}}>{
                         moment(
                          giveNumber?.timeExp.toDate()
                      ).format("HH:mm - DD/MM/YYYY")}</Typography.Text></Col>
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
               <Link to={`/give-number`}><RollbackIcon /><br />
                Quay lại</Link></Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default NumberDetails;