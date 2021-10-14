import { Avatar, Button, Card, Col, Input, Row, Space } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import course from '@/assets/course.svg';
import styles from './style.less';

const homepage = [
  {
    key: 1,
    title: 'Professional Website',
    description: 'Launch your own website with templates.',
    publicUrl:
      'https://firebasestorage.googleapis.com/v0/b/gopathshala-3aaef.appspot.com/o/website.svg?alt=media&token=622067c8-4527-4c41-a8b9-39ec1e0b2bc5',
  },
  {
    key: 2,
    title: 'Online Marketing',
    description: 'Grab students with digital marketing in your area.',
    publicUrl:
      'https://firebasestorage.googleapis.com/v0/b/gopathshala-3aaef.appspot.com/o/marketing.svg?alt=media&token=9db76c69-5608-49db-8bdc-9857fc844d00',
  },
  {
    key: 3,
    title: 'Online Tests',
    description: 'Conduct online test.',
    publicUrl:
      'https://firebasestorage.googleapis.com/v0/b/gopathshala-3aaef.appspot.com/o/test.svg?alt=media&token=effb71f9-81d6-46df-8d50-db708ff82553',
  },
  {
    key: 4,
    title: 'Online Courses',
    description:
      'Create Courses with Recorded Videos, Live Classes, Audios, PDF, Assignments, Quiz.',
    publicUrl: course,
  },

  {
    key: 5,
    title: 'Secure Platform',
    description: 'Secure stream Live and Recorded Videos.',
    publicUrl:
      'https://firebasestorage.googleapis.com/v0/b/gopathshala-3aaef.appspot.com/o/secure.svg?alt=media&token=46b37299-c2d9-47b1-ad4a-d1e6f6bf2994',
  },
  {
    key: 6,
    title: '24/7 Support',
    description: 'Face any problem to managing GoPathshala our Team ready to help you.',
    publicUrl:
      'https://firebasestorage.googleapis.com/v0/b/gopathshala-3aaef.appspot.com/o/support.svg?alt=media&token=559b0fde-f172-4150-8627-a9817f4ff2ea',
  },
];

const stepPage = [
  {
    key: 1,
    avatar: "",
    title: 'Step 1',
    description: 'Launch your own website with templates.',
  },
  {
    key: 2,
    avatar: "",
    title: 'Step 2',
    description: 'Grab students with digital marketing in your area.',
  },
  {
    key: 3,
    avatar: "",
    title: 'Step 3',
    description: 'Conduct online test.',
  },
  {
    key: 4,
    avatar: "",
    title: 'Step 4',
    description:
      'Create Courses with Recorded Videos, Live Classes, Audios, PDF, Assignments, Quiz.',
  },
];

const Webpage = () => {
  return (
    <>
      <Card bordered={false} style={{}}>
        <Row gutter={40} align="middle" justify="space-around" style={{ padding: '50px 10px' }}>
          <Col {...{ xs: 24, sm: 24, md: 24, lg: 12 }}>
            <h2
              style={{ color: '#000', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}
            >
              Reach to millions of students
            </h2>
            <p style={{ fontSize: '1rem' }}>
              Create and start your online coaching with proper interact with students and full
              access to do marketing.
            </p>
            <Space>
              <Input placeholder="Enter your email address" type="email" size="large" allowClear />
              <Button type="primary" size="large">
                Start free trial
              </Button>
            </Space>
          </Col>
          <Col {...{ xs: 0, sm: 0, md: 0, lg: 12 }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/gopathshala-3aaef.appspot.com/o/home.svg?alt=media&token=9d3cf4f2-f7ec-442f-ab64-56b1b30ac69f"
              alt="Go Pathshala"
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
      </Card>

      <Card bordered={false} style={{}}>
        <Row gutter={20} align="middle" justify="center">
          <p style={{ fontSize: '1.3rem' }}>
            What can <b>Go Pathshala</b> do for you
          </p>
        </Row>

        <Row gutter={[40, 40]} justify="space-between">
          {homepage.map((item, idx) => {
            return (
              <Col key={idx} {...{ sm: 24, md: 8, lg: 8 }}>
                <Card
                  cover={<img alt={item.title} src={item.publicUrl} />}
                  className={styles.cardWrapper}
                  hoverable
                >
                  <Meta title={item.title} description={item.description} />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>

      <Card bordered={false} style={{}}>
        <Row gutter={20} align="middle" justify="center">
          <p style={{ fontSize: '1.3rem' }}>
            How <b>Go Pathshala</b> works
          </p>
        </Row>

        <Row gutter={[40, 40]} justify="space-between">
          {stepPage.map((item, idx) => {
            return (
              <Col key={idx} {...{ sm: 24, md: 6, lg: 6 }}>
                <Card>
                  <Meta
                    avatar={
                      <Avatar src={item.avatar} />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>
    </>
  );
};

export default Webpage;
