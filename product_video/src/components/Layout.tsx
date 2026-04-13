import React from 'react';
import { AbsoluteFill } from 'remotion';

/* 居中布局 */
export const ScreenCenter: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...style }}>
    {children}
  </AbsoluteFill>
);

/* 左右分屏布局 */
export const SplitLayout: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
  leftStyle?: React.CSSProperties;
  rightStyle?: React.CSSProperties;
  gap?: number;
}> = ({ left, right, leftStyle, rightStyle, gap = 60 }) => (
  <AbsoluteFill style={{ display: 'flex', padding: 80, gap }}>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...leftStyle }}>
      {left}
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...rightStyle }}>
      {right}
    </div>
  </AbsoluteFill>
);

/* 全宽区域（带 padding） */
export const FullSection: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <AbsoluteFill style={{ padding: 80, display: 'flex', flexDirection: 'column', ...style }}>
    {children}
  </AbsoluteFill>
);
