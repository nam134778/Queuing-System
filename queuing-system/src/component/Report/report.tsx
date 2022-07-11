import React from "react";
import 'antd/dist/antd.css';
import "../Devices/devices.css";
import {
  CaretDownOutlined,
  CaretRightFilled,
  CaretLeftFilled,
    UserOutlined,
    PlusSquareFilled,
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Badge, Form, Input,  Layout, Menu, Space, Select, Typography, MenuProps, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { useState } from 'react';
import { IWindowSize, useWindowSize } from "../Login/login";
import Menubar from "../Menubar/Menubar";
import { ColumnsType } from 'antd/lib/table';
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
    key: string;
    stt:string;
    name_ser: string;
    time: string;
    status: string[];
    nsx: string;
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Số thứ tự',
      dataIndex: 'stt',
      key: 'stt',
      
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
      title: 'Trạng thái hoạt động',
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
              <Badge color={color} text={status} />
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
  
  ]
  
  const data: DataType[] = [
    {
      key: '1',
      stt:'2010001',
      name_ser: 'Khám tim mạch',
      time: '14:35 - 07/11/2022',
      status:['Đang chờ'],
      nsx: 'Kiosk',
    },
    {
      key: '2',
      stt:'2010002',

      name_ser: 'Khám sản - Phụ khoa',
      time: '14:35 - 07/11/2022',
      status:['Đã sử dụng'],
      nsx: 'Kiosk',
    },
    {
      key: '3',
      stt:'2010003',

      name_ser: 'Khám tim mạch',
      time: '14:35 - 07/11/2022',
      status:['Bỏ qua'],
      nsx: 'Kiosk',
    },
    {
      key: '4',
      stt:'2010004',

      name_ser: 'Khám sản - Phụ khoa',
      time: '14:35 - 07/11/2022',
      status:['Đã sử dụng'],
      nsx: 'Kiosk',
    },
    {
      key: '5',
      stt:'2010005',

      name_ser:'Khám mắt',
      time: '14:35 - 07/11/2022',
      status:['Đang chờ'],
      nsx: 'Kiosk',
    },
    {
      key: '6',
      stt:'2010006',

      name_ser: 'Khám sản - Phụ khoa',
      time: '14:35 - 07/11/2022',
      status:['Bỏ qua'],
      nsx: 'Kiosk',
    },
    {
      key: '7',
      stt:'2010007',

      name_ser: 'Khám tim mạch',
      time: '14:35 - 07/11/2022',
      status:['Đang chờ'],
      nsx: 'Kiosk',
    },
    {
      key: '8',
      stt:'2010008',

      name_ser: 'Khám sản - Phụ khoa',
      time: '14:35 - 07/11/2022',
      status:['Đã sử dụng'],
      nsx: 'Kiosk',
    },
    {
      key: '9',
      stt:'2010009',

      name_ser: 'Khám tim mạch',
      time: '14:35 - 07/11/2022',
      status:['Đang chờ'],
      nsx: 'Kiosk',
    },
    {
      key: '10',
      stt:'2010010',

      name_ser: 'Khám sản - Phụ khoa',
      time: '14:35 - 07/11/2022',
      status:['Đã sử dụng'],
      nsx: 'Kiosk',
    },
  
  ];

  const { Header, Content, Footer, Sider } = Layout;


const Report = () => {
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
          <Row>
          <Col span={3}><h1>
          Cấp số
        </h1>
        </Col>
            <Col span={13}></Col>
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
          <Col span={7}>
              <Row>
              <Col span={3}>
            <Avatar size="large" icon={<UserOutlined />} />
            </Col >
            <Col 
            span={21}
            style={{marginTop:"-0.7rem"}}
            >
            <h1>Nguyễn Thị Tần</h1>
            <h1 style={{marginTop:"-3rem"}}>Hello</h1>
            </Col>
              </Row>
          </Col>
          </Row>
      </Header>
      <Content
        style={{
          margin: '24px 0 0 4rem',
        }}
      >
        <div
          className="site-layout-background"
        >
          <p>Quản lý cấp số</p>
        </div>
        <Row>
          <Col span={22}>
          <Form layout="vertical">
                <Row justify="space-between" className='inputContainer'>
                  <Col>
                    <Space size={24}>
                      <Form.Item
                      label={<Typography.Text strong className="text-1">Trạng thái hoạt động</Typography.Text>}
                      className='selectContainer'
                      >      
                        <Select defaultValue="all" style={{width:"300px", height:"44px", borderRadius:"10px"}} onChange={handleChange} className="first-select" size="large" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        } showSearch showArrow>
                                <Option value="all">Tất cả</Option>
                                <Option value="yes">Hoạt động</Option>
                                <Option value="no">Ngưng hoạt động</Option>
                              </Select>
                          </Form.Item>
                      </Space>
                    </Col>
                    <Col flex="450px">
                      <Form.Item
                        label={<Typography.Text strong className="text-3">Từ khóa</Typography.Text>}
                      >
                            <Input placeholder="Nhập từ khóa" style={{ width: '95%' }} className="thirst-select" size="large"/>
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
            ><PlusSquareFilled  style={{fontSize:"25px", borderStartEndRadius:"2px"}}/><br />
                Tải về</Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default Report;