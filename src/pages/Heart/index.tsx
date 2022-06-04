import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './index.module.less';


interface TypeTime {
  day?: number
  hour?: number
  minute?: number
  second?: number
  mileSecond?: string
}

const Heart = () => {
  const [curTime, setCurTime] = useState<TypeTime>({});

  useEffect(() => {
    const id = setInterval(() => setCurTime(getData()), 100);
    return () => {
      clearInterval(id);
    };
  }, []);

  const getData = (): TypeTime => {
    return {
      day: (moment().diff(moment("2021-11-01"), 'days')),
      hour: moment().hour(),
      minute: moment().minute(),
      second: moment().second(),
      mileSecond: moment().millisecond().toString().padStart(3, '0'),
    };
  };

  return (
    <div className={styles.container}>
      <span><h1>{curTime.day}</h1>&nbsp;<h2>天</h2></span>
      <span><h1>{curTime.hour}</h1>&nbsp;<h2>小时</h2></span>
      <span><h1>{curTime.minute}</h1>&nbsp;<h2>分钟</h2></span>
      <span><h1>{curTime.second}</h1>&nbsp;<h2>秒</h2></span>
      <span><h1>{curTime.mileSecond}</h1>&nbsp;<h2>毫秒</h2></span>
    </div>
  );
};

export default Heart;
