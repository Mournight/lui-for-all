import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ScreenCenter } from '../components/Layout';
import { SubTitle, Text, MonoText, CaptionText } from '../components/Typography';
import { VideoTextProps } from '../schemas';

/* 场景 1：痛点引入 —— 用户 + Agent 共同困境 */
export const Scene01PainPoint: React.FC<{ t: VideoTextProps }> = ({ t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 第一幕（0-250f）：用户痛点
  const line1Op = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const line1Y = spring({ frame, fps, config: { damping: 200 } });

  const line2Op = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: 'clamp' });
  const line2Y = spring({ frame: frame - 50, fps, config: { damping: 200 } });

  const painOp = interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' });

  const act1Fade = interpolate(frame, [220, 250], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 第二幕（250-500f）：Agent 痛点
  const act2Op = interpolate(frame, [250, 280], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const agentLine1Op = interpolate(frame, [290, 320], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const agentLine2Op = interpolate(frame, [340, 370], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const agentPainOp = interpolate(frame, [390, 420], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const act2Fade = interpolate(frame, [470, 500], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 第三幕（500-750f）：统一解法
  const act3Op = interpolate(frame, [500, 530], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const solutionOp = interpolate(frame, [550, 600], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const solutionScale = spring({ frame: frame - 550, fps, config: { damping: 15, stiffness: 200 } });

  const ctaOp = interpolate(frame, [660, 710], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      {/* 第一幕：用户痛点 */}
      <div style={{
        opacity: act1Fade,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <ScreenCenter>
          <div style={{ textAlign: 'center', maxWidth: 1400 }}>
            <div style={{
              opacity: line1Op,
              transform: `translateY(${interpolate(line1Y, [0, 1], [40, 0])}px)`,
            }}>
              <SubTitle style={{ color: '#0f0f0f', fontWeight: 700, fontSize: 56 }}>
                {t.s01_line1}
              </SubTitle>
            </div>

            <div style={{
              opacity: line2Op,
              transform: `translateY(${interpolate(line2Y, [0, 1], [40, 0])}px)`,
              marginTop: 40,
            }}>
              <Text style={{ color: '#737373', fontSize: 36 }}>
                {t.s01_line2}
              </Text>
            </div>

            <div style={{
              opacity: painOp,
              marginTop: 60,
              display: 'flex',
              justifyContent: 'center',
              gap: 24,
            }}>
              <MonoText style={{ color: '#737373', border: '1px solid #e5e5e5', fontSize: 28, padding: '10px 20px' }}>
                {t.s01_pain1}
              </MonoText>
              <MonoText style={{ color: '#737373', border: '1px solid #e5e5e5', fontSize: 28, padding: '10px 20px' }}>
                {t.s01_pain2}
              </MonoText>
              <MonoText style={{ color: '#737373', border: '1px solid #e5e5e5', fontSize: 28, padding: '10px 20px' }}>
                {t.s01_pain3}
              </MonoText>
            </div>
          </div>
        </ScreenCenter>
      </div>

      {/* 第二幕：Agent 痛点 */}
      <div style={{
        opacity: act2Op * act2Fade,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <ScreenCenter>
          <div style={{ textAlign: 'center', maxWidth: 1400 }}>
            <div style={{ opacity: agentLine1Op }}>
              <SubTitle style={{ color: '#0f0f0f', fontWeight: 700, fontSize: 56 }}>
                {t.s01_agentLine1}
              </SubTitle>
            </div>

            <div style={{ opacity: agentLine2Op, marginTop: 40 }}>
              <Text style={{ color: '#737373', fontSize: 36 }}>
                {t.s01_agentLine2}
              </Text>
            </div>

            <div style={{
              opacity: agentPainOp,
              marginTop: 60,
              display: 'flex',
              justifyContent: 'center',
              gap: 24,
            }}>
              <MonoText style={{ color: '#737373', border: '1px solid #e5e5e5', fontSize: 28, padding: '10px 20px' }}>
                {t.s01_agentPain1}
              </MonoText>
              <MonoText style={{ color: '#737373', border: '1px solid #e5e5e5', fontSize: 28, padding: '10px 20px' }}>
                {t.s01_agentPain2}
              </MonoText>
              <MonoText style={{ color: '#737373', border: '1px solid #e5e5e5', fontSize: 28, padding: '10px 20px' }}>
                {t.s01_agentPain3}
              </MonoText>
            </div>
          </div>
        </ScreenCenter>
      </div>

      {/* 第三幕：统一解法 */}
      <div style={{
        opacity: act3Op,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <ScreenCenter>
          <div style={{ textAlign: 'center', maxWidth: 1400 }}>
            <div style={{
              opacity: solutionOp,
              transform: `scale(${interpolate(solutionScale, [0, 1], [0.8, 1])})`,
            }}>
              <div style={{
                padding: '24px 56px',
                border: '2px solid #171717',
                background: '#171717',
                display: 'inline-block',
              }}>
                <Text style={{ fontSize: 48, fontWeight: 700, color: '#ffffff' }}>
                  {t.s01_solution}
                </Text>
              </div>
            </div>

            <div style={{
              opacity: ctaOp,
              marginTop: 60,
            }}>
              <CaptionText style={{ color: '#737373', fontSize: 28 }}>
                {t.s01_cta}
              </CaptionText>
            </div>
          </div>
        </ScreenCenter>
      </div>
    </AbsoluteFill>
  );
};
