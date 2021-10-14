import {
  AntDesignOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Button, Card, List, notification, Space, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import CourseAdd from './form/courseAdd';
import styles from './index.less';
import { getCourses } from './service';
import CourseView from './view/courseView';

const { Text, Paragraph } = Typography;

export type coursesProps = {};

const Courses: React.FC<coursesProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [data, setData] = useState([]);
  const [_id, set_Id] = useState('new');
  const [visible, setVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getData();
  }, [formData]);

  const getData = async () => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await getCourses();

    setLoading(false);
    setMessage(message);
    setClassName(className);

    if (!status) {
      notification[className]({
        message: message,
      });
      return;
    }
    // window.location.href = 'http://example.localhost:8001/courses';
    if (payload) {
      setData(payload);
    }
  };

  const content = (
    <div className={styles.pageHeaderContent}>
      <p>
        Create rich learning experiences with the help of video lectures, quizzes, coding exercises,
        etc.
      </p>
      <div className={styles.contentLink}>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
          Quick start
        </a>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
          Introduction
        </a>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
          Documentation
        </a>
      </div>
    </div>
  );

  const extraContent = (
    <div className={styles.extraImg}>
      <img alt="Course" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
    </div>
  );

  const nullData = {};
  return (
    <PageContainer
      title={'📖 Courses'}
      // loading={loading}
      content={content}
      extraContent={extraContent}
    >
      <CourseAdd
        _id={_id}
        set_Id={set_Id}
        visible={visible}
        setVisible={setVisible}
        setFormData={setFormData}
      />

      <CourseView _id={_id} viewVisible={viewVisible} setViewVisible={setViewVisible} />

      <div className={styles.cardList}>
        <List
          rowKey="_id"
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={[nullData, ...data]}
          renderItem={(item) => {
            if (item && item._id) {
              return (
                <List.Item key={item._id}>
                  <Card
                    // key={idx}
                    hoverable
                    className={styles.card}
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    actions={[
                      <Tooltip title="View">
                        <EyeOutlined
                          key="view"
                          onClick={() => {
                            setViewVisible(true);
                            set_Id(item?._id);
                          }}
                        />
                      </Tooltip>,
                      <Tooltip title="Edit">
                        <EditOutlined
                          key="edit"
                          onClick={() => {
                            setVisible(true);
                            set_Id(item?._id);
                          }}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <div onClick={() => history.push(`/courses/${item?._id}?title=${item.title}`)}>
                      <Card.Meta
                        avatar={
                          <Avatar.Group
                            maxCount={1}
                            maxStyle={{
                              color: '#828588',
                              backgroundColor: '#f0f2f5',
                              marginLeft: '-15px',
                            }}
                          >
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                            <Tooltip title="Ant User" placement="top">
                              <Avatar
                                style={{ backgroundColor: '#87d068' }}
                                icon={<UserOutlined />}
                              />
                            </Tooltip>
                            <Avatar
                              style={{ backgroundColor: '#1890ff' }}
                              icon={<AntDesignOutlined />}
                            />
                          </Avatar.Group>
                        }
                        title={<a>{item?.title}</a>}
                        description={
                          <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                            {item?.subtitle}
                          </Paragraph>
                        }
                      />
                      {/* <Space>

                        {item?.language?.label}
                        {item?.level}
                        {item?.category?.label}
                      </Space> */}
                    </div>
                  </Card>
                </List.Item>
              );
            }
            return (
              <List.Item>
                <Button
                  type="dashed"
                  className={styles.newButton}
                  onClick={() => {
                    set_Id('new');
                    setVisible(true);
                  }}
                >
                  <PlusOutlined /> Add Course
                </Button>
              </List.Item>
            );
          }}
        />
      </div>
    </PageContainer>
  );
};

export default Courses;
