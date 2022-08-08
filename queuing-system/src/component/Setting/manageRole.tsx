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
import { Avatar, Card, Select, DatePicker, Typography, Form, Input, Badge, Space, Layout, Menu, Breadcrumb, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "../../store";
import { roleSelector, getAll } from "../../store/reducers/roleSlice";
import { userSelector } from "../../store/reducers/userSlice";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Menubar from "../Menubar/Menubar";
import PlusIcon from "../Icons/Plus";
import   Notification  from "../Notification/Notification";

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
      title: 'Tên vai trò',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Số người dùng',
        dataIndex: 'userquantity',
        key: 'userquantity',
    },
    {
      title: 'Mô tả',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: '',
      dataIndex: 'update',
      key: 'update',
    },
  
  ]

  const { Header, Content, Sider } = Layout;


const ManageRole = () => {
  const idLogin = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, roles } = useAppSelector(roleSelector);
  const { userLogin } = useAppSelector(userSelector);
  const [keywords, setKeywords] = useState<string>("");
  const [value, setValue] = useState<string>('')

  useEffect(() => {
      dispatch(getAll({ keywords }));
  }, [keywords]);

  if (!idLogin) return <Navigate to="/login"></Navigate>;
    return (
        <div>
<Layout style={{height:"100vh",fontFamily:"Nunito"}}>
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
                        <Breadcrumb.Item>Cài đặt hệ thống</Breadcrumb.Item>
                        <Breadcrumb.Item>Quản lý vai trò</Breadcrumb.Item>
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
          <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Danh sách vai trò</p>
        </div>
        <Row>
            <Col span={18}></Col>
          <Col span={4}>
          <Form layout="vertical">
                <Row justify="space-between" className='inputContainer'>
                    <Col flex="300px">
                      <Form.Item
                        label={<Typography.Text strong className="text-3" style={{fontSize:"16px"}}>Từ khóa</Typography.Text>}
                      >
                            <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onPressEnter={(e) => setKeywords(value)}
                            placeholder="Nhập từ khóa" style={{ width: '275  px', height:"50px" }} className="thirst-select" size="large" suffix={<SearchOutlined style={{fontSize:"20px", color:"#FF7506"}}/>}/>
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
        columns={columns}
        loading={loading}
        dataSource={roles.map((role) => ({
          key: role.id,
          name: role.name,
          userquantity: role.amountOfUser,
          details: role.description,
          update: (
              <Link
                  to={`/edit-role/${role.id}`}
              >
                  Cập nhật
              </Link>
          ),
      }))}
        bordered
        pagination={
          {pageSize: 9, itemRender: itemRender}
        }
        />
          </Col>
          <Col span={2}>
          <Link to="/add-role">
          <Button
            // type="primary"
            className="add"
            style={{marginLeft:"1rem",height:"100px",width:"80px", fontWeight:"700", position:"absolute",right:"0",textAlign:"center",background:"#FFF2E7"}}
            >
            <PlusIcon style={{fontSize:"25px", borderStartEndRadius:"2px"}}/><br />
                Thêm<br/>vai trò</Button></Link>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default ManageRole;