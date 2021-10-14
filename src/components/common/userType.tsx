import { Radio } from 'antd';

export const UserTypeFormItem = (props: any) => {
  const G_GENDER_LIST = [
    {
      key: 'ad',
      label: 'Admin',
    },
    {
      key: 'st',
      label: 'Staff',
    },
    {
      key: 'stu',
      label: 'Student',
    },
  ];
  return (
    <Radio.Group {...props}>
      {G_GENDER_LIST.map((item, idx) => (
        <Radio key={idx} value={item.key}>
          {item.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};
