import { EyeOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button } from 'antd';
import React from 'react';
import { SectionList } from './components/sections';
import { history } from 'umi';

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
      breadcrumb={false}      
    >
      <SectionList courseId={courseId} />
    </PageContainer>
  );
};

export default Curriculum;
