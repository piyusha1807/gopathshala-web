import {
  DeleteTwoTone,
  EditTwoTone,
  EyeOutlined,
  LoadingOutlined,
  MenuOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, notification, Row, Spin, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styles from '../index.less';
import { addSection, addSectionParamsType, getSections, saveSectionListIndex } from '../service';

const { Title, Text } = Typography;

export type curriculumProps = {
  match: any;
};

const Curriculum: React.FC<curriculumProps> = (props) => {
  const {
    match: {
      params: { courseId },
    },
  } = props;

  return (
    <PageContainer
      title={'Curriculum'}
      onBack={() => window.history.back()}
      extra={[
        <Button
          key="1"
          type="primary"
          onClick={() => {
            console.log('');
          }}
        >
          <EyeOutlined /> Preview
        </Button>,
      ]}
    >
      <SectionList courseId={courseId} />
    </PageContainer>
  );
};

export const SectionList = ({ courseId }) => {
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const [data, setData] = useState([]);
  const [indexValue, setIndexValue] = useState(-1);
  const [editFormVisible, setEditFormVisible] = useState(false);

  const [addFormVisible, setAddFormVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [_id, set_Id] = useState('new');

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const arr = upsert(data, formData);
    setData([...arr]);
  }, [formData]);

  const getData = async () => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await getSections(courseId);

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
      setData(payload);
    }
  };

  const saveList = async (values: any) => {
    const { status, class: className, message } = await saveSectionListIndex(values, courseId);

    if (!status) {
      notification[className]({
        message: message,
      });
      return;
    }
  };

  const upsert = (array, item) => {
    const i = array.findIndex((_item) => _item._id === item._id);
    if (i > -1) array[i] = item;
    else array.push(item);
    return array;
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = async (param) => {
    if (!param.destination) {
      return;
    }
    const srcI = param.source.index;
    const desI = param.destination?.index;

    if (param.type === 'droppableItem') {
      saveList({ srcI, desI, dType: param.type });
      let items = reorder(data, srcI, desI);
      setData(items);
    } else if (param.type === 'droppableSubItem') {
      const itemSubItemMap = data.reduce((acc, item) => {
        acc[item._id] = item.lectures;
        return acc;
      }, {});

      const sourceParentId = param.source.droppableId;
      const destParentId = param.destination.droppableId;

      saveList({ sourceParentId, destParentId, srcI, desI, dType: param.type });

      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...data];

      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(sourceSubItems, srcI, desI);
        newItems = newItems.map((item) => {
          if (item._id === sourceParentId) {
            item.lectures = reorderedSubItems;
          }
          return item;
        });
        setData(newItems);
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(srcI, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(desI, 0, draggedItem);
        newItems = newItems.map((item) => {
          if (item._id === sourceParentId) {
            item.lectures = newSourceSubItems;
          } else if (item._id === destParentId) {
            item.lectures = newDestSubItems;
          }
          return item;
        });
        setData(newItems);
      }
    }
  };

  return (
    <>
      {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
      {!loading && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" type="droppableItem">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {data.map((item: any, idx: number) => (
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
                          <SectionForm
                            _id={item._id}
                            courseId={courseId}
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
                            <LectureList lectures={item.lectures} sectionId={item._id} />
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
        </DragDropContext>
      )}
      {addFormVisible && (
        <SectionForm
          _id={_id}
          courseId={courseId}
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
        <PlusCircleOutlined /> Add Section
      </Button>
    </>
  );
};

export const SectionForm = ({ _id, courseId, formData, setFormData, setVisible }) => {
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

    const { status, class: className, message, payload } = await addSection(
      { ...values, _id },
      courseId,
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
      <Form layout="vertical" form={form} name="sectionFrom" onFinish={handleSubmit}>
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
          name="sectionMessage"
          label="At the end of the section what student learned"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className={styles.btnRow}>
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

export const LectureList = ({ lectures, sectionId }) => {
  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const [data, setData] = useState([]);
  const [indexValue, setIndexValue] = useState(-1);
  const [editFormVisible, setEditFormVisible] = useState(false);

  const [addFormVisible, setAddFormVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [_id, set_Id] = useState('new');

  if (!(lectures && sectionId)) {
    return null;
  }

  // useEffect(() => {
  //   getData();
  // }, []);

  // useEffect(() => {
  //   const arr = upsert(data, formData);
  //   setData([...arr]);
  // }, [formData]);

  // const upsert = (array, item) => {
  //   const i = array.findIndex((_item) => _item._id === item._id);
  //   if (i > -1) array[i] = item;
  //   else array.push(item);
  //   return array;
  // };

  // const getData = async () => {
  //   setLoading(true);
  //   setMessage(undefined);
  //   setClassName(undefined);

  //   const { status, class: className, message, payload } = await getSections(courseId);

  //   setLoading(false);
  //   setMessage(message);
  //   setClassName(className);

  //   if (!status) {
  //     notification[className]({
  //       message: message,
  //     });
  //     return;
  //   }

  //   if (payload) {
  //     setData(payload);
  //   }
  // };

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
                    {/* {idx === indexValue && editFormVisible ? (
                            <LectureForm
                              _id={item._id}
                              courseId={courseId}
                              formData={item}
                              setFormData={setFormData}
                              setVisible={setEditFormVisible}
                            />
                          ) : ( */}
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
                    {/* )} */}
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
        <PlusCircleOutlined /> Add Lecture
      </Button>
    </div>
  );
};

export const LectureForm = ({ _id, courseId, formData, setFormData, setVisible }) => {
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

    const { status, class: className, message, payload } = await addSection(
      { ...values, _id },
      courseId,
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
      <Form layout="vertical" form={form} name="sectionFrom" onFinish={handleSubmit}>
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
          name="sectionMessage"
          label="At the end of the section what student learned"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className={styles.btnRow}>
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

export default Curriculum;
