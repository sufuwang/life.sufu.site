import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, Button } from 'antd';
import { DollarCircleOutlined, MenuUnfoldOutlined, MenuFoldOutlined, HeartTwoTone } from '@ant-design/icons';
import styles from './index.module.less';

const { SubMenu } = Menu;
const Navigation = () => {

  const [isCollapse, setCollapse] = useState(true);
  const handleChangeCollapse = () => {
    setCollapse(!isCollapse);
  };

  return (
    <div className={styles.container}>
      <Menu
        className={styles.navigate}
        style={{ width: isCollapse ? '60px' : '160px' }}
        mode="inline"
        inlineCollapsed={isCollapse}
      >
        <SubMenu key="heart" icon={<HeartTwoTone twoToneColor="#eb2f96" />} title="Heart">
          <Menu.Item key="time">
            <Link to="/heart/time">纪念日</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="Tally" icon={<DollarCircleOutlined />} title="收支">
          <Menu.ItemGroup key="Analyse" title="统计分析">
            <Menu.Item key="Table">
              <Link to="/tally/table">收支详情</Link>
            </Menu.Item>
            <Menu.Item key="Chart">
              <Link to="/tally/trend">收支趋势</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="Operation" title="数据操作">
            <Menu.Item key="Add">
              <Link to="/tally/item?type=add">新增</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu> */}
        {/* <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu> */}
        {/* <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu> */}
      </Menu>
      <Button type="primary" onClick={handleChangeCollapse} style={{ marginBottom: 16 }}>
        {isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  );
};

export default Navigation;
