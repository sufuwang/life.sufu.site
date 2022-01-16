import React, { useState } from "react";
import { Table as AntdTable } from 'antd';
import { Link } from "react-router-dom";
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table/interface';
import Detail from "./Detail";
import styles from './index.module.less';

const Table = () => {

  const [expandedRowKeys, setExpandedRowKeys] = useState(['2']);

  const handleOpenDeatil = (key: string) => {
    setExpandedRowKeys(expandedRowKeys.includes(key) ? [] : [key]);
  };
  const columns: ColumnsType<object> = [
    {
      title: '日期',
      dataIndex: 'date',
      onCell: (_, index = 0) => ({ rowSpan: index % 2 === 0 ? 2 : 0 }),
      width: 120
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 100
    },
    {
      title: '小计',
      dataIndex: 'subtotal',
      width: 100,
    },
    {
      title: '合计',
      dataIndex: 'total',
      width: 100,
      onCell: (_, index = 0) => ({ rowSpan: index % 2 === 0 ? 2 : 0 }),
    },
    {
      title: '操作',
      width: 100,
      onCell: (_, index = 0) => {
        if (index % 2 === 0) {
          return { rowSpan: 2 };
        }
        return { rowSpan: 0 };
      },
      render: (...args) => {
        const key = (args[args.length - 1] + 2).toString();
        const str = expandedRowKeys.includes(key) ? <>关闭详情&nbsp;<CaretUpOutlined /></> : <>查看详情&nbsp;<CaretDownOutlined /></>;
        return (
          <div className={styles.operationContainer}>
            <Link to='/tally/item?type=edit'>修改数据</Link>
            <a onClick={() => handleOpenDeatil(key)}>{str}</a>
          </div>
        );
      }
    }
  ];

  return (
    <AntdTable
      bordered
      pagination={false}
      size="small"
      className={styles.table}
      expandable={{
        expandedRowRender: Detail,
        expandedRowKeys,
        showExpandColumn: false,
      }}
      expandIcon={() => null}
      columns={columns}
      dataSource={data}
      scroll={{ y: 'calc(100vh - 50px)' }}
    />
  );
};

export default Table;

const data: Array<object> = [];
for (const key of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34]) {
  data.push({
    key: key.toString(),
    date: '2022.1.15',
    name: key % 2 === 0 ? '王凯' : '咪咪',
    subtotal: key * 100,
    clothes: key,
    food: key,
    house: key,
    transportation: key,
    homeGoods: key,
    personalGoods: key,
    other: key,
    total: key * 10000
  });
}
