import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import { FullSection } from '../components/Layout';
import { Title, SubTitle, Text, MonoText, CaptionText } from '../components/Typography';
import { FlowNode, FlowArrow } from '../components/FlowNode';
import { VideoTextProps } from '../schemas';

/* 场景 9：LangGraph 执行内核 —— 快速过 */
export const Scene09LangGraph: React.FC<{ t: VideoTextProps }> = ({ t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // 三个流程图区域，每个约 5 秒 (150 帧)
  // 图一：顶层路由 (0-150)
  // 图二：agentic_loop (150-300)
  // 图三：收尾链路 (300-450)

  const graph1Op = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });
  const graph1Fade = interpolate(frame, [130, 150], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const graph2Op = interpolate(frame, [150, 165], [0, 1], { extrapolateRight: 'clamp' });
  const graph2Fade = interpolate(frame, [280, 300], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const graph3Op = interpolate(frame, [300, 315], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f', padding: 80, color: '#ffffff' }}>
      {/* 标题 */}
      <div style={{ opacity: titleOp, marginBottom: 50 }}>
        <Title style={{ fontSize: 64, color: '#ffffff' }}>{t.s09_title}</Title>
        <SubTitle style={{ fontSize: 32, color: '#a3a3a3', marginTop: 12 }}>
          {t.s09_subtitle}
        </SubTitle>
      </div>

      {/* 图一：顶层路由 */}
      <div style={{ opacity: graph1Op * graph1Fade, position: 'absolute', top: 220, left: 80, right: 80 }}>
        <CaptionText style={{ color: '#a3a3a3', marginBottom: 30, fontSize: 22 }}>图一：顶层节点路由</CaptionText>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <FlowNode label="💬 用户消息" delay={20} dark active />
          <FlowArrow direction="right" delay={30} dark />
          <FlowNode label="agent_entry" sublabel="加载能力地图" delay={40} dark />
          <FlowArrow direction="right" delay={50} dark />
          <FlowNode label="agentic_loop" sublabel="↩ ReAct 循环" delay={60} dark active />
          <FlowArrow direction="right" delay={70} dark />
          <FlowNode label="summarize" delay={80} dark />
          <FlowArrow direction="right" delay={90} dark />
          <FlowNode label="emit_blocks" sublabel="UI Block 装配" delay={100} dark />
        </div>
      </div>

      {/* 图二：agentic_loop 内部 */}
      <div style={{ opacity: graph2Op * graph2Fade, position: 'absolute', top: 220, left: 80, right: 80 }}>
        <CaptionText style={{ color: '#a3a3a3', marginBottom: 30, fontSize: 22 }}>图二：agentic_loop 内部（ReAct + 安全裁定）</CaptionText>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <FlowNode label="LLM 推理" delay={160} dark />
            <FlowArrow direction="right" delay={170} dark />
            <FlowNode label="安全裁定" delay={180} dark active />
          </div>
          <div style={{ display: 'flex', gap: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <CaptionText style={{ color: '#22c55e', fontSize: 18 }}>🟢 只读</CaptionText>
              <FlowNode label="直接 HTTP 执行" delay={200} dark />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <CaptionText style={{ color: '#ef4444', fontSize: 18 }}>🔴 写操作</CaptionText>
              <FlowNode label="interrupt() → ConfirmPanel" delay={210} dark active />
            </div>
          </div>
        </div>
      </div>

      {/* 图三：收尾链路 */}
      <div style={{ opacity: graph3Op, position: 'absolute', top: 220, left: 80, right: 80 }}>
        <CaptionText style={{ color: '#a3a3a3', marginBottom: 30, fontSize: 22 }}>图三：收尾链路（summarize → emit_blocks）</CaptionText>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center' }}>
          <FlowNode label="ExecutionArtifacts" delay={310} dark />
          <FlowArrow direction="right" delay={320} dark />
          <FlowNode label="summarize" sublabel="LLM 结构化总结" delay={330} dark />
          <FlowArrow direction="right" delay={340} dark />
          <FlowNode label="选取白名单组件" sublabel="data_table / echart_card / ..." delay={350} dark active />
          <FlowArrow direction="right" delay={360} dark />
          <FlowNode label="SSE 推送 → 前端渲染" delay={370} dark />
        </div>
      </div>
    </AbsoluteFill>
  );
};
