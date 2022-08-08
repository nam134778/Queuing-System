import React from "react";
import 'antd/dist/antd.css';
import "../Dashboard/dashboard.css";
import { Badge, Progress } from 'antd';
import { Area } from "@ant-design/plots";
import {
    ArrowUpOutlined,
    CaretDownOutlined,
    ArrowDownOutlined,
    UserOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Layout, Menu, Form, Button, Tooltip, Dropdown, Row, Col, Select, Statistic, Typography, Calendar } from 'antd';
import { useState,useEffect, useMemo } from 'react';
import Menubar from "../Menubar/Menubar";
import Calendar1Icon from "../Icons/Calendar1";
import Calendar2Icon from "../Icons/Calendar2";
import ContactIcon from "../Icons/Contact";
import FlagIcon from "../Icons/FlagIcon";
import MonitorIcon from "../Icons/MonitorIcon";
import TalkIcon from "../Icons/TalkIcon";
import NumberIcon from "../Icons/NumberIcon";
import { Link, Navigate } from "react-router-dom";
import ArrowLeftIcon from "../Icons/ArrowLeft";
import ArrowRightIcon from "../Icons/ArrowRight";
import {
  serviceSelector,
  getAll as getAllService,
} from "../../store/reducers/serviceSlice";
import {
  deviceSelector,
} from "../../store/reducers/deviceSlice";
import { getAll as getAllDevice } from "../../store/actions/deviceActions";
import { useAppSelector, useAppDispatch } from "../../store";
import {
    giveNumberSelector,
    getAll,
} from "../../store/reducers/giveNumberSlice";
import { userSelector } from "../../store/reducers/userSlice";
import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker';
import   Notification  from "../Notification/Notification";
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


const Dashboard = () => {
  const idLogin = localStorage.getItem("userId");
  console.log(idLogin);
  const dispatch = useAppDispatch();
  const { giveNumbers } = useAppSelector(giveNumberSelector);
  const { userLogin } = useAppSelector(userSelector);
  const { devices } = useAppSelector(deviceSelector);
  const { services } = useAppSelector(serviceSelector);
  const [chartData, setChartData] = useState("date");
  const [calendarValue, setCalendarValue] = useState<DayRange>({
      from: null,
      to: null,
  });
  const data = useMemo(() => {
    let start = calendarValue.from ? calendarValue.from.day : 0;
    let end = calendarValue.to ? calendarValue.to.day : 30;
    let month = calendarValue.to
        ? calendarValue.to.month
        : new Date().getMonth() + 1;
    let data1 = [];
    switch (chartData) {
        case "date":
            for (let i = start; i <= end; i++) {
                data1.push({
                    xField: i,
                    value: giveNumbers.filter((giveNumber) => {
                        return (
                            giveNumber.timeGet.toDate().getDate() ===
                                i &&
                            giveNumber.timeGet.toDate().getMonth() +
                                1 ==
                                month
                        );
                    }).length,
                });
            }
            return data1;
        case "week":
            for (let i = 1; i <= 5; i++) {
                data1.push({
                    xField: "Tuần " + i,
                    value: giveNumbers.filter((giveNumber) => {
                        return (
                            giveNumber.timeGet.toDate().getMonth() +
                                1 ==
                                month &&
                            giveNumber.timeGet.toDate().getDate() >
                                (i - 1) * 7 &&
                            giveNumber.timeGet.toDate().getDate() <=
                                i * 7
                        );
                    }).length,
                });
            }
            return data1;
        default:
            for (let i = 1; i <= 12; i++) {
                data1.push({
                    xField: i,
                    value: giveNumbers.filter((giveNumber) => {
                        return (
                            giveNumber.timeGet.toDate().getMonth() +
                                1 ===
                            i
                        );
                    }).length,
                });
            }
            console.log(data1);
            return data1;
    }
}, [chartData, calendarValue, giveNumbers]);
  const onPanelChange = (value:any, mode:any) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const config = {
    data,
    xField: 'xField',
    yField: 'value',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    smooth: true,
    tooltip: {
      position: "top" as "left" | "right" | "top" | "bottom" | undefined,
      domStyles: {
          "g2-tooltip": {
              width: "100px",
              padding: "5px",
              backgroundColor: "#5185F7",
              borderRadius: "8px",
              color: "#fff",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 700,
          },
      },
      customContent: (title: any, items: any): any => {
          return <span>{items[0]?.value}</span>;
      },
  },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
  };
  useEffect(() => {
    dispatch(getAll());
    dispatch(getAllService()); 
    dispatch(getAllDevice());
}, []);
  if (!idLogin) return <Navigate to="/login"></Navigate>;
    return (
        <div>
<Layout style={{"height":"100vh", fontFamily:"Nunito"}}>
     <Sider
    style={{background:"white",width:"200px"}}
    >
    <Menubar />
    </Sider>
    <Layout>
      <Header
      className="header"
      style={{marginTop:"10px"}}
      >
        <p style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}>
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
          <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Biểu đồ cấp số</p>
        </div>
        <div>
        <Row gutter={16}>
      <Col span={6}>
        <Link to="/give-number">
        <Card bordered={false} style={{borderRadius:"20px",height:"160px"}}>
          <Row>
          <Col span={9}><Button className="button-1" shape="circle" icon={<Calendar1Icon />} style={{width:"72px",height:"72px",marginTop:"-10px",background:"rgb(215, 240, 255)"}}/></Col>
          <Col><p style={{marginTop:"-3px",fontSize:"18px",fontWeight:"700"}}>Số thứ tự<br/> đã cấp</p></Col>
          </Row>
          <Row>
          <Col span={14}>
          <Statistic value={giveNumbers.length} valueStyle={{fontSize:"40px", fontWeight:"800", marginTop:"-10px"}}/>
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
          <Col><p style={{marginTop:"-3px",fontSize:"18px",fontWeight:"700"}}>Số thứ tự<br/> đã sử dụng</p></Col>
          </Row>
          <Row>
          <Col span={14}>
          <Statistic value={giveNumbers.filter(
                        (value) => value.status === "used"
                    ).length} valueStyle={{fontSize:"40px", fontWeight:"800", marginTop:"-10px"}}/>
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
          <Col><p style={{marginTop:"-3px",fontSize:"18px",fontWeight:"700"}}>Số thứ tự<br/>đang chờ</p></Col>
          </Row>
          <Row>
          <Col span={14}>
          <Statistic value={giveNumbers.filter(
                            (value) => value.status === "waiting"
                            ).length} valueStyle={{fontSize:"40px", fontWeight:"800", marginTop:"-10px"}}/>
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
          <Col><p style={{marginTop:"-3px",fontSize:"18px",fontWeight:"700"}}>Số thứ tự<br/> đã bỏ qua</p></Col>
          </Row>
          <Row>
          <Col span={14}>
          <Statistic value={
                              giveNumbers.filter(
                                  (value) => value.status === "skip"
                              ).length
                            } valueStyle={{fontSize:"40px", fontWeight:"800", marginTop:"-10px"}}/>
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
          <p style={{fontSize:"20px", fontWeight:"700"}}> Bảng thống kê theo{" "}
                                    {chartData == "date"
                                        ? "ngày"
                                        : chartData == "week"
                                        ? "tuần"
                                        : "tháng"}
                                </p>
          <p style={{fontSize:"14px", fontWeight:"400",marginTop:"-16px"}}>{chartData == "month"
                                        ? "Năm "
                                        : "Tháng " +
                                          (calendarValue.to
                                              ? calendarValue.to.month
                                              : new Date().getMonth() + 1) +
                                          "/"}
                                    2022</p>
          </Col>
          <Col span={2} style={{marginTop:"5px"}}>
          <Typography.Text strong className="text-1" style={{fontSize:"18px"}}>Xem theo</Typography.Text>
          </Col>
          <Col span={3}>
          <Form.Item
                      className='selectContainer'
                      >      
                        <Select defaultValue="day" style={{width:"130px", height:"45px", borderRadius:"10px"}} className="first-select" size="large" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        }
                        onChange={(value) => setChartData(value)}
                        value={chartData}
                        >
                                <Option value="date">Ngày</Option>
                                <Option value="week">Tuần</Option>
                                <Option value="month">Tháng</Option>
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
        <Row style={{marginTop:"23px"}}>
            <Col span={6}></Col>
            <Col 
            span={4}>
              <Notification />
            </Col>
            <Col>
            <Link to='/profile'>
            <Avatar size="large" icon={<UserOutlined />} />
            </Link>
            </Col>
            <Col style={{marginLeft:"10px"}}>
            <Link to='/profile'>
                <Row><Typography.Text>Xin chào</Typography.Text></Row>
                <Row><Typography.Text  style={{marginTop:"0", fontWeight:"700"}}>{userLogin?.name}</Typography.Text ></Row>
            </Link>
            </Col>
        </Row>
        <div style={{marginTop:"50px"}}>
          <p style={{marginLeft:"15px", fontSize:"26px", marginBottom:"10px", fontWeight:"700", color:"#FF7506"}}>Tổng quan</p>
        <Row>
        <Link to="/devices">
        <Card bordered={false} className="shadow-card">
        <Row>
          <Col span={4}>
          <div style={{marginTop:"-5px",marginLeft:"-18px"}}><Progress type="circle" percent={Math.round(devices.filter(
                                    (device) => device.isActive === false
                                ).length * 100 / devices.length )} strokeColor={"#a1a1a1"} style={{borderColor:"#a1a1a1"}} showInfo={false} width={46} /></div>
          <div style={{marginTop:"-35px",marginLeft:"-18px"}}><Progress type="circle" percent={Math.round(devices.filter(
                                    (device) => device.isActive === true
                                ).length * 100 / devices.length )} strokeColor={"#FF7506"} width={55} style={{marginTop:"-200px",paddingBottom:"100px",marginBottom:"30px"}} /></div>
          </Col>
          <Col span={7}><Row><Statistic value={devices.length} valueStyle={{fontSize:"28px",fontWeight:"800",fontFamily:"Nunito"}} style={{marginTop:"-20px",marginLeft:"3px"}}/></Row>
          <Row><MonitorIcon style={{color:"#FF7506"}}/><p style={{marginLeft:"4px",fontWeight:"600",fontSize:"14px",color:"#FF7506"}}>Thiết bị</p></Row>
          </Col>
          <Col span={13}>
            <Row><Badge color="#FF7506" text="Đang hoạt động" style={{marginTop:"-8px"}}/><Statistic value={devices.filter(
                                    (device) => device.isActive === true
                                ).length} valueStyle={{color:"#FF7506", fontWeight:"700", fontSize:"18px"}} style={{marginTop:"-12px", marginLeft:"15px"}}/></Row>
            <Row><Badge color="#a1a1a1" text="Ngưng hoạt động" style={{marginTop:"5px"}} /><Statistic value={devices.filter(
                                    (device) => device.isActive === false
                                ).length} valueStyle={{color:"#FF7506", fontWeight:"700", fontSize:"18px"}} style={{marginTop:"1px", marginLeft:"7px"}}/></Row>
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
          <div style={{marginTop:"-5px",marginLeft:"-18px"}}><Progress type="circle" percent={Math.round(services.filter(
                                    (service) => service.isActive === false
                                ).length * 100 / services.length)} strokeColor={"#a1a1a1"} style={{borderColor:"#a1a1a1"}} showInfo={false} width={46} /></div>
          <div style={{marginTop:"-35px",marginLeft:"-18px"}}><Progress type="circle" percent={Math.round(services.filter(
                                    (service) => service.isActive === true
                                ).length * 100 / services.length)} strokeColor={"#4277FF"} width={55} style={{marginTop:"-200px",paddingBottom:"100px",marginBottom:"30px"}} /></div>
          </Col>
          <Col span={7}><Row><Statistic value={services.length} valueStyle={{fontSize:"28px",fontWeight:"800"}} style={{marginTop:"-20px",marginLeft:"3px"}}/></Row>
          <Row><TalkIcon style={{color:"#4277FF"}}/><p style={{marginLeft:"4px",fontWeight:"600",fontSize:"14px",color:"#4277FF"}}>Dịch vụ</p></Row>
          </Col>
          <Col span={13}>
            <Row><Badge color="#4277FF" text="Đang hoạt động" style={{marginTop:"-8px"}}/><Statistic value={services.filter(
                                    (service) => service.isActive === true
                                ).length} valueStyle={{color:"#4277FF", fontWeight:"700", fontSize:"18px"}} style={{marginTop:"-12px", marginLeft:"15px"}}/></Row>
            <Row><Badge color="#a1a1a1" text="Ngưng hoạt động" style={{marginTop:"5px"}}/><Statistic value={services.filter(
                                    (service) => service.isActive === false
                                ).length} valueStyle={{color:"#4277FF", fontWeight:"700", fontSize:"18px"}} style={{marginTop:"1px", marginLeft:"7px"}}/></Row>
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
          <div style={{marginTop:"-5px",marginLeft:"-18px"}}><Progress type="circle" percent={Math.round(giveNumbers.filter(
                                    (giveNumber) =>
                                        giveNumber.status === "waiting"
                                ).length * 100 / giveNumbers.length)} strokeColor={"#a1a1a1"} style={{borderColor:"#a1a1a1"}} showInfo={false} width={46} /></div>
          <div style={{marginTop:"-35px",marginLeft:"-18px"}}><Progress type="circle" percent={Math.round(giveNumbers.filter(
                                    (giveNumber) =>
                                        giveNumber.status === "used"
                                ).length * 100 / giveNumbers.length)} strokeColor={"#35C75A"} width={55} style={{marginTop:"-200px",paddingBottom:"100px",marginBottom:"30px"}} /></div>
          <div style={{marginTop:"-170px",marginLeft:"-18px"}}><Progress type="circle" percent={Math.round(giveNumbers.filter(
                                    (giveNumber) =>
                                        giveNumber.status === "skip"
                                ).length * 100 / giveNumbers.length)} strokeColor={"#F178B6"} width={38}  showInfo={false} style={{marginTop:"-200px",paddingBottom:"100px",marginBottom:"30px"}} /></div>
          </Col>
          <Col span={7}><Row><Statistic value={giveNumbers.length} valueStyle={{fontSize:"28px",fontWeight:"800"}} style={{marginTop:"-20px",marginLeft:"3px"}}/></Row>
          <Row><NumberIcon style={{color:"#35C75A"}}/><p style={{marginLeft:"4px",fontWeight:"600",fontSize:"14px",color:"#35C75A"}}>Cấp số</p></Row>
          </Col>
          <Col span={13}>
            <Row><Badge color="#35C75A" text="Đã sử dụng" style={{marginTop:"-18px"}}/><Statistic value={ giveNumbers.filter(
                                    (giveNumber) =>
                                        giveNumber.status === "used"
                                ).length} valueStyle={{color:"#35C75A", fontWeight:"700", fontSize:"18px"}} style={{marginTop:"-21px", marginLeft:"45px"}}/></Row>
            <Row><Badge color="#a1a1a1" text="Đang chờ"/><Statistic value={ giveNumbers.filter(
                                    (giveNumber) =>
                                        giveNumber.status === "waiting"
                                ).length} valueStyle={{color:"#35C75A", fontWeight:"700", fontSize:"18px"}} style={{marginTop:"-3px", marginLeft:"57px"}}/></Row>
            <Row><Badge color="#F178B6" text="Bỏ qua"/><Statistic value={giveNumbers.filter(
                                    (giveNumber) =>
                                        giveNumber.status === "skip"
                                ).length} valueStyle={{color:"#35C75A", fontWeight:"700", fontSize:"18px"}} style={{marginTop:"-3px", marginLeft:"74px"}}/></Row>
          </Col>
        </Row>
        </Card>
        </Link>
        </Row>
        <Row style={{marginTop:"50px", marginLeft:"16px"}}>
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
                <Typography.Text style={{fontSize:"18px", fontWeight:"700",color:"#FF7506"}} >{String(current.format("DD MMM yyyy"))}</Typography.Text>
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