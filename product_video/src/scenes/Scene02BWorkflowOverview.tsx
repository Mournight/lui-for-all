import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FullSection } from '../components/Layout';
import { Title, SubTitle, MonoText, Text, CaptionText } from '../components/Typography';

const STAGES = [
  {
    num: '01',
    name: '导入项目',
    desc: '填写后端 URL 或源码路径',
    detail: '零侵入 · 不改一行代码',
    color: '#00d2ff',
  },
  {
    num: '02',
    name: '自动发现',
    desc: '扫描 API 端点，生成能力地图',
    detail: 'OpenAPI + AST 双轨 · 自动标注安全等级',
    color: '#22c55e',
  },
  {
    num: '03',
    name: '自然语言操作',
    desc: '对话即操作，一句话完成',
    detail: '用户聊天 / MCP Agent / 自定义 Chat UI',
    color: '#eab308',
  },
];

/* 场景 02B：工作阶段总览 —— 三步走 */
export const Scene02BWorkflowOverview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 标题
  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 三个阶段
  const stage1Op = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' });
  const stage1Y = spring({ frame: frame - 30, fps, config: { damping: 200 } });

  const stage2Op = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: 'clamp' });
  const stage2Y = spring({ frame: frame - 80, fps, config: { damping: 200 } });

  const stage3Op = interpolate(frame, [130, 160], [0, 1], { extrapolateRight: 'clamp' });
  const stage3Y = spring({ frame: frame - 130, fps, config: { damping: 200 } });

  // 底部总结
  const summaryOp = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: 'clamp' });

  const stages = [stage1Op, stage2Op, stage3Op];
  const stageYs = [stage1Y, stage2Y, stage3Y];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f' }}>
      <FullSection>
        {/* 标题 */}
        <div style={{ opacity: titleOp, marginBottom: 60 }}>
          <Title style={{ fontSize: 64, color: '#ffffff' }}>三个阶段，从导入到操作</Title>
          <SubTitle style={{ fontSize: 32, color: '#a3a3a3', marginTop: 12 }}>
            不需要写代码，不需要改后端，三步即可让任何后端系统支持自然语言交互
          </SubTitle>
        </div>

        {/* 三个阶段 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, flex: 1 }}>
          {STAGES.map((stage, i) => {
            const opacity = stages[i];
            const yVal = stageYs[i];

            return (
              <div key={stage.num} style={{
                opacity,
                transform: `translateY(${interpolate(yVal, [0, 1], [40, 0])}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 28,
                padding: '28px 36px',
                border: `2px solid ${stage.color}`,
                background: `${stage.color}08`,
              }}>
                {/* 编号 */}
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  border: `2px solid ${stage.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 28,
                  fontWeight: 700,
                  color: stage.color,
                  flexShrink: 0,
                }}>
                  {stage.num}
                </div>

                {/* 内容 */}
                <div style={{ flex: 1 }}>
                  <Text style={{ fontSize: 32, fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
                    {stage.name}
                  </Text>
                  <CaptionText style={{ color: '#a3a3a3', fontSize: 20 }}>
                    {stage.desc}
                  </CaptionText>
                </div>

                {/* 补充说明 */}
                <div style={{
                  padding: '8px 20px',
                  background: '#171717',
                  border: '1px solid #3f3f3f',
                }}>
                  <MonoText style={{ background: 'transparent', border: 'none', color: stage.color, fontSize: 16 }}>
                    {stage.detail}
                  </MonoText>
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部总结 */}
        <div style={{
          opacity: summaryOp,
          marginTop: 40,
          padding: '20px 40px',
          border: '2px solid #171717',
          background: '#171717',
          textAlign: 'center',
        }}>
          <Text style={{ fontSize: 26, fontWeight: 600, color: '#ffffff' }}>
            不是替代 GUI，而是无声地提供自然语言的另一个入口
          </Text>
        </div>
      </FullSection>
    </AbsoluteFill>
  );
};
