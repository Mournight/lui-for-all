import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

/* 交错动画网格 */
export const StaggerGrid: React.FC<{
  children: React.ReactNode[];
  columns?: number;
  gap?: number;
  staggerDelay?: number;
  dark?: boolean;
  style?: React.CSSProperties;
}> = ({ children, columns = 2, gap = 16, staggerDelay = 6, dark = false, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
      ...style,
    }}>
      {children.map((child, i) => {
        const progress = spring({ frame: frame - i * staggerDelay, fps, config: { damping: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const translateY = interpolate(progress, [0, 1], [30, 0]);

        return (
          <div key={i} style={{ opacity, transform: `translateY(${translateY}px)` }}>
            {child}
          </div>
        );
      })}
    </div>
  );
};
