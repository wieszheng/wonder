import React, {useEffect} from 'react';
import {Input, Col, Form, Modal, Switch} from 'antd';

const {TextArea} = Input;
const FormForModal: React.FC<any> = ({
                                       title,
                                       width,
                                       left,
                                       right,
                                       formName,
                                       record,
                                       onFinish,
                                       loading,
                                       fields,
                                       open,
                                       onCancel,
                                       offset = 0,
                                       children,
                                       Footer,
                                       onTest
                                     }) => {

  const [form] = Form.useForm();
  const onOk = () => {
    form.validateFields().then((values) => {
      onFinish(values);
    })
  }

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(record);
  }, [record]);

  const layout = {
    labelCol: {span: left},
    wrapperCol: {span: right},
  }

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

    <Modal style={{marginTop: offset}}
           confirmLoading={loading}
           footer={Footer !== undefined ? <Footer onOk={onOk} onCancel={onCancel} onTest={() => {
             form.validateFields().then((values) => {
               onTest(values);
             })
           }}/> : undefined}
           title={title} width={width} open={open} onOk={onOk} onCancel={onCancel}>
      {children || null}
      <Form
        form={form}
        {...layout}
        name={formName}
        initialValues={record}
        onFinish={onFinish}
      >
        {
          fields.map((item: any, index: number) => <Col span={item.span || 24} key={index}>
            <Form.Item label={item.label} colon={item.colon || true} initialValue={item.initialValue}
                       rules={
                         [{required: item.required, message: item.message}]
                       } name={item.name} valuePropName={item.valuePropName || 'value'}
            >
              {getComponent(item.type, item.placeholder, item.component)}
            </Form.Item>
          </Col>)
        }
      </Form>
    </Modal>

  );
};

export default FormForModal;
