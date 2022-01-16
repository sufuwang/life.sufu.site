import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Space, Divider, DatePicker, Avatar, Select, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './index.module.less';

const { Option } = Select;
const { TextArea } = Input;

export interface TypeProps {
  type: 'add' | 'edit'
}

const AddItem = ({ type }: TypeProps) => {
  const [isAddStatus, setStatus] = useState(type === 'add');
  const [curDate, setCurDate] = useState(moment.valueOf());

  useEffect(() => {
    setCurDate(moment.valueOf());
    setStatus(type === 'add');
  }, [type]);

  return (
    <Form className={styles.form} autoComplete="off">
      <div className={styles.container}>
        <div className={styles.leftChild}>
          <div className={styles.avatarItem}>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Form.Item name="userName">
              <Input placeholder='sufuwang' bordered={false} disabled />
            </Form.Item>
          </div>
          <Form.Item label="时间" name="date" initialValue={curDate}>
            <DatePicker className={styles.date} disabled={isAddStatus} />
          </Form.Item>
          <Form.Item label="小结" name="total">
            <Input placeholder='10000000' bordered={false} disabled />
          </Form.Item>
        </div>
        <Divider className={styles.divider} type='vertical' />
        <div className={styles.rightChild}>
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline" className={styles.space}>
                    <Form.Item
                      {...restField}
                      className={styles.spaceItem}
                      name={[name, 'type']}
                      initialValue="Yiminghe2"
                      rules={[{ required: true, message: 'Missing first name' }]}
                    >
                      <Select className={styles.select}>
                        <Option value="jack">衣</Option>
                        <Option value="lucy">食</Option>
                        <Option value="Yiminghe">住</Option>
                        <Option value="Yiminghe1">行</Option>
                        <Option value="Yiminghe2">家用物品</Option>
                        <Option value="Yiminghe3">个人物品</Option>
                        <Option value="Yiminghe4">其他</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className={styles.spaceItem}
                      name={[name, 'outcome']}
                      rules={[{ required: true, message: 'Missing last name' }]}
                    >
                      <InputNumber className={styles.inputNumber} min={1} placeholder='请填写金额' />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      className={styles.spaceItem}
                      name={[name, 'note']}
                      rules={[{ required: true, message: 'Missing last name' }]}
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
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default AddItem;
