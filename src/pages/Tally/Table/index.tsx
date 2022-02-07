import React, { useEffect, useState } from "react";
import { Table as AntdTable, Button } from 'antd';
import { Link } from "react-router-dom";
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table/interface';
import Detail from "./Detail";
import styles from './index.module.less';
import axios from "@utils/axios";

export interface TypeTallyItem {
  id: number
  date: string
  name: string
  subTotal: number
  data: Array<{
    id: number
    account: string
    create_time: string
    detail: string
    kind: string
    outcome: number
    update_time: string
  }>
}
interface TypeGetTallyRes {
  data: Array<TypeTallyItem>
}

const Table = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState(['']);
  const [dataSource, setDataSource] = useState<TypeGetTallyRes['data']>([]);
  const [rowSpan, setRowSpan] = useState<TypeObject>({});

  useEffect(() => {
    handleDataSource();
  }, []);

  const getRowSpan = (item: TypeObject) => {
    const ids = rowSpan[item.date];
    const index = ids.findIndex((id: string) => id === item.id);
    return { rowSpan: index > 0 ? 0 : ids.length };
  };
  const handleDataSource = async () => {
    const { data } = await axios<TypeGetTallyRes>({
      method: 'get',
      url: 'tally/get'
    });
    const _rowSpan: TypeObject = {};
    const _total: TypeObject = {};
    data.forEach(({ date, id, subTotal }) => {
      if (_rowSpan[date]) {
        _rowSpan[date].push(id);
      } else {
        _rowSpan[date] = [id];
      }
      _total[date] = (_total[date] || 0) + subTotal;
    });
    setRowSpan(_rowSpan);
    setDataSource(data
      .map((item) => ({ ...item, total: _total[item.date] }))
      .sort((prev, cur) => {
        const prevTime = new Date(prev.date).valueOf();
        const curTime = new Date(cur.date).valueOf();
        return prevTime > curTime ? -1 : 1;
      }));
  };
  const handleOpenDeatil = (key: string) => {
    setExpandedRowKeys(expandedRowKeys.includes(key) ? [] : [key]);
  };
  const columns: ColumnsType<object> = [
    {
      width: 120,
      title: '日期',
      dataIndex: 'date',
      onCell: (item: TypeObject) => getRowSpan(item),
    },
    {
      width: 100,
      title: '姓名',
      dataIndex: 'name',
    },
    {
      width: 100,
      title: '小计',
      dataIndex: 'subTotal',
    },
    {
      width: 100,
      title: '合计',
      dataIndex: 'total',
      onCell: (item: TypeObject) => getRowSpan(item),
    },
    {
      width: 100,
      title: '操作',
      onCell: (item: TypeObject) => getRowSpan(item),
      render: ({ date }) => {
        const ids = rowSpan[date];
        const id = ids[ids.length - 1];
        const str = expandedRowKeys.includes(id) ? <>关闭详情&nbsp;<CaretUpOutlined /></> : <>查看详情&nbsp;<CaretDownOutlined /></>;
        return (
          <div className={styles.operationContainer}>
            <Link to='/tally/item?type=edit'>修改数据</Link>
            <Button type="text" onClick={() => handleOpenDeatil(id)}>{str}</Button>
          </div>
        );
      }
    }
  ];

  return (
    <AntdTable
      bordered
      rowKey={'id'}
      pagination={false}
      size="small"
      className={styles.table}
      expandable={{
        expandedRowRender: ({ date }: TypeObject) => Detail({ dataSource: dataSource.filter((item) => item.date === date) }),
        expandedRowKeys,
        showExpandColumn: false,
      }}
      expandIcon={() => null}
      columns={columns}
      dataSource={dataSource}
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
    total: key * 10000
  });
}
