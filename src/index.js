import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import 'moment/locale/zh-cn';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
moment.locale('zh-cn');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
          <ConfigProvider locale={zhCN} >
              <App />
          </ConfigProvider>
      </BrowserRouter>
);

