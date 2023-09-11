import React from "react";
import {Col, Row} from 'antd';
import ProjectForm from "@/components/SzrForm/ProjectForm";
import UserSelect from "@/components/User/UserSelect";
import {updateProject} from '@/services/project';
import auth from "@/utils/auth";
const ProjectInfo: React.FC<any> = ({data, users, reloadData}) => {

  const onFinish = async (values: any) => {
    const project = {
      ...data,
      ...values,
    };
    const res = await updateProject(project);
    auth.response(res, true);
    await reloadData();
  };

  const fields = [
    {
      name: 'name',
      label: '项目名称',
      required: true,
      message: '请输入项目名称',
      type: 'input',
      placeholder: '请输入项目名称',
      component: null,
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
    // {
    //   name: 'dingtalk_url',
    //   label: '钉钉通知openapi',
    //   required: false,
    //   message: '请输入项目对应钉钉群机器人api',
    //   type: 'input',
    //   placeholder: '请输入项目对应钉钉群机器人api',
    // },
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
    <Row gutter={8}>
      <Col span={24}>

        <ProjectForm left={6} right={18} record={data} onFinish={onFinish} fields={fields} reloadData={reloadData}/>
      </Col>
    </Row>
  );
};
export default ProjectInfo;
