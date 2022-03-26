import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import './global.css';  // 全局样式补丁

console.info('ProcessEnvBuildTime: ', ProcessEnvBuildTime);
console.info('ProcessEnvPlatform: ', ProcessEnvPlatform);

ReactDOM.render(<App />, document.getElementById('root'));
