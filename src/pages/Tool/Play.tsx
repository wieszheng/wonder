import {Col, Card, Row, Input} from 'antd';
import React, {useState} from 'react';
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';
import {PageContainer} from "@ant-design/pro-components";

const Play: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState("https://virtualhuman-cos-test-1251316161.cos.ap-nanjing.myqcloud.com/virtualman-config/14782b9a-fc28-4585-b4b6-950452a2dc82-1686642268591-100M.mp4");
  // const handleReload = () => {
  //   // 更新视频源地址
  //   setVideoUrl('https://videomaker-resources.ivh.qq.com/broadcast/Basic/video/ca66d0cb-50ad-46a4-90f2-299d13859314.mp4');
  // };
  return (
    <PageContainer breadcrumb={{}}>
      <Card>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Input prefix="音视频地址：" size='large' placeholder="请输入要请求的url"
                   onChange={(e) => {
                     setVideoUrl(e.target.value);
                   }}/>
          </Col>
        </Row>
      </Card>
      <Card style={{marginTop: 10}}>
        <Row gutter={[8, 8]} justify={"center"}>
          <VideoPlayer src={videoUrl}/>
        </Row>
      </Card>
    </PageContainer>

  );
};

export default Play;
