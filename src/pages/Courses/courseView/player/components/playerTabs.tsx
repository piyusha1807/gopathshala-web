import { CommentOutlined, OneToOneOutlined, ReadOutlined, SoundOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React from 'react';
import styles from '../index.less';

const { TabPane } = Tabs;

export const PlayerTabs = () => {
  return (
    <Tabs defaultActiveKey="2" className={styles.playerTabs}>
      <TabPane
        tab={
          <span>
            <OneToOneOutlined />
            Overview
          </span>
        }
        key="1"
      >
        Overview
      </TabPane>
      <TabPane
        tab={
          <span>
            <CommentOutlined />
            Discussion
          </span>
        }
        key="2"
      >
        Discussion
      </TabPane>
      <TabPane
        tab={
          <span>
            <ReadOutlined />
            Notes
          </span>
        }
        key="3"
      >
        Notes
      </TabPane>
      <TabPane
        tab={
          <span>
            <SoundOutlined />
            Announcements
          </span>
        }
        key="4"
      >
        Announcements
      </TabPane>
    </Tabs>
  );
};
