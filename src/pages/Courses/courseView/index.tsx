import { MoreOutlined, ShareAltOutlined, StarOutlined } from '@ant-design/icons';
import { Button, Card, PageHeader, Progress, Tabs } from 'antd';
import React from 'react';
import { Player } from './player';
import styles from './index.less';

const { TabPane } = Tabs;

export type CourseViewProps = {
  match: any;
};

export const courseData = {
  _id: 'course1',
  title: 'Machine Learning A-Z™',
  subTitle: 'Hands-On Python & R In Data Science',
  description: {
    raw:
      '{"blocks":[{"key":"7jnd3","text":"Hello In this Video we learning","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":31,"style":"BOLD"}],"entityRanges":[],"data":{"nodeAttributes":{}}},{"key":"evfr3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dftga","text":"one","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":3,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"fm3hj","text":"two","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c7idv","text":"","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    html:
      '<p><strong>Hello In this Video we learning</strong></p><p></p><ol><li><strong>one</strong></li><li>two</li><li></li></ol>',
    text: 'Hello In this Video we learning\n\none\ntwo\n',
  },
  language: {
    label: 'हिन्दी, हिंदी ',
    key: 'lang58hi',
  },
  level: 'ilevel',
  category: {
    label: 'IT & Software',
    key: 'coucat4',
  },
  instructor: [
    {
      label: 'Vikas Agrawal',
      key: 'u0x66lj',
    },
  ],
  status: '1',
  duration: 3600,
  sections: [
    {
      sectionMessage: 'Learn the basis',
      _id: 'secblpytv',
      title: 'Intro',
      duration: 600,
      lectures: [
        {
          _id: 'm001',
          name: 'Panda in the zoo',
          type: 'video',
          url: '',
          duration: 120,
        },
        {
          _id: 'm002',
          name: 'Panda on the road',
          type: 'video',
          url: '',
          duration: 60,
        },
        {
          _id: 'm003',
          name: 'Panda nothing',
          type: 'video',
          url: '',
          duration: 20,
        },
      ],
    },
    {
      title: 'Intro 2',
      _id: 'secrqww6t',
      sectionMessage: 'Learn the basic 2',
      duration: 1200,
      lectures: [
        {
          _id: 'm004',
          name: 'Tiger in the zoo',
          type: 'video',
          url: '',
          duration: 120,
        },
        {
          _id: 'm005',
          name: 'Tiger on the road',
          type: 'video',
          url: '',
          duration: 60,
        },
        {
          _id: 'm006',
          name: 'Tiger nothing',
          type: 'video',
          url: '',
          duration: 20,
        },
      ],
    },
  ],
};

const CourseView: React.FC<CourseViewProps> = (props) => {
  const {
    match: {
      params: { courseId },
    },
  } = props;

  const { title, subTitle, sections } = courseData;

  return (
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={title}
      className={styles.courseStyle}
      subTitle={subTitle}
      extra={[
        <Button key="3" type="text">
          <StarOutlined /> Leave a rating
        </Button>,
        <Button key="2" type="text">
          <span>
            <Progress type="circle" percent={30} width={28} size="small" /> Your progress
          </span>
        </Button>,
        <Button key="1">
          <ShareAltOutlined /> Share
        </Button>,
        <Button key="1">
          <MoreOutlined />
        </Button>,
      ]}
      footer={
        // <div className="cardContainer">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Course" key="1">
            <Player sections={sections} />
          </TabPane>
          <TabPane tab="Live" key="2" />
        </Tabs>
        // </div>
      }
      // style={{ backgroundColor: '#ffffff', padding: "0px" }}
    />
  );
};

export default CourseView;
