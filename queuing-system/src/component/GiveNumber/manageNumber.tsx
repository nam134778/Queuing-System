import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
import "../GiveNumber/giveNumber.css";
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    PlusSquareFilled,
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Layout, Menu, MenuProps, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { useState } from 'react';
import { IWindowSize, useWindowSize } from "../Login/login";
import Menubar from "../Menubar/Menubar";
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


const ManageNumber = () => {
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
                    <Row style={{marginTop:"1rem"}}>
                    <Col span={6}>
                    </Col>
                    <Col span={9}>
                    <div style={{marginBottom:"0.3rem"}}><h2>Tên người dùng</h2></div>
                    <Card style={{width:"90%",height:"3rem",textAlign:"center",borderRadius:"10px",background:"rgba(234, 234, 236, 1)"}}><p style={{fontSize:"1.4rem",marginTop:"-1.2rem",color:"rgba(83, 82, 97, 1)"}}>Lê Quỳnh Ái Vân</p></Card>
                    <div style={{marginBottom:"0.3rem",marginTop:"2rem"}}><h2>Số điện thoại</h2></div>
                    <Card style={{width:"90%",height:"3rem",textAlign:"center",borderRadius:"10px",background:"rgba(234, 234, 236, 1)"}}><p style={{fontSize:"1.4rem",marginTop:"-1.2rem",color:"rgba(83, 82, 97, 1)"}}>0767375921</p></Card>
                    <div style={{marginBottom:"0.3rem",marginTop:"2rem"}}><h2>Email</h2></div>
                    <Card style={{width:"90%",height:"3rem",textAlign:"center",borderRadius:"10px",background:"rgba(234, 234, 236, 1)"}}><p style={{fontSize:"1.4rem",marginTop:"-1.2rem",color:"rgba(83, 82, 97, 1)"}}>adminSSO1@domain.com</p></Card>
                    </Col>
                    <Col span={9}>
                    <div style={{marginBottom:"0.3rem"}}><h2>Tên đăng nhập</h2></div>
                    <Card style={{width:"90%",height:"3rem",textAlign:"center",borderRadius:"10px",background:"rgba(234, 234, 236, 1)"}}><p style={{fontSize:"1.4rem",marginTop:"-1.2rem",color:"rgba(83, 82, 97, 1)"}}>lequynhaivan01</p></Card>
                    <div style={{marginBottom:"0.3rem",marginTop:"2rem"}}><h2>Mật khẩu</h2></div>
                    <Card style={{width:"90%",height:"3rem",textAlign:"center",borderRadius:"10px",background:"rgba(234, 234, 236, 1)"}}><p style={{fontSize:"1.4rem",marginTop:"-1.2rem",color:"rgba(83, 82, 97, 1)"}}>311940211</p></Card>
                    <div style={{marginBottom:"0.3rem",marginTop:"2rem"}}><h2>Vai trò</h2></div>
                    <Card style={{width:"90%",height:"3rem",textAlign:"center",borderRadius:"10px",background:"rgba(234, 234, 236, 1)"}}><p style={{fontSize:"1.4rem",marginTop:"-1.2rem",color:"rgba(83, 82, 97, 1)"}}>Kế toán</p></Card>
                    </Col>
                    </Row>
                    </Card>
                </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default ManageNumber;