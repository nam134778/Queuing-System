import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './component/Login/login';
import Dashboard from './component/Dashboard/dashboard';
import Devices from './component/Devices/devices';
import { Col, Row } from 'antd';
const App: React.FC = () =>(
<div>
  {/* <Login /> */}
  {/* <Dashboard /> */}
  <Devices />
</div>
  );

export default App;
