import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { FullSection } from '../components/Layout';
import { Title, SubTitle, MonoText, Text, CaptionText } from '../components/Typography';

const SSE_EVENTS = [
  { event: 'task_progress', desc: '节点进度', color: '#00d2ff' },
  { event: 'tool_started', desc: '工具调用开始', color: '#22c55e' },
  { event: 'token_emitted', desc: 'AI 正文流式输出', color: '#ffffff' },
  { event: 'thought_emitted', desc: 'AI 思考过程', color: '#a3a3a3' },
  { event: 'ui_block_emitted', desc: '白名单 UI Block', color: '#00d2ff' },
  { event: 'write_approval_required', desc: '审批拦截', color: '#ef4444' },
];

/* 场景 10：AG-UI + SSE + 可观测 */
export const Scene10AGUIObservability: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Trace ID
  const traceOp = interpolate(frame, [240, 270], [0, 1], { extrapolateRight: 'clamp' });

  // 标语
  const sloganOp = interpolate(frame, [300, 340], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <FullSection>
        {/* 标题 */}
        <div style={{ opacity: titleOp, marginBottom: 40 }}>
          <Title style={{ fontSize: 64 }}>AG-UI 协议 + 全链路可观测</Title>
          <SubTitle style={{ fontSize: 32, marginTop: 12 }}>
            实时事件流 · 思考折叠 · 统一 Trace ID
          </SubTitle>
          <CaptionText style={{ fontSize: 20, color: '#737373', marginTop: 8 }}>
            当用户说「查一下本月采购单」，你能看到什么？
          </CaptionText>
        </div>

        {/* SSE 事件流 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          {SSE_EVENTS.map((evt, i) => {
            const progress = spring({ frame: frame - 20 - i * 15, fps, config: { damping: 200 } });
            const opacity = interpolate(progress, [0, 1], [0, 1]);
            const translateX = interpolate(progress, [0, 1], [-60, 0]);

            return (
              <div key={evt.event} style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '16px 24px',
                border: '1px solid #e5e5e5',
                background: '#ffffff',
              }}>
                {/* 事件名 */}
                <div style={{
                  padding: '6px 16px',
                  background: '#171717',
                  color: evt.color,
                  fontSize: 20,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  minWidth: 280,
                }}>
                  {evt.event}
                </div>

                {/* 描述 */}
                <Text style={{ fontSize: 24, color: '#737373' }}>{evt.desc}</Text>

                {/* 流动指示器 */}
                <div style={{
                  marginLeft: 'auto',
                  width: 80,
                  height: 4,
                  background: `linear-gradient(90deg, transparent, ${evt.color})`,
                  opacity: interpolate(frame, [20 + i * 15, 40 + i * 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }} />
              </div>
            );
          })}
        </div>

        {/* Trace ID */}
        <div style={{
          opacity: traceOp,
          marginTop: 30,
          padding: '20px 32px',
          border: '1px solid #171717',
          background: '#171717',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
        }}>
          <CaptionText style={{ color: '#a3a3a3', fontSize: 20 }}>统一 Trace ID 贯穿三层：</CaptionText>
          <MonoText style={{ background: 'transparent', border: 'none', color: '#00d2ff', fontSize: 20 }}>FastAPI 请求层</MonoText>
          <Text style={{ color: '#737373', fontSize: 20 }}>→</Text>
          <MonoText style={{ background: 'transparent', border: 'none', color: '#00d2ff', fontSize: 20 }}>LangGraph 节点层</MonoText>
          <Text style={{ color: '#737373', fontSize: 20 }}>→</Text>
          <MonoText style={{ background: 'transparent', border: 'none', color: '#00d2ff', fontSize: 20 }}>HTTP 执行器层</MonoText>
        </div>

        {/* 标语 */}
        <div style={{ opacity: sloganOp, marginTop: 20, textAlign: 'center' }}>
          <Text style={{ fontSize: 28, fontWeight: 600, color: '#0f0f0f' }}>
            不是黑盒，每一步决策均可溯源审计。
          </Text>
        </div>
      </FullSection>
    </AbsoluteFill>
  );
};
