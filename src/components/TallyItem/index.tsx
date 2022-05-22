import React, { useState } from 'react';
import { Form, Input, Button, Space, Divider, DatePicker, Avatar, Select, InputNumber, Statistic } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import localstorage from '@utils/localstorage';
import axios from '@utils/axios';
import moment from 'moment';
import styles from './index.module.less';
import TallyKind from '@const/types.json';

console.info('TallyKind: ', TallyKind);

const { Option } = Select;
const { TextArea } = Input;

interface TypeItem {
  type: string;
  outcome: number;
  note: string;
}

export interface TypeProps {
  isDisabledDate?: boolean
}

const AddItem = ({ isDisabledDate = false }: TypeProps) => {
  const [form] = Form.useForm();
  const [isDisabledSubmit, setDisabledSubmit] = useState(true);

  const handleSubmit = async () => {
    const { date, item } = await form.validateFields();
    await axios({
      method: 'post',
      url: 'tally/add',
      data: {
        create_date: date.format('YYYY-MM-DD HH:mm:ss.SSS'),
        data: item
      }
    });
  };
  const handleChange = (_: unknown, { item }: { item: Array<TypeItem> }) => {
    const ds = item.filter(d => !!d).map(d => d.outcome);
    setDisabledSubmit(ds.length === 0);
    const total = ds.length ? ds.reduce((total, cur) => total + cur) : 0;
    form.setFieldsValue({ total });
  };

  return (
    <Form className={styles.form} autoComplete="off" form={form} onValuesChange={handleChange}>
      <div className={styles.container}>
        <div className={styles.leftChild}>
          <div className={styles.avatarItem}>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Form.Item name='account'>
              <Input placeholder={localstorage.get('user')?.account || 'Account'} bordered={false} disabled />
            </Form.Item>
          </div>
          <Form.Item label="时间" name="date" initialValue={moment()}>
            <DatePicker className={styles.date} disabled={isDisabledDate} />
          </Form.Item>
          <Form.Item label="小结" name="total">
            <Statistic />
          </Form.Item>
        </div>
        <Divider className={styles.divider} type='vertical' />
        <div className={styles.rightChild}>
          <Form.List name="item">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline" className={styles.space}>
                    <Form.Item
                      {...restField}
                      className={styles.spaceItem}
                      name={[name, 'kind']}
                      initialValue="goodsByHome"
                    >
                      <Select className={styles.select}>
                        <Option value="clothes">衣</Option>
                        <Option value="food">食</Option>
                        <Option value="living">住</Option>
                        <Option value="transport">行</Option>
                        <Option value="goodsByHome">家用物品</Option>
                        <Option value="goodsByPerson">个人物品</Option>
                        <Option value="other">其他</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className={styles.spaceItem}
                      name={[name, 'outcome']}
                      rules={[{ required: true, message: '请填写金额' }, { type: 'number', message: '最小金额为 1', min: 1 }]}
                    >
                      <InputNumber className={styles.inputNumber} placeholder='请填写金额' />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className={styles.spaceItem}
                      name={[name, 'detail']}
                    >
                      <TextArea autoSize={{ minRows: 1, maxRows: 3 }} placeholder='请填写备注' />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item className={styles.spaceButton}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    增加一条数据
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isDisabledSubmit} onClick={handleSubmit}>
              提交
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default AddItem;
