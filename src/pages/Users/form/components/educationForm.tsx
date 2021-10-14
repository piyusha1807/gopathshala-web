import { getDateFromMoment, getMomentFromDate, G_DATE_FORMAT } from '@/components/common';
import { setFormErrorFields } from '@/components/common/setFormErrorFields';
import SearchSelect from '@/components/SearchSelect';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, notification, Row, Select, Space, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { StepFormParamsType, saveUser } from '../../service';

/*
  1. Add marksheet or necessary documents
*/

const { Option } = Select;
const { RangePicker } = DatePicker;

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

export type EducationFormProps = {
  current: string;
  setCurrent: any;
  userId: string;
  data: any;
  setData: any;
};

const EducationForm: React.FC<EducationFormProps> = (props) => {
  const { current, setCurrent, userId, data, setData } = props;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    if (data && data.programs) {
      for (let program of data.programs) {
        if (program['durationStartAt'] && program['durationEndAt']) {
          program['durationMoment'] = [];
          program['durationMoment'][0] = getMomentFromDate(program['durationStartAt']);
          program['durationMoment'][1] = getMomentFromDate(program['durationEndAt']);
        }
      }
    }
    form.setFieldsValue(data);
  }, []);

  const handleSubmit = async (values: StepFormParamsType) => {
    if (values.programs) {
      for (let program of values.programs) {
        if (program['durationMoment'] && program['durationMoment'].length > 0) {
          program['durationStartAt'] = getDateFromMoment(program['durationMoment'][0]);
          program['durationEndAt'] = getDateFromMoment(program['durationMoment'][1]);
          delete program['durationMoment'];
        }
      }
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

    setCurrent(payload.currentStep);
    setData({ ...data, ...payload });
  };

  const initialValues = {
    programs: [{}]
  };

  return (
    <Form
      {...formLayout}
      form={form}
      name="education"
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Form.List name="programs">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, idx) => (
              <Card
                key={field.key}
                title={`${idx+1}. Education details`}
                style={{ marginBottom: 8 }}
                size="small"
                extra={
                  <Tooltip title="Close" >
                    <CloseOutlined onClick={() => remove(field.name)} />
                  </Tooltip>
                }
              >
                <Form.Item
                  {...field}
                  name={[field.name, 'program']}
                  label="Program / Degree / Certificate"
                  fieldKey={[field.fieldKey, 'program']}
                >
                  <SearchSelect category="program" placeholder="Select program" />
                </Form.Item>

                <Form.Item
                  {...field}
                  name={[field.name, 'university']}
                  label="Board / University"
                  fieldKey={[field.fieldKey, 'university']}
                >
                  <Input placeholder="E.g. Vellore Universtiy" allowClear />
                </Form.Item>

                <Form.Item
                  {...field}
                  name={[field.name, 'institute']}
                  label="School / Institute"
                  fieldKey={[field.fieldKey, 'institute']}
                >
                  <Input placeholder="E.g. School of Computer Science and Engineering" allowClear />
                </Form.Item>

                <Form.Item
                  {...field}
                  name={[field.name, 'specialization']}
                  label="Branch / Specialization"
                  fieldKey={[field.fieldKey, 'specialization']}
                >
                  <Input placeholder="E.g. Computer Science" allowClear />
                </Form.Item>

                <Form.Item
                  {...field}
                  name={[field.name, 'durationMoment']}
                  label="Duration"
                  fieldKey={[field.fieldKey, 'durationMoment']}
                >
                  <RangePicker format={G_DATE_FORMAT} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  {...field}
                  name={[field.name, 'educationType']}
                  label="Education type"
                  fieldKey={[field.fieldKey, 'educationType']}
                >
                  <Select placeholder="Select type" allowClear>
                    <Option value="fullTime">Full Time</Option>
                    <Option value="partTime">Part Time</Option>
                    <Option value="correspondence">Correspondence</Option>
                    <Option value="others">Others</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Score" style={{ marginBottom: 0 }}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'score']}
                    fieldKey={[field.fieldKey, 'score']}
                    style={{
                      display: 'inline-block',
                      width: 'calc(60% - 8px)',
                      marginRight: '8px',
                    }}
                  >
                    <Input placeholder="" allowClear />
                  </Form.Item>

                  <Form.Item
                    {...field}
                    name={[field.name, 'scoreType']}
                    fieldKey={[field.fieldKey, 'scoreType']}
                    style={{ display: 'inline-block', width: '40%' }}
                  >
                    <Select allowClear>
                      <Option value="percentage">%</Option>
                      <Option value="cgpa">CGPA</Option>
                      <Option value="grade">Grade</Option>
                      <Option value="marks">Marks</Option>
                    </Select>
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  {...field}
                  name={[field.name, 'notes']}
                  label="Highlights/Notes"
                  fieldKey={[field.fieldKey, 'notes']}
                  extra={'Mention class/department/university ranks or other highlights, if any'}
                >
                  <TextArea placeholder="" autoSize allowClear />
                </Form.Item>
              </Card>
            ))}

            <Form.Item
              {...tailLayout}
            >
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Add more education details
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item {...tailLayout}>
        <Row gutter={10}>
          <Col>
            <Button loading={loading} type="primary" htmlType="submit">
              Save & Next
            </Button>
          </Col>
          <Col>
            <Button onClick={() => setCurrent('basic')}>Previous</Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EducationForm;
