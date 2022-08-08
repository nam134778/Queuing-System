import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login/login';
import Dashboard from './component/Dashboard/dashboard';
import Devices from './component/Devices/devices';
import GiveNumber from './component/GiveNumber/giveNumber';
import Profile from './component/ManageAccount/manageAccount';
import Services from './component/Services/service';
import Report from './component/Report/report';
import AddDevices from './component/Devices/addDevices';
import ManageNumber from './component/GiveNumber/manageNumber';
import ForgotPass from './component/Login/forgotPass';
import NewPass from './component/Login/newPass';
import ManageRole from './component/Setting/manageRole';
import UserLog from './component/Setting/userLog';
import ManageAccount from './component/Setting/manageAccount';
import AddServices from './component/Services/addServices';
import DevicesDetails from './component/Devices/deviceDetails';
import ServiceDetails from './component/Services/serviceDetails';
import NumberDetails from './component/GiveNumber/NumberDetails';
import AddAccount from './component/Setting/addAccount';
import AddRole from './component/Setting/addRole';
import { Provider } from "react-redux";
import store from "./store";
const App: React.FC = () =>(
  <Provider store={store}>
  <Router>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/devices' element={<Devices />} />
      <Route path='/give-number' element={<GiveNumber />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/services' element={<Services />} />
      <Route path='/report' element={<Report />} />
      <Route path='/add-devices' element={<AddDevices />} />
      <Route path='/edit-device/:id' element={<AddDevices />} />
      <Route path='/device-details/:id' element={<DevicesDetails />} />
      <Route path='/service-details/:id' element={<ServiceDetails />} />
      <Route path='/manage-number' element={<ManageNumber />} />
      <Route path='/forgot-pass' element={<ForgotPass />} />
      <Route path='/new-pass' element={<NewPass />} />
      <Route path='/manage-role' element={<ManageRole />} />
      <Route path='/user-log' element={<UserLog />} />
      <Route path='/add-services' element={<AddServices />} />
      <Route path='/edit-service/:id' element={<AddServices />} />
      <Route path='/manage-account' element={<ManageAccount />} />
      <Route path='/number-details/:id' element={<NumberDetails />} />
      <Route path='/add-account' element={<AddAccount />} />
      <Route path='/add-role' element={<AddRole />} />
      <Route path='/edit-account/:id' element={<AddAccount />} />
      <Route path='/edit-role/:id' element={<AddRole />} />
        </Routes>
      </Router>
    </Provider>
  );

export default App;
