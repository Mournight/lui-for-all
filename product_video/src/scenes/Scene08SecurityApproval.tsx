import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FullSection } from '../components/Layout';
import { Title, SubTitle, MonoText, Text, CaptionText } from '../components/Typography';
import { SecurityLadder } from '../components/SecurityBadge';
import { VideoTextProps } from '../schemas';

/* 场景 8：5 级安全 + 人工审批 */
export const Scene08SecurityApproval: React.FC<{ t: VideoTextProps }> = ({ t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 标题
  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // ConfirmPanel 入场
  const panelOp = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: 'clamp' });
  const panelScale = spring({ frame: frame - 120, fps, config: { damping: 200 } });

  // 红色闪烁效果（hard_write 高亮）
  const flashActive = frame > 80 && frame < 140;
  const flashOpacity = flashActive
    ? interpolate(frame % 20, [0, 10, 20], [0, 0.6, 0])
    : 0;

  // 底部 interrupt 说明
  const interruptOp = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#fcfcfc' }}>
      <FullSection>
        {/* 标题 */}
        <div style={{ opacity: titleOp, marginBottom: 40 }}>
          <Title style={{ fontSize: 72 }}>{t.s08_title}</Title>
          <SubTitle style={{ fontSize: 36, marginTop: 16 }}>
            {t.s08_subtitle}
          </SubTitle>
        </div>

        {/* 左右分屏 */}
        <div style={{ display: 'flex', gap: 60, flex: 1 }}>
          {/* 左侧：安全阶梯 */}
          <div style={{ flex: 1 }}>
            <SecurityLadder staggerDelay={10} />
          </div>

          {/* 右侧：ConfirmPanel 模拟 */}
          <div style={{ flex: 1.5, position: 'relative' }}>
            {/* ConfirmPanel */}
            <div style={{
              opacity: panelOp,
              transform: `scale(${interpolate(panelScale, [0, 1], [0.9, 1])})`,
              border: '2px solid #171717',
              background: '#ffffff',
              padding: 36,
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            }}>
              {/* 头部 */}
              <div style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: 20, marginBottom: 20 }}>
                <Text style={{ fontWeight: 700, fontSize: 32, fontFamily: 'var(--font-ui)' }}>
                  ⚠️ Human-in-the-loop 审批
                </Text>
              </div>

              {/* 说明 */}
              <Text style={{ fontSize: 22, color: '#737373', marginBottom: 16 }}>Agent 请求执行：</Text>

              {/* 请求内容 */}
              <div style={{
                padding: 16,
                background: '#f4f4f4',
                border: '1px solid #e5e5e5',
                marginBottom: 24,
              }}>
                <MonoText style={{ fontSize: 20, background: 'transparent', border: 'none', display: 'block', color: '#ef4444', fontWeight: 600 }}>
                  DELETE /api/users/batch_remove
                </MonoText>
                <CaptionText style={{ fontSize: 16, marginTop: 8 }}>
                  安全等级: hard_write · 影响: 批量删除用户数据
                </CaptionText>
              </div>

              {/* 审批推理 */}
              <div style={{
                padding: 12,
                background: '#fff8e1',
                border: '1px solid #f9a825',
                marginBottom: 24,
              }}>
                <CaptionText style={{ fontSize: 16, color: '#6d4c00' }}>
                  AI 推理：此操作涉及批量删除，属于高危操作，需要人工确认后方可执行。
                </CaptionText>
              </div>

              {/* 按钮 */}
              <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
                <div style={{
                  padding: '14px 28px',
                  border: '1px solid #e5e5e5',
                  fontSize: 22,
                  fontWeight: 500,
                  color: '#737373',
                }}>
                  拒绝
                </div>
                <div style={{
                  padding: '14px 28px',
                  background: '#171717',
                  color: '#ffffff',
                  fontSize: 22,
                  fontWeight: 700,
                  fontFamily: 'var(--font-ui)',
                }}>
                  Approve 执行
                </div>
              </div>
            </div>

            {/* 红色闪烁边框 */}
            {flashActive && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: '4px solid #ef4444',
                opacity: flashOpacity,
                pointerEvents: 'none',
              }} />
            )}
          </div>
        </div>

        {/* 底部说明 */}
        <div style={{
          opacity: interruptOp,
          marginTop: 30,
          padding: '16px 32px',
          background: '#171717',
          color: '#ffffff',
          textAlign: 'center',
        }}>
          <Text style={{ fontSize: 24, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
            interrupt() 硬性暂停 → 用户确认后 Graph 从断点恢复 → 拒绝则跳过并记录审计日志
          </Text>
        </div>
      </FullSection>
    </AbsoluteFill>
  );
};
