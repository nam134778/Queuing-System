import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login/login';
import Dashboard from './component/Dashboard/dashboard';
import Devices from './component/Devices/devices';
import GiveNumber from './component/GiveNumber/giveNumber';
import ManageAccount from './component/ManageAccount/manageAccount';
import Services from './component/Services/service';
import Report from './component/Report/report';
import { Col, Row } from 'antd';
const App: React.FC = () =>(
<div>
  {/* <Login /> */}
  {/* <Dashboard /> */}
  {/* <Devices /> */}
  {/* <GiveNumber /> */}
  {/* <ManageAccount /> */}
  <Router>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />s
      <Route path='/devices' element={<Devices />} />
      <Route path='/give-number' element={<GiveNumber />} />
      <Route path='/manage-account' element={<ManageAccount />} />
      <Route path='/services' element={<Services />} />
      <Route path='/report' element={<Report />} />
    </Routes>
  </Router>
</div>
  );

export default App;
