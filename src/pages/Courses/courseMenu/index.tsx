import React, { Component } from 'react';

import type { Dispatch} from 'umi';
import { FormattedMessage, connect } from 'umi';
import { GridContent, PageContainer } from '@ant-design/pro-layout';
import { Button, Menu } from 'antd';
import Curriculum from '../curriculum';
// import BindingView from '../curriculum';
// import NotificationView from '../curriculum';
// import SecurityView from '../curriculum';
import Pricing from '../pricing';
import Certificate from '../certificate';
import Settings from '../settings';
import styles from './style.less';
import type { CurrentUser } from './data.d';
import { EyeOutlined } from '@ant-design/icons';
import { history } from 'umi';

const { Item } = Menu;

interface SettingsProps {
  dispatch: Dispatch;
  route: any;
  match: any;
  location: any;
}

type SettingsStateKeys = '0' | '1' | '2' | '3' | '4';
interface SettingsState {
  mode: 'inline' | 'horizontal';
  menuMap: any;
  selectKey: SettingsStateKeys;
}

class  CourseMenu extends Component<SettingsProps, SettingsState> {
  main: HTMLDivElement | undefined = undefined;

  constructor(props: SettingsProps) {
    super(props);

    this.state = {
      mode: 'inline',
      menuMap: this.props.route.children,
      selectKey: '0',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
  
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getMenu = () => {
    const { menuMap } = this.state;
    return menuMap.map((item, idx) => <Item key={idx}>{item.name}</Item>)
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey]["name"];
  };

  selectKey = (key: SettingsStateKeys) => {
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  renderChildren = () => {
    const { selectKey } = this.state;
    switch (selectKey) {
      case '0':
        return <Curriculum {...this.props} />;
      case '1':
        return <Pricing />;
      case '2':
        return <Certificate />;
      case '3':
        return "Students";
      case '4':
        return <Settings />;
      default:
        break;
    }

    return null;
  };

  render() {
    const { mode, selectKey } = this.state;
    const {
      match: {
        params: { courseId },
      },
      location: {
        query: { title },
      },
    } = this.props;

    return (
      <PageContainer
      title={title}
      onBack={() => window.history.back()}
      // loading={loading}
      extra={[
        <Button
          key="1"
          type="primary"
          onClick={() => {
            history.push(`/courses/${courseId}/courseView`);
          }}
        >
          <EyeOutlined /> Preview
        </Button>,
      ]}
    >
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            if (ref) {
              this.main = ref;
            }
          }}
        >
          <div className={styles.leftMenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={({ key }) => this.selectKey(key as SettingsStateKeys)}
            >
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            {/* <div className={styles.title}>{this.getRightTitle()}</div> */}
            {this.renderChildren()}
          </div>
        </div>
      </GridContent>
      </PageContainer>

    );
  }
}

export default connect(
  ({ accountAndsettings }: { accountAndsettings: { } }) => ({
  }),
)(CourseMenu);
