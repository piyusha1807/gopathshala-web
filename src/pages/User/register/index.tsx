import { setFormErrorFields } from '@/components/common/setFormErrorFields';
import { Button, Col, Form, Input, notification, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { history, Link } from 'umi';
import styles from '../index.less';
import { registerAccount, RegisterParamsType } from './service';

const { Text, Title } = Typography;

export type RegisterProps = {};

const Register: React.FC<RegisterProps> = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const initialValues = {};

  const handleSubmit = async (values: RegisterParamsType) => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await registerAccount({
      ...values,
    });

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
        Register
      </Title>
      <Form
        layout="vertical"
        form={form}
        name="UserRegister"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Row gutter={10}>
          <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
            <Form.Item
              name="firstName"
              label="First name"
              rules={[
                {
                  required: true,
                  message: 'Please enter first name',
                },
              ]}
            >
              <Input placeholder="E.g. John" allowClear />
            </Form.Item>
          </Col>
          <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }}>
            <Form.Item name="lastName" label="Last name">
              <Input placeholder="E.g. Smith" allowClear />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="email"
          label="Email id"
          rules={[
            {
              required: true,
              message: 'Please enter email id',
            },
            {
              type: 'email',
              message: 'Email id format is invalid',
            },
          ]}
        >
          <Input placeholder="E.g. john@example.com" allowClear />
        </Form.Item>

        <Form.Item
          name="contactNumber"
          label="Contact number"
          rules={[
            {
              required: true,
              message: 'Please input contact number',
            },
          ]}
        >
          <Input placeholder="E.g. +91-952-1940966" allowClear />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please enter password',
            },
            {
              validator(_, value) {
                if (!value || value.length >= 8) {
                  return Promise.resolve();
                }

                return Promise.reject('Password contains at least 8 characters');
              },
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Must have at least 8 characters" allowClear />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm password"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm above password',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered does not match');
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Confirm above password" allowClear />
        </Form.Item>

        <Text>
          By proceeding you agree <Link to="">Terms of Use</Link> and{' '}
          <Link to="">Privacy Policy</Link>
        </Text>
        <br />

        <Form.Item>
          <Button
            loading={loading}
            size="large"
            type="primary"
            htmlType="submit"
            className={styles.other}
          >
            Register
          </Button>
        </Form.Item>

        <div style={{ marginTop: '1rem' }}>
          Already have Account? <Link to="/user/login">Login here</Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
