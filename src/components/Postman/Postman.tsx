import {Button, Card, Col, Input, Select, Row, Table, Tabs, Radio, Dropdown, Menu, message} from 'antd';
import React, {useState} from 'react';
import {PageContainer} from "@ant-design/pro-components";
import {SendOutlined, DownOutlined} from "@ant-design/icons"
import AceEditorJson from '../CodeEditor/AceEditor/AceEditorJson';
import EditableTable from '@/components/Table/EditableTable';
import {httpRequest} from '@/services/request';
import auth from "@/utils/auth";
const Request: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("http://www.baidu.com");
  const [method, setMethod] = useState('GET');
  const [bodyType, setBodyType] = useState(0);
  const {Option} = Select;
  const {TabPane} = Tabs;
  const [rawType, setRawType] = useState('JSON');
  const [paramsData, setParamsData] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState();
  const [headers, setHeaders] = useState([]);
  const [headersKeys, setHeadersKeys] = useState();
  const [body, setBody] = useState(null);
  const [editor, setEditor] = useState(null);
  const [response, setResponse] = useState<any>({});
  const [formData, setFormData] = useState([]);


  const selectBefore = (
    <Select
      value={method}
      onChange={(data) => setMethod(data)}
      style={{width: 120, fontSize: 16, textAlign: 'left'}}
    >
      <Option key="GET" value="GET">GET</Option>
      <Option key="POST" value="POST">POST</Option>
      <Option key="PUT" value="PUT">PUT</Option>
      <Option key="DELETE" value="DELETE">DELETE</Option>
    </Select>
  );
  const onClickMenu = (key: React.SetStateAction<string>) => {
    setRawType(key);
  };
  const menu = (
    <Menu>
      <Menu.Item key="Text">
        <a
          onClick={() => {
            onClickMenu('Text');
          }}
        >
          Text
        </a>
      </Menu.Item>
      <Menu.Item key="JavaScript">
        <a
          onClick={() => {
            onClickMenu('JavaScript');
          }}
        >
          JavaScript
        </a>
      </Menu.Item>
      <Menu.Item key="JSON">
        <a
          onClick={() => {
            onClickMenu('JSON');
          }}
        >
          JSON
        </a>
      </Menu.Item>
      <Menu.Item key="HTML">
        <a
          onClick={() => {
            onClickMenu('HTML');
          }}
        >
          HTML
        </a>
      </Menu.Item>
      <Menu.Item key="XML">
        <a
          onClick={() => {
            onClickMenu('XML');
          }}
        >
          XML
        </a>
      </Menu.Item>
    </Menu>
  );
  const columns = [
    {
      title: 'KEY',
      key: 'key',
      dataIndex: 'key',
    },
    {
      title: 'VALUE',
      key: 'value',
      dataIndex: 'value',
    },
    {
      title: 'DESCRIPTION',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => {
        return null;
      },
    },
  ];
  const resColumns = [
    {
      title: 'KEY',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'VALUE',
      dataIndex: 'value',
      key: 'value',
    },
  ];
  // 根据paramsData拼接url
  const joinUrl = (data: any[]) => {
    let tempUrl = url.split('?')[0];
    data.forEach((item, idx) => {
      if (item.key) {
        // 如果item.key有效
        if (idx === 0) {
          tempUrl = `${tempUrl}?${item.key}=${item.value || ''}`;
        } else {
          tempUrl = `${tempUrl}&${item.key}=${item.value || ''}`;
        }
      }
    });
    setUrl(tempUrl);
  };

  const splitUrl = (nowUrl: string) => {
    const split = nowUrl.split('?');
    if (split.length < 2) {
      setParamsData([]);
    } else {
      const params: string[] = split[1].split('&');
      const newParams: any = [];
      const keys: any = [];
      params.forEach((item, idx) => {
        const [key, value] = item.split('=');
        const now = Date.now();
        keys.push(now + idx + 10);
        newParams.push({key, value, id: now + idx + 10, description: ''});
      });
      setParamsData(newParams);
      setEditableRowKeys(keys);
    }
  };
  const getBody = (bd: number) => {
    if (bd === 0) {
      return <div style={{height: '30vh', lineHeight: '30vh', textAlign: 'center'}}>
        This request does not have a body
      </div>
    }
    // if (bd === 2) {
    //   return <FormData ossFileList={ossFileList} dataSource={formData} setDataSource={setFormData}/>
    // }
    return <Row style={{marginTop: 12}}>
      <Col span={24}>
        <Card bodyStyle={{padding: 0}}>
          <AceEditorJson value={body} onChange={(e: React.SetStateAction<null>) => setBody(e)} height="30vh"
                         setEditor={setEditor}/>
        </Card>
      </Col>
    </Row>
  }
  const STATUS: { [key: number]: { color: string; text: string } } = {
    200: {color: '#67C23A', text: 'OK'},
    401: {color: '#F56C6C', text: 'unauthorized'},
    400: {color: '#F56C6C', text: 'Bad Request'},
  };
  const tabExtra = (response: any) => {
    return response && response.response ? (
      <div style={{marginRight: 16}}>
      <span>
        Status:
        <span
          style={{
            color: STATUS[response.status_code] ? STATUS[response.status_code].color : '#F56C6C',
            marginLeft: 8,
            marginRight: 8,
          }}
        >
          {response.status_code}{' '}
          {STATUS[response.status_code] ? STATUS[response.status_code].text : ''}
        </span>
        <span style={{marginLeft: 8, marginRight: 8}}>
          Time: <span style={{color: '#67C23A'}}>{response.cost}</span>
        </span>
      </span>
      </div>
    ) : null;
  };
  const toTable = (field: string) => {
    if (response[field] === null || response[field] === undefined || response[field] === '{}') {
      return [];
    }
    const temp = JSON.parse(response[field]);
    return Object.keys(temp).map((key) => ({
      key,
      value: temp[key],
    }));
  };
  // 处理headers
  const getHeaders = () => {
    const result:any = {};
    headers.forEach((item:any) => {
      if (item.key !== '') {
        result[item.key] = item.value;
      }
    });
    return result;
  };
  // 拼接http请求
  const onRequest = async () => {
    if (url === '') {
      message.error('请求Url不能为空');
      return;
    }
    setLoading(true);
    const params = {
      method,
      url,
      body: bodyType === 2 ? JSON.stringify(formData) : body,
      body_type: bodyType,
      headers: getHeaders(),
    };
    if (bodyType === 0) {
      params.body = null;
    }
    const res = await httpRequest(params);
    setLoading(false);
    if (auth.response(res, true)) {
      setResponse(res.data);
    }
  };



  return (
    <PageContainer title="在线HTTP测试工具" breadcrumb={{}}>
      <Card>
        <Row gutter={[8, 8]}>
          <Col span={18}>
            <Input
              size="large"
              value={url}
              addonBefore={selectBefore}
              placeholder="请输入要请求的url"
              onChange={(e) => {
                setUrl(e.target.value);
                splitUrl(e.target.value);
              }}
            />
          </Col>
          <Col span={6}>
            <Button
              onClick={onRequest}
              loading={loading}
              type="primary"
              size="large"
              style={{marginRight: 16, float: 'right'}}
            >
              <SendOutlined/>
              Send
            </Button>
          </Col>
        </Row>
      </Card>
      <Card style={{marginTop: 8}}>
        <Row>
          <Tabs defaultActiveKey="1" style={{width: '100%'}}>
            <TabPane tab="Params" key="1">
              <EditableTable
                columns={columns}
                title="Query Params"
                dataSource={paramsData}
                setDataSource={setParamsData}
                extra={joinUrl}
                editableKeys={editableKeys}
                setEditableRowKeys={setEditableRowKeys}
              />
            </TabPane>
            <TabPane tab="Headers" key="2">
              <EditableTable
                columns={columns}
                title="Headers"
                dataSource={headers}
                setDataSource={setHeaders}
                editableKeys={headersKeys}
                setEditableRowKeys={setHeadersKeys}
              />
            </TabPane>
            <TabPane tab="Body" key="3">
              <Row>
                <Radio.Group
                  defaultValue={0}
                  value={bodyType}
                  onChange={(e) => {
                    setBodyType(e.target.value)
                  }}
                >
                  <Radio value={0}>none</Radio>
                  <Radio value={2}>form-data</Radio>
                  <Radio value={3}>x-www-form-urlencoded</Radio>
                  <Radio value={1}>raw</Radio>
                  <Radio value={4}>binary</Radio>
                  <Radio value={5}>GraphQL</Radio>
                </Radio.Group>
                {bodyType === 1 ? (
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                      {rawType} <DownOutlined/>
                    </a>
                  </Dropdown>
                ) : null}
              </Row>
              {getBody(bodyType)}
            </TabPane>
            <TabPane tab="编辑器" key="4">
              <div style={{height: '30vh', lineHeight: '30vh', textAlign: 'center'}}>
                开发中...
              </div>
            </TabPane>
          </Tabs>
        </Row>
        <Row gutter={[8, 8]}>
          {Object.keys(response).length === 0 ? null : (
            <Tabs style={{width: '100%'}} tabBarExtraContent={tabExtra(response)}>
              <TabPane tab="Body" key="1">
                <AceEditorJson
                  readOnly={true}
                  setEditor={setEditor}
                  language={response.response && response.response_headers.indexOf("json") > -1 ? 'json' : 'text'}
                  value={response.response && typeof response.response === 'object' ? JSON.stringify(response.response, null, 2) : response.response || ''}
                  height="30vh"
                />
              </TabPane>
              <TabPane tab="Cookie" key="2">
                <Table
                  columns={resColumns}
                  dataSource={toTable('cookies')}
                  size="small"
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Headers" key="3">
                <Table
                  columns={resColumns}
                  dataSource={toTable('response_headers')}
                  size="small"
                  pagination={false}
                />
              </TabPane>
            </Tabs>
          )}
        </Row>
      </Card>
    </PageContainer>

  );
};

export default Request;
