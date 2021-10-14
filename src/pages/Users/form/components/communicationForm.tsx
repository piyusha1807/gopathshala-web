import { Address } from '@/components/common/address';
import { setFormErrorFields } from '@/components/common/setFormErrorFields';
import { Button, Checkbox, Col, Form, notification, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { StepFormParamsType, saveUser } from '../../service';

const { Title } = Typography;

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: {
      span: formLayout.labelCol.span,
      offset: formLayout.wrapperCol.span,
    },
  },
};

export type CommunicationFormProps = {
  current: string;
  setCurrent: any;
  userId: string;
  data: any;
  setData: any;
};

const CommunicationForm: React.FC<CommunicationFormProps> = (props) => {
  const { current, setCurrent, userId, data, setData } = props;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    form.setFieldsValue(data);
  }, []);

  const handleSubmit = async (values: StepFormParamsType) => {
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
      setFormErrorFields(form, payload);
      return;
    }

    setCurrent(payload.currentStep);
    setData({ ...data, ...payload });
  };

  const initialValues = {
    isSameAsPermanentAddress: true,
  };

  return (
    <Form
      {...formLayout}
      form={form}
      name="communication"
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Col xs={{ offset: 0 }} sm={{ offset: 8 }}>
        <Title level={5}>Permanent address</Title>
      </Col>
      <Address addressType="permanentAddress" form={form} />

      <Col xs={{ offset: 0 }} sm={{ offset: 8 }}>
        <Title level={5}>Current address</Title>
      </Col>
      <Form.Item {...tailLayout} name="isSameAsPermanentAddress" valuePropName="checked">
        <Checkbox>Is same as permanent address</Checkbox>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.isSameAsPermanentAddress !== currentValues.isSameAsPermanentAddress
        }
      >
        {({ getFieldValue }) => {
          const isSameAsPermanentAddress = getFieldValue('isSameAsPermanentAddress');
          if (isSameAsPermanentAddress) return null;
          return <Address addressType="currentAddress" form={form} />;
        }}
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Row gutter={10}>
          <Col>
            <Button loading={loading} type="primary" htmlType="submit">
              Save & Next
            </Button>
          </Col>
          <Col>
            <Button onClick={() => setCurrent('education')}>Previous</Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default CommunicationForm;
