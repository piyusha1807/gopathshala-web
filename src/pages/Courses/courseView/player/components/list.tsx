import React, { useRef, useState } from 'react';
import { Collapse, Typography, List, Avatar, Card } from 'antd';
import { CloseOutlined, FieldTimeOutlined, VideoCameraOutlined } from '@ant-design/icons';
import styles from '../index.less';
const { Panel } = Collapse;
const { Text } = Typography;

const data = [
  {
    sectionMessage: 's3',
    title: 'Introduction',
    _id: 'seccu12w4',
    lectures: [
      {
        _id: 'lec4y5yj8',
        sectionMessage: 'sd',
        title: 'Lecture 1',
      },
      {
        _id: 'lecbqqkwq',
        sectionMessage: 'sds',
        title: 'Lecture 2',
      },
    ],
  },
  {
    sectionMessage: 's1',
    title: 'Section 1',
    _id: 'Section 1',
    lectures: [],
  },
  {
    sectionMessage: 's2',
    title: 'Section 2',
    _id: 'sec9n6pgk',
    lectures: [],
  },
  {
    sectionMessage: 's2',
    title: 'Section 2',
    _id: 'sec9n6pgk',
    lectures: [],
  },
  {
    sectionMessage: 's2',
    title: 'Section 2',
    _id: 'sec9n6pgk',
    lectures: [],
  },
  {
    sectionMessage: 's2',
    title: 'Section 2',
    _id: 'sec9n6pgk',
    lectures: [],
  },
  {
    sectionMessage: 's2',
    title: 'Section 2',
    _id: 'sec9n6pgk',
    lectures: [],
  },
  {
    _id: 'seciqv6gb',
    sectionMessage: 'as',
    title: 'Section 3',
    lectures: [
      {
        _id: 'leccobqcx',
        sectionMessage: 'sss',
        title: 'aw',
      },
      {
        title: 's',
        sectionMessage: 'aas',
        _id: 'leca8rcra',
      },
      {
        _id: 'lec1vclw4',
        sectionMessage: 'as',
        title: 'qw',
      },
    ],
  },
];

export const SList = () => {
  return (
    <Card title="Course content" extra={<CloseOutlined />} className={styles.courseContent} >
      <Collapse defaultActiveKey={['0']}>
        {data &&
          data.map((item, idx) => {
            const lectures = item?.lectures;
            return (
                <Panel header={<Text strong >{item.title}</Text>} key={idx}>
                    <ListItems lectures={lectures} />
                </Panel>
            );
          })}
      </Collapse>
    </Card>
  );
};

export const ListItems = (props: { lectures: any; }) => {
    const { lectures } = props;
    return (
        <List
        itemLayout="horizontal"
        dataSource={lectures}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<VideoCameraOutlined />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={<span><FieldTimeOutlined /> 1 min</span>}
            />
          </List.Item>
        )}
      />
    );
};
