import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
import "../GiveNumber/giveNumber.css";
import {
    UserOutlined,
    CaretRightFilled,
    CaretLeftFilled,
    PlusSquareFilled,
    SearchOutlined ,
    CaretDownOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Badge, Layout, Menu, Form, Space, Input, Typography, Select, Button, Tooltip, Dropdown, Row, Col } from 'antd';
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

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  interface DataType {
    key: string;
    stt:string;
    name_cus: string;
    name_ser: string;
    time: string;
    hsd:string;
    status: string[];
    nsx: string;
    detail: string;
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name_cus',
      key: 'name_cus',
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name_ser',
      key: 'name_ser',
    },
    {
      title: 'Thời gian cấp',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'hsd',
      key: 'hsd',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
        <>
          {status.map(status => {
            let color = status.length > 5 ? 'geekblue' : 'green';
            
            if (status === 'Bỏ qua') {
              color = 'volcano';
            }
            if (status === 'Đang chờ') {
              color = 'blue';
            }
            if (status === 'Đã sử dụng') {
              color = 'gray';
            }
            return (
              <Badge color={color} text={status}/>
            );
          })}
        </>
      ),
    },
    {
      title: 'Nguồn cấp',
      dataIndex: 'nsx',
      key: 'nsx',
    },
    {
      title: '',
      dataIndex: 'detail',
      key: 'detail',
      render: text => <a>{text}</a>,
    },
  
  ]
  
  const data: DataType[] = [
    {
      key: '1',
      stt:'2010001',
      name_cus: 'Nguyễn Văn A',
      name_ser: 'Khám tim mạch',
      time: '14:35 - 07/11/2022',
      hsd:  '14:35 - 21/11/2022',
      status:['Đang chờ'],
      nsx: 'Kiosk',
      detail: 'Chi tiết',
    },
    {
      key: '2',
      stt:'2010002',
      name_cus: 'Nguyễn Văn B',
      name_ser: 'Khám sản - Phụ khoa',
      time: '14:35 - 07/11/2022',
      hsd:  '14:35 - 21/11/2022',
      status:['Đã sử dụng'],
      nsx: 'Kiosk',
      detail: 'Chi tiết',
    },
    {
      key: '3',
      stt:'2010003',
      name_cus: 'Nguyễn Văn C',
      name_ser: 'Khám tim mạch',
      time: '14:35 - 07/11/2022',
      hsd:  '14:35 - 21/11/2022',
      status:['Bỏ qua'],
      nsx: 'Kiosk',
      detail: 'Chi tiết',
    },
    {
      key: '4',
      stt:'2010004',
      name_cus: 'Nguyễn Văn B',
      name_ser: 'Khám sản - Phụ khoa',
      time: '14:35 - 07/11/2022',
      hsd:  '14:35 - 21/11/2022',
      status:['Đã sử dụng'],
      nsx: 'Kiosk',
      detail: 'Chi tiết',
    },
    {
      key: '5',
      stt:'2010005',
      name_cus: 'Nguyễn Văn A',
      name_ser:'Khám mắt',
      time: '14:35 - 07/11/2022',
      hsd:  '14:35 - 21/11/2022',
      status:['Đang chờ'],
      nsx: 'Kiosk',
      detail: 'Chi tiết',
    },
    {
      key: '6',
      stt:'2010006',
      name_cus: 'Nguyễn Văn B',
      name_ser: 'Khám sản - Phụ khoa',
      time: '14:35 - 07/11/2022',
      hsd:  '14:35 - 21/11/2022',
      status:['Bỏ qua'],
      nsx: 'Kiosk',
      detail: 'Chi tiết',
    },
    {
      key: '7',
      stt:'2010007',
      name_cus: 'Nguyễn Văn A',
      name_ser: 'Khám tim mạch',
      time: '14:35 - 07/11/2022',
      hsd:  '14:35 - 21/11/2022',
      status:['Đang chờ'],
      nsx: 'Kiosk',
      detail: 'Chi tiết',
    },
    {
      key: '8',
      stt:'2010008',
      name_cus: 'Nguyễn Văn B',
      name_ser: 'Khám sản - Phụ khoa',
      time: '14:35 - 07/11/2022',
      hsd:  '14:35 - 21/11/2022',
      status:['Đã sử dụng'],
      nsx: 'Kiosk',
      detail: 'Chi tiết',
    },
    {
      key: '9',
      stt:'2010009',
      name_cus: 'Nguyễn Văn A',
      name_ser: 'Khám tim mạch',
      time: '14:35 - 07/11/2022',
      hsd:  '14:35 - 21/11/2022',
      status:['Đang chờ'],
      nsx: 'Kiosk',
      detail: 'Chi tiết',
    },
    {
      key: '10',
      stt:'2010010',
      name_cus: 'Nguyễn Văn B',
      name_ser: 'Khám sản - Phụ khoa',
      time: '14:35 - 07/11/2022',
      hsd:  '14:35 - 21/11/2022',
      status:['Đã sử dụng'],
      nsx: 'Kiosk',
      detail: 'Chi tiết',
    },
  
  ];  
  const { Header, Content, Sider } = Layout;

  function itemRender(current:any, type:any, originalElement:any) {
    if (type === "prev") {
      return <Button style={{border:"none",background:"none"}}><CaretLeftFilled style={{fontSize:"1.2rem",color:"rgba(126, 125, 136, 1)"}}/></Button>;
    }
    if (type === "next") {
      return <Button style={{border:"none",background:"none"}}><CaretRightFilled style={{fontSize:"1.2rem",color:"rgba(126, 125, 136, 1)"}}/></Button>;
    }
    return originalElement;
  }

const GiveNumber = () => {
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
                    Cấp số &gt; </span>
                    <span style={{fontWeight:"700",fontSize:"20px",color: "#FF7506"}}>
                    Danh sách cấp số</span>
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
          <p style={{fontSize:"24px", fontWeight:"700", lineHeight:"36px", color:"#FF7506"}}>Quản lý cấp số</p>
        </div>
        <Row>
          <Col span={22}>
          <Form layout="vertical">
                <Row justify="space-between" className='inputContainer'>
                  <Col>
                    <Space>
                      <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px"}}>Tên dịch vụ</Typography.Text>}
                      className='selectContainer'
                      >      
                        <Select defaultValue="all" style={{width:"154px", height:"44px", borderRadius:"10px"}} onChange={handleChange} className="first-select" size="large" suffixIcon={
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
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px"}}>Tình trạng</Typography.Text>}
                      className='selectContainer'
                      >      
                        <Select defaultValue="all" style={{width:"154px", height:"44px", borderRadius:"10px"}} onChange={handleChange} className="first-select" size="large" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        }>
                                <Option value="all">Tất cả</Option>
                                <Option value="waiting">Đang chờ</Option>
                                <Option value="used">Đã sử dụng</Option>
                                <Option value="passed">Bỏ qua</Option>
                              </Select>
                          </Form.Item>  
                          <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px", marginLeft:"15px"}}>Nguồn cấp</Typography.Text>}
                      className='selectContainer'
                      >      
                        <Select defaultValue="all" style={{width:"154px", height:"44px", borderRadius:"10px",marginLeft:"15px"}} onChange={handleChange} className="first-select" size="large" suffixIcon={
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
            <Link to="/manage-number"><PlusSquareFilled  style={{fontSize:"25px", borderStartEndRadius:"2px"}}/><br />
                Cấp<br/>số mới</Link>
                </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default GiveNumber;