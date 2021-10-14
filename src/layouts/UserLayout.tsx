import type { MenuDataItem } from '@ant-design/pro-layout';
import { HelmetProvider } from 'react-helmet-async';
import type { ConnectProps } from 'umi';
import { Link, connect } from 'umi';
import React from 'react';
import type { ConnectState } from '@/models/connect';
import { G_NAME } from '@/components/common';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
} & Partial<ConnectProps>;

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const { children } = props;

  return (
    <HelmetProvider>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>{G_NAME}</span>
              </Link>
            </div>
            <div className={styles.desc}></div>
          </div>
          {children}
        </div>
        {/* <div style={{height: '40px'}}></div> */}
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
