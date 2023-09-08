import React from 'react';
import {
  Player,
  ControlBar,
  PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
  ReplayControl, // 后退按钮
  ForwardControl,  // 前进按钮
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,  // 倍速播放选项
  VolumeMenuButton,
  BigPlayButton
} from 'video-react';
import "video-react/dist/video-react.css"; // import css
interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  width_?: number;
  height_?: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({src, autoPlay = false, width_ = 1510, height_ = 850}) => {

  return (
    <Player
      src={src}
      autoPlay={autoPlay}
      fluid={false}
      width={width_}
      height={height_}>
      <BigPlayButton position="center"/>
      <ControlBar autoHide={false}>
        <VolumeMenuButton vertical/>
        <ReplayControl seconds={10}/>
        <ForwardControl seconds={10}/>
        <PlayToggle/>
        <CurrentTimeDisplay order={4.1}/>
        <TimeDivider order={4.2}/>
        <PlaybackRateMenuButton rates={[5, 2, 1.5, 1.25, 1, 0.5]}/>
      </ControlBar>
    </Player>

  );
};

export default VideoPlayer;
