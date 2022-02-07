import React from 'react';
import { Pie } from '@ant-design/plots';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { TypeTallyItem } from '../index';
import styles from './index.module.less';

interface TypeProps {
  dataSource: Array<TypeTallyItem>
}
interface TypeChartInfo {
  total: number
  data: Array<{
    type: string
    value: number
  }>
}

const SubTable = (props: TypeProps) => {
  return (
    <div className={styles.detail}>
      <div className={styles.leftCard}>{ renderTable(props) }</div>
      <div className={styles.rightCard}>{ renderChart(props) }</div>
    </div>
  );
};

export default SubTable;

const renderTable = ({ dataSource }: TypeProps) => {
  const data = dataSource.map(({ data }) => data).flat(Infinity) as TypeTallyItem['data'];
  const rowSpan = {} as TypeObject;
  data.forEach(item => {
    if (rowSpan[item.account]) {
      rowSpan[item.account].push(item.id);
    } else {
      rowSpan[item.account] = [item.id];
    }
  });
  const columns: ColumnsType<TypeTallyItem['data'][1]> = [
    {
      width: '140px',
      title: '姓名',
      dataIndex: 'account',
      onCell: ({ account, id }) => {
        const ids = rowSpan[account];
        const targetIndex = ids.findIndex((d: number) => d === id);
        return { rowSpan: targetIndex === 0 ? ids.length : 0 };
      }
    },
    { width: '80px', title: '序号', dataIndex: 'id' },
    { width: '160px', title: '分类', dataIndex: 'kind', colSpan: 1 },
    { width: '100px', title: '支出', dataIndex: 'outcome', colSpan: 1 },
    { title: '备注', dataIndex: 'detail', colSpan: 1, render: (text) => text || '---' },
  ];
  return <Table size='small' rowKey={'id'} pagination={false} bordered className={styles.table} columns={columns} dataSource={data} />;
};

const renderChart = ({ dataSource }: TypeProps) => {
  const ds = { total: 0, data: [] } as TypeChartInfo;
  const data = dataSource.map(({ data }) => data).flat(Infinity) as TypeTallyItem['data'];
  data.forEach(item => {
    const targetIndex = ds.data.findIndex(k => k.type === item.kind);
    if (targetIndex >= 0) {
      ds.data = ds.data.map(d => ({ ...d, value: d.type === item.kind ? d.value + item.outcome : d.value }));
    } else {
      ds.data.push({ type: item.kind, value: item.outcome });
    }
    ds.total = ds.total + item.outcome;
  });
  const config = {
    className: styles.chart,
    appendPadding: 10,
    data: ds.data,
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
