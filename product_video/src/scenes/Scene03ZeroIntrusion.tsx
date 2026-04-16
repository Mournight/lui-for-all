import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { FullSection } from '../components/Layout';
import { Title, SubTitle, MonoText, Text, CaptionText } from '../components/Typography';
import { VideoTextProps } from '../schemas';

/* 场景 3：零侵入接入 —— 独立文件夹挂靠 */
export const Scene03ZeroIntrusion: React.FC<{ t: VideoTextProps }> = ({ t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 标题入场
  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 左侧方块
  const leftOp = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });
  const leftY = spring({ frame: frame - 20, fps, config: { damping: 200 } });

  // 连接线
  const lineProgress = spring({ frame: frame - 50, fps, config: { damping: 200 } });

  // 右侧方块
  const rightOp = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' });
  const rightY = spring({ frame: frame - 60, fps, config: { damping: 200 } });

  // 底部要点
  const point1Op = interpolate(frame, [120, 140], [0, 1], { extrapolateRight: 'clamp' });
  const point2Op = interpolate(frame, [140, 160], [0, 1], { extrapolateRight: 'clamp' });
  const point3Op = interpolate(frame, [160, 180], [0, 1], { extrapolateRight: 'clamp' });

  // 接入步骤
  const step1Op = interpolate(frame, [200, 220], [0, 1], { extrapolateRight: 'clamp' });
  const step2Op = interpolate(frame, [230, 250], [0, 1], { extrapolateRight: 'clamp' });
  const step3Op = interpolate(frame, [260, 280], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <FullSection>
        {/* 标题 */}
        <div style={{ opacity: titleOp, marginBottom: 60 }}>
          <Title style={{ fontSize: 72 }}>{t.s03_title}</Title>
          <SubTitle style={{ fontSize: 36, marginTop: 16 }}>
            {t.s03_subtitle}
          </SubTitle>
        </div>

        {/* 左右分屏 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          flex: 1,
        }}>
          {/* 左侧：Legacy Backend */}
          <div style={{
            opacity: leftOp,
            transform: `translateY(${interpolate(leftY, [0, 1], [-60, 0])}px)`,
            width: 420,
            height: 420,
            padding: 40,
            border: '1px solid #e5e5e5',
            background: '#fcfcfc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{ fontWeight: 700, fontSize: 44 }}>{t.s03_leftLabel}</Text>
            <MonoText style={{ marginTop: 24, fontSize: 22, padding: '8px 16px' }}>{t.s03_leftPath}</MonoText>
            <div style={{
              marginTop: 36,
              padding: '6px 18px',
              border: '2px solid #171717',
              fontSize: 22,
              fontWeight: 700,
              fontFamily: 'var(--font-ui)',
            }}>
              {t.s03_leftBadge}
            </div>
          </div>

          {/* 连接线 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{
              width: 4,
              height: 120,
              background: '#171717',
              transform: `scaleY(${lineProgress})`,
              transformOrigin: 'top center',
            }} />
            <div style={{
              padding: '6px 20px',
              background: '#171717',
              color: '#ffffff',
              fontSize: 20,
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              opacity: lineProgress,
            }}>
              Read Only
            </div>
            <div style={{
              width: 4,
              height: 120,
              background: '#171717',
              transform: `scaleY(${lineProgress})`,
              transformOrigin: 'top center',
            }} />
          </div>

          {/* 右侧：LUI-for-All */}
          <div style={{
            opacity: rightOp,
            transform: `translateY(${interpolate(rightY, [0, 1], [-60, 0])}px)`,
            width: 420,
            height: 420,
            padding: 40,
            border: '6px solid #171717',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{ fontWeight: 700, fontSize: 44, color: '#171717' }}>{t.s03_rightLabel}</Text>
            <MonoText style={{ marginTop: 24, fontSize: 22, background: '#171717', color: 'white', padding: '8px 16px' }}>
              {t.s03_rightPath}
            </MonoText>
            <div style={{ marginTop: 36 }}>
              <MonoText style={{ background: '#f4f4f4', fontSize: 18 }}>workspace/</MonoText>
            </div>
          </div>
        </div>

        {/* 底部要点 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 40 }}>
          <div style={{ opacity: point1Op, padding: '10px 24px', border: '1px solid #e5e5e5', fontSize: 22, fontFamily: 'var(--font-mono)' }}>
            {t.s03_point1}
          </div>
          <div style={{ opacity: point2Op, padding: '10px 24px', border: '1px solid #e5e5e5', fontSize: 22, fontFamily: 'var(--font-mono)' }}>
            {t.s03_point2}
          </div>
          <div style={{ opacity: point3Op, padding: '10px 24px', border: '2px solid #171717', fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-ui)' }}>
            {t.s03_point3}
          </div>
        </div>

        {/* 接入步骤 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginTop: 40 }}>
          <div style={{ opacity: step1Op, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#171717', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700 }}>1</div>
            <Text style={{ fontSize: 20 }}>{t.s03_step1}</Text>
          </div>
          <div style={{ opacity: step1Op, margin: '0 16px', color: '#737373', fontSize: 20 }}>→</div>
          <div style={{ opacity: step2Op, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#171717', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700 }}>2</div>
            <Text style={{ fontSize: 20 }}>{t.s03_step2}</Text>
          </div>
          <div style={{ opacity: step2Op, margin: '0 16px', color: '#737373', fontSize: 20 }}>→</div>
          <div style={{ opacity: step3Op, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#171717', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700 }}>3</div>
            <Text style={{ fontSize: 20 }}>{t.s03_step3}</Text>
          </div>
        </div>
      </FullSection>
    </AbsoluteFill>
  );
};
