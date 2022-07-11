import React from "react";
import 'antd/dist/antd.css';
import "../Dashboard/dashboard.css";
import { Badge, DatePickerProps, Progress } from 'antd';
import type { CalendarMode } from 'antd/lib/calendar/generateCalendar';
import type { Moment } from 'moment';
import { Area } from "@ant-design/plots";
import {
    ArrowUpOutlined,
    CaretDownOutlined,
    ArrowDownOutlined,
    UserOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Layout, Menu, Form, Button, Tooltip, Dropdown, Row, Col, Select, Statistic, Typography, Calendar } from 'antd';
import { useState,useEffect } from 'react';
import Menubar from "../Menubar/Menubar";
import Calendar1Icon from "../Icons/Calendar1";
import Calendar2Icon from "../Icons/Calendar2";
import ContactIcon from "../Icons/Contact";
import FlagIcon from "../Icons/FlagIcon";
import MonitorIcon from "../Icons/MonitorIcon";
import TalkIcon from "../Icons/TalkIcon";
import NumberIcon from "../Icons/NumberIcon";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "../Icons/ArrowLeft";
import ArrowRightIcon from "../Icons/ArrowRight";

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

  const onChange: DatePickerProps['onChange'] = (date:any, dateString:any) => {
    console.log(date, dateString);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onPanelChange = (value: Moment, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
const Dashboard = () => {
  const onPanelChange = (value:any, mode:any) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data: data,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    smooth: true,
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
  };

    return (
        <div>
<Layout style={{"height":"100vh"}}>
     <Sider
    style={{background:"white",width:"200px"}}
    >
    <Menubar />
    </Sider>
    <Layout>
      <Header
      className="header"
      >
        <p style={{fontSize:"20px",color:"#FF7506",fontWeight:"700"}}>
          Dashboard 
        </p>
      </Header>
      <Content
        style={{
          margin: '24px 3rem 0 3rem',
        }}
      >
        <div
          className="site-layout-background"
        >
          <p style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}>Biểu đồ cấp số</p>
        </div>
        <div>
        <Row gutter={16}>
      <Col span={6}>
        <Link to="/give-number">
        <Card bordered={false} style={{borderRadius:"20px",height:"160px"}}>
          <Row>
          <Col span={9}><Button className="button-1" shape="circle" icon={<Calendar1Icon />} style={{width:"72px",height:"72px",marginTop:"-10px",background:"rgb(215, 240, 255)"}}/></Col>
          <Col><p style={{marginTop:"-8px",fontSize:"20px",fontWeight:"600"}}>Số thứ tự<br/> đã cấp</p></Col>
          </Row>
          <Row>
          <Col span={14}>
          <Statistic value={4221} valueStyle={{fontSize:"40px", fontWeight:"700", marginTop:"-10px"}}/>
          </Col>
          <Col span={10}>
          <Button className="button-1-2" style={{background:"rgba(255, 149, 1, 0.15)"}}><Statistic
            value={11.28}
            precision={2}
            valueStyle={{ color: 'rgba(255, 145, 56, 1)' , fontSize:"0.8rem",marginTop:"-2px"}}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          /></Button>
          </Col>
          </Row>
        </Card>
        </Link>
      </Col>
      <Col span={6}>
        <Link to="/give-number">
                <Card bordered={false} style={{borderRadius:"20px",height:"160px"}}>
          <Row>
          <Col span={9}><Button className="button-2" shape="circle" icon={<Calendar2Icon />} style={{width:"72px",height:"72px",marginTop:"-10px"}}/></Col>
          <Col><p style={{marginTop:"-8px",fontSize:"20px",fontWeight:"600"}}>Số thứ tự<br/> đã sử dụng</p></Col>
          </Row>
          <Row>
          <Col span={14}>
          <Statistic value={3721} valueStyle={{fontSize:"40px", fontWeight:"700", marginTop:"-10px"}}/>
          </Col>
          <Col span={10}>
          <Button className="button-1-2" style={{background:"rgba(231, 63, 63, 0.15)"}}><Statistic
            value={32.41}
            precision={2}
            valueStyle={{ color: 'rgba(231, 63, 63, 1)' , fontSize:"0.8rem",marginTop:"-2px"}}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          /></Button>
          </Col>
          </Row>
        </Card>
        </Link>
      </Col>
      <Col span={6}>
        <Link to="/give-number">
        <Card bordered={false} style={{borderRadius:"20px",height:"160px"}}>
          <Row>
          <Col span={9}><Button className="button-3" shape="circle" icon={<ContactIcon />} style={{width:"72px",height:"72px",marginTop:"-10px"}}/></Col>
          <Col><p style={{marginTop:"-8px",fontSize:"20px",fontWeight:"600"}}>Số thứ tự<br/>đang chờ</p></Col>
          </Row>
          <Row>
          <Col span={14}>
          <Statistic value={468} valueStyle={{fontSize:"40px", fontWeight:"700", marginTop:"-10px"}}/>
          </Col>
          <Col span={10}>
          <Button className="button-1-2" style={{background:"rgba(255, 149, 1, 0.15)"}}><Statistic
            value={56.41}
            precision={2}
            valueStyle={{ color: 'rgba(255, 145, 56, 1)' , fontSize:"0.8rem",marginTop:"-2px"}}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          /></Button>
          </Col>
          </Row>
        </Card>
        </Link>
      </Col>
      <Col span={6}>
        <Link to="/give-number">
        <Card bordered={false} style={{borderRadius:"20px",height:"160px"}}>
          <Row>
          <Col span={9}><Button className="button-4" shape="circle" icon={<FlagIcon />} style={{width:"72px",height:"72px",marginTop:"-10px"}}/></Col>
          <Col><p style={{marginTop:"-8px",fontSize:"20px",fontWeight:"600"}}>Số thứ tự<br/> đã bỏ qua</p></Col>
          </Row>
          <Row>
          <Col span={14}>
          <Statistic value={32} valueStyle={{fontSize:"40px", fontWeight:"700", marginTop:"-10px"}}/>
          </Col>
          <Col span={10}>
          <Button className="button-1-2" style={{background:"rgba(231, 63, 63, 0.15)"}}><Statistic
            value={22.41}
            precision={2}
            valueStyle={{ color: 'rgba(231, 63, 63, 1)' , fontSize:"0.8rem",marginTop:"-2px"}}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          /></Button>
          </Col>
          </Row>
        </Card>
        </Link>
      </Col>
    </Row>
        </div>
        <div style={{marginTop:"20px"}}>
        <Card bordered={false} style={{borderRadius:"10px"}}>
        <Row>
          <Col span={19}>
          <p style={{fontSize:"20px", fontWeight:"700"}}>Bảng thống kê theo ngày</p>
          <p style={{fontSize:"14px", fontWeight:"400",marginTop:"-16px"}}>Tháng 2/2022</p>
          </Col>
          <Col span={2} style={{marginTop:"5px"}}>
          <Typography.Text strong className="text-1" style={{fontSize:"18px"}}>Xem theo</Typography.Text>
          </Col>
          <Col span={3}>
          <Form.Item
                      className='selectContainer'
                      >      
                        <Select defaultValue="day" style={{width:"130px", height:"45px", borderRadius:"10px"}} onChange={handleChange} className="first-select" size="large" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        }>
                                <Option value="day">Ngày</Option>
                                <Option value="month">Tháng</Option>
                                <Option value="year">Năm</Option>
                              </Select>
                          </Form.Item>
          </Col>
        </Row>
        <Area {...config} style={{marginTop:"30px"}}/>
        </Card>
        </div>
      </Content>
    </Layout>
    <Sider
        width={440}
        style={{background:"white"}}
        >
        <Row style={{marginTop:"1rem"}}>
            <Col span={10}></Col>
            <Col 
            span={3}>
            <Dropdown overlay={menu} trigger={['click']}>
                    <a onClick={e => e.preventDefault()}>
                        <Tooltip title="search">
                            <Button type="primary" shape="circle" className="bell-button" icon={<BellFilled className="bell"/>} />
                        </Tooltip>
                    </a>
                </Dropdown>
            </Col>
            <Col>
            <Avatar size="large" icon={<UserOutlined />} />
            </Col>
            <Col style={{
              marginLeft:"0.5em"
            }}>
            <p style={{marginTop:"-0.1rem"}}>Xin chào</p>
            <h1 style={{marginTop:"-1.2rem"}}>Nguyễn Thọ Nam</h1>
            </Col>
        </Row>
        <div style={{marginTop:"40px"}}>
          <p style={{marginLeft:"15px", fontSize:"26px", marginBottom:"10px", fontWeight:"500", color:"#FF7506"}}>Tổng quan</p>
        <Row>
        <Link to="/devices">
        <Card bordered={false} className="shadow-card">
        <Row>
          <Col span={4}>
            {/* <RadialBar {...config2} className="radial" style={{fontSize:"10px"}} percent={40}/> */}
          <div style={{marginTop:"-5px",marginLeft:"-18px"}}><Progress type="circle" percent={10} strokeColor={"#a1a1a1"} style={{borderColor:"#a1a1a1"}} showInfo={false} width={46} /></div>
          <div style={{marginTop:"-35px",marginLeft:"-18px"}}><Progress type="circle" percent={90} strokeColor={"#FF7506"} width={55} style={{marginTop:"-200px",paddingBottom:"100px",marginBottom:"30px"}} /></div>
          </Col>
          <Col span={8}><Row><Statistic value={4221} valueStyle={{fontSize:"28px",fontWeight:"700"}} style={{marginTop:"-20px",marginLeft:"3px"}}/></Row>
          <Row><MonitorIcon style={{color:"#FF7506"}}/><p style={{marginLeft:"4px",fontWeight:"600",fontSize:"14px",color:"#FF7506"}}>Thiết bị</p></Row>
          </Col>
          <Col span={12}>
            <Row><Badge color="#FF7506" text="Đang hoạt động" style={{marginTop:"-10px"}}/><Statistic value={3799} valueStyle={{color:"#FF7506", fontWeight:"600", fontSize:"18px"}} style={{marginTop:"-13px", marginLeft:"15px"}}/></Row>
            <Row><Badge color="#a1a1a1" text="Ngưng hoạt động"/><Statistic value={422} valueStyle={{color:"#FF7506", fontWeight:"600", fontSize:"18px"}} style={{marginTop:"-3px", marginLeft:"7px"}}/></Row>
          </Col>
        </Row>
        </Card>
        </Link>
        </Row>
        <Row>
        <Link to="/services">
        <Card bordered={false} className="shadow-card">
        <Row>
        <Col span={4}>
            {/* <RadialBar {...config2} className="radial" style={{fontSize:"10px"}} percent={40}/> */}
          <div style={{marginTop:"-5px",marginLeft:"-18px"}}><Progress type="circle" percent={24} strokeColor={"#a1a1a1"} style={{borderColor:"#a1a1a1"}} showInfo={false} width={46} /></div>
          <div style={{marginTop:"-35px",marginLeft:"-18px"}}><Progress type="circle" percent={76} strokeColor={"#4277FF"} width={55} style={{marginTop:"-200px",paddingBottom:"100px",marginBottom:"30px"}} /></div>
          </Col>
          <Col span={8}><Row><Statistic value={276} valueStyle={{fontSize:"28px",fontWeight:"700"}} style={{marginTop:"-20px",marginLeft:"3px"}}/></Row>
          <Row><TalkIcon style={{color:"#4277FF"}}/><p style={{marginLeft:"4px",fontWeight:"600",fontSize:"14px",color:"#4277FF"}}>Dịch vụ</p></Row>
          </Col>
          <Col span={12}>
            <Row><Badge color="#4277FF" text="Đang hoạt động" style={{marginTop:"-10px"}}/><Statistic value={210} valueStyle={{color:"#4277FF", fontWeight:"600", fontSize:"18px"}} style={{marginTop:"-13px", marginLeft:"15px"}}/></Row>
            <Row><Badge color="#a1a1a1" text="Ngưng hoạt động"/><Statistic value={66} valueStyle={{color:"#4277FF", fontWeight:"600", fontSize:"18px"}} style={{marginTop:"-3px", marginLeft:"7px"}}/></Row>
          </Col>
        </Row>
        </Card>
        </Link>
        </Row>
        <Row>
        <Link to="/give-number">
        <Card bordered={false} className="shadow-card">
        <Row>
        <Col span={4}>
            {/* <RadialBar {...config2} className="radial" style={{fontSize:"10px"}} percent={40}/> */}
          <div style={{marginTop:"-5px",marginLeft:"-18px"}}><Progress type="circle" percent={12} strokeColor={"#a1a1a1"} style={{borderColor:"#a1a1a1"}} showInfo={false} width={46} /></div>
          <div style={{marginTop:"-35px",marginLeft:"-18px"}}><Progress type="circle" percent={86} strokeColor={"#35C75A"} width={55} style={{marginTop:"-200px",paddingBottom:"100px",marginBottom:"30px"}} /></div>
          <div style={{marginTop:"-170px",marginLeft:"-18px"}}><Progress type="circle" percent={2} strokeColor={"#F178B6"} width={38}  showInfo={false} style={{marginTop:"-200px",paddingBottom:"100px",marginBottom:"30px"}} /></div>
          </Col>
          <Col span={8}><Row><Statistic value={4221} valueStyle={{fontSize:"28px",fontWeight:"700"}} style={{marginTop:"-20px",marginLeft:"3px"}}/></Row>
          <Row><NumberIcon style={{color:"#35C75A"}}/><p style={{marginLeft:"4px",fontWeight:"600",fontSize:"14px",color:"#35C75A"}}>Cấp số</p></Row>
          </Col>
          <Col span={12}>
            <Row><Badge color="#35C75A" text="Đã sử dụng" style={{marginTop:"-18px"}}/><Statistic value={3721} valueStyle={{color:"#35C75A", fontWeight:"600", fontSize:"18px"}} style={{marginTop:"-21px", marginLeft:"45px"}}/></Row>
            <Row><Badge color="#a1a1a1" text="Đang chờ"/><Statistic value={486} valueStyle={{color:"#35C75A", fontWeight:"600", fontSize:"18px"}} style={{marginTop:"-3px", marginLeft:"57px"}}/></Row>
            <Row><Badge color="#F178B6" text="Bỏ qua"/><Statistic value={32} valueStyle={{color:"#35C75A", fontWeight:"600", fontSize:"18px"}} style={{marginTop:"-3px", marginLeft:"74px"}}/></Row>
          </Col>
        </Row>
        </Card>
        </Link>
        </Row>
        <Row style={{marginTop:"40px", marginLeft:"16px"}}>
          {/* <DatePicker onChange={onChange} open={true} showToday={false} style={{border:"none",minWidth: 400}} className="date1" dropdownClassName="drop1" popupStyle={{width : 300}}/> */}
          <Card style={{boxShadow:"2px 2px 15px rgba(70, 64, 67, 0.1)", width:"400px",borderRadius:"12px"}}>
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const current = value.clone();
          // const localeData = value.localeData();
          const increaseMonth = (e: number) => {
            onChange(current.add(e,"month"));
            console.log(current);
          };
          return (
            <div style={{ padding: 8 }}>
              <Row gutter={8}>
                <Col span={3}>
                <Button
                onClick={() => {
                  // const newValue2 = newValue.add(1,"year");
                  increaseMonth(-1);
                }}
                style={{border:"none", width:"50px", marginTop:"-10px"}}
                icon={<ArrowLeftIcon style={{marginTop:"-14px"}}/>}
                />
                </Col>
                <Col span={18} style={{textAlign:"center",marginTop:"-6px"}}>
                <Typography.Text style={{fontSize:"18px", fontWeight:"500",color:"#FF7506"}} >{String(current.format("DD MMM yyyy"))}</Typography.Text>
                </Col>
                <Col span={3}>
                <Button
                onClick={() => {
                  // const newValue2 = newValue.add(1,"year");
                  increaseMonth(1);
                }}
                style={{border:"none", width:"50px", marginTop:"-10px"}}
                icon={<ArrowRightIcon style={{marginTop:"-14px"}}/>}
                />
                </Col>
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
        className="calendar"
      />
    </Card>
        </Row>
        </div>
    </Sider>
  </Layout>
        </div>
    )
}

export default Dashboard;