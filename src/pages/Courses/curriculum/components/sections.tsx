import {
  DeleteTwoTone,
  EditTwoTone,
  LoadingOutlined,
  MenuOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Form, Input, notification, Row, Spin, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { addSection, addSectionParamsType, getSections, saveSectionListIndex } from '../service';
import styles from '../index.less';
import { LectureList } from './lectures';

const { Title, Text } = Typography;

export const SectionList = ({courseId}: any) => {
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
    const i = array.findIndex((_item: { _id: any }) => _item._id === item._id);
    if (i > -1) array[i] = item;
    else array.push(item);
    return array;
  };

  const reorder = (
    list: Iterable<unknown> | ArrayLike<unknown>,
    startIndex: number,
    endIndex: number,
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = async (param: any) => {
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
                            <LectureList lectures={item.lectures} courseId={courseId} sectionId={item._id} data={data} setData={setData} />
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

export const SectionForm = (params: any) => {
  const { _id, courseId, formData, setFormData, setVisible } = params;
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
          <Button
            onClick={(e) => {
              setVisible(false);
            }}
          >
            Cancel
          </Button>
          <Button loading={loading} type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};