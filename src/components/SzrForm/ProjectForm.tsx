import React, {useEffect} from 'react';
import {connect} from '@umijs/max';
import {Button, Col, Form, Input, Row, Switch, Tooltip, Upload, Avatar} from 'antd';
import {SaveOutlined} from '@ant-design/icons';
import CONFIG from "@/consts/config";
import logo from '@/assets/logo.svg';

const {TextArea} = Input;
// 定义组件的props类型
// interface MyComponentProps {
//   name: string;
//   age: number;
//   dispatch: any;
// }

// 定义组件
const ProjectForm: React.FC<any> = ({
                                      left,
                                      right,
                                      formName,
                                      record,
                                      reloadData,
                                      onFinish,
                                      fields,
                                      dispatch
                                    }) => {

  const [form] = Form.useForm();
  const layout = {
    labelCol: {span: left},
    wrapperCol: {span: right},
  }

  useEffect(() => {
    form.setFieldsValue(record);
  }, [record])
  const getComponent = (type: string, placeholder: string | undefined, component = undefined) => {
    if (component) {
      return component;
    }
    if (type === 'input') {
      return <Input placeholder={placeholder}/>
    }
    if (type === 'textarea') {
      return <TextArea placeholder={placeholder}/>
    }
    if (type === 'switch') {
      return <Switch/>
    }
    return null;
  }
  return (
    <Form
      form={form}
      {...layout}
      name={formName}
      initialValues={record}
      onFinish={onFinish}
    >
      <Row style={{marginBottom: 26}}>
        <Col span={6}/>
        <Col span={12} style={{textAlign: 'center'}}>
          {<Avatar size={96} src={record.avatar || logo}/>}
          {/*<Tooltip title="点击可修改头像" placement="rightTop">*/}
          {/*  <Upload customRequest={async fileData => {*/}
          {/*    await dispatch({*/}
          {/*      type: 'project/uploadFile',*/}
          {/*      payload: {*/}
          {/*        file: fileData.file,*/}
          {/*        project_id: record.id,*/}
          {/*      }*/}
          {/*    })*/}
          {/*    await reloadData()*/}
          {/*  }} fileList={[]}>*/}
          {/*    <Row style={{textAlign: 'center', marginBottom: 24}}>*/}
          {/*      {<Avatar size={96} src={record.avatar || logo}/>}*/}
          {/*    </Row>*/}
          {/*  </Upload>*/}
          {/*</Tooltip>*/}
        </Col>
        <Col span={6}/>
      </Row>
      {
        // eslint-disable-next-line react/jsx-key
        fields.map((item: any) => <Row>
          <Col span={6}/>
          <Col span={12}>
            <Form.Item label={item.label} colon={item.colon || true}
                       rules={
                         [{required: item.required, message: item.message}]
                       } name={item.name} valuePropName={item.valuePropName || 'value'}
            >
              {getComponent(item.type, item.placeholder, item.component)}
            </Form.Item>
          </Col>
          <Col span={6}/>
        </Row>)
      }
      <Row>
        <Col span={6}/>
        <Col span={12} style={{textAlign: 'center'}}>
          <Form.Item {...{
            labelCol: {span: 0},
            wrapperCol: {span: 24},
          }}>
            <Button htmlType="submit" type="primary"><SaveOutlined/>保存</Button>
          </Form.Item>
        </Col>
        <Col span={6}/>
      </Row>
    </Form>
  );
};

// 使用connect函数将组件连接到Redux store
export default ProjectForm;
