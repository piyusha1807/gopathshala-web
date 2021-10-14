import React, { useEffect, useState } from 'react';
import { Button, Col, Descriptions, Form, notification, Result, Row } from 'antd';
import { setFormErrorFields } from '@/components/common/setFormErrorFields';
import { history } from 'umi';
import { StepFormParamsType, saveUser } from '../../service';
import styles from '../index.less';
import { values } from 'lodash';
import { EditOutlined, MailOutlined, UserAddOutlined } from '@ant-design/icons';

export type BasicFormProps = {
  current: string;
  setCurrent: any;
  userId: string;
  data: any;
  setData: any;
};

/*
  Todo: 
*/

const DoneForm: React.FC<BasicFormProps> = (props) => {
  const { current, setCurrent, userId, data, setData } = props;

  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await saveUser(current, {
      ...values,
      _id: userId,
    });

    setLoading(false);
    setMessage(message);
    setClassName(className);

    notification[className]({
      message: message,
    });

    if (!status) {
      return;
    }

    setCurrent(payload.currentStep);
    setData({ ...data, payload });
  };

  const information = (
    <div className={styles.information}>
      <Descriptions column={1}>
        <Descriptions.Item label="First name">{data.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last name">{data.lastName}</Descriptions.Item>
        <Descriptions.Item label="Email id">{data.email}</Descriptions.Item>
        <Descriptions.Item label="Password">{data.password}</Descriptions.Item>
      </Descriptions>
    </div>
  );

  const extra = (
    <>
      <Button
        type="primary"
        onClick={() => {
          history.push(`/users/new/form`);
          setData({});
        }}
      >
        <UserAddOutlined /> Add another user
      </Button>
    </>
  );

  return (
    <>
      <Result
        status="success"
        title="User added successfully"
        subTitle=""
        extra={extra}
        className={styles.result}
      >
        {information}
      </Result>
      <Row justify="center" gutter={10}>
        <Col>
          <Button onClick={() => setCurrent('communication')}>
            <EditOutlined /> Edit user
          </Button>
        </Col>
        <Col>
          <Button type="primary" loading={loading} onClick={() => handleSubmit()}>
            <MailOutlined /> Send credential to user
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default DoneForm;
