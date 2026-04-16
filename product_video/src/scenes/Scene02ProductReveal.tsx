import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { ScreenCenter } from '../components/Layout';
import { Title, SubTitle, Text } from '../components/Typography';
import { BrandLogo } from '../components/BrandLogo';
import { VideoTextProps } from '../schemas';

/* 场景 2：产品亮相 —— Logo + Slogan + 三大标签 */
export const Scene02ProductReveal: React.FC<{ t: VideoTextProps }> = ({ t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo 入场
  const logoScale = spring({ frame, fps, config: { damping: 15, stiffness: 80, mass: 2 } });

  // 标题入场
  const titleOp = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = spring({ frame: frame - 30, fps, config: { damping: 200 } });

  // 副标题
  const subOp = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subY = spring({ frame: frame - 50, fps, config: { damping: 200 } });

  // 三个标签
  const tag1Op = interpolate(frame, [80, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tag2Op = interpolate(frame, [90, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tag3Op = interpolate(frame, [100, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f' }}>
      <ScreenCenter>
        <div style={{ textAlign: 'center' }}>
          {/* Logo */}
          <div style={{
            transform: `scale(${interpolate(logoScale, [0, 1], [0.3, 1])})`,
            marginBottom: 40,
          }}>
            <BrandLogo size={160} variant="wb" />
          </div>

          {/* 主标题 */}
          <div style={{
            opacity: titleOp,
            transform: `translateY(${interpolate(titleY, [0, 1], [50, 0])}px)`,
          }}>
            <Title style={{ fontSize: 120, marginBottom: 20, color: '#ffffff' }}>
              {t.s02_title}
            </Title>
          </div>

          {/* 副标题 */}
          <div style={{
            opacity: subOp,
            transform: `translateY(${interpolate(subY, [0, 1], [40, 0])}px)`,
          }}>
            <SubTitle style={{ fontSize: 56, color: '#ffffff' }}>
              {t.s02_subtitle}
            </SubTitle>
          </div>

          {/* 三个标签 */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 24,
            marginTop: 60,
          }}>
            {[
              { text: t.s02_tag1, op: tag1Op },
              { text: t.s02_tag2, op: tag2Op },
              { text: t.s02_tag3, op: tag3Op },
            ].map((tag, i) => (
              <div key={i} style={{
                opacity: tag.op,
                padding: '12px 28px',
                border: '1px solid #3f3f3f',
                fontFamily: 'var(--font-ui)',
                fontSize: 28,
                fontWeight: 600,
                color: '#ffffff',
                background: '#171717',
              }}>
                {tag.text}
              </div>
            ))}
          </div>
        </div>
      </ScreenCenter>
    </AbsoluteFill>
  );
};
