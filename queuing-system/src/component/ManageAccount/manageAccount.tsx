import React from "react";
import 'antd/dist/antd.css';
import "../ManageAccount/manageAccount.css";
import {
    CameraOutlined,
    LoadingOutlined,
    UserOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Breadcrumb, Card, Layout, Menu, Typography, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import Menubar from "../Menubar/Menubar";
import { useAppDispatch, useAppSelector } from '../../store/index'
import { userSelector } from "../../store/reducers/userSlice";
import { roleSelector, get } from "../../store/reducers/roleSlice";
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import   Notification  from "../Notification/Notification";
import { Navigate } from "react-router-dom";

  const { Header, Content, Sider } = Layout;

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

const Profile = () => {
  const idLogin = localStorage.getItem("userId");
  const dispatch = useAppDispatch();
  const { userLogin } = useAppSelector(userSelector);
  const { role } = useAppSelector(roleSelector);

  useEffect(() => {
    console.log(userLogin);
      if (userLogin) {
          dispatch(get(userLogin.role));
          console.log(userLogin);
      }
  }, [userLogin]);
    const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <CameraOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
                        <Breadcrumb.Item>Thông tin cá nhân</Breadcrumb.Item>
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
                        </Col>
                        <Col 
                        span={18}
                        style={{marginTop:"-0.7rem"}}
                        >
                            <Row><Typography.Text>Xin chào</Typography.Text></Row>
                            <Row><Typography.Text  style={{marginTop:"-40px", fontWeight:"700"}}>{userLogin?.name}</Typography.Text ></Row>
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
                    <ImgCrop rotate>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            >
                                {imageUrl ? (<div><img src={imageUrl} alt="avatar" style={{ width: '20rem', height:"20rem",marginTop:"3.9rem",borderRadius: "50%"}} /><Button shape="circle" style={{width:"4rem",height:"4rem",marginLeft:"12rem",top:"-4rem",borderWidth:"3px",borderColor:"#fff",background:"#FF7506"}}><CameraOutlined style={{fontSize:"2rem", color:"white"}}/></Button></div>) : (<Button shape="circle" style={{width:"4rem",height:"4rem",marginLeft:"12rem",top:"8rem",borderWidth:"3px",borderColor:"#fff",background:"#FF7506"}}><CameraOutlined style={{fontSize:"2rem", color:"white"}}/></Button>)}
                        </Upload>
                    </ImgCrop>
                    </Col>
                    <Col span={9}>
                    <div style={{marginBottom:"0.3rem"}}><h2>Tên người dùng</h2></div>
                    <Card style={{width:"90%",height:"3rem",textAlign:"center",borderRadius:"10px",background:"rgba(234, 234, 236, 1)"}}><p style={{fontSize:"1.4rem",marginTop:"-1.2rem",color:"rgba(83, 82, 97, 1)"}}>{userLogin?.name}</p></Card>
                    <div style={{marginBottom:"0.3rem",marginTop:"2rem"}}><h2>Số điện thoại</h2></div>
                    <Card style={{width:"90%",height:"3rem",textAlign:"center",borderRadius:"10px",background:"rgba(234, 234, 236, 1)"}}><p style={{fontSize:"1.4rem",marginTop:"-1.2rem",color:"rgba(83, 82, 97, 1)"}}>{userLogin?.phoneNumber}</p></Card>
                    <div style={{marginBottom:"0.3rem",marginTop:"2rem"}}><h2>Email</h2></div>
                    <Card style={{width:"90%",height:"3rem",textAlign:"center",borderRadius:"10px",background:"rgba(234, 234, 236, 1)"}}><p style={{fontSize:"1.4rem",marginTop:"-1.2rem",color:"rgba(83, 82, 97, 1)"}}>{userLogin?.email}</p></Card>
                    </Col>
                    <Col span={9}>
                    <div style={{marginBottom:"0.3rem"}}><h2>Tên đăng nhập</h2></div>
                    <Card style={{width:"90%",height:"3rem",textAlign:"center",borderRadius:"10px",background:"rgba(234, 234, 236, 1)"}}><p style={{fontSize:"1.4rem",marginTop:"-1.2rem",color:"rgba(83, 82, 97, 1)"}}>{userLogin?.username}</p></Card>
                    <div style={{marginBottom:"0.3rem",marginTop:"2rem"}}><h2>Mật khẩu</h2></div>
                    <Card style={{width:"90%",height:"3rem",textAlign:"center",borderRadius:"10px",background:"rgba(234, 234, 236, 1)"}}><p style={{fontSize:"1.4rem",marginTop:"-1.2rem",color:"rgba(83, 82, 97, 1)"}}>{userLogin?.password}</p></Card>
                    <div style={{marginBottom:"0.3rem",marginTop:"2rem"}}><h2>Vai trò</h2></div>
                    <Card style={{width:"90%",height:"3rem",textAlign:"center",borderRadius:"10px",background:"rgba(234, 234, 236, 1)"}}><p style={{fontSize:"1.4rem",marginTop:"-1.2rem",color:"rgba(83, 82, 97, 1)"}}>{role?.name}</p></Card>
                    </Col>
                    </Row>
                    </Card>
                </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default Profile;