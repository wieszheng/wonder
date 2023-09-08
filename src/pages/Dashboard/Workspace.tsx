import {Avatar, Card, Typography} from 'antd';
import React from 'react';
import {PageContainer} from "@ant-design/pro-components";
import {HeartTwoTone, SmileTwoTone} from "@ant-design/icons";
import styles from './Workspace.less';
import {useModel} from "@umijs/max";
import { LoginUser } from '@/services/auth';

const getWelcome = (user: string) => {
  const now = new Date()
  const hour = now.getHours()
  if (hour < 6) {
    return `Hi, ${user}! 😪凌晨了, 工作的同时要注意休息哦!`
  } else if (hour < 9) {
    return `早上好, ${user}!`
  } else if (hour < 12) {
    return `上午好, ${user}!`
  } else if (hour < 14) {
    return `中午好, ${user}!`
  } else if (hour < 19) {
    return `下午好, ${user}!`
  } else if (hour < 24) {
    return `晚上好, ${user}! 不早了，喝杯热牛奶🥛再去休息吧~`
  }
}

const getContent = (currentUser: LoginUser) => {
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large"
                src={currentUser.avatar || undefined}/>
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          {getWelcome(currentUser.name)}
        </div>
        <div>
          {currentUser.email}
        </div>
      </div>
    </div>
  )
}
const Workspace: React.FC = () => {
  const {initialState} = useModel("@@initialState")
  // @ts-ignore
  const {currentUser} = initialState || undefined;

  return (
    <PageContainer content={getContent(currentUser)} breadcrumb={{}}>
      <Card>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <SmileTwoTone /> Ant Design Pro <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
      </Card>
      <p style={{ textAlign: 'center', marginTop: 24 }}>
        Want to add more pages? Please refer to{' '}
        <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
          use block
        </a>
        。
      </p>
    </PageContainer>
  );
};

export default Workspace;
