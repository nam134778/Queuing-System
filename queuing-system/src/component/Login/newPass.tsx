import React from "react";
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import '../Login/login.css';
import image from '../Images/Frame.png';
import imagelogo from '../Images/Logoalta.png';
import { Button, Checkbox, Form, Input, Typography, message as notice} from 'antd';
import { useEffect,useState } from "react";
import { useAppDispatch, useAppSelector } from '../../store/index';
import { userSelector, changePass } from "../../store/reducers/userSlice";
import { Link, useNavigate } from "react-router-dom";

interface formValue {
    password: string;
    passwordConfirm: string;
}

const NewPass = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { authLoading, userId } = useAppSelector(userSelector);

    const [ message, setMessage ] = useState<string>('');

    const onFinish = (value: formValue) => {
        if(value.password === value.passwordConfirm){
            setMessage("");
            dispatch(changePass({
                id: userId,
                password: value.password,
            }))
            .then(
                (data) => {
                    if (data.meta.requestStatus == 'fulfilled') {
                        notice.success('Đổi mật khẩu thành công', 3);
                        navigate("/login");
                    } else {
                        notice.error('Đã xảy ra lỗi', 3);
                    }
                }
            )
        }else{
            setMessage("Mật khẩu không khớp");
        }
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
            <p style={{fontSize:"24px",marginLeft:"100px",fontWeight:"700"}}>Đặt lại mật khẩu mới</p>
            <Form.Item
            label={<Typography.Text strong className="text-1" style={{fontSize:"18px"}}>Mật khẩu</Typography.Text>}
            name="password"
            rules={[
                {
                    required: true,
                    message: "Không được bỏ trống",
                },
            ]}
            ><Input.Password className="inputform"  style={{width:"400px",height:"50px",fontSize:"18px",borderRadius:"8px"}}/></Form.Item>
            <Form.Item
            label={<Typography.Text strong className="text-1" style={{fontSize:"18px"}}>Nhập lại Mật khẩu</Typography.Text>}
            name="passwordConfirm"
            ><Input.Password className="inputform"  style={{width:"400px",height:"50px",fontSize:"18px",borderRadius:"8px"}}/></Form.Item>
            <Form.Item style={{marginLeft:"120px"}}><Button
                size="large"
                htmlType="submit"
                loading={authLoading}
                style={{border:"none",borderRadius:"10px",color:"white",background:"#FF9138",height:"45px",width:"160px",fontSize:"18px"}}
            >
                {authLoading ? "": "Xác nhận"}
            </Button></Form.Item>
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

export default NewPass;