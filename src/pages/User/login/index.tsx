import React, { useState } from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, history } from 'umi';
import { setAuthority } from '@/utils/authority';
import token from '@/utils/token';

import styles from '../index.less';
import { loginAccount, LoginParamsType } from './service';
import { setFormErrorFields } from '@/components/common/setFormErrorFields';

const { Title } = Typography;
/*
  Todo:
  1. Refresh token
*/

export type LoginProps = {};

const Login: React.FC<LoginProps> = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const handleSubmit = async (values: LoginParamsType) => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await loginAccount(values);

    setLoading(false);
    setMessage(message);
    setClassName(className);

    notification[className]({
      message: message,
    });

    if (!status) {
      setFormErrorFields(form, payload);
    }

    if (payload && payload.accessToken) {
      await token.set(payload.accessToken);
      setAuthority(payload.currentAuthority);
    }

    if (payload && payload.redirectUrl) {
      window.location = payload.redirectUrl
    }
  };

  return (
    <div className={styles.main}>
      <Title level={3} className={styles.underlineTitle}>
        Login
      </Title>
      <Form
        layout="vertical"
        form={form}
        name="UserLogin"
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          label="Email id"
          rules={[
            {
              required: true,
              message: 'Please enter your registered email id',
            },
            {
              type: 'email',
              message: 'Invalid email format',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email id" allowClear />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please enter your account password',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="prefixIcon" />}
            placeholder="Password"
            allowClear
          />
        </Form.Item>

        <Link to="/user/forgot" style={{ display: 'block' }}>
          Forgot Password?
        </Link>

        <Button
          loading={loading}
          size="large"
          type="primary"
          htmlType="submit"
          className={styles.other}
        >
          Login
        </Button>

        <div style={{ marginTop: '1rem' }}>
          Do not have Account? <Link to="/user/register">Register here</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
