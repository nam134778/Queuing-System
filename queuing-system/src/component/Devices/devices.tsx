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
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Select, Typography, Form, Input, Badge, Space, Layout, Menu, Breadcrumb, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState, useEffect } from 'react';
import Menubar from "../Menubar/Menubar";
import PlusIcon from "../Icons/Plus";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { deviceSelector } from "../../store/reducers/deviceSlice";
import {
    serviceSelector,
    getAll as getAllService,
} from "../../store/reducers/serviceSlice";
import { getAll } from "../../store/actions/deviceActions";
import { userSelector } from "../../store/reducers/userSlice";
import   Notification  from "../Notification/Notification";
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
    
  function itemRender(current:any, type:any, originalElement:any) {
    if (type === "prev") {
      return <Button style={{border:"none",background:"none"}}><CaretLeftFilled style={{fontSize:"1.2rem",color:"rgba(126, 125, 136, 1)"}}/></Button>;
    }
    if (type === "next") {
      return <Button style={{border:"none",background:"none"}}><CaretRightFilled style={{fontSize:"1.2rem",color:"rgba(126, 125, 136, 1)"}}/></Button>;
    }
    return originalElement;
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const columns = [
    {
      title: 'Mã thiết bị',
      dataIndex: 'device_id',
      key: 'device_id',
      
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'device_name',
      key: 'device_name',
    },
    {
      title: 'Địa chỉ IP',
      dataIndex: 'ip_address',
      key: 'ip_address',
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'active_status',
      key: 'active_status',
      width:'15%',
    },
    {
      title: 'Trạng thái kết nối',
      dataIndex: 'connect_status',
      key: 'connect_status',
      width:'15%',
    },
    {
      title: 'Dịch vụ sử dụng',
      dataIndex: 'services',
      key: 'services',
      width:'30%',
      ellipsis: {showTitle: true},
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


const Devices = () => {
  const idLogin = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, devices } = useAppSelector(deviceSelector);
  const { services } = useAppSelector(serviceSelector);
  const { userLogin } = useAppSelector(userSelector);
  const [active, setActive] = useState<boolean | null>(null);
  const [connect, setConnect] = useState<boolean | null>(null);
  const [keywords, setKeywords] = useState<string>("");
  const [value, setValue] = useState<string>('')
  useEffect(() => {
    dispatch(
        getAll({
            active,
            connect,
            keywords,
        })
    );
}, [active, connect, keywords]);

useEffect(() => {
    dispatch(getAllService());
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
                        <Col span={5}>
                        <Breadcrumb separator=">" style={{fontWeight:"700",fontSize:"20px",color: "#7E7D88"}}>
                        <Breadcrumb.Item>Thiết bị</Breadcrumb.Item>
                        <Breadcrumb.Item>Danh sách thiết bị</Breadcrumb.Item>
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
          <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Danh sách thiết bị</p>
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
                        <Select style={{width:"300px", height:"50px", borderRadius:"10px"}} className="first-select" size="large" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        }
                        dropdownStyle={{height:"154px"}}
                        defaultValue={null}
                        value={active}
                        onChange={(value) => setActive(value)}
                        >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value={true}>Hoạt động</Option>
                                    <Option value={false}>
                                        Ngưng hoạt động
                                    </Option>
                              </Select>
                          </Form.Item>
                          <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px", marginLeft:"15px"}}>Trạng thái kết nối</Typography.Text>}
                      className='selectContainer'
                      >      
                        <Select style={{width:"300px", height:"50px", borderRadius:"10px",marginLeft:"15px"}} className="first-select-2" size="large" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        }
                        defaultValue={null}
                        value={connect}
                        onChange={(value) => setConnect(value)}
                        >
                                <Option value={null}>Tất cả</Option>
                                <Option value={true}>Kết nối</Option>
                                <Option value={false}>Mất kết nối</Option>
                              </Select>
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
                            placeholder="Nhập từ khóa" style={{ width: '300px', height:"50px" }} className="first-select" size="large" suffix={<SearchOutlined style={{fontSize:"20px", color:"#FF7506"}}/>} />
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
        dataSource={devices.map((device) => {
          return {
              key: device.id,
              device_id: device.code,
              device_name: device.name,
              ip_address: device.ip,
              active_status: (
                <Badge color={(device.isActive) ? 'green' : 'volcano'} text={device.isActive
                  ? "Hoạt động"
                  : "Ngưng hoạt động"} />
              ),
              connect_status: (
                <Badge color={(device.isConnect) ? 'green' : 'volcano'} text={device.isConnect
                  ? "Kết nối"
                  : "Mất kết nối"} />
              ),
              services: device.services
                  .map((value) => {
                      // return services.find(
                      //     (service) => service.id == value
                      // )?.name;
                      return value
                  })
                  .join(", "),
              detail: (
                  <Link
                      to={`/device-details/${device.id}`}
                  >
                      <a>Chi tiết</a>
                  </Link>
              ),
              update: (
                  <Link
                      to={`/edit-device/${device.id}`}
                  >
                      <a>Cập nhật</a>
                  </Link>
              ),
          };
      })}
        loading={loading}
        bordered
        pagination={
          {pageSize: 9, itemRender: itemRender}
        }
        />
          </Col>
          <Col span={2}>
          <Button
            // type="primary"
            className="add"
            style={{marginLeft:"1rem",height:"100px",width:"80px", fontWeight:"700", position:"absolute",right:"0",textAlign:"center",background:"#FFF2E7"}}
            >
               <Link to="/add-devices"><PlusIcon /><br />
                Thêm<br/>thiết bị</Link></Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default Devices;