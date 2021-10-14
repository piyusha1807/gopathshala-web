import React, { useState } from 'react';
import { Form, Button, Typography, notification, Input } from 'antd';
import { history } from 'umi';
import { setFormErrorFields } from '@/components/common/setFormErrorFields';
import { UserOutlined } from '@ant-design/icons';

import styles from '../index.less';
import { getVerificationCode, GetVerificationCodeParamsType } from './service';

const { Text, Title } = Typography;

export type ForgotPasswordProps = {};

const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const handleSubmit = async (values: GetVerificationCodeParamsType) => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await getVerificationCode(values);

    setLoading(false);
    setMessage(message);
    setClassName(className);

    notification[className]({
      message: message,
    });

    if (!status) {
      setFormErrorFields(form, payload);
    }

    if (payload && payload.redirectUrl) {
      history.push(payload.redirectUrl);
    }
  };

  return (
    <div className={styles.main}>
      <Title level={3} className={styles.underlineTitle}>
        Forgot password
      </Title>
      <br />
      <Text>
        Don't worry! Just fill in your email id and we'll send you a verification code to reset your
        password.
      </Text>

      <Form
        layout="vertical"
        form={form}
        name="forgotPassword"
        onFinish={handleSubmit}
        style={{ marginTop: '24px' }}
      >
        <Form.Item
          name="email"
          label="Email id"
          rules={[
            {
              required: true,
              message: 'Please enter your registerd email id',
            },
            {
              type: 'email',
              message: 'Invalid email format',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email id" allowClear />
        </Form.Item>

        <Button
          loading={loading}
          size="large"
          type="primary"
          htmlType="submit"
          className={styles.other}
        >
          Request verification code
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
