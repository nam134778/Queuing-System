import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
import "../Dashboard/dashboard.css";
// import { Line } from "@ant-design/plots";
import { Area, RadialBar } from "@ant-design/plots";
import {
    ArrowUpOutlined,
    AppstoreOutlined,
    ContainerOutlined,
    CalendarTwoTone,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    PieChartOutlined,
    SettingOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Card, Layout, Menu, MenuProps, Button, Tooltip, Dropdown, Row, Col, Calendar, Radio, Select, Statistic, Typography } from 'antd';
import { useState,useEffect } from 'react';
import { IWindowSize, useWindowSize } from "../Login/login";
import LineChart from "@ant-design/plots/es/components/line";

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

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem('Dashboard', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Option 3', '3', <ContainerOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Option 3', '3', <ContainerOutlined />),
  
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  ];
  const onClick: MenuProps['onClick'] = e => {
    console.log('click', e);
  };
  const { Header, Content, Footer, Sider } = Layout;


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
      radius: 0.8,
      innerRadius: 0.7,
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
          return "#ff9300";
      },
      barBackground: {},
    };

    return (
        <div>
<Layout style={{"height":"100vh"}}>
    <Sider
    style={{background:"white"}}
    >
            <div className="logo">
          <img src={imagelogo} className="logoalta"/>
        </div>
      <Menu
        className="hover"
        theme="light"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
          (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`,
          }),
        )}
      />
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
        <Row>
        <Card bordered={false}>
        <RadialBar width={100} height={100} {...config2} />
        </Card>
        </Row>
        <Row>
        <Card bordered={false}>
        <RadialBar width={100} height={100} {...config2} />
        </Card>
        </Row>
        <Row>
        <Card bordered={false}>
        <RadialBar width={100} height={100} {...config2} />
        </Card>
        </Row>
        <Row>
        <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          const current = value.clone();
          const localeData = value.localeData();
          const months = [];

          for (let i = 0; i < 12; i++) {
            current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let index = start; index < end; index++) {
            monthOptions.push(
              <Select.Option className="month-item" key={`${index}`}>
                {months[index]}
              </Select.Option>,
            );
          }

          const month = value.month();
          const year = value.year();
          const options = [];

          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }

          return (
            <div
              style={{
                padding: 8,
              }}
            >
              <Typography.Title level={4}>Custom header</Typography.Title>
              <Row gutter={8}>
                <Col>
                  <Radio.Group
                    size="small"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    onChange={(newYear) => {
                      const now = value.clone().year(Number(newYear));
                      onChange(now);
                    }}
                    value={String(year)}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    value={String(month)}
                    onChange={(selectedMonth) => {
                      const newValue = value.clone();
                      newValue.month(parseInt(selectedMonth, 10));
                      onChange(newValue);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
      />
        </Row>
    </Sider>
  </Layout>
        </div>
    )
}

export default Dashboard;