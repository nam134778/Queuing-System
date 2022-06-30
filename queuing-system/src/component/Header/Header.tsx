import React from "react";
import 'antd/dist/antd.css';
import "../Header/Header.css";
import {
    UserOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Breadcrumb, Menu, MenuProps, Button, Tooltip, Dropdown, Row, Col } from 'antd';

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


const HeaderProp = () => {
    return (
        <div>
            <Row>
            <Col span={5}><h1 style={{fontSize:"1.3rem", color:"#FF7506"}}>
            Thông tin cá nhân
            </h1>
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
                <h1 style={{marginTop:"-3.6rem"}}>Lê Quỳnh Ái Vân</h1>
                </Col>
                </Row>
            </Col>
            </Row>
        </div>
    )
}

export default HeaderProp;