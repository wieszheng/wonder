import {history} from '@umijs/max';
import {Avatar, Button, Card, Col, Dropdown, Empty, Input, Menu, Modal, Pagination, Row, Spin, Tooltip,} from 'antd';
import React, {useState} from 'react';
import {PageContainer} from "@ant-design/pro-components";
import {
  AliwangwangOutlined,
  DeleteTwoTone,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';
import FormForModal from '@/components/SzrForm/FormForModal';
import styles from './Project.less';
import noRecord from '@/assets/no_record.svg'

const Project: React.FC = () => {
  const [data, setData] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [visible, setVisible] = useState(false);
  const fields = [
    {
      name: 'name',
      label: '项目名称',
      required: true,
      message: '请输入项目名称',
      type: 'input',
      placeholder: '请输入项目名称',
    },
    {
      name: 'app',
      label: '服务名',
      required: true,
      message: '请输入项目对应服务名称',
      type: 'input',
      placeholder: '请输入项目对应服务名称',
      component: null,
    },
    {
      name: 'owner',
      label: '项目负责人',
      required: true,
      // component: <UserSelect users={users} placeholder="选择项目负责人"/>,
      type: 'select',
    },
    {
      name: 'description',
      label: '项目描述',
      required: false,
      message: '请输入项目描述',
      type: 'textarea',
      placeholder: '请输入项目描述',
    },
    {
      name: 'private',
      label: '是否私有',
      required: true,
      message: '请选择项目是否私有',
      type: 'switch',
      valuePropName: 'checked',
    },
  ];
  return (
    <PageContainer title={false} breadcrumb={{}}>
      <FormForModal
        width={600}
        title="添加项目"
        left={6}
        right={18}
        record={{private: false}}
        open={visible}
        onCancel={() => setVisible(false)}
        fields={fields}/>
      <Spin spinning={spinning}>
        <Card style={{marginBottom: 12}}>
          <Row gutter={8}>
            <Col span={18}>
              <Button type="primary" onClick={() => setVisible(true)}>
                创建项目
                <Tooltip title="只有超级管理员可以创建项目">
                  <QuestionCircleOutlined/>
                </Tooltip>
              </Button>
            </Col>
            <Col span={6}>
              <Input
                className="borderSearch"
                prefix={<SearchOutlined/>}
                // onPressEnter={onSearchProject}
                style={{float: 'right'}}
                placeholder="请输入项目名称"
              />
            </Col>
          </Row>
        </Card>
        <Row gutter={24}>
          {data.length === 0 ? (
            <Col span={24} style={{textAlign: 'center', marginBottom: 12}}>
              <Card>
                <Empty description="暂无项目, 快点击『创建项目』创建一个吧!" image={noRecord} imageStyle={{height: 520}}/>
              </Card>
            </Col>
          ) : (
            data.map((item: any) => (
              <Col key={item.id} span={6} style={{marginBottom: 24}}>
                <Card hoverable className={styles.card}>
                  <Card.Meta
                    avatar={<Avatar src={item.avatar || "CONFIG.PROJECT_AVATAR_URL"} size={48}/>}
                    // title={<CardTitle item={item}/>}
                    description={<div>
                      <p className={styles.description}>{item.description || '无'}</p>
                      <p>负责人 {<UserLink user={userMap[item.owner]}/>}</p>
                      <p>更新时间 {item.updated_at}</p>
                    </div>}
                    onClick={() => {
                      history.push(`/project/${item.id}`);
                    }}
                  />
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Spin>
    </PageContainer>
  );
};

export default Project;
