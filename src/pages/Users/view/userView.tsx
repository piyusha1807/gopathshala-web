import defaultAvatar from '@/assets/defaultAvatar.svg';
import {
  ContactNumberPreview,
  CustomDrawerWidth,
  EmailIdPreview,
  getReadableDateFormat,
  UserTypePreview,
} from '@/components/common';
import { AddressPreviewWrapper } from '@/components/common/address';
import { GenderPreview } from '@/components/common/gender';
import { LoadingOutlined, MailOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Descriptions,
  Drawer,
  List,
  notification,
  PageHeader,
  Row,
  Spin,
  Statistic,
  Tabs,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { getUserById } from '../service';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

export type userViewProps = {
  _id: string;
  viewVisible: boolean;
  setViewVisible: any;
};

const UserView: React.FC<userViewProps> = (props) => {
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

    const { status, class: className, message, payload } = await getUserById(_id);

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
      title="View User"
      width={CustomDrawerWidth}
      onClose={() => setViewVisible(false)}
      visible={viewVisible}
    >
      {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
      {!loading && (
        <>
          <PageHeader
            style={{ padding: 0 }}
            title={<span>{data?.displayName}</span>}
            avatar={{
              src: data?.profilePhoto?.url || defaultAvatar,
              size: 50,
              alt: 'Profile photo',
            }}
            subTitle={<UserTypePreview userType={data?.userType} />}
            extra={[
              <Button key="1" type="primary" shape="round">
                <MailOutlined /> Send credential to user
              </Button>,
            ]}
          >
            <>
              <BasicDetailsPreview data={data} />
              <Tabs defaultActiveKey="1" size="small">
                <TabPane tab="Education Details" key="1" style={{ marginTop: '1em' }}>
                  <EducationDetailsPreview programs={data?.programs} />
                </TabPane>
                <TabPane tab="Communication Details" key="2" style={{ marginTop: '1em' }}>
                  <AddressPreviewWrapper
                    permanentAddress={data?.permanentAddress}
                    isSameAsPermanentAddress={data?.isSameAsPermanentAddress}
                    currentAddress={data?.currentAddress}
                  />
                </TabPane>
              </Tabs>
            </>
          </PageHeader>
        </>
      )}
    </Drawer>
  );
};

export const BasicDetailsPreview = (props: any) => {
  const { data } = props;

  if (!data) return <></>;

  return (
    <Descriptions size="small" column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}>
      <Descriptions.Item label="Registration Number">
        <Text copyable>{data?.registrationNumber}</Text>
      </Descriptions.Item>
      <Descriptions.Item label="Email Id">
        <EmailIdPreview email={data?.email} />
      </Descriptions.Item>
      <Descriptions.Item label="Password">{data?.password}</Descriptions.Item>
      <Descriptions.Item label="Contact number">
        <ContactNumberPreview contactNumber={data?.contactNumber} />
      </Descriptions.Item>
      <Descriptions.Item label="Gender">
        <GenderPreview gender={data?.gender} />
      </Descriptions.Item>
      <Descriptions.Item label="Date of birth">
        {getReadableDateFormat(data?.dob)}
      </Descriptions.Item>
      <Descriptions.Item label="Identity proof">
        <Text copyable>{data?.identityProofNumber}</Text>
      </Descriptions.Item>
    </Descriptions>
  );
};

export const EducationDetailsPreview = (props: any) => {
  const { programs } = props;

  if (!programs) return <></>;

  return (
    <List
      itemLayout="horizontal"
      dataSource={programs}
      renderItem={(item) => (
        <List.Item>
          <Row gutter={12} justify="space-around">
            <Col span={12}>
              <Title level={5}>{item?.institute}</Title>
              {item?.university && (
                <>
                  {item?.university}
                  <br />
                </>
              )}
              <Text type="secondary">
                {item?.program?.label && (
                  <>
                    {item?.program?.label}
                    {', '}
                  </>
                )}
                {item?.specialization && <>{item?.specialization}</>}
                {item?.educationType && (
                  <>
                    {' | '}
                    {item?.educationType}
                  </>
                )}
              </Text>
              <br />
              {item?.durationStartAt}
              {' - '}
              {item?.durationEndAt}
            </Col>
            <Col span={12}>
              <Statistic title={item?.scoreType} value={item?.score} />
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default UserView;
