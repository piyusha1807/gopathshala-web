import { TextEditorFormItem } from '@/components/common/textEditor';
import { DeleteTwoTone, EditTwoTone, FilePptOutlined, FileTextOutlined, MenuOutlined, PlusCircleOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, notification, Radio, Row, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styles from '../index.less';
import { addLecture, addSectionParamsType } from '../service';

const { TextArea } = Input;
const { Title, Text } = Typography;

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

export const LectureList = ({ lectures = [], courseId, sectionId, data, setData }: any) => {
  const [indexValue, setIndexValue] = useState(-1);
  const [editFormVisible, setEditFormVisible] = useState(false);

  const [addFormVisible, setAddFormVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [_id, set_Id] = useState('new');

  if (!(courseId && sectionId)) {
    return null;
  }

  useEffect(() => {
    lectures = upsert(lectures, formData);
    
    const sectionIdx = data.findIndex((_item)=>_item._id === sectionId)
    data[sectionIdx]['lectures'] = lectures
    setData([...data]);
  }, [formData]);

  const upsert = (array, item) => {
    const i = array.findIndex((_item) => _item._id === item._id);
    if (i > -1) array[i] = item;
    else if (item && item._id) array.push(item);
    return array;
  };

  return (
    <div style={{ marginTop: '10px', marginLeft: '40px' }}>
      <Droppable droppableId={sectionId} type={'droppableSubItem'}>
        {(provided, _) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {lectures.map((item: any, idx: number) => (
              <Draggable key={item._id} draggableId={`draggable-${item._id}`} index={idx}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      boxShadow: snapshot.isDragging
                        ? '0px 0px 25px 2px rgba(95,121,141,0.71)'
                        : 'none',
                    }}
                  >
                    {idx === indexValue && editFormVisible ? (
                      <LectureForm
                        _id={item._id}
                        courseId={courseId}
                        sectionId={sectionId}
                        formData={item}
                        setFormData={setFormData}
                        setVisible={setEditFormVisible}
                      />
                    ) : (
                      <Card className={styles.curriculumCard}>
                        <div className="cardIcon">
                          <Tooltip title="Edit">
                            <EditTwoTone
                              onClick={() => {
                                setIndexValue(idx);
                                setEditFormVisible(true);
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="Delete">
                            <DeleteTwoTone />
                          </Tooltip>
                        </div>
                        <Row gutter={20}>
                          <Col {...provided.dragHandleProps}>
                            <MenuOutlined />
                          </Col>
                          <Col>
                            <Title level={5}>{item.title}</Title>
                            <Text>{item.sectionMessage}</Text>
                          </Col>
                        </Row>
                      </Card>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {addFormVisible && (
        <LectureForm
          _id={_id}
          courseId={courseId}
          sectionId={sectionId}
          formData={formData}
          setFormData={setFormData}
          setVisible={setAddFormVisible}
        />
      )}
      <Button
        type="link"
        size="large"
        onClick={(e) => {
          set_Id('new');
          setAddFormVisible(true);
        }}
      >
        <PlusCircleOutlined /> Add
      </Button>
    </div>
  );
};

export const LectureForm = ({ _id, courseId, sectionId, formData, setFormData, setVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    if (_id == 'new') {
      form.resetFields();
    } else {
      form.setFieldsValue(formData);
    }
  }, [formData]);

  const handleSubmit = async (values: addSectionParamsType) => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await addLecture(
      { ...values, _id },
      courseId,
      sectionId,
    );

    setLoading(false);
    setMessage(message);
    setClassName(className);
    setVisible(false);

    if (!status) {
      notification[className]({
        message: message,
      });
      return;
    }

    setFormData(payload);
    form.resetFields();
    setVisible(false);
  };

  return (
    <Card className={styles.curriculumForm}>
      <Form {...formLayout} form={form} name="lectureFrom" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item
          name="resources"
          label="Resources"
        >
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item
          name="contentType"
          label="Content Type"
        >
          <Radio.Group defaultValue="video" buttonStyle="solid">
            <Radio.Button value="video"><VideoCameraOutlined /> Video</Radio.Button>
            <Radio.Button value="slides"><FilePptOutlined /> Slides</Radio.Button>
            <Radio.Button value="text"><FileTextOutlined /> Text</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.contentType !== currentValues.contentType
          }
        >
          {({ getFieldValue }) => {
            const contentType = getFieldValue('contentType');
            if(contentType == 'slides'){
              return <></>
            }
            else if(contentType == 'text'){
              return <TextEditorFormItem />
            }
            return (
              <>
              </>
            );
          }}
        </Form.Item>

        <Form.Item  {...tailLayout} className={styles.btnRow}>
          <Button loading={loading} type="primary" htmlType="submit">
            Save
          </Button>
          <Button
            onClick={(e) => {
              setVisible(false);
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
