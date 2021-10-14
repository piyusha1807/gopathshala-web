import { ViewInnerHTMLContent } from '@/components/common/textEditor';
import { LoadingOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {
  Card,
  Drawer,
  notification,
  PageHeader,
  Spin,
  Tag,
  Typography,
  Image,
  List,
  Avatar,
  Button,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { getCourseById } from '../service';

const { Text } = Typography;

export type courseViewProps = {
  _id: string;
  viewVisible: boolean;
  setViewVisible: any;
};

const CourseView: React.FC<courseViewProps> = (props) => {
  const { _id, viewVisible, setViewVisible } = props;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    if (_id != 'new') {
      getData(_id);
    }
  }, [_id]);

  const getData = async (_id: string) => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await getCourseById(_id);

    setLoading(false);
    setMessage(message);
    setClassName(className);

    if (!status) {
      notification[className]({
        message: message,
      });
      return;
    }

    if (payload) {
      setData(payload);
    }
  };

  return (
    <Drawer
      title="View Course"
      width={window.innerWidth / 2}
      onClose={() => setViewVisible(false)}
      visible={viewVisible}
    >
      {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
      {!loading && (
        <>
          <Image
            height={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <PageHeader
            title={data?.title}
            className="site-page-header"
            subTitle={
              <>
                {data?.subtitle}
                <span>
                  <Button type="link">
                    <VideoCameraOutlined /> Promotional video
                  </Button>
                </span>
              </>
            }
            extra={[
              <Tag color="cyan">{data?.language?.label}</Tag>,
              <Tag color="blue">{data?.level}</Tag>,
              <Tag color="geekblue">{data?.category?.label}</Tag>,
            ]}
          >
            <List
              itemLayout="horizontal"
              dataSource={data?.staff}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={item?.label}
                  />
                </List.Item>
              )}
            />
            {data?.description?.html && <ViewInnerHTMLContent content={data?.description?.html} />}
          </PageHeader>
          ,
        </>
      )}
    </Drawer>
  );
};

export default CourseView;
