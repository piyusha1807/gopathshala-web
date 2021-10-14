/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef } from 'react';
import type { Dispatch } from 'umi';
import { Link, useIntl, connect, history } from 'umi';
import {
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Result, Button, Space, Row, Col, Divider, Typography } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import type { ConnectState } from '@/models/connect';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/logo.svg';
import styles from './home.less';

const { Text } = Typography;

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
} & ProLayoutProps;
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};
/** Use Authorized check all menu item */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} Go Pathshala, Inc. All rights reserved.`}
    links={[]}
  />
);

export const homeFooter = (
  <>
    <Row
      align="middle"
      justify="space-around"
      style={{ padding: '20px', backgroundColor: '#f2f2f2' }}
    >
      <Col {...{ sm: 24, md: 24, lg: 8 }} style={{ padding: '10px', textAlign: 'start' }}>
        <Link to="" style={{ color: '#2f2f2f' }}>
          Terms
        </Link>
        <Divider type="vertical" />
        <Link to="" style={{ color: '#2f2f2f' }}>
          Privacy
        </Link>
        <Divider type="vertical" />
        <Link to="" style={{ color: '#2f2f2f' }}>
          Content Policy
        </Link>
      </Col>

      <Col {...{ sm: 24, md: 24, lg: 8 }} style={{ padding: '10px', textAlign: 'center' }}>
        {`${new Date().getFullYear()} Go Pathshala, Inc. All rights reserved.`}
      </Col>

      <Col {...{ sm: 24, md: 24, lg: 8 }} style={{ padding: '10px', textAlign: 'end' }}>
        <Space>
          <Link to="">
            <FacebookOutlined style={{ fontSize: '25px', color: '#2f2f2f' }} />
          </Link>
          <Link to="">
            <InstagramOutlined style={{ fontSize: '25px', color: '#2f2f2f' }} />
          </Link>
          <Link to="">
            <LinkedinOutlined style={{ fontSize: '25px', color: '#2f2f2f' }} />
          </Link>
          <Link to="">
            <YoutubeOutlined style={{ fontSize: '25px', color: '#2f2f2f' }} />
          </Link>
        </Space>
      </Col>
    </Row>
  </>
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  const menuDataRef = useRef<MenuDataItem[]>([]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /** Init variables */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  // get children authority
  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );

  const { formatMessage } = useIntl();

  return (
    <div className={styles.homePageWrapper}>
      <ProLayout
        logo={logo}
        formatMessage={formatMessage}
        // {...props}
        {...settings}
        layout="top"
        onCollapse={handleMenuCollapse}
        onMenuHeaderClick={(e) => history.push('/')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            !menuItemProps.path ||
            location.pathname === menuItemProps.path
          ) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        // breadcrumbRender={(routers = []) => [
        //   {
        //     path: '/',
        //     breadcrumbName: formatMessage({ id: 'menu.home' }),
        //   },
        //   ...routers,
        // ]}
        // itemRender={(route, params, routes, paths) => {
        //   const first = routes.indexOf(route) === 0;
        //   return first ? (
        //     <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        //   ) : (
        //     <span>{route.breadcrumbName}</span>
        //   );
        // }}
        footerRender={false}
        menuDataRender={menuDataRender}
        rightContentRender={() => (
          <Space>
            <Button type="primary">
              <Link to="/user/login">Log In</Link>
            </Button>
            <Button>
              <Link to="/user/register">Get Started</Link>
            </Button>
          </Space>
        )}
        // postMenuData={(menuData) => {
        //   menuDataRef.current = menuData || [];
        //   return menuData || [];
        // }}
      >
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
          {homeFooter}
        </Authorized>
      </ProLayout>
    </div>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
