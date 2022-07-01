import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
// import "../Dashboard/dashboard.css";
import "../Menubar/Menubar.css";
import { MoreOutlined, AppstoreOutlined,MailOutlined,SettingOutlined } from '@ant-design/icons';
import {Menu, MenuProps, Button} from 'antd';
import { IWindowSize, useWindowSize } from "../Login/login";
import DashboardIcon from "../Icons/DashboardIcon";
import MonitorIcon from "../Icons/MonitorIcon";
import TalkIcon from "../Icons/TalkIcon";
import NumberIcon from "../Icons/NumberIcon";
import ReportIcon from "../Icons/ReportIcon";
import SettingIcon from "../Icons/SettingIcon";
import LogoutIcon from "../Icons/LogoutIcon";
import { Link, useLocation } from "react-router-dom";
import { matchPath } from "react-router-dom";

  const onClick: MenuProps['onClick'] = e => {
    console.log('click', e);
  };

const Menubar = () => {
  const size = useWindowSize();
  const {pathname} = useLocation();
    return (
        <div style={{textAlign:"center"}}>
            <div className="logo" style={{marginTop:"-4rem"}}>
                <img src={imagelogo} className="logoalta"/>
            </div>
              <Menu 
              defaultOpenKeys={['1']}
              mode="vertical" className="hover"  expandIcon={<MoreOutlined style={{fontSize:"16px"}}/>}>
            <Menu.Item key="1" icon={<DashboardIcon className="hover-up"/>} className={(matchPath({path:'/'},pathname))?'active':''}>
            Dashboard
            <Link to="/" />
            </Menu.Item>
           <Menu.Item key="2" icon={<MonitorIcon className="hover-up"/>} className={(matchPath({path:'/devices'},pathname))?'active':''}>
           <Link to="/devices" />
           Thiết bị
            </Menu.Item>
            <Menu.Item key="3" icon={<TalkIcon className="hover-up"/>} className={(matchPath({path:'/services'},pathname))?'active':''}>
            <Link className="abc" to="/services" />
            Dịch vụ
            </Menu.Item>
            <Menu.Item key="4" icon={<NumberIcon className="hover-up"/>} className={(matchPath({path:'/give-number'},pathname))?'active':''}>
            <Link to="/give-number" />
            Cấp số
            </Menu.Item>
            <Menu.Item key="5" icon={<ReportIcon className="hover-up"/>} className={(matchPath({path:'/report'},pathname))?'active':''}>
            <Link to="/report" />
            Báo cáo
            </Menu.Item>
    <Menu.SubMenu key="SubMenu" title="Cài đặt hệ thống" icon={<SettingIcon className="hover-up" />} className={(matchPath({path:'/manage-account'},pathname))?'active2':''}>
      {/* <Menu.Item key="6" className={(matchPath({path:'/'},pathname))?'active':''}>
        Quản lý vai trò
      </Menu.Item> */}
      <Menu.Item key="7" className={(matchPath({path:'/manage-account'},pathname))?'active':''}>
        <Link to="/manage-account" />
        Quản lý tài khoản
      </Menu.Item>
        {/* <Menu.Item key="8" className={(matchPath({path:'/'},pathname))?'active':''}>
          Nhật ký người dùng
        </Menu.Item> */}
    </Menu.SubMenu>
  </Menu>
            <Link to="/login"><Button style={{width:"176px",height:"48px",border:"none",borderRadius:"8px",color:"#FF7506",background:"#FFF2E7", top:"360px", fontSize:"16px"}}><span><LogoutIcon style={{marginTop:"0.6rem",marginLeft:"-7rem"}}/><p style={{marginTop:"-1.7rem"}}>Đăng xuất</p></span></Button></Link>
        </div>
    )
}

export default Menubar;