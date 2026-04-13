import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const UI_BLOCKS = [
  { type: 'text_block', desc: '默认自然语言回答', icon: '📝' },
  { type: 'metric_card', desc: '关键指标面板', icon: '📊' },
  { type: 'data_table', desc: '可分页数据表', icon: '📋' },
  { type: 'echart_card', desc: '配置驱动图表', icon: '📈' },
  { type: 'confirm_panel', desc: '高危操作审批拦截', icon: '⚠️' },
  { type: 'filter_form', desc: '参数补充收集', icon: '🔍' },
  { type: 'timeline_card', desc: '事件序列与流转', icon: '🕐' },
  { type: 'diff_card', desc: '对照与变化展示', icon: '🔄' },
] as const;

/* 单个 UI Block 卡片 */
export const UIBlockCard: React.FC<{
  type: string;
  desc: string;
  icon: string;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ type, desc, icon, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div style={{
      padding: '20px 24px',
      border: '1px solid #e5e5e5',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      opacity,
      transform: `translateY(${translateY}px)`,
      ...style,
    }}>
      <span style={{ fontSize: 36 }}>{icon}</span>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 600, color: '#0f0f0f' }}>{type}</div>
        <div style={{ fontSize: 20, color: '#737373', marginTop: 4 }}>{desc}</div>
      </div>
    </div>
  );
};

/* 8 种 UI Block 网格展示 */
export const UIBlockGrid: React.FC<{
  style?: React.CSSProperties;
  staggerDelay?: number;
  dark?: boolean;
}> = ({ style, staggerDelay = 6, dark = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      opacity: gridOpacity,
      ...style,
    }}>
      {UI_BLOCKS.map((block, i) => {
        const progress = spring({ frame: frame - 15 - i * staggerDelay, fps, config: { damping: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const translateY = interpolate(progress, [0, 1], [30, 0]);

        return (
          <div key={block.type} style={{
            padding: '20px 24px',
            border: `1px solid ${dark ? '#3f3f3f' : '#e5e5e5'}`,
            background: dark ? '#171717' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            opacity,
            transform: `translateY(${translateY}px)`,
          }}>
            <span style={{ fontSize: 36 }}>{block.icon}</span>
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 24,
                fontWeight: 600,
                color: dark ? '#ffffff' : '#0f0f0f',
              }}>
                {block.type}
              </div>
              <div style={{ fontSize: 20, color: dark ? '#a3a3a3' : '#737373', marginTop: 4 }}>
                {block.desc}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
