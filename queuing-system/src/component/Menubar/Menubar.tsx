import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
import "../Dashboard/dashboard.css";
import { MoreOutlined } from '@ant-design/icons';
import {Menu, MenuProps, Button} from 'antd';
import { IWindowSize, useWindowSize } from "../Login/login";
import DashboardIcon from "../Icons/DashboardIcon";
import MonitorIcon from "../Icons/MonitorIcon";
import TalkIcon from "../Icons/TalkIcon";
import NumberIcon from "../Icons/NumberIcon";
import ReportIcon from "../Icons/ReportIcon";
import SettingIcon from "../Icons/SettingIcon";
import LogoutIcon from "../Icons/LogoutIcon";


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
    getItem('Dashboard', '1', <DashboardIcon className="hover-up"/>),
    getItem('Thiết bị', '2', <MonitorIcon className="hover-up"/>),
    getItem('Dịch vụ', '3', <TalkIcon className="hover-up"/>),
    getItem('Cấp số', '4', <NumberIcon className="hover-up"/>),
    getItem('Báo cáo', '5', <ReportIcon className="hover-up"/>),
    getItem('Cài đặt hệ thống', 'sub1', <SettingIcon className="hover-up"/>,[
      getItem('Quản lý vai trò', '6'),
      getItem('Quản lý tài khoản', '7'),
      getItem('Nhật ký người dùng', '8'),
    ]),
  ];
  const onClick: MenuProps['onClick'] = e => {
    console.log('click', e);
  };

const Menubar = () => {
  const size = useWindowSize();

    return (
        <div style={{textAlign:"center"}}>
            <div className="logo" style={{marginTop:"-4rem"}}>
                <img src={imagelogo} className="logoalta"/>
            </div>
            <Menu
                expandIcon={<MoreOutlined />}
                className="hover"
                theme="light"
                mode="vertical"
                defaultSelectedKeys={['4']}
                items={items}
            />
            <Button style={{width:"10rem",height:"2.5rem",border:"none",borderRadius:"10px",color:"#FF7506",background:"#FFF2E7", top:"26rem"}}><span><LogoutIcon style={{marginTop:"0.3rem",marginLeft:"-7rem"}}/><p style={{marginTop:"-1.5rem"}}>Đăng xuất</p></span></Button>
        </div>
    )
}

export default Menubar;