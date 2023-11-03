import { Col, Input, Row, Tabs } from 'antd';
import React, { useState } from 'react';
import { ToGB2312, ToUnicode } from '../../utils/unicode';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
const { TabPane } = Tabs;
const { TextArea } = Input;

const Unicode = () => {
  const [chinese, setChinese] = useState('');
  const [unicode, setUnicode] = useState('');
  return (
    <PageContainer breadcrumb={{}}>
      <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
        <TabPane
          tab={
            <span>
              <SortAscendingOutlined />
              Unicode To Chinese
            </span>
          }
          key="1"
        >
          <Row gutter={[30, 8]} style={{ padding: '24px 24px' }}>
            <Col span={12}>
              <TextArea
                rows={10}
                placeholder="Unicode 字符集"
                onChange={(e) => {
                  setChinese(e.target.value);
                }}
              />
            </Col>
            <Col span={12}>
              <TextArea rows={10} placeholder="Chinese 中文" value={ToGB2312(chinese)} />
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <SortDescendingOutlined />
              Chinese To Unicode
            </span>
          }
          key="2"
        >
          <Row gutter={[30, 8]} style={{ padding: '24px 24px' }}>
            <Col span={12}>
              <TextArea
                rows={10}
                placeholder="Chinese 中文"
                onChange={(e) => {
                  setUnicode(e.target.value);
                }}
              />
            </Col>
            <Col span={12}>
              <TextArea rows={10} placeholder="Unicode 字符集" value={ToUnicode(unicode)} />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default Unicode;
