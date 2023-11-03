import React, {useState} from 'react';
import {Col, Card, Row, Input} from 'antd';
import {PageContainer} from "@ant-design/pro-components";
import JSONFormat from '../../utils/json';
import AceEditorJson from "@/components/CodeEditor/AceEditor/AceEditorJson";

const { TextArea } = Input;
const JsonE: React.FC = () => {
  const [txt, setTxt] = useState('');
  return (
    <PageContainer breadcrumb={{}}>
    <Card>
      <Row gutter={[30, 8]} style={{ padding: '24px 24px' }}>
        <Col span={12}>
          <TextArea
            rows={30}
            placeholder="Json 内容"
            onChange={(e) => {
              setTxt(e.target.value);
            }}
          />
        </Col>
        <Col span={12}>

          <AceEditorJson readOnly={true} language={'json'} value={JSONFormat(txt)} height={'54vh'} fontSize={17}/>
        </Col>
      </Row>
    </Card>
    </PageContainer>
  );
};

export default JsonE;
