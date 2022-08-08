import React from "react";
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import '../Login/login.css';
import image from '../Images/Frame.png';
import imagelogo from '../Images/Logoalta.png';
import { Button, Checkbox, Form, Input, Typography} from 'antd';
import { useEffect,useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/index'
import { userSelector, findByEmail } from "../../store/reducers/userSlice";
import { Link, useNavigate } from "react-router-dom";

interface formValue {
    email: string;
}

const ForgotPass = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { authLoading, message } = useAppSelector(userSelector);

    const onFinish = (value: formValue) => {
        dispatch(findByEmail(value.email))
            .then((data) => {
                data.payload && navigate("/new-pass");
            });
    };
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
        autoComplete="off"
        style={{marginTop:"60px",marginLeft:"110px"}}
        onFinish={onFinish}
        >
            <p style={{fontSize:"24px",marginLeft:"110px",fontWeight:"700"}}>Đặt lại mật khẩu</p>
            <Form.Item
            label={<Typography.Text strong className="text-1" style={{fontSize:"18px"}}>Vui lòng nhập email để đặt lại mật khẩu của bạn *</Typography.Text>}
            name="email"
            required={false}
            rules={[
                {
                    required: true,
                    message: "Vui lòng nhập email",
                },
                {
                    type: "email",
                    message: "Email không hợp lệ",
                },
            ]}
            ><Input type={"email"} style={{width:"400px",height:"50px",fontSize:"18px",borderRadius:"8px"}}/></Form.Item>
                        <Row
                gutter={32}
                justify="center"
                style={{marginTop:"20px"}}
            >
                <Col>
                    <Button
                        htmlType="submit"
                        ghost
                        size="large"
                        className="button-cancel"
                        style={{borderColor:"#FF7506",borderRadius:"10px",color:"#FF7506",background:"transparent",height:"45px",width:"160px",fontSize:"18px",marginLeft:"-140px"}}
                    >  
                        <Link to="/login">Hủy</Link>
                    </Button>
                </Col>
                <Col>
                    <Form.Item><Button
                        size="large"
                        htmlType="submit"
                        loading={authLoading}
                        style={{border:"none",borderRadius:"10px",color:"white",background:"#FF9138",height:"45px",width:"160px",fontSize:"18px"}}
                    >
                        {authLoading ? "": "Tiếp tục"}
                    </Button></Form.Item>
                </Col>
            </Row>
        </Form>
    </Row>
</Col>
<Col span={16} className="logo-part">
            <img 
            src={image}
            className="image-right"
            />
</Col>
</Row>
</div>
    )
}

export default ForgotPass;