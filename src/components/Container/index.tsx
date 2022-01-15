import React from 'react';
import Navigate, { TypeOnClick } from '@components/Navigate/index';
import styles from './index.module.less';

interface TypeProps {
  onClick: TypeOnClick
  children: React.ReactNode
}

const Container = ({ onClick, children }: TypeProps) => {
  return (
    <div className={styles.container}>
      <Navigate onClick={onClick} />
      <div className={styles.content}>
        { children }
      </div>
    </div>
  );
};

export default Container;
