import {message, Card, Row, Button,Space} from 'antd';
import React, {useRef} from 'react';
import {PageContainer} from "@ant-design/pro-components";
import {VideoCameraAddOutlined} from "@ant-design/icons"
import useMediaRecorder from "@/hooks/useMediaRecorder";
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer';

const ScreenCap: React.FC = () => {
  const {
    mediaUrl,
    isMuted,
    startRecord,
    resumeRecord,
    pauseRecord,
    stopRecord,
    clearBlobUrl,
    getMediaStream,
    toggleMute,
  } = useMediaRecorder({
    audio: true,
    screen: true,
    onStop: (url: string) => message.success(`录屏完成，${url}`)
  });

  const previewVideo = useRef<HTMLVideoElement>(null)
  return (
    <PageContainer breadcrumb={{}}>
      <Card>
        <Row gutter={[8, 8]}>
          <Space size={'middle'}>
            {/*<Button onClick={() => previewVideo.current!.srcObject = getMediaStream() || null}>*/}
            {/*  预览*/}
            {/*</Button>*/}
            <Button type="primary" size="large" onClick={startRecord}><VideoCameraAddOutlined />开始</Button>
            <Button type="primary" size="large" onClick={pauseRecord}>暂停</Button>
            <Button type="primary" size="large" onClick={resumeRecord}>恢复</Button>
            <Button type="primary" size="large" onClick={stopRecord}>停止</Button>
            <Button type="primary" size="large" onClick={() => toggleMute(!isMuted)}>{isMuted ? '打开声音' : '禁音'}</Button>
            {/*<Button type="primary" size="large" onClick={clearBlobUrl}>清除 URL</Button>*/}
          </Space>
        </Row>

      </Card>
      <Card style={{marginTop: 10}}>
        <Row gutter={[8, 8]} justify={"center"}>
          <VideoPlayer src={mediaUrl}/>
          {/*<video ref={previewVideo} controls />*/}
        </Row>
      </Card>
    </PageContainer>

  );
};

export default ScreenCap;
