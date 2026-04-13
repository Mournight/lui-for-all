import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

/* 动画进度条 */
export const ProgressBar: React.FC<{
  progress?: number;
  color?: string;
  height?: number;
  delay?: number;
  durationInFrames?: number;
  label?: string;
  dark?: boolean;
  style?: React.CSSProperties;
}> = ({ progress: propProgress, color = '#00d2ff', height = 10, delay = 0, durationInFrames, label, dark = false, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const animProgress = durationInFrames
    ? interpolate(frame - delay, [0, durationInFrames], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
      })
    : spring({ frame: frame - delay, fps, config: { damping: 200 } });

  const finalProgress = propProgress !== undefined ? propProgress * animProgress : animProgress;

  return (
    <div style={{ ...style }}>
      {label && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 12,
          fontSize: 28,
          fontWeight: 600,
          color: dark ? '#ffffff' : '#0f0f0f',
        }}>
          <span>{label}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: dark ? '#a3a3a3' : '#737373' }}>
            {Math.round(finalProgress * 100)}%
          </span>
        </div>
      )}
      <div style={{
        height,
        background: dark ? '#3f3f3f' : '#e5e5e5',
        width: '100%',
        position: 'relative',
      }}>
        <div style={{
          height: '100%',
          width: `${finalProgress * 100}%`,
          background: color,
          transition: 'none',
        }} />
      </div>
    </div>
  );
};
