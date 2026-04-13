import React from 'react';
import { Composition } from 'remotion';
import { Main } from './Main';
import './styles/global.css';

// 14 场景总帧数：7560 + 13 个转场各 20 帧 ≈ 7300 帧
// 转场会缩短总时长，实际约 7300 帧 ≈ 243 秒
// springTiming 转场时长由 spring 物理计算决定，这里留余量
const TOTAL_FRAMES = 7600;
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainComposition"
        component={Main}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
