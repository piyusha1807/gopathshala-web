import React, { useEffect, useState } from 'react';
import { Button, Form, Input, notification, Space, Tooltip } from 'antd';
import { DatePickerFormItem } from '@/components/common/datePicker';
import { GenderFormItem } from '@/components/common/gender';
import { IdentityProof } from '@/components/common/identityProof';
import { setFormErrorFields } from '@/components/common/setFormErrorFields';
import { UserTypeFormItem } from '@/components/common/userType';
import { history } from 'umi';
import { ImageUpload } from '@/components/File/image';
import { getDateFromMoment, getMomentFromDate } from '@/components/common';
import { StepFormParamsType, saveUser } from '../../service';
import { SyncOutlined } from '@ant-design/icons';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export type BasicFormProps = {
  current: string;
  setCurrent: any;
  userId: string;
  data: any;
  setData: any;
  location: any;
};

/*
  Todo: 
    1. Upload profile photo
    2. Courses where admin, staff, student take
*/

const BasicForm: React.FC<BasicFormProps> = (props) => {
  const { current, setCurrent, userId, data, setData, location } = props;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    if (data.dob) {
      data.dobMoment = getMomentFromDate(data.dob);
    }
    form.setFieldsValue(data);
  }, []);

  const handleSubmit = async (values: StepFormParamsType) => {
    if (values.dobMoment) {
      values.dob = getDateFromMoment(values.dobMoment);
      delete values.dobMoment;
    }

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

    history.push(`/users/${payload._id}/form`);
    setCurrent(payload.currentStep);
    setData({ ...data, ...payload });
  };

  const generateRandomPassword = () => {
    form.setFieldsValue({
      "password": Math.random().toString(36).substr(2,8)
    })
  }

  const initialValues = {
    userType: location?.query?.userType || "stu",
    password: Math.random().toString(36).substr(2,8)
  };

  return (
    <Form
      {...formLayout}
      form={form}
      name="basic"
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        name="userType"
        label="User type"
        rules={[
          {
            required: true,
            message: 'Please select user type.',
          },
        ]}
      >
        <UserTypeFormItem />
      </Form.Item>

      <Form.Item
        name="registrationNumber"
        label="Registration number"
        rules={[
          {
            required: true,
            message: 'Please enter registration number.',
          },
        ]}
        extra={'Must be combination of year, course, roll number.'}
      >
        <Input placeholder="E.g. 21BEC1091" allowClear />
      </Form.Item>

      <Form.Item label="Name">
        <Input.Group compact>
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please enter first name.',
              },
            ]}
            noStyle
          >
            <Input placeholder="First name" style={{ width: '50%' }} allowClear />
          </Form.Item>
          <Form.Item name="lastName" noStyle>
            <Input placeholder="Last name" style={{ width: '50%' }} allowClear />
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item
        name="email"
        label="Email id"
        rules={[
          {
            required: true,
            message: 'Please enter email id.',
          },
          {
            type: 'email',
            message: 'Email id format is invalid.',
          },
        ]}
      >
        <Input placeholder="E.g. john@example.com" allowClear />
      </Form.Item>

      <Form.Item label="Password" style={{ marginBottom: 0 }} required>
        <Space align="baseline" >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter password.',
              },
              {
                validator(_, value) {
                  if (!value || value.length >= 8) {
                    return Promise.resolve();
                  }

                  return Promise.reject('Password contains at least 8 characters.');
                },
              },
            ]}
            // extra={'Must be greater than 8 alpha-numeric characters.'}
            hasFeedback
          >
            <Input.Password placeholder="Must have at least 8 characters" allowClear />
          </Form.Item>
          <Form.Item>
            <Tooltip title="Generate random password">
              <Button onClick={(e) => generateRandomPassword()} icon={<SyncOutlined />}>
                Password
              </Button>
            </Tooltip>
          </Form.Item>
        </Space>
      </Form.Item>

      <Form.Item name="contactNumber" label="Contact number">
        <Input placeholder="E.g. +91-952-1940966" allowClear />
      </Form.Item>

      <Form.Item name="profilePhoto" label="Profile photo">
        <ImageUpload fileCategory="profilePhoto" />
      </Form.Item>

      <Form.Item name="gender" label="Gender">
        <GenderFormItem />
      </Form.Item>

      <Form.Item name="dobMoment" label="Date of birth">
        <DatePickerFormItem />
      </Form.Item>

      <Form.Item label="Identity proof">
        <IdentityProof form={form} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button loading={loading} type="primary" htmlType="submit">
          Save & Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BasicForm;
