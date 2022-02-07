import React from 'react';
import zhCN from 'antd/lib/locale/zh_CN';
import Routers from './router';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from 'antd';
import entryTask from '@utils/entryTask';

class App extends React.Component {
  constructor(props = {}) {
    super(props);
    this.state = {};
  }

  static async getDerivedStateFromProps() {
    await entryTask();
  }

  render(): React.ReactNode {
   return (
    <>
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Routers />
        </BrowserRouter>
      </ConfigProvider>
    </>
   );
  }
}

export default App;
