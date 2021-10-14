import { Radio } from 'antd';

export const GenderFormItem = (props: any) => {
  const G_GENDER_LIST = [
    {
      key: 'male',
      label: 'Male',
    },
    {
      key: 'female',
      label: 'Female',
    },
    {
      key: 'other',
      label: 'Other',
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

export const GenderPreview = (props: any) => {
  const { gender } = props;

  if (!gender) return <></>;
  
  const G_GENDER_LABEL = {
    "male": "Male",
    "female": "Female",
    "other": "Other",
  }

  return G_GENDER_LABEL[gender];
}
