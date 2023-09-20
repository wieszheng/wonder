import React, {useEffect, useState} from 'react';
import {PageContainer} from "@ant-design/pro-components";
import {Card, Col, Divider, Form, Input, Modal, Row, Select, Switch, Table, Tag} from "antd";
import {connect} from '@umijs/max';
import UserLink from "@/components/User/UserLink";
import CONFIG from "@/consts/config";
import {UserOutlined} from "@ant-design/icons";

const {Option} = Select;

interface UserInfoProps {
  user: {
    userList: any[],
    currentUserList: any[],
  },
  dispatch: any,
  loading: any,
}

const UserInfo: React.FC<UserInfoProps> = ({user, dispatch, loading}) => {
  const [modal, setModal] = useState(false);
  const [record, setRecord] = useState({});
  const [form] = Form.useForm()

  const onDeleteUser = async (id: string) => {
    const res = await dispatch({
      type: 'user/deleteUser',
      payload: {
        id
      },
    })
    if (res) {
      // 删除成功后重新获取用户信息
      fetchUserInfo()
    }
  }

  const fetchUserInfo = () => {
    dispatch({
      type: 'user/fetchUserList'
    })
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const onSearch = (value: string) => {
    if (value === '') {
      fetchUserInfo()
      return;
    }
    const temp = userList.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1 || item.email.toLowerCase().indexOf(value.toLowerCase()) > -1)
    dispatch({
      type: 'user/save',
      payload: {
        currentUserList: temp,
      }
    })
  }

  return (
    <PageContainer breadcrumb={null} title="用户管理页面">
      <Card>
        <Row style={{marginBottom: 12}}>
          <Col span={18}/>
          <Col span={6}>
            <Input.Search placeholder="输入用户邮箱或姓名" onChange={e => {
              onSearch(e.target.value)
            }}/>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={currentUserList} loading={loading.effects['user/fetchUserList']}/>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  )
}

export default connect(({user, loading}: {user: any, loading: boolean}) => ({user, loading}))(UserInfo);
