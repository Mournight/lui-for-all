import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ScreenCenter } from '../components/Layout';
import { Title, SubTitle, MonoText, Text, CaptionText } from '../components/Typography';
import { BrandLogo } from '../components/BrandLogo';

/* 场景 12：尾声 & CTA */
export const Scene12Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo
  const logoScale = spring({ frame, fps, config: { damping: 15, stiffness: 80, mass: 2 } });

  // 标题
  const titleOp = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = spring({ frame: frame - 20, fps, config: { damping: 200 } });

  // 副标题
  const subOp = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // GitHub
  const githubOp = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // License
  const licenseOp = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Slogan
  const sloganOp = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <ScreenCenter>
        <div style={{ textAlign: 'center' }}>
          {/* Logo */}
          <div style={{
            transform: `scale(${interpolate(logoScale, [0, 1], [0.3, 1])})`,
            marginBottom: 30,
          }}>
            <BrandLogo size={140} variant="wb" />
          </div>

          {/* 主标题 */}
          <div style={{
            opacity: titleOp,
            transform: `translateY(${interpolate(titleY, [0, 1], [50, 0])}px)`,
          }}>
            <Title className="gradient-text" style={{ fontSize: 120, marginBottom: 16 }}>
              LUI-for-All
            </Title>
          </div>

          {/* 副标题 */}
          <div style={{ opacity: subOp }}>
            <SubTitle style={{ fontSize: 56, color: '#0f0f0f' }}>
              自然语言驱动的后端操作层。
            </SubTitle>
          </div>

          {/* GitHub */}
          <div style={{ opacity: githubOp, marginTop: 60 }}>
            <MonoText style={{ fontSize: 36, padding: '16px 40px', background: '#171717', color: '#ffffff' }}>
              github.com/aidea/talk-to-interface
            </MonoText>
          </div>

          {/* License */}
          <div style={{ opacity: licenseOp, marginTop: 30 }}>
            <CaptionText style={{ fontSize: 24, color: '#737373' }}>
              Apache License 2.0 · 欢迎 Star & 贡献
            </CaptionText>
          </div>

          {/* Slogan */}
          <div style={{ opacity: sloganOp, marginTop: 50 }}>
            <Text style={{ fontSize: 40, fontWeight: 600, color: '#0f0f0f', fontFamily: 'var(--font-ui)' }}>
              让语言成为界面。
            </Text>
          </div>
        </div>
      </ScreenCenter>
    </AbsoluteFill>
  );
};
