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
import { Avatar, Card, Select, DatePicker, Typography, Form, Input, Badge, Space, Layout, Menu, MenuProps, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { IWindowSize, useWindowSize } from "../Login/login";
import Menubar from "../Menubar/Menubar";
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
    key: string;
    ma:string;
    name: string;
    details: string;
    status: string[];
    detail: string;
    update: string;
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã thiết bị',
      dataIndex: 'ma',
      key: 'ma',
      
    },
    {
      title: 'Tên thiết bị',
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
      render: (_, { status }) => (
        <>
          {status.map(status => {
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
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Mô tả dịch vụ 1',
      status: ['Ngưng hoạt động'],
      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '2',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],
      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '3',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Ngưng hoạt động'],
      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '4',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Ngưng hoạt động'],
      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '5',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Ngưng hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '6',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '7',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '8',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '9',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '10',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '11',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '12',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '13',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '14',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '15',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '16',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '17',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '18',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
    {
      key: '19',
      ma: 'KIO_01',
      name: 'Kiosk',
      details: 'Hoạt động',
      status: ['Hoạt động'],

      detail: 'Chi tiết',
      update: 'Cập nhật'
    },
  
  ];
  const { Header, Content, Footer, Sider } = Layout;


const Services = () => {
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
                    Dịch vụ &gt; </span>
                    <span style={{fontWeight:"700",fontSize:"20px",color: "#FF7506"}}>
                    Danh sách dịch vụ</span>
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
          <p style={{fontSize:"24px", fontWeight:"700", lineHeight:"36px", color:"#FF7506"}}>Quản lý dịch vụ</p>
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
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px", marginLeft:"30px"}}>Trạng thái kết nối</Typography.Text>}
                      className='selectContainer'
                      >      
                            <div className="date-pick1" style={{marginLeft:"15px"}}>
                            {/* <Form.Item noStyle>
                            <DatePicker size="large" style={{ borderRadius:"8px"}}/>
                            </Form.Item>
                            <CaretRightOutlined style={{color:"#FF7506"}}/>
                            <Form.Item noStyle>
                            <DatePicker size="large" style={{ borderRadius:"8px"}}/>
                            </Form.Item> */}
                            <div className="date-pick1" style={{marginLeft:"15px"}}>
                            <Form.Item noStyle>
                              <RangePicker format="YYYY-MM-DD"
                              // suffixIcon={} 
                                />
                            </Form.Item>
                            </div>
                            </div>
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
            ><PlusSquareFilled  style={{fontSize:"25px", borderStartEndRadius:"2px"}}/><br />
                Thêm<br/>dịch vụ</Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default Services;