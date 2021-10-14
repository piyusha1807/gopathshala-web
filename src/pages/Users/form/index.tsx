import React, { useEffect, useState } from 'react';
import { UserOutlined, SmileOutlined, BankOutlined, IdcardOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, notification, Steps } from 'antd';
import BasicForm from './components/basicForm';
import EducationForm from './components/educationForm';
import CommunicationForm from './components/communicationForm';
import DoneForm from './components/doneForm';
import styles from './index.less';
import { getUserById } from '../service';

const { Step } = Steps;

const steps = [
  {
    title: 'Basic',
    icon: <UserOutlined />,
  },
  {
    title: 'Education',
    icon: <BankOutlined />,
  },
  {
    title: 'Communication',
    icon: <IdcardOutlined />,
  },
  {
    title: 'Done',
    icon: <SmileOutlined />,
  },
];

const getCurrentStepAndComponent = (
  current: string,
  setCurrent: any,
  userId: string,
  data: any,
  setData: any,
  location: any,
) => {
  switch (current) {
    case 'education':
      return {
        step: 1,
        component: (
          <EducationForm
            current={current}
            setCurrent={setCurrent}
            userId={userId}
            data={data}
            setData={setData}
          />
        ),
      };
    case 'communication':
      return {
        step: 2,
        component: (
          <CommunicationForm
            current={current}
            setCurrent={setCurrent}
            userId={userId}
            data={data}
            setData={setData}
          />
        ),
      };
    case 'done':
      return {
        step: 3,
        component: (
          <DoneForm
            current={current}
            setCurrent={setCurrent}
            userId={userId}
            data={data}
            setData={setData}
          />
        ),
      };
    default:
      return {
        step: 0,
        component: (
          <BasicForm
            current={current}
            setCurrent={setCurrent}
            userId={userId}
            data={data}
            setData={setData}
            location={location}
          />
        ),
      };
  }
};

const UserAdd = (props: any) => {
  const {
    match: {
      params: { userId = 'new' },
    },
    location
  } = props;

  const [loading, setLoading] = useState(false);
  const [className, setClassName] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [data, setData] = useState({});

  const [current, setCurrent] = useState<string>('basic');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepComponent, setStepComponent] = useState<React.ReactNode>(
    <BasicForm
      current={current}
      setCurrent={setCurrent}
      userId={userId}
      data={data}
      setData={setData}
      location={location}
    />,
  );

  useEffect(() => {
    if(userId != "new"){
      getData();
    }
  }, []);

  useEffect(() => {
    const { step, component } = getCurrentStepAndComponent(
      current,
      setCurrent,
      userId,
      data,
      setData,
      location,
    );
    setCurrentStep(step);
    setStepComponent(component);
  }, [current, userId]);

  const getData = async () => {
    setLoading(true);
    setMessage(undefined);
    setClassName(undefined);

    const { status, class: className, message, payload } = await getUserById(userId);

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
      const { step, component } = getCurrentStepAndComponent(
        payload.currentStep,
        setCurrent,
        userId,
        payload,
        setData,
        location,
      );
      setCurrentStep(step);
      setStepComponent(component);
    }
  };

  return (
    <PageContainer
      title={'Add user'}
      onBack={() => window.history.back()}
      loading={loading}
      content={
        <Steps current={currentStep} responsive={true} size="small" className={styles.customSteps}>
          {steps.map((item) => (
            <Step status={item.status} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </Steps>
      }
    >
      <Card>
        <div className="steps-content">{stepComponent}</div>
      </Card>
    </PageContainer>
  );
};

export default UserAdd;
