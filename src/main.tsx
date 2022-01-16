import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
// import App from './App';
import Routers from './router';
import 'antd/dist/antd.css';
import './global.css';  // 全局样式补丁

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById('root')
);
