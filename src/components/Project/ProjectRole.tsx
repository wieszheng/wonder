import React, {useEffect, useState} from "react";
import {useParams} from '@umijs/max';
import {Avatar, Button, Input, List, Popconfirm, Select, Skeleton, Tag} from 'antd';
import FormForModal from "@/components/SzrForm/FormForModal";
import {DeleteTwoTone, PlusOutlined, UserOutlined} from '@ant-design/icons';
import auth from "@/utils/auth";
import {deleteProjectRole, insertProjectRole, updateProjectRole} from '@/services/project';
import CONFIG from "@/consts/config";
import UserSelect from "@/components/User/UserSelect";

const ProjectRole: React.FC<any> = ({project, roles, users, fetchData}) => {
  const params = useParams();
  const [modal, setModal] = useState(false);
  const [userMap, setUserMap] = useState<any>({});
  const [data, setData] = useState(roles);
  useEffect(() => {
    const temp: any = {}
    users.forEach((item: { id: string | number; }) => {
      temp[item.id] = item
    })
    setUserMap(temp)
    setData([
      {
        user_id: project.owner,
        project_role: 'OWNER',
      },
      ...roles,
    ])
  }, [roles, users]);
  const onSearchRole = (name: string) => {
    if (name === '') {
      setData([
        {
          user_id: project.owner,
          project_role: 'OWNER',
        },
        ...roles,
      ])
      return
    }
    // @ts-ignore
    const now = roles.filter((item: { user_id: string | number; }) => userMap[item.user_id].email.toLowerCase().indexOf(name.toLowerCase()) > -1
      || userMap[item.user_id].name.toLowerCase().indexOf(name.toLowerCase()) > -1)
    console.log(now)
    setData([
      {
        user_id: project.owner,
        project_role: 'OWNER',
      },
      ...now,
    ])
  }
  const onUpdateRole = async (item: any, value: any) => {
    const body = {
      ...item,
      project_role: value,
    }
    const res = await updateProjectRole(body);
    if (auth.response(res, true)) {
      await fetchData();
    }
  }
  const onFinish = async (values: any) => {
    const info = {
      ...values,
      project_id: params.id,
    }
    const res = await insertProjectRole(info);
    if (auth.response(res, true)) {
      setModal(false);
      // 重新加载权限
      await fetchData();
    }
  }
  const permission = (item: any) => {
    if (item.project_role === 'OWNER') {
      // eslint-disable-next-line react/jsx-key
      return [<Tag icon={<UserOutlined/>} color='cyan'>负责人</Tag>];
    }
    return [
      // @ts-ignore
      // eslint-disable-next-line react/jsx-key
      <Select style={{width: 80}} value={CONFIG.PROJECT_ROLE_MAP[item.project_role]} onChange={(data) => {
        onUpdateRole(item, data);
      }}>
        {// @ts-ignore
          Object.keys(CONFIG.PROJECT_ROLE_MAP).map((key, index) => <Option key={index} value={key}>{CONFIG.PROJECT_ROLE_MAP[key]}</Option>)
        }
      </Select>,
      // eslint-disable-next-line react/jsx-key
      <Popconfirm
        title="确定要删除该角色吗?"
        onConfirm={() => {
          confirm(item)
        }}
        okText="确定"
        cancelText="取消"
      >
        <DeleteTwoTone twoToneColor="red" style={{cursor: 'pointer'}}/>
      </Popconfirm>
    ]
  }
  const roleList = <Select placeholder="请选择角色">
    {// @ts-ignore
      Object.keys(CONFIG.PROJECT_ROLE_MAP).map((key, index) => <Option key={index} value={key}>{CONFIG.PROJECT_ROLE_MAP[key]}</Option>)
    }
  </Select>
  const fields = [
    {
      name: 'user_id',
      label: '用户',
      required: true,
      component: <UserSelect users={users}/>,
      type: 'select'
    },
    {
      name: 'project_role',
      label: '角色',
      required: true,
      component: roleList,
      type: 'select'
    },
  ]
  return (
    <div>
      <FormForModal title="添加成员" left={6} right={18} width={500} record={{}} onFinish={onFinish} fields={fields}
                    onCancel={() => setModal(false)} open={modal}
      />
      <div style={{marginBottom: 16}}>
        <Button size="small" type="primary" onClick={() => setModal(true)}><PlusOutlined/>添加成员</Button>
        <Input.Search onSearch={onSearchRole} size="small" style={{float: 'right', marginRight: 8, width: 280}}
                      placeholder="搜索用户邮箱/姓名"/>
      </div>
      <div>
        <List
          itemLayout="horizontal"
          size="small"
          dataSource={data}
          renderItem={(item:any) => (
            <List.Item actions={permission(item)}>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar
                    src={userMap[item.user_id]?.avatar || CONFIG.AVATAR_URL}/>}
                  title={userMap[item.user_id] ? userMap[item.user_id].name : 'loading'}
                  description={userMap[item.user_id] ? userMap[item.user_id].email : 'loading'}/>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ProjectRole;
