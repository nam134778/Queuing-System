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
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import {
    serviceSelector,
    addService,
    get,
    update,
} from "../../store/reducers/serviceSlice";
import { userSelector } from "../../store/reducers/userSlice";
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


  const { Header, Content, Sider } = Layout;
  interface formValue {
    code: string;
    name: string;
    description: string;
    increaseStart?: number;
    increaseEnd?: number;
    prefix: string | undefined;
    surfix: string | undefined;
    reset: boolean;
    isAuto: boolean;
    isPrefix: boolean;
    isSurfix: boolean;
}
    const isActiveValue = [
        true, false, undefined
    ]
    var randomItem = isActiveValue[Math.floor(Math.random()*isActiveValue.length)];

const AddServices = () => {
    const idLogin = localStorage.getItem("userId");
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, service } = useAppSelector(serviceSelector);
    const { userLogin } = useAppSelector(userSelector);

    const [prefix, setPrefix] = useState(service?.isPrefix != undefined ? service?.isPrefix : false);
    const [surfix, setSurfix] = useState(service?.isSurfix != undefined ? service?.isSurfix : false);
    const [increase, setIncrease] = useState(service?.isAuto != undefined ? service?.isAuto : false);
    const [rt, setRt] = useState(service?.reset != undefined ? service?.reset : false);

    const onFinish = (value: formValue) => {
        if (id) {
            let time = new Date();
            dispatch(
                update({
                    id,
                    ...value,
                    timeGet: Timestamp.fromDate(time),
                    prefix: value.isPrefix ? (value.prefix ? value.prefix : "") : "",
                    surfix: value.isSurfix ? (value.surfix ? value.surfix : "") : "",
                })
            ).then((data) => {
                if (data.meta.requestStatus == "fulfilled") {
                    dispatch(get(id));
                    notice.success("Cập nhật thành công", 3);
                    navigate("/services ");
                    dispatch(
                        addDiary({
                            username: userLogin ? userLogin.username : "",
                            ip: "127.0.0.1",
                            action: "Cập nhật thông tin dịch vụ",
                            time: Timestamp.fromDate(new Date()),
                        })
                    );
                } else {
                    notice.error("Đã xảy ra lỗi", 3);
                }
            });
        } else {
            let time = new Date();
            dispatch(
                addService({
                    ...value,
                    timeGet: Timestamp.fromDate(time),
                    description: value.description !== undefined ? value.description : "no description",
                    isAuto: value.isAuto !== undefined ? value.isAuto : false,
                    isPrefix: value.isPrefix !== undefined ? value.isPrefix : false,
                    isSurfix: value.isSurfix !== undefined ? value.isSurfix : false,
                    increaseStart: value.isAuto ? (value.increaseStart ? value.increaseStart : 0) : 0,
                    increaseEnd: value.isAuto ? (value.increaseEnd ? value.increaseEnd : 0) : 0,
                    prefix: value.prefix ? value.prefix : "",
                    surfix: value.isSurfix ? (value.surfix ? value.surfix : "") : "",
                    isActive: randomItem,
                })
            ).then((data) => {
                if (data.meta.requestStatus == "fulfilled") {
                    notice.success("Thêm thành công", 3);
                    navigate("/services");
                    dispatch(
                        addDiary({
                            username: userLogin ? userLogin.username : "",
                            ip: "127.0.0.1",
                            action: "Thêm dịch vụ",
                            time: Timestamp.fromDate(new Date()),
                        })
                    );
                } else {
                    console.log(value);
                    notice.error("Đã xảy ra lỗi", 3);
                }
            });
        }
    };

    useEffect(() => {
        if(id){
            form.setFieldsValue(service);
            if (service?.isPrefix) setPrefix(true);
            if (service?.isSurfix) setSurfix(true);
            if (service?.isAuto) setIncrease(true);
        }
    }, [service]);
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
                        <Breadcrumb.Item>Dịch vụ</Breadcrumb.Item>
                        <Breadcrumb.Item href="/devices">Danh sách dịch vụ</Breadcrumb.Item>
                        <Breadcrumb.Item>Thêm dịch vụ</Breadcrumb.Item>
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
          <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Quản lý dịch vụ</p>
        </div>
        <Row>
          <Col span={23}>
          <Form
            form={id ? form : undefined}
            onFinish={onFinish}
          layout="vertical" className="section">
            <Card style={{borderRadius:"20px",height:"650px"}}>
                <Row>
                    <Col>
                        <Typography.Title className="title" style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}>
                            Thông tin dịch vụ
                        </Typography.Title>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col span={12}>
                    <Row>
                        <Col span={24}>
                        <Form.Item
                            name="code"
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mã dịch vụ",
                                },
                            ]}
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Mã dịch vụ:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                        >
                            <Input
                                size="large"
                                placeholder="Nhập mã dịch vụ"
                                style={{height:"50px", borderRadius: "8px"}}
                            />
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            required={false}
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên dịch vụ",
                                },
                            ]}
                            label={
                                <>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Tên dịch vụ:
                                </Typography.Text>
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600",marginLeft:"10px",color:"red"}}>
                                    *
                                </Typography.Text>
                                </>
                            }
                        >
                            <Input
                                size="large"
                                placeholder="Nhập tên dịch vụ"
                                style={{height:"50px", borderRadius: "8px"}}
                            />
                        </Form.Item>
                        </Col>
                    </Row>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="description"
                            label={
                                <Typography.Text className="label" style={{fontSize:"20px",fontWeight:"600"}}>
                                    Mô tả:
                                </Typography.Text>
                            }
                        >
                                <Input.TextArea
                                    size="large"
                                    placeholder="Mô tả dịch vụ"
                                    style={{ height: "160px", borderRadius: "8px" }}
                                />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <Col>
                        <Typography.Title className="title" style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}>
                            Quy tắc cấp số
                        </Typography.Title>
                    </Col>
                </Row>
                <Col span={12}>
                    <Row>
                        <Col span={7}>
                        <Form.Item name="isAuto" valuePropName="checked">
                        <Checkbox
                            checked={increase}
                            onChange={(e) =>
                                setIncrease(!increase)
                            }
                            >
                                <Typography.Text style={{fontSize:"16px", fontWeight:"500"}}>
                                    Tăng tự động từ:
                                </Typography.Text>
                            </Checkbox>
                        </Form.Item>
                        </Col>
                        <Col span={17} style={{marginTop:"-5px"}}>
                            <Row>
                            <Form.Item name={"increaseStart"}>
                                <InputNumber
                                    min={0}
                                    max={9999}
                                    size="large"
                                    controls={false}
                                    style={{borderRadius:"8px"}}
                                    disabled={!increase}
                                />
                            </Form.Item>
                            <Typography.Text style={{margin:"0 30px", marginTop:"5px", fontSize:"16px", fontWeight:"500"}}>đến</Typography.Text>
                            <Form.Item name={"increaseEnd"}>
                                <InputNumber 

                                    min={0}
                                    max={9999}
                                    size="large"
                                    style={{borderRadius:"8px"}}
                                    controls={false}
                                    disabled={!increase}
                                />
                            </Form.Item>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={7}>
                        <Form.Item name="isPrefix" valuePropName="checked">
                        <Checkbox
                            checked={prefix}
                            onChange={(e) => setPrefix(!prefix)}
                            >
                                <Typography.Text style={{fontSize:"16px", fontWeight:"500"}}>
                                    Prefix:
                                </Typography.Text>
                            </Checkbox>
                        </Form.Item>
                        </Col>
                        <Col span={17} style={{marginTop:"-5px"}}>
                            <Row>
                            <Form.Item name={"prefix"}>
                                <InputNumber 
                                    min={0}
                                    max={9999}
                                    size="large"
                                    controls={false}
                                    style={{borderRadius:"8px"}}
                                    disabled={!prefix}
                                />
                            </Form.Item>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={7}>
                        <Form.Item name="isSurfix" valuePropName="checked">
                        <Checkbox
                            checked={surfix}
                            onChange={(e) => setSurfix(!surfix)}
                            >
                                <Typography.Text style={{fontSize:"16px", fontWeight:"500"}}>
                                    Suffix:
                                </Typography.Text>
                            </Checkbox>
                        </Form.Item>
                        </Col>
                        <Col span={17} style={{marginTop:"-5px"}}>
                            <Row>
                            <Form.Item name={"surfix"}>
                                <InputNumber 
                                    min={0}
                                    max={9999}
                                    size="large"
                                    controls={false}
                                    style={{borderRadius:"8px"}}
                                    disabled={!surfix}
                                />
                            </Form.Item>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                        <Col span={7}>
                        <Form.Item
                        noStyle
                        name={"reset"}
                        valuePropName="checked"
                        >
                            <Checkbox
                            checked={rt}
                            onChange={(e) => setRt(!rt)}
                            >
                                <Typography.Text style={{fontSize:"16px", fontWeight:"500"}}>
                                    Reset mỗi ngày
                                </Typography.Text>
                            </Checkbox>
                        </Form.Item>
                        </Col>
                </Col>
                <Row style={{marginTop:"40px"}}>
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
                        <Link to="/services">Hủy bỏ</Link>
                    </Button>
                </Col>
                <Col>
                    <Button
                        size="large"
                        htmlType="submit"
                        loading={loading}
                        style={{border:"none",borderRadius:"10px",color:"white",background:"#FF9138",height:"55px",width:"160px",fontSize:"18px"}}
                    >
                        {loading ? "" : id ? "Cập nhật" : "Thêm dịch vụ"}
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

export default AddServices;