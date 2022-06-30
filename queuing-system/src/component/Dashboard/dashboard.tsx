import React from "react";
import 'antd/dist/antd.css';
import "../Dashboard/dashboard.css";
import type { DatePickerProps } from 'antd';
import { RadialBar,Area } from "@ant-design/plots";
import {
    ArrowUpOutlined,
    CalendarTwoTone,
    UserOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Layout, Menu, MenuProps, Button, Tooltip, Dropdown, Row, Col, Calendar, Radio, Select, Statistic, Typography, DatePicker } from 'antd';
import { useState,useEffect } from 'react';
import { IWindowSize, useWindowSize } from "../Login/login";
import Menubar from "../Menubar/Menubar";

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

  const { Header, Content, Footer, Sider } = Layout;

  const onChange: DatePickerProps['onChange'] = (date:any, dateString:any) => {
    console.log(date, dateString);
  };
const Dashboard = () => {
  const size = useWindowSize();
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
  const data2 = [
    {
      name: "G",
      star: 10
    },
    {
      name: "AVA",
      star: 90
    }  ];

    const config2 = {
      data: data2,
      xField: "name",
      yField: "star",
      maxAngle: 324,
      radius: 0.7,
      innerRadius: 0.6,
      tooltip: {
        formatter: (datum:any) => {
          return {
            name: "star",
            value: datum.star
          };
        }
      },
      colorField: "star",
      color: ( star:any ) => {
          if (star < 100 - star) {
            return "#1f1f1f";
          }
          else return "#ff9300";
      },
      barBackground: {},
    };

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
        <h1>
          Dashboard 
        </h1>
      </Header>
      <Content
        style={{
          margin: '24px 3rem 0 3rem',
        }}
      >
        <div
          className="site-layout-background"
        >
          <p>Biểu đồ cấp số</p>
        </div>
        <div>
        <Row gutter={16}>
      <Col span={6}>
        <Card bordered={false} style={{borderRadius:"10px"}}>
          <Row>
          <Col span={4}><Button className="button-1" shape="circle" icon={<CalendarTwoTone twoToneColor="#52c41a"/>}/></Col>
          <Col><h1>Số thứ tự đã cấp</h1></Col>
          </Row>
          <Row>
          <Col span={14}>
          <Statistic value={112893} />
          </Col>
          <Col span={10}>
          <Button className="button-1-2"><Statistic
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' , fontSize:"0.8rem"}}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          /></Button>
          </Col>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
      <Card bordered={false} style={{borderRadius:"10px"}}>
          <Row>
          <Col span={4}><Button className="button-1" shape="circle" icon={<CalendarTwoTone twoToneColor="#52c41a"/>}/></Col>
          <Col><h1>Số thứ tự đã cấp</h1></Col>
          </Row>
          <Row>
          <Col span={14}>
          <Statistic value={112893} />
          </Col>
          <Col span={10}>
          <Button className="button-1-2"><Statistic
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' , fontSize:"0.8rem"}}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          /></Button>
          </Col>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
      <Card bordered={false} style={{borderRadius:"10px"}}>
          <Row>
          <Col span={4}><Button className="button-1" shape="circle" icon={<CalendarTwoTone twoToneColor="#52c41a"/>}/></Col>
          <Col><h1>Số thứ tự đã cấp</h1></Col>
          </Row>
          <Row>
          <Col span={14}>
          <Statistic value={112893} />
          </Col>
          <Col span={10}>
          <Button className="button-1-2"><Statistic
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' , fontSize:"0.8rem"}}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          /></Button>
          </Col>
          </Row>
        </Card>
      </Col>
      <Col span={6}>
      <Card bordered={false} style={{borderRadius:"10px"}}>
          <Row>
          <Col span={4}><Button className="button-1" shape="circle" icon={<CalendarTwoTone twoToneColor="#52c41a"/>}/></Col>
          <Col><h1>Số thứ tự đã cấp</h1></Col>
          </Row>
          <Row>
          <Col span={14}>
          <Statistic value={112893} />
          </Col>
          <Col span={10}>
          <Button className="button-1-2"><Statistic
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' , fontSize:"0.8rem"}}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          /></Button>
          </Col>
          </Row>
        </Card>
      </Col>
    </Row>
        </div>
        <div style={{marginTop:"3rem"}}>
        <Card bordered={false} style={{borderRadius:"10px"}}>
        <h1>Bảng thống kê theo ngày</h1>
        <h5>Tháng 2/2022</h5>
        <Area {...config} style={{marginTop:"2rem"}}/>
        </Card>
        </div>
      </Content>
    </Layout>
    <Sider
        width={(size.width < 1050) ? 250 : 400}
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
            <span>Nguyễn Thị Tần</span><br/>
            <span>Hello</span>
            </Col>
        </Row>
        <div style={{marginTop:"5rem"}}>
        <Row>
        <Card bordered={false} className="shadow-card">
        <Row>
          <Col span={5}><RadialBar {...config2} className="radial"/></Col>
        </Row>
        </Card>
        </Row>
        <Row>
        <Card bordered={false} className="shadow-card">
        <Row>
          <Col span={5}><RadialBar {...config2} className="radial"/></Col>
        </Row>
        </Card>
        </Row>
        <Row>
        <Card bordered={false} className="shadow-card">
        <Row>
          <Col span={5}><RadialBar {...config2} className="radial"/></Col>
        </Row>
        </Card>
        </Row>
        <Row style={{marginLeft:"1rem"}}>
      <DatePicker onChange={onChange} open={true} showToday={false} style={{border:"none"}}/>
        </Row>
        </div>
    </Sider>
  </Layout>
        </div>
    )
}

export default Dashboard;