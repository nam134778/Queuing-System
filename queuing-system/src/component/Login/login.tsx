import React from "react";
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import '../Login/login.css';
import image from '../Images/Group341.png';
import imagelogo from '../Images/Logoalta.png';
import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect,useState } from "react";

export interface IWindowSize {
    width: number,
    height: number,
}
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<IWindowSize>({width:1,height:1});
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }

const Login = () => {
    const size = useWindowSize();
    return (
<div>
<Row style={{"height":"100vh"}}>
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
        className="formlogin"
        >
            <Form.Item
            label="Tên đăng nhập *"
            name="username"
            style={{marginLeft:"5%"}}
            ><Input className="inputform"/></Form.Item>
            <Form.Item
            label="Mật khẩu *"
            name="password"
            style={{marginLeft:"5%"}}
            ><Input.Password className="inputform"/></Form.Item>
            <Form.Item
            style={{marginLeft:"5%"}}><a style={{color:"#FF7506"}}>Quên mật khẩu?</a></Form.Item>
            <Form.Item className="middle-button"><Button type="primary" size={"large"} style={{borderRadius:"0.8rem",paddingTop:"0.2rem",width:"10rem",height:"3rem"}}>Đăng nhập</Button></Form.Item>
        </Form>
    </Row>
</Col>
<Col span={16} className="logo-part">
    {
        (size.width <= 1500) ? (
            <>
            <img 
            src={image}
            className="image-right2"
            />
            </>
        ) : (
            <>
            <img 
            src={image}
            className="image-right"
            />
            </>
        )
    }
</Col>
</Row>
</div>
    )
}

export default Login;