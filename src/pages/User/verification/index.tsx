import React, { useState } from 'react';
import { Form, Button, Row, Col, Typography, notification } from 'antd';
import { history } from 'umi';
import OtpInput from 'react-otp-input';
import { setFormErrorFields } from '@/components/common/setFormErrorFields';

import styles from '../index.less';
import { EmailVerificationParamsType, resendVerificationCode, verifyAccount } from './service';

const { Text, Title } = Typography;

export type EmailVerificationProps = {
  location: any;
};

const EmailVerification: React.FC<EmailVerificationProps> = (props) => {
  const {
    location: {
      query: { email },
    },
  } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const getVerificationCode = async () => {
    setResendLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await resendVerificationCode({
      email: email,
    });

    setResendLoading(false);
    setMessage(message);
    setClassName(className);

    notification[className]({
      message: message,
    });

    if (!status) {
      return;
    }
  };

  const handleSubmit = async (values: EmailVerificationParamsType) => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await verifyAccount({
      ...values,
      email,
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
        Verify account
      </Title>
      <br />
      <Text>
        We have send you 6-digit verification code on your email <b>{email}</b>. Please enter the
        verification code below.
      </Text>

      <Form
        layout="vertical"
        form={form}
        name="EmailVerification"
        onFinish={handleSubmit}
        style={{ marginTop: '24px' }}
      >
        <Form.Item
          name="verificationCode"
          rules={[
            {
              required: true,
              message: 'Please enter the verification code',
            },
          ]}
        >
          <OtpInput
            onChange={() => {}}
            numInputs={6}
            isInputNum={true}
            containerStyle={styles.containerStyle}
            inputStyle={styles.inputStyle}
            focusStyle={styles.focusStyle}
          />
        </Form.Item>

        <Row align="middle">
          <Col span={12}>
            <Text>Didn't receive the code?</Text>
          </Col>
          <Col span={12}>
            <Button
              type="link"
              loading={resendLoading}
              onClick={() => {
                getVerificationCode();
              }}
              style={{ float: 'right' }}
            >
              Resend code
            </Button>
          </Col>
        </Row>

        <Button
          loading={loading}
          size="large"
          type="primary"
          htmlType="submit"
          className={styles.other}
        >
          Verify
        </Button>
      </Form>
    </div>
  );
};

export default EmailVerification;
