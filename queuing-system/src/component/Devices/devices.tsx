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
import { Avatar, Card, Select, Typography, Form, Input, Badge, Space, Layout, Menu, MenuProps, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { IWindowSize, useWindowSize } from "../Login/login";
import Menubar from "../Menubar/Menubar";
import { Link } from "react-router-dom";

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
  
  interface DataType {
    key: string;
    device_id: string;
    device_name: string;
    ip_address: string;
    active_status: string[];
    connect_status: string[];
    services: string;
    detail: string;
    update: string;
  }
  
  const columns: ColumnsType<DataType> = [
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
      render: (_, { active_status }) => (
        <>
          {active_status.map(status => {
            let color = status.length > 5 ? 'geekblue' : 'green';
            
            if (status === 'Ngưng hoạt động') {
              color = 'volcano';
            }
            if (status === 'Hoạt động') {
              color = 'green';
            }
            return (
              <Badge color={color} text={status} />
            );
          })}
        </>
      ),
    },
    {
      title: 'Trạng thái kết nối',
      dataIndex: 'connect_status',
      key: 'connect_status',
      render: (_, { connect_status }) => (
        <>
          {connect_status.map(status => {
            let color = status.length > 5 ? 'geekblue' : 'green';
            
            if (status === 'Mất kết nối') {
              color = 'volcano';
            }
            if (status === 'Kết nối') {
              color = 'green';
            }
            return (
              <Badge color={color} text={status} />
            );
          })}
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'detail',
      key: 'detail',
      render: text => <a>{text}</a>,
    },
    {
      title: '',
      dataIndex: 'update',
      key: 'update',
      render: text => <a>{text}</a>,
    },
  
  ]
  
  const data: DataType[] = [
    {
      key: '1',
      device_id: 'KIO_01',
      device_name: 'Kiosk',
      ip_address: '192.168.1.0',
      active_status: ['Ngưng hoạt động'],
      connect_status: ['Mất kết nối'],
      services: 'Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát',
      detail: 'Chi tiết',
      update: 'Cập nhật',
    },
    {
      key: '2',
      device_id: 'KIO_01',
      device_name: 'Kiosk',
      ip_address: '192.168.1.0',
      active_status: ['Hoạt động'],
      connect_status: ['Kết nối'],
      services: 'Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát',
      detail: 'Chi tiết',
      update: 'Cập nhật',
    },
    {
      key: '3',
      device_id: 'KIO_01',
      device_name: 'Kiosk',
      ip_address: '192.168.1.0',
      active_status: ['Hoạt động'],
      connect_status: ['Mất kết nối'],
      services: 'Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát',
      detail: 'Chi tiết',
      update: 'Cập nhật',
    },  
    {
      key: '4',
      device_id: 'KIO_01',
      device_name: 'Kiosk',
      ip_address: '192.168.1.0',
      active_status: ['Ngưng hoạt động'],
      connect_status: ['Kết nối'],
      services: 'Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát',
      detail: 'Chi tiết',
      update: 'Cập nhật',
    },
    {
      key: '5',
      device_id: 'KIO_01',
      device_name: 'Kiosk',
      ip_address: '192.168.1.0',
      active_status: ['Hoạt động'],
      connect_status: ['Mất kết nối'],
      services: 'Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát',
      detail: 'Chi tiết',
      update: 'Cập nhật',
    },
    {
      key: '6',
      device_id: 'KIO_01',
      device_name: 'Kiosk',
      ip_address: '192.168.1.0',
      active_status: ['Hoạt động'],
      connect_status: ['Kết nối'],
      services: 'Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát',
      detail: 'Chi tiết',
      update: 'Cập nhật',
    }, 
    {
      key: '7',
      device_id: 'KIO_01',
      device_name: 'Kiosk',
      ip_address: '192.168.1.0',
      active_status: ['Ngưng hoạt động'],
      connect_status: ['Kết nối'],
      services: 'Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát',
      detail: 'Chi tiết',
      update: 'Cập nhật',
    },
    {
      key: '8',
      device_id: 'KIO_01',
      device_name: 'Kiosk',
      ip_address: '192.168.1.0',
      active_status: ['Hoạt động'],
      connect_status: ['Kết nối'],
      services: 'Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát',
      detail: 'Chi tiết',
      update: 'Cập nhật',
    },
    {
      key: '9',
      device_id: 'KIO_01',
      device_name: 'Kiosk',
      ip_address: '192.168.1.0',
      active_status: ['Hoạt động'],
      connect_status: ['Mất kết nối'],
      services: 'Khám tim mạch, Khám Sản - Phụ khoa, Khám răng hàm mặt, Khám tai mũi họng, Khám hô hấp, Khám tổng quát',
      detail: 'Chi tiết',
      update: 'Cập nhật',
    }, 
  ];
  const { Header, Content, Footer, Sider } = Layout;


const Devices = () => {
  const [data2, setData2] = useState<DataType[]>(data);
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
                    <Row style={{marginTop:"10px"}}>
                    <Col span={5}><span style={{fontWeight:"700",fontSize:"20px",color: "#7E7D88"}}>
                    Thiết bị &gt; </span>
                    <span style={{fontWeight:"700",fontSize:"20px",color: "#FF7506"}}>
                    Danh sách thiết bị</span>
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
                        <p>Xin chào</p>
                        <h1 style={{marginTop:"-3.5rem"}}>Nguyễn Thọ Nam</h1>
                        </Col>
                        </Row>
                    </Col>
                    </Row>
                </Header>
      <Content
        style={{
          margin: '30px 0 0 4rem',
        }}
      >
        <div
          className="site-layout-background"
        >
          <p style={{fontSize:"24px", fontWeight:"700", lineHeight:"36px", color:"#FF7506"}}>Biểu đồ cấp số</p>
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
                        <Select defaultValue="all" style={{width:"300px", height:"44px", borderRadius:"10px"}} onChange={handleChange} className="first-select" size="large" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        }>
                                <Option value="all">Tất cả</Option>
                                <Option value="yes">Hoạt động</Option>
                                <Option value="no">Ngưng hoạt động</Option>
                              </Select>
                          </Form.Item>
                          <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px", marginLeft:"15px"}}>Trạng thái kết nối</Typography.Text>}
                      className='selectContainer'
                      >      
                        <Select defaultValue="all" style={{width:"300px", height:"44px", borderRadius:"10px",marginLeft:"15px"}} onChange={handleChange} className="first-select" size="large" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        }>
                                <Option value="all">Tất cả</Option>
                                <Option value="yes">Kết nối</Option>
                                <Option value="no">Mất kết nối</Option>
                              </Select>
                          </Form.Item>
                      </Space>
                    </Col>
                    <Col flex="300px">
                      <Form.Item
                        label={<Typography.Text strong className="text-3" style={{fontSize:"16px"}}>Từ khóa</Typography.Text>}
                      >
                            <Input placeholder="Nhập từ khóa" style={{ width: '300px', height:"44px" }} className="thirst-select" size="large" suffix={<SearchOutlined style={{fontSize:"20px", color:"#FF7506"}}/>}/>
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
        columns={columns} dataSource={data2}
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
            style={{marginLeft:"1rem",height:"6rem",width:"4rem", position:"absolute",right:"0",textAlign:"center",background:"#FFF2E7"}}
            >
               <Link to="/add-devices"><PlusSquareFilled  style={{fontSize:"25px", borderStartEndRadius:"2px"}}/><br />
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