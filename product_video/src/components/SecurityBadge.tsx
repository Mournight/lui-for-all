import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const SAFETY_LEVELS = [
  { label: 'readonly_safe', color: '#22c55e', emoji: '🟢' },
  { label: 'readonly_sensitive', color: '#eab308', emoji: '🟡' },
  { label: 'soft_write', color: '#f97316', emoji: '🟠' },
  { label: 'hard_write', color: '#ef4444', emoji: '🔴' },
  { label: 'critical', color: '#7c3aed', emoji: '🔐' },
] as const;

export type SafetyLevel = typeof SAFETY_LEVELS[number]['label'];

/* 安全等级标签 */
export const SecurityBadge: React.FC<{
  level: SafetyLevel;
  style?: React.CSSProperties;
  showEmoji?: boolean;
  delay?: number;
}> = ({ level, style, showEmoji = true, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const info = SAFETY_LEVELS.find(l => l.label === level) || SAFETY_LEVELS[0];
  const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [20, 0]);

  return (
    <div style={{
      padding: '12px 20px',
      border: `2px solid ${info.color}`,
      background: `${info.color}11`,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      opacity,
      transform: `translateY(${translateY}px)`,
      fontFamily: 'var(--font-mono)',
      fontSize: 24,
      ...style,
    }}>
      {showEmoji && <span>{info.emoji}</span>}
      <span style={{ color: info.color, fontWeight: 600 }}>{level}</span>
    </div>
  );
};

/* 安全等级阶梯（5 级全部展示） */
export const SecurityLadder: React.FC<{
  style?: React.CSSProperties;
  staggerDelay?: number;
}> = ({ style, staggerDelay = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, ...style }}>
      {SAFETY_LEVELS.map((lvl, i) => {
        const progress = spring({ frame: frame - i * staggerDelay, fps, config: { damping: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const scaleX = interpolate(progress, [0, 1], [0.8, 1]);

        return (
          <div key={lvl.label} style={{
            padding: '16px 24px',
            border: `2px solid ${lvl.color}`,
            background: `${lvl.color}08`,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            opacity,
            transform: `scaleX(${scaleX})`,
            transformOrigin: 'left center',
            fontFamily: 'var(--font-mono)',
            fontSize: 26,
          }}>
            <span>{lvl.emoji}</span>
            <span style={{ color: lvl.color, fontWeight: 600 }}>{lvl.label}</span>
            {lvl.label === 'hard_write' && (
              <span style={{ color: '#ef4444', fontSize: 18, marginLeft: 8 }}>(拦截)</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
