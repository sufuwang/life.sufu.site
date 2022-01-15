import React from 'react';
import { Pie } from '@ant-design/plots';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import styles from './index.module.less';
import './index.module.less';

const SubTable = () => {
  return (
    <div className={styles.detail}>
      <div className={styles.leftCard}>{ renderTable() }</div>
      <div className={styles.rightCard}>{ renderChart() }</div>
    </div>
  );
};

export default SubTable;

const renderTable = () => {
  const data = [];
  for (const i of [1,2,3]) {
    data.push({
      key: i,
      name: '曾咪咪',
      type: `类型-${i}`,
      comment: `备注-${i}`,
      outcome: `支出-${i}`,
    });
  }
  for (const i of [4,5,6,7,8,9,10]) {
    data.push({
      key: i,
      name: '王凯',
      type: `类型-${i}`,
      comment: `备注-${i}`,
      outcome: `支出-${i}`,
    });
  }
  const columns: ColumnsType<object> = [
    { title: '姓名', dataIndex: 'name', onCell: (_, index = 0) => {
      if (index < 3) {
        return { rowSpan: index === 0 ? 3 : 0 };
      }
      return { rowSpan: index === 3 ? 7 : 0  };
    } },
    { title: '序号', dataIndex: 'key' },
    { title: '分类', dataIndex: 'type', colSpan: 1 },
    { title: '支出', dataIndex: 'outcome', colSpan: 1 },
    { title: '备注', dataIndex: 'comment', colSpan: 1 },
  ];
  return <Table size='small' pagination={false} bordered className={styles.table} columns={columns} dataSource={data} />;
};
const renderChart = () => {
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    className: styles.chart,
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
  };
  return <Pie {...config} />;
};
