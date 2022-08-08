import React from "react";
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import '../Login/login.css';
import image from '../Images/Group341.png';
import imagelogo from '../Images/Logoalta.png';
import { Button, Checkbox, Form, Input, Typography} from 'antd';
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/index'
import { userSelector, login, load } from "../../store/reducers/userSlice";

interface formValue {
    username: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { authLoading, message, userLogin } = useAppSelector(userSelector);

    const onFinish = (value: formValue) => {
        dispatch(login(value))
        .then(() => dispatch(load()))
    };

    useEffect(() => {
        dispatch(load())
    }, []);

    useEffect(() => {
        if (userLogin) {
            navigate("/");
        }
    }, [userLogin]);
    return (
<div>
<Row style={{"height":"100vh",fontFamily:"Nunito"}}>
<Col span={8} className="login-part">
    <Row>
        <img 
        className="logoalta"
        src={imagelogo}
        alt="logo"
        style={{width:"30%",height:"25%"}}
    />
    </Row>
    <Row style={{width:"100%"}}>
        <Form
        labelCol={{span:24}}
        wrapperCol={{span:24}}
        autoComplete="false"
        className="formlogin"
        style={{marginTop:"40px",marginLeft:"110px"}}
        onFinish={onFinish}
        >
            <Form.Item
            label={<Typography.Text strong className="text-1" style={{fontSize:"18px"}}>Tên đăng nhập *</Typography.Text>}
            name="username"
            ><Input
            status={message.fail ? "error" : undefined}
            disabled={authLoading}
            className="inputform" style={{width:"400px",height:"50px",fontSize:"18px",borderRadius:"8px"}}/></Form.Item>
            <Form.Item
            label={<Typography.Text strong className="text-1" style={{fontSize:"18px"}}>Mật khẩu *</Typography.Text>}
            name="password"
            ><Input.Password className="inputform"
            status={message.fail ? "error" : undefined}
            disabled={authLoading}
            style={{width:"400px",height:"50px",fontSize:"18px",borderRadius:"8px"}}/></Form.Item>
            <Form.Item><a href="/forgot-pass" style={{color:"#FF7506"}}>Quên mật khẩu?</a></Form.Item>
            <Form.Item style={{marginLeft:"120px"}}><Button type="primary"
            htmlType="submit"
            loading={authLoading}
            size={"large"} style={{borderRadius:"0.8rem",paddingTop:"0.2rem",width:"10rem",height:"3rem"}}>
                {authLoading ? "": "Đăng nhập"}
            </Button></Form.Item>
        </Form>
    </Row>
</Col>
<Col span={16} className="logo-part">
            <img 
            src={image}
            className="image-right"
            />
            <div style={{marginLeft:"600px",marginTop:"-320px"}}><p style={{fontSize:"40px",color:"#FF7506"}}>Hệ thống</p></div>
            <div style={{marginLeft:"600px",marginTop:"-40px"}}><p style={{fontSize:"44px", fontWeight:"900",color:"#FF7506"}}>QUẢN LÝ XẾP HÀNG</p></div>
</Col>
</Row>
</div>
    )
}

export default Login;