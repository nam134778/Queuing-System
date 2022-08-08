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
import { Moment } from "moment";
import {
  DayRange,
} from "@hassanmojab/react-modern-calendar-datepicker";
import { RangeValue } from "rc-picker/lib/interface";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import {
    serviceSelector,
    getAll,
} from "../../store/reducers/serviceSlice";
import { userSelector } from "../../store/reducers/userSlice";
import { useState, useEffect } from 'react';
import Menubar from "../Menubar/Menubar";
import PlusIcon from "../Icons/Plus";
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

  
  const columns = [
    {
      title: 'Mã dịch vụ',
      dataIndex: 'ma',
      key: 'ma',
      
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '',
      dataIndex: 'detail',
      key: 'detail',
    },
    {
      title: '',
      dataIndex: 'update',
      key: 'update',
    },
  
  ]
  
  const { Header, Content, Sider } = Layout;

  interface IDateRange {
    value?: RangeValue<Moment>;
    onChange?: (value: RangeValue<Moment>) => void;
}
const Services = () => {
  const idLogin = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, services } = useAppSelector(serviceSelector);
  const { userLogin } = useAppSelector(userSelector);
  const [active, setActive] = useState<boolean | null>(null);
  const [keywords, setKeywords] = useState<string>("");
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);
  const [value, setValue] = useState<string>('')

  useEffect(() => {
      dispatch(
          getAll({
              active,
              keywords,
              dateRange: dateRange ? [dateRange[0] as Moment, dateRange[1] as Moment] : null,
          })
      );
  }, [active, keywords, dateRange]);

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
                    <Col span={5}>
                      <Breadcrumb separator=">" style={{fontWeight:"700",fontSize:"20px",color: "#7E7D88"}}>
                        <Breadcrumb.Item>Dịch vụ</Breadcrumb.Item>
                        <Breadcrumb.Item>Danh sách dịch vụ</Breadcrumb.Item>
                      </Breadcrumb>
                    </Col>
                        <Col span={15}></Col>
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
          <Col span={22}>
          <Form layout="vertical">
                <Row justify="space-between" className='inputContainer'>
                  <Col>
                    <Space>
                      <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px"}}>Trạng thái hoạt động</Typography.Text>}
                      className='selectContainer'
                      >      
                        <Select 
                        defaultValue={null}
                        value={active}
                        onChange={(value) => setActive(value)}
                        style={{width:"300px", height:"50px", borderRadius:"10px"}} className="first-select" size="large" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        }>
                                <Option value={null}>Tất cả</Option>
                                <Option value={true}>Hoạt động</Option>
                                <Option value={false}>Ngưng hoạt động</Option>
                              </Select>
                          </Form.Item>
                          <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px", marginLeft:"30px"}}>Chọn thời gian</Typography.Text>}
                      >      
                            <div className="date-pick1" style={{marginLeft:"30px"}}>
                              <RangePicker format="DD/MM/YYYY" style={{height:"52px",fontSize:"24px"}} onChange={(e) =>setDateRange(e)}
                                />
                            </div>
                          </Form.Item>
                      </Space>
                    </Col>
                    <Col flex="300px">
                      <Form.Item
                        label={<Typography.Text strong className="text-3" style={{fontSize:"16px"}}>Từ khóa</Typography.Text>}
                      >
                            <Input
                              type="text"
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
        rowClassName={(record:any, index:any) => index %2 === 0 ? 'table-row-light' :  'table-row-dark'}
        columns={columns}
        loading={loading}
        dataSource={services.map((service) => {
          return {
              key: service.id,
              ma: service.code,
              name: service.name,
              details: service.description,
              status: (
                <Badge color={service.isActive ? 'green' : 'volcano'} text={service.isActive
                  ? "Hoạt động"
                  : "Ngưng hoạt động"} />
              ),
              detail: (
                  <Link
                      to={`/service-details/${service.id}`}
                  >
                      <a>Chi tiết</a>
                  </Link>
              ),
              update: (
                  <Link
                      to={`/edit-service/${service.id}`}
                  >
                      <a>Cập nhật</a>
                  </Link>
              ),
          };
      })}
        bordered
        pagination={
          {pageSize: 9, itemRender: itemRender}
        }
        />
          </Col>
          <Col span={2}>
          <Link to="/add-services">
          <Button
            // type="primary"
            className="add"
            style={{marginLeft:"1rem",height:"100px",width:"80px", fontWeight:"700", position:"absolute",right:"0",textAlign:"center",background:"#FFF2E7"}}
            >
            <PlusIcon style={{fontSize:"25px", borderStartEndRadius:"2px"}}/><br />
                Thêm<br/>dịch vụ</Button></Link>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default Services;