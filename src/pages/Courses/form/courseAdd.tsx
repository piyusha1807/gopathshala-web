import { CustomDrawerWidth } from '@/components/common';
import {
  getTextEditorData,
  getTextEditorState,
  TextEditorFormItem,
} from '@/components/common/textEditor';
import { FileUpload } from '@/components/File/fileUpload';
import { ImageUpload } from '@/components/File/image';
import SearchSelect from '@/components/SearchSelect';
import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  notification,
  Row,
  Select,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { addCourse, addCourseParamsType, getCourseById, getStaffSelectData } from '../service';

const { Option } = Select;
const { Text, Link } = Typography;

export type courseAddProps = {
  _id: string;
  set_Id: any;
  visible: boolean;
  setVisible: any;
  setFormData: any;
};

const CourseAdd: React.FC<courseAddProps> = (props) => {
  const { _id, set_Id, visible, setVisible, setFormData } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    getStaffList();
    if (_id == 'new') {
      form.resetFields();
    } else {
      getData(_id);
    }
  }, [_id]);

  const getData = async (_id: string) => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await getCourseById(_id);

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
      form.setFieldsValue({
        ...payload,
        description: getTextEditorState(payload?.description?.html || ''),
      });
    }
  };

  const getStaffList = async () => {
    const { status, class: className, message, payload } = await getStaffSelectData();

    if (!status && payload.length <= 0) {
      notification[className]({
        message: `${message}. Please add instructor / staff before add course details.`,
      });
      return;
    }

      setStaffList(payload);
  };

  const handleSubmit = async (values: addCourseParamsType) => {
    if (values.description) {
      values.description = getTextEditorData(values.description);
    }

    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await addCourse({ ...values, _id: _id });

    setLoading(false);
    setMessage(message);
    setClassName(className);

    notification[className]({
      message: message,
    });

    if (!status) {
      return;
    }

    if (payload) setFormData(payload);
    set_Id('new');
    form.resetFields();
    setVisible(false);
  };

  return (
    <Drawer
      title="Add Course"
      width={CustomDrawerWidth}
      onClose={() => setVisible(false)}
      visible={visible}
    >
      <Form layout="vertical" form={form} name="courseAdd" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Course title"
          rules={[
            {
              required: true,
              message: 'Please enter course title',
            },
          ]}
        >
          <Input placeholder="E.g. Machine Learning A-Z™" allowClear />
        </Form.Item>

        <Form.Item
          name="subtitle"
          label="Course subtitle"
          rules={[
            {
              required: true,
              message: 'Please enter course subtitle',
            },
          ]}
        >
          <Input placeholder="E.g. Hands-On Python & R In Data Science" allowClear />
        </Form.Item>

        <TextEditorFormItem
          form={form}
          name="description"
          label="Course description"
          rules={[
            {
              required: true,
              message: 'Please enter course description',
            },
          ]}
          contentStyle={{ height: '150px' }}
        />

        <Row gutter={10} align="bottom">
          <Col {...{ xs: 24, sm: 24, md: 8, lg: 8 }}>
            <Form.Item
              name="language"
              label="Basic info"
              rules={[{ required: true, message: 'Please select course language' }]}
            >
              <SearchSelect category="language" placeholder="Select language" />
            </Form.Item>
          </Col>
          <Col {...{ xs: 24, sm: 24, md: 8, lg: 8 }}>
            <Form.Item
              name="level"
              rules={[{ required: true, message: 'Please select course level' }]}
            >
              <Select placeholder="Select level">
                <Option value="blevel">Beginner level</Option>
                <Option value="ilevel">Intermediate level</Option>
                <Option value="elevel">Expert level</Option>
                <Option value="alevel">All level</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col {...{ xs: 24, sm: 24, md: 8, lg: 8 }}>
            <Form.Item
              name="category"
              rules={[{ required: true, message: 'Please select course category' }]}
            >
              <SearchSelect category="courseCategory" placeholder="Select category" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="courseImage"
          label="Course image"
          extra={
            <>
              <Text type="secondary">
                <strong>Dimensions: </strong>260 X 160 pixels
              </Text>
              <br />
              <Text type="secondary">
                <strong>Format: </strong>.jpg, .jpeg, .gif, or .png
              </Text>
            </>
          }
        >
          <ImageUpload fileCategory="courseImage" customClassName="courseImage" />
        </Form.Item>

        <Form.Item
          name="promotionalVideo"
          label="Promotional video"
          extra={
            <>
              <span>
                Students who watch a well-made promo video are 5X more likely to enroll in your
                course.
                <br />
                We've seen that statistic go up to 10X for exceptionally awesome videos.
                <br />
              </span>
              <Link href="#" target="_blank">
                {' '}
                Learn how to make yours awesome!
              </Link>
            </>
          }
        >
          <FileUpload />
        </Form.Item>

        <Form.Item name="staff" label="Instructor">
          <Select
            mode="tags"
            placeholder="Select instructor"
            tokenSeparators={[',']}
            labelInValue
            showSearch
            allowClear
          >
            {staffList.map((item, idx) => {
              return (
                <Option value={item.key} key={item.key}>
                  {/* <span role="img" style={{ marginRight: 10 }}>
                    <Avatar size="small" src={item?.profilePhoto?.url} icon={<UserOutlined />} />
                  </span> */}
                  {item.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Button loading={loading} size="large" type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </Drawer>
  );
};

export default CourseAdd;
