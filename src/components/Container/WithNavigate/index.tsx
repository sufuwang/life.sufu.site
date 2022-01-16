import React from 'react';
import Navigate from '@components/Navigate/index';
import styles from './index.module.less';

interface TypeProps {
  children: React.ReactNode
}

const Container = ({ children }: TypeProps) => {
  return (
    <div className={styles.container}>
      <Navigate />
      <div className={styles.content}>
        { children }
      </div>
    </div>
  );
};

export default Container;
