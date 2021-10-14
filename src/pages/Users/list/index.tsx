// import { PageContainer } from '@ant-design/pro-layout';
// import React, { useEffect, useState } from 'react';
// import { Card, notification, Space, Steps, Table, Tag } from 'antd';
// import { UserOutlined, SmileOutlined, BankOutlined, IdcardOutlined } from '@ant-design/icons';
// import styles from './index.less';
// import BasicForm from './components/basicForm';
// import EducationForm from './components/educationForm';
// import CommunicationForm from './components/communicationForm';
// import DoneForm from './components/doneForm';
// import { getUser } from '../service';

// const UserList = (props: any) => {
// const {
//   match: {
//     params: { userTypes },
//   },
// } = props;

//   const [loading, setLoading] = useState(false);
//   const [className, setClassName] = useState(undefined);
//   const [message, setMessage] = useState(undefined);
//   const [data, setData] = useState({});

//   useEffect(() => {
//     getData();
//   }, [userTypes]);

//     const getData = async () => {
//       setLoading(true);
//       setMessage(undefined);
//       setClassName(undefined);

//       const { status, class: className, message, payload } = await getUser(userTypes);

//       setLoading(false);
//       setMessage(message);
//       setClassName(className);

//       if (!status) {
//         notification[className]({
//           message: message,
//         });
//         return;
//       }

//       if (payload) {
//         setData(payload);
//       }
//     };

// const data1 = [
//     {
//       key: '1',
//       name: 'John Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//       tags: ['nice', 'developer'],
//     },
//     {
//       key: '2',
//       name: 'Jim Green',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//       tags: ['loser'],
//     },
//     {
//       key: '3',
//       name: 'Joe Black',
//       age: 32,
//       address: 'Sidney No. 1 Lake Park',
//       tags: ['cool', 'teacher'],
//     },
//   ];

//       const columns = [
//         {
//           title: 'Name',
//           dataIndex: 'name',
//           key: 'name',
//           render: text => <a>{text}</a>,
//         },
//         {
//           title: 'Age',
//           dataIndex: 'age',
//           key: 'age',
//           sorter: {
//             compare: (a, b) => a.age - b.age,
//             // multiple: 1,
//           },
//         },
//         {
//           title: 'Address',
//           dataIndex: 'address',
//           key: 'address',
//         },
//         {
//           title: 'Tags',
//           key: 'tags',
//           dataIndex: 'tags',
//           render: tags => (
//             <>
//               {tags.map(tag => {
//                 let color = tag.length > 5 ? 'geekblue' : 'green';
//                 if (tag === 'loser') {
//                   color = 'volcano';
//                 }
//                 return (
//                   <Tag color={color} key={tag}>
//                     {tag.toUpperCase()}
//                   </Tag>
//                 );
//               })}
//             </>
//           ),
//         },
//         {
//           title: 'Action',
//           key: 'action',
//           render: (text, record) => (
//             <Space size="middle">
//               <a>Invite {record.name}</a>
//               <a>Delete</a>
//             </Space>
//           ),
//         },
//       ];
//       function onChange(pagination, filters, sorter, extra) {
//         console.log('params', pagination, filters, sorter, extra);
//       }

//   return (
//     <PageContainer
//       title={'user'}
//       onBack={() => window.history.back()}
//         loading={loading}
//     >
//         <Table columns={columns} dataSource={data1} onChange={onChange}/>
//     </PageContainer>
//   );
// };

// export default UserList;

import defaultAvatar from '@/assets/defaultAvatar.svg';
import { UserAddOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Avatar, Button, Divider, message, notification, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// import { queryRule, updateRule, addRule, removeRule } from './service';
import { history, Link } from 'umi';
import { getUserList } from '../service';
import UserView from '../view/userView';
import type { TableListItem } from './data.d';

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

export const getPageHeaderTitle = (userType: string) => {
  switch (userType) {
    case 'admins':
      return 'Admins';
    case 'staffs':
      return 'Staffs';
    case 'students':
      return 'Students';
    default:
      return 'Users';
  }
};

export const getUserType = (userType: string) => {
  switch (userType) {
    case 'admins':
      return 'ad';
    case 'staffs':
      return 'st';
    case 'students':
      return 'stu';
    default:
      return 'stu';
  }
};

const TableList: React.FC<{}> = (props: any) => {
  const {
    match: {
      params: { userTypes },
    },
  } = props;

  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [data, setData] = useState([]);
  const [tableParams, setTableParams] = useState({});
  const [viewVisible, setViewVisible] = useState(false);
  const [viewId, setViewId] = useState('new');

  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'S.No',
      key: 'index',
      render: (_, record: any, index) => {
        return (
          <span>
            {index + 1}
            {'.'}
          </span>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'displayName',
      key: 'displayName',
      render: (_, record: any) => {
        return (
          <span>
            <Avatar
              src={record?.profilePhoto?.url || defaultAvatar}
              style={{ marginRight: '0.5em' }}
            />{' '}
            {record?.displayName}
          </span>
        );
      },
    },
    {
      title: 'Registration Number',
      dataIndex: 'registrationNumber',
      valueType: 'text',
      sorter: {
        compare: (a, b) => a.registrationNumber - b.registrationNumber,
        multiple: 2,
      },
    },
    {
      title: 'Courses',
      dataIndex: 'Courses',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: 'In active', status: 'Default' },
        1: { text: 'Active', status: 'Processing' },
        2: { text: 'Created', status: 'Success' },
        3: { text: 'Blocked', status: 'Error' },
      },
    },
    {
      title: 'Last Active',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      sorter: {
        compare: (a, b) => a.updatedAt - b.updatedAt,
        multiple: 1,
      },
    },
    {
      title: 'Actions',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Space split={<Divider type="vertical" />}>
          <a onClick={() => showDrawer(record._id)}>View</a>
          <Link to={`/users/${record._id}/form`}>Edit</Link>
          <a href="">Delete</a>
        </Space>,
      ],
    },
  ];

  useEffect(() => {
    let tParams = {
      ...tableParams,
      userTypes: userTypes,
    };
    getData(tParams);
    setTableParams(tParams);
  }, [userTypes]);

  const showDrawer = (_id: string) => {
    setViewId(_id);
    setViewVisible(true);
  };

  const getData = async (params: any) => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await getUserList({ ...params });

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
      setData(payload?.usersList);
    }
  };

  return (
    <PageContainer
      title={getPageHeaderTitle(userTypes)}
      extra={[
        <Button
          key="1"
          type="primary"
          onClick={() => history.push(`/users/new/form?userType=${getUserType(userTypes)}`)}
        >
          <UserAddOutlined />
          {` Add new ${userTypes}`}
        </Button>,
      ]}
    >
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="_id"
        search={false}
        loading={loading}
        dataSource={data}
        columns={columns}
        options={{
          reload: (e) => getData({ ...tableParams }),
        }}
        onChange={(pagination, filters, sorter) => {
          let { current, pageSize } = pagination;
          let { field, order } = sorter;
          let tParams = { ...tableParams, current, pageSize, field, order };
          setTableParams(tParams);
          getData(tParams);
        }}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Selected <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> user
            </div>
          }
        >
          <Button
          // onClick={async () => {
          //   await handleRemove(selectedRowsState);
          //   setSelectedRows([]);
          //   actionRef.current?.reloadAndRest?.();
          // }}
          >
            Delete user
          </Button>
          <Button type="primary">Send credentials</Button>
        </FooterToolbar>
      )}

      {/* <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer> */}
      <UserView _id={viewId} viewVisible={viewVisible} setViewVisible={setViewVisible} />
    </PageContainer>
  );
};

export default TableList;
