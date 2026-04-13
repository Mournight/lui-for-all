import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

/* 流程图节点 */
export const FlowNode: React.FC<{
  label: string;
  sublabel?: string;
  delay?: number;
  active?: boolean;
  dark?: boolean;
  style?: React.CSSProperties;
}> = ({ label, sublabel, delay = 0, active = false, dark = false, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.85, 1]);

  const borderColor = active ? '#00d2ff' : (dark ? '#3f3f3f' : '#e5e5e5');
  const bgColor = active ? 'rgba(0, 210, 255, 0.08)' : (dark ? '#171717' : '#ffffff');

  return (
    <div style={{
      padding: '16px 28px',
      border: `2px solid ${borderColor}`,
      background: bgColor,
      textAlign: 'center',
      opacity,
      transform: `scale(${scale})`,
      ...style,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 22,
        fontWeight: 600,
        color: active ? '#00d2ff' : (dark ? '#ffffff' : '#0f0f0f'),
      }}>
        {label}
      </div>
      {sublabel && (
        <div style={{ fontSize: 16, color: dark ? '#a3a3a3' : '#737373', marginTop: 4 }}>
          {sublabel}
        </div>
      )}
    </div>
  );
};

/* 连接箭头 */
export const FlowArrow: React.FC<{
  direction?: 'right' | 'down';
  delay?: number;
  dark?: boolean;
  style?: React.CSSProperties;
}> = ({ direction = 'right', delay = 0, dark = false, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scaleX = direction === 'right' ? interpolate(progress, [0, 1], [0, 1]) : 1;
  const scaleY = direction === 'down' ? interpolate(progress, [0, 1], [0, 1]) : 1;

  if (direction === 'right') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        opacity,
        transform: `scaleX(${scaleX})`,
        transformOrigin: 'left center',
        ...style,
      }}>
        <div style={{ width: 60, height: 3, background: dark ? '#3f3f3f' : '#e5e5e5' }} />
        <div style={{
          width: 0, height: 0,
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderLeft: `12px solid ${dark ? '#3f3f3f' : '#e5e5e5'}`,
        }} />
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity,
      transform: `scaleY(${scaleY})`,
      transformOrigin: 'top center',
      ...style,
    }}>
      <div style={{ width: 3, height: 40, background: dark ? '#3f3f3f' : '#e5e5e5' }} />
      <div style={{
        width: 0, height: 0,
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderTop: `12px solid ${dark ? '#3f3f3f' : '#e5e5e5'}`,
      }} />
    </div>
  );
};
