import React from 'react';
import { DatePicker } from 'antd';
import { G_DATE_FORMAT } from '.';

export const DatePickerFormItem = (props: any) => {
  return <DatePicker format={G_DATE_FORMAT} {...props} />;
};
