import React from "react";
import 'antd/dist/antd.css';
import "../Devices/devices.css";
import {
  CaretRightFilled,
    PlusSquareFilled,
    UserOutlined,
    CaretLeftFilled,
    CaretDownOutlined,
    SearchOutlined,
    CaretRightOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Select, DatePicker, Typography, Form, Input, Badge, Space, Layout, Menu, Breadcrumb, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { useAppSelector, useAppDispatch } from "../../store";
import { diarySelector, getAll } from "../../store/reducers/diarySlice";
import { userSelector } from "../../store/reducers/userSlice";
import { useState, useEffect } from 'react';
import { Link, Navigate } from "react-router-dom";
import Menubar from "../Menubar/Menubar";
import   Notification  from "../Notification/Notification";

const {RangePicker} = DatePicker;
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

  const { Option } = Select;
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  function itemRender(current:any, type:any, originalElement:any) {
    if (type === "prev") {
      return <Button style={{border:"none",background:"none"}}><CaretLeftFilled style={{fontSize:"1.2rem",color:"rgba(126, 125, 136, 1)"}}/></Button>;
    }
    if (type === "next") {
      return <Button style={{border:"none",background:"none"}}><CaretRightFilled style={{fontSize:"1.2rem",color:"rgba(126, 125, 136, 1)"}}/></Button>;
    }
    return originalElement;
  }

  interface DataType {
    username: string;
    time: string;
    ipaddress: string;
    action: string;
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Thời gian mô tả',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'IP thực hiện',
      dataIndex: 'ipaddress',
      key: 'ipaddress',
    },
    {
        title: 'Thao tác thực hiện',
        dataIndex: 'action',
        key: 'action',
      },
  ]
  
  const { Header, Content, Sider } = Layout;


const UserLog = () => {
  const idLogin = localStorage.getItem("userId");
  const dispatch = useAppDispatch();
  const { loading, diaries } = useAppSelector(diarySelector);
  const { userLogin } = useAppSelector(userSelector);
  const [keywords, setKeywords] = useState<string>("");
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);
  const [value, setValue] = useState<string>('')

  useEffect(() => {
      dispatch(getAll({ keywords, dateRange: dateRange ? [dateRange[0] as Moment, dateRange[1] as Moment] : null }));
  }, [keywords, dateRange]);


  if (!idLogin) return <Navigate to="/login"></Navigate>;
    return (
        <div>
<Layout style={{height:"100vh",fontFamily:"Nunito"}}>
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
                    <Col span={6}>
                      <Breadcrumb separator=">" style={{fontWeight:"700",fontSize:"20px",color: "#7E7D88"}}>
                        <Breadcrumb.Item>Cài đặt hệ thống</Breadcrumb.Item>
                        <Breadcrumb.Item>Nhật ký hoạt động</Breadcrumb.Item>
                      </Breadcrumb>
                    </Col>
                        <Col span={14}></Col>
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
          {/* <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Quản lý dịch vụ</p> */}
        </div>
        <Row style={{marginTop:"40px"}}>
          <Col span={22}>
          <Form layout="vertical">
                <Row justify="space-between" className='inputContainer'>
                  <Col>
                    <Space>
                          <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px"}}>Chọn thời gian</Typography.Text>}
                      >      
                            <div className="date-pick1" >
                            {/* <Form.Item noStyle> */}
                              <RangePicker format="DD/MM/YYYY" style={{height:"52px",fontSize:"24px"}} onChange={(e) => setDateRange(e)}
                              // suffixIcon={} 
                                />
                            {/* </Form.Item> */}
                            </div>
                          </Form.Item>
                      </Space>
                    </Col>
                    <Col flex="300px">
                      <Form.Item
                        label={<Typography.Text strong className="text-3" style={{fontSize:"16px"}}>Từ khóa</Typography.Text>}
                      >
                            <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onPressEnter={(e) => setKeywords(value)}
                            placeholder="Nhập từ khóa" style={{ width: '300px', height:"50px" }} className="thirst-select" size="large" suffix={<SearchOutlined style={{fontSize:"20px", color:"#FF7506"}}/>}/>
                      </Form.Item>
                    </Col>
                  
                </Row>
              </Form>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
        <Table 
        // className="table-radius"
        rowClassName={(record:any, index:any) => index %2 === 0 ? 'table-row-light' :  'table-row-dark'}
        columns={columns}
        // dataSource={data2}
        loading={loading}
        dataSource={diaries.map((diary) => ({
          key: diary.id,
          username: diary.username,
          time: moment(diary.time.toDate()).format(
              "HH:mm - DD/MM/YYYY"
          ),
          ipaddress: diary.ip,
          action: diary.action,
      }))}
        bordered
        pagination={
          {pageSize: 9, itemRender: itemRender}
        }
        />
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default UserLog;