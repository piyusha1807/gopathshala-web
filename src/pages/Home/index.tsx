import React from 'react';
import { Typography } from 'antd';
import { connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import { PageContainer } from '@ant-design/pro-layout';

const { Text, Title } = Typography;

const greetings = () => {
  let greeting: any[] = [
    { hour: 22, message: 'Working late' },
    { hour: 18, message: '🌠 Good evening' },
    { hour: 12, message: 'Good afternoon' },
    { hour: 5, message: '🌅 Good morning' },
    { hour: 0, message: 'whoa, early bird' },
  ];
  let hour = new Date().getHours();
  let message = '';

  for(var i=0; i<greeting.length; i++){
      if(hour >= greeting[i].hour){
        message = greeting[i].message;
        break;
      }
  }

  return message;
};

const Home = (props) => {
  const { currentUser } = props;

  return (
    <PageContainer
      title={
        <>
          <Title level={3} >👋 Hello! <Text strong>{currentUser.name}</Text></Title>
          {greetings()}
        </>
      }
    ></PageContainer>
  );
};

export default connect(({ user }: ConnectState) => ({
  currentUser: user.currentUser,
}))(Home);
