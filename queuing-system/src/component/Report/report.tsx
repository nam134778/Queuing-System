import React from "react";
import 'antd/dist/antd.css';
import "../Devices/devices.css";
import {
  CaretRightFilled,
  CaretLeftFilled,
    UserOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Breadcrumb, DatePicker, Badge, Form,  Layout, Menu, Space, Select, Typography, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import Menubar from "../Menubar/Menubar";
import { ColumnsType } from 'antd/lib/table';
import DownloadIcon from "../Icons/Download";
import { Excel } from "antd-table-saveas-excel";
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { useAppSelector, useAppDispatch } from "../../store";
import {
    giveNumberSelector,
    getAll,
} from "../../store/reducers/giveNumberSlice";
import { userSelector } from "../../store/reducers/userSlice";
import { Link, Navigate } from "react-router-dom";
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
    },
    {
      title: 'Nguồn cấp',
      dataIndex: 'nsx',
      key: 'nsx',
    },
  
  ]
  
  const data = [
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
  const idLogin = localStorage.getItem("userId");
  const [data2, setData2] = useState<any>(data);
  const dispatch = useAppDispatch();
  const { loading, giveNumbers } = useAppSelector(giveNumberSelector);
  const { userLogin } = useAppSelector(userSelector);
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);
  const excel = new Excel();
  excel
      .addSheet("Report")
      .addColumns([
          ...columns,
      ])
      .addDataSource(
          giveNumbers.map(
              (giveNumber) => {
                  return {
                      key: giveNumber.id,
                      stt: giveNumber.number,
                      name_ser: giveNumber.service,
                      time: moment(
                          giveNumber.timeGet.toDate()
                      ).format(
                          "HH:mm - DD/MM/YYYY"
                      ),
                      status:
                          giveNumber.status ==
                          "waiting"
                              ? "Đang chờ"
                              : giveNumber.status ==
                                "used"
                              ? "Đã sử dụng"
                              : "Bỏ qua",
                      src: giveNumber.src,
                      customer:
                          giveNumber.name,
                      phoneNumber:
                          giveNumber.phoneNumber,
                      email: giveNumber.email,
                  };
              }
          ),
          {
              str2Percent: true,
          }
      )
      
  useEffect(() => {
      dispatch(
          getAll({
              keywords: "",
              dateRange: dateRange
                  ? [dateRange[0] as Moment, dateRange[1] as Moment]
                  : null,
          })
      );
  }, [dateRange]);

  if (!idLogin) return <Navigate to="/login"></Navigate>;
    return (
        <div>
<Layout style={{"height":"100vh",fontFamily:"Nunito"}}>
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
                        <Breadcrumb.Item>Báo cáo</Breadcrumb.Item>
                        <Breadcrumb.Item>Lập báo cáo</Breadcrumb.Item>
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
          {/* <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Quản lý cấp số</p> */}
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
                              <RangePicker format="DD/MM/YYYY" style={{height:"52px",fontSize:"24px"}}
                              // suffixIcon={} 
                                />
                            {/* </Form.Item> */}
                            </div>
                          </Form.Item>
                      </Space>
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
        // dataSource={data2}
        dataSource={giveNumbers.map(
          (giveNumber) => {
              return {
                  key: giveNumber.id,
                  stt: giveNumber.number,
                  name_ser: giveNumber.service,
                  time: moment(
                      giveNumber.timeGet.toDate()
                  ).format("HH:mm - DD/MM/YYYY"),
                  status: (
                    <Badge color={giveNumber.status == "skip" ? 'volcano' : giveNumber.status == "waiting" ? 'blue' : 'rgb(190, 190, 190)'} text={giveNumber.status == "waiting"
                    ? "Đang chờ"
                    : giveNumber.status ==
                      "used"
                    ? "Đã sử dụng"
                    : "Bỏ qua"} />
                  ),
                  nsx: giveNumber.src,
              };
          }
      )}
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
            onClick={()=>{excel.saveAs("Report.xlsx");}}
            style={{marginLeft:"1rem",height:"80px",width:"80px", fontWeight:"700", position:"absolute",right:"0",textAlign:"center",background:"#FFF2E7"}}
            ><DownloadIcon  
            style={{fontSize:"25px", borderStartEndRadius:"2px"}}/><br />
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