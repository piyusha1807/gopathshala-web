import { Card, Col, Dropdown, Row } from 'antd';
import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { List, SList } from './components/list';
import { PlayerTabs } from './components/playerTabs';
import { Video } from './components/video';
import styles from './index.less';

export const Player = (props) => {

  const { sections } = props;

  return (
    <div className={styles.courseCard}>
      <Row>
        <Col  xs={24} sm={24} md={16} lg={18} xl={18} xxl={19}>
          <Video />
          <PlayerTabs />
        </Col>
        <Col xs={24} sm={24} md={8} lg={6} xl={6} xxl={5}>
          <SList />
        </Col>
      </Row>
    </div>
  );
};
