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
import { Avatar, Badge, Layout, Breadcrumb, Menu, Form, DatePicker, Space, Input, Typography, Select, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import {
    giveNumberSelector,
    getAll,
} from "../../store/reducers/giveNumberSlice";
import {
    serviceSelector,
    getAll as getAllService,
} from "../../store/reducers/serviceSlice";
import { userSelector } from "../../store/reducers/userSlice";
import { ColumnsType } from 'antd/lib/table';
import { useState, useEffect } from 'react';
import moment, { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
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
  
  
  const columns = [
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
    },
  ]

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
  const idLogin = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, giveNumbers } = useAppSelector(giveNumberSelector);
  const { services } = useAppSelector(serviceSelector);
  const { userLogin } = useAppSelector(userSelector);
  const [status, setStatus] = useState<string | null>(null);
  const [src, setSrc] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);
  const [value, setValue] = useState<string>('')

  useEffect(() => {
      dispatch(
          getAll({
              status,
              src,
              service,
              keywords,
              dateRange: dateRange
                  ? [dateRange[0] as Moment, dateRange[1] as Moment]
                  : null,
          })
      );
  }, [status, src, service, keywords, dateRange]);

  useEffect(() => {
      dispatch(getAllService());
  }, []);

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
                    <Col span={5}>
                      <Breadcrumb separator=">" style={{fontWeight:"700",fontSize:"20px",color: "#7E7D88"}}>
                        <Breadcrumb.Item>Cấp số</Breadcrumb.Item>
                        <Breadcrumb.Item>Danh sách cấp số</Breadcrumb.Item>
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
          <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Quản lý cấp số</p>
        </div>
        <Row>
          <Col span={22}>
          <Form layout="vertical">
                <Row justify="space-between" className='inputContainer'>
                  <Col>
                    <Space>
                      <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px"}}>Tên dịch vụ</Typography.Text>}
                      >      
                        <Select 
                        defaultValue={""}
                        value={service}
                        onChange={(value) => setService(value)}
                        style={{width:"180px", height:"50px", borderRadius:"10px"}} className="first-select" size="large" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        }>
                                <Option value={""}>Tất cả</Option>
                                {services.map((service) => {
                                        return (
                                            <Option value={service.id}>
                                                {service.name}
                                            </Option>
                                        );
                                    })}
                              </Select>
                          </Form.Item>
                          <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px", marginLeft:"25px"}}>Tình trạng</Typography.Text>}
                      className='selectContainer'
                      >      
                        <Select 
                        defaultValue={null}
                        value={status}
                        onChange={(value) => setStatus(value)}style={{width:"180px", height:"50px", borderRadius:"10px", marginLeft:"25px"}} className="first-select" size="large" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        }
                        dropdownStyle={{height:"200px"}}
                        >
                                    <Option value={null}>Tất cả</Option>
                                    <Option value="waiting">Đang chờ</Option>
                                    <Option value="used">Đã sử dụng</Option>
                                    <Option value="skip">Bỏ qua</Option>
                              </Select>
                          </Form.Item>  
                          <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px", marginLeft:"25px"}}>Nguồn cấp</Typography.Text>}
                      className='selectContainer'
                      >      
                        <Select 
                        defaultValue={""}
                        value={src}
                        onChange={(value) => setSrc(value)}
                        style={{width:"180px", height:"50px", borderRadius:"10px",marginLeft:"25px"}} className="first-select" size="large" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        }
                        >
                                    <Option value={""}>Tất cả</Option>
                                    <Option value="Kiosk">Kiosk</Option>
                                    <Option value="Hệ thống">Hệ thống</Option>
                              </Select>
                          </Form.Item>
                          <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px", marginLeft:"30px"}}>Chọn thời gian</Typography.Text>}
                      >      
                            <div className="date-pick1" style={{marginLeft:"30px"}}>
                            {/* <Form.Item noStyle> */}
                              <RangePicker format="DD/MM/YYYY" style={{height:"52px",fontSize:"24px"}} onChange={(e) =>setDateRange(e)}
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
                            placeholder="Nhập từ khóa" style={{ width: '300px', height:"44px" }} className="thirst-select" size="large" suffix={<SearchOutlined style={{fontSize:"20px", color:"#FF7506"}}/>}/>
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
        // dataSource={data2}
        loading={loading}
        dataSource={giveNumbers.map((giveNumber) => {
            return {
                key: giveNumber.id,
                stt: giveNumber.number,
                name_cus: giveNumber.name,
                name_ser: giveNumber.service,
                time: moment(
                    giveNumber.timeGet.toDate()
                ).format("HH:mm - DD/MM/YYYY"),
                hsd: moment(
                    giveNumber.timeExp.toDate()
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
                detail: (
                    <Link
                        to={`/number-details/${giveNumber.id}`}
                    >
                        <a>Chi tiết</a>
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
          <Button
            // type="primary"
            className="add"
            style={{marginLeft:"1rem",height:"100px",width:"80px", fontWeight:"700", position:"absolute",right:"0",textAlign:"center",background:"#FFF2E7"}}
            >
            <Link to="/manage-number"><PlusIcon  style={{fontSize:"25px", borderStartEndRadius:"2px"}}/><br />
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