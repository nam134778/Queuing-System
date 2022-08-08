import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
import "../Menubar/Menubar.css";
import { MoreOutlined } from '@ant-design/icons';
import {Menu, Button} from 'antd';
import DashboardIcon from "../Icons/DashboardIcon";
import MonitorIcon from "../Icons/MonitorIcon";
import TalkIcon from "../Icons/TalkIcon";
import NumberIcon from "../Icons/NumberIcon";
import ReportIcon from "../Icons/ReportIcon";
import SettingIcon from "../Icons/SettingIcon";
import LogoutIcon from "../Icons/LogoutIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/index'
import { userSelector, logout } from "../../store/reducers/userSlice";
import { matchPath } from "react-router-dom";

const Menubar = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userLogin } = useAppSelector(userSelector);
    return (
        <div style={{textAlign:"center"}}>
            <div className="logo" style={{marginTop:"-4rem"}}>
                <img src={imagelogo} className="logoalta"/>
            </div>
              <Menu 
              defaultOpenKeys={['1']}
              mode="vertical" className="hover"  expandIcon={<MoreOutlined className="more" style={{fontSize:"16px",color:"rgba(169, 169, 176, 1)"}}/>}>
            <Menu.Item key="1" icon={<DashboardIcon className="hover-up"/>} className={(matchPath({path:'/'},pathname))?'active':''}>
            Dashboard
            <Link to="/" />
            </Menu.Item>
           <Menu.Item key="2" icon={<MonitorIcon className="hover-up"/>} className={(matchPath({path:'/devices'},pathname))?'active':((matchPath({path:'/add-devices'},pathname))? 'active' : ((matchPath({path:'/edit-device/:id'},pathname))? 'active' : ((matchPath({path:'/device-details/:id'},pathname))? 'active': ((matchPath({path:'/number-details/:id'},pathname))?'active':''))))}>
           <Link to="/devices" />
           Thiết bị
            </Menu.Item>
            <Menu.Item key="3" icon={<TalkIcon className="hover-up"/>} className={(matchPath({path:'/services'},pathname))?'active':((matchPath({path:'/add-services'},pathname))?'active':((matchPath({path:'/service-details/:id'},pathname))?'active':((matchPath({path:'/edit-service/:id'},pathname))?'active':'')))}>
            <Link className="abc" to="/services" />
            Dịch vụ
            </Menu.Item>
            <Menu.Item key="4" icon={<NumberIcon className="hover-up"/>} className={(matchPath({path:'/give-number'},pathname))?'active':((matchPath({path:'/manage-number'},pathname))?'active':'')}>
            <Link to="/give-number" />
            Cấp số
            </Menu.Item>
            <Menu.Item key="5" icon={<ReportIcon className="hover-up"/>} className={(matchPath({path:'/report'},pathname))?'active':''}>
            <Link to="/report" />
            Báo cáo
            </Menu.Item>
    <Menu.SubMenu key="SubMenu" title="Cài đặt hệ thống" icon={<SettingIcon className="hover-up abc" />} className={matchPath({path:'/manage-role'},pathname)? 'active2' : ((matchPath({path:'/manage-account'},pathname)) ? 'active2' : ((matchPath({path:'/user-log'},pathname))? 'active2' : ((matchPath({path:'/add-account'},pathname))? 'active2' : ((matchPath({path:'/add-role'},pathname))? 'active2' : (matchPath({path:'/edit-role/:id'},pathname))? 'active2' : (matchPath({path:'/edit-account/:id'},pathname))? 'active2' : ''))))}>
      <Menu.Item key="6" className={(matchPath({path:'/manage-role'},pathname))?'active':((matchPath({path:'/add-role'},pathname))? 'active' : ((matchPath({path:'/edit-role/:id'},pathname))? 'active' : ''))}>
      <Link to="/manage-role" />
        Quản lý vai trò
      </Menu.Item>
      <Menu.Item key="7" className={(matchPath({path:'/manage-account'},pathname))?'active':((matchPath({path:'/add-account'},pathname))? 'active':((matchPath({path:'/edit-account/:id'},pathname))? 'active' : ''))}>
        <Link to="/manage-account" />
        Quản lý tài khoản
      </Menu.Item>
        <Menu.Item key="8" className={(matchPath({path:'/user-log'},pathname))?'active':''}>
          <Link to="/user-log" />
          Nhật ký người dùng
        </Menu.Item>
    </Menu.SubMenu>
  </Menu>
            <Button 
            htmlType="submit"
            onClick={() =>  {
              dispatch(logout())
              navigate("/login")
          }}
            style={{width:"176px",height:"48px",border:"none",borderRadius:"8px",color:"#FF7506",background:"#FFF2E7", top:"360px", fontSize:"16px"}}><span><LogoutIcon style={{marginTop:"0.6rem",marginLeft:"-7rem"}}/><p style={{marginTop:"-1.7rem"}}>Đăng xuất</p></span></Button>
        </div>
    )
}

export default Menubar;