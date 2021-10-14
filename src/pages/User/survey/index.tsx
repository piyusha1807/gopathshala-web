import { Alert, Form, Input, Button, Row, Col, Checkbox, Select, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'umi';

// import styles from './index.less';
import { sentSurvey, SurveyParamsType } from './service';

const { Text, Title } = Typography;
const { Option } = Select;

export type SurveyProps = {};

const SurveyForm: React.FC<SurveyProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const handleSubmit = async (values: SurveyParamsType) => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await sentSurvey(values);

    setLoading(false);
    setMessage(message);
    setClassName(className);

    if (!status) {
    }
  };

  return (
    <div>
      <Title level={4} ><span>Tell us</span> little bit about yourself</Title>
      <Text strong >We'll help you get started based on your responses.</Text>
      <Form layout="vertical" name="UserLogin" onFinish={handleSubmit}>
        <Form.Item name="ques1" label="Are you a business owner?">
          <Select defaultValue="opt1" >
            <Option value="opt1">Jack</Option>
            <Option value="opt2">Lucy</Option>
            <Option value="opt3">yiminghe</Option>
          </Select>
        </Form.Item>

        <Form.Item name="ques2" label="Which category is most relevant to your business?">
          <Select defaultValue="opt1" >
            <Option value="opt1">Jack</Option>
            <Option value="opt2">Lucy</Option>
            <Option value="opt3">yiminghe</Option>
          </Select>
        </Form.Item>

        <Form.Item name="ques3" label="Are you already teaching online?">
          <Select defaultValue="opt1" >
            <Option value="opt1">Jack</Option>
            <Option value="opt2">Lucy</Option>
            <Option value="opt3">yiminghe</Option>
          </Select>
        </Form.Item>

        <Row>
          <Space>
            <Col>
              <Button
                loading={loading}
                size="large"
                type="default"
                htmlType="submit"
                // className={styles.other}
              >
                Skip
              </Button>
            </Col>

            <Col>
              <Button
                loading={loading}
                size="large"
                type="primary"
                htmlType="submit"
                // className={styles.other}
              >
                Next
              </Button>
            </Col>
          </Space>
        </Row>
      </Form>
    </div>
  );
};

export default SurveyForm;
