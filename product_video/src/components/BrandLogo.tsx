import React from 'react';
import { staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

/* LUI-for-All 品牌 Logo 组件，从 public/ 加载 SVG */
export const BrandLogo: React.FC<{
  size?: number;
  variant?: 'bw' | 'wb';
  style?: React.CSSProperties;
  animate?: boolean;
}> = ({ size = 120, variant = 'bw', style, animate = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const src = variant === 'bw' ? staticFile('logo_bw.svg') : staticFile('logo_wb.svg');

  const scale = animate
    ? spring({ frame, fps, config: { damping: 200 } })
    : 1;

  const opacity = animate
    ? interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' })
    : 1;

  return (
    <img
      src={src}
      alt="LUI-for-All Logo"
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        transform: `scale(${scale})`,
        opacity,
        ...style,
      }}
    />
  );
};
