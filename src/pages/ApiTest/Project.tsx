import {history} from '@umijs/max';
import {Avatar, Button, Card, Col, Empty, Input, Pagination, Row, Spin, Tooltip,} from 'antd';
import React, {useEffect, useState} from 'react';
import {PageContainer} from "@ant-design/pro-components";
import {
  QuestionCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';
import FormForModal from '@/components/SzrForm/FormForModal';
import styles from './Project.less';
import noRecord from '@/assets/no_record.svg'
import auth from "@/utils/auth";
import {insertProject, listProject} from "@/services/project";
import UserSelect from "@/components/User/UserSelect";
import {listUsers} from "@/services/user";
import UserLink from "@/components/User/UserLink";
import logo from '@/assets/logo.svg';

const Project: React.FC = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0
  });
  const [data, setData] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [userMap, setUserMap] = useState<any>({});

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
      component: <UserSelect users={users} placeholder="选择项目负责人"/>,
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

  const fetchData = async (current = pagination.current, size = pagination.pageSize) => {
    setSpinning(true)
    const res = await listProject({page: current, size});
    setSpinning(false)
    if (auth.response(res)) {
      setData(res.data);
      setPagination({...pagination, current, total: res.total});
    }
  };
  const getUsers = async () => {
    const user = await listUsers();
    const temp: any = {};
    user.forEach((item: { id: number }) => {
      temp[item.id] = item;
    });
    setUsers(user);
    setUserMap(temp);
  };
  useEffect(() => {
    getUsers();
    fetchData();
  }, []);
  const onHandleCreate = async (values: any) => {
    const res = await insertProject(values);
    if (auth.response(res, true)) {
      setVisible(false);
      // 创建成功后自动获取第一页的数据, 因为项目会按创建时间排序
      await fetchData(1);
    }
  };
  const onSearchProject = async (e: any) => {
    const projectName = e.target.value;
    const res = await listProject({page: 1, size: pagination.pageSize, name: projectName});
    if (auth.response(res)) {
      setData(res.data);
      setPagination({...pagination, current: 1, total: res.total});
    }
  };

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
        fields={fields}
        onFinish={onHandleCreate}/>
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
                onPressEnter={onSearchProject}
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
                    avatar={<Avatar src={item.avatar || logo} size={48}/>}
                    title={<div style={{fontSize: 16, fontWeight: 'bold', color: 'rgb(65, 74, 105)'}}>{item.name}</div>}
                    description={<div>
                      <p className={styles.description}>{item.description || '无'}</p>
                      <p>负责人 {<UserLink user={userMap[item.owner]}/>}</p>
                      <p>更新时间 {item.updated_at}</p>
                    </div>}
                    // @ts-ignore
                    onClick={() => {
                      history.push(`/project/${item.id}`);
                    }}
                  />
                </Card>
              </Col>
            ))
          )}
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <Pagination {...pagination} style={{float: 'right'}} onChange={pg => {
              fetchData(pg)
            }}/>
          </Col>
        </Row>
      </Spin>
    </PageContainer>
  );
};

export default Project;
