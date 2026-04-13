import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FullSection } from '../components/Layout';
import { Title, SubTitle, MonoText, Text, CaptionText } from '../components/Typography';

const MCP_TOOLS = [
  { name: 'list_projects', desc: '列出已导入项目', readOnly: true },
  { name: 'get_project_capabilities', desc: '查看能力清单与安全属性', readOnly: true },
  { name: 'chat', desc: '发送自然语言指令（核心）', readOnly: false },
  { name: 'get_task_run_result', desc: '查询任务执行结果', readOnly: true },
  { name: 'get_session_history', desc: '回看对话历史', readOnly: true },
];

/* 场景 11：MCP 接入详解 */
export const Scene11MCPEcosystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 标题
  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // MCP 端点
  const endpointOp = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' });

  // 5 个 Tools
  const toolsGridOp = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' });

  // 交互流程
  const flowOp = interpolate(frame, [280, 310], [0, 1], { extrapolateRight: 'clamp' });

  // 安全策略
  const safetyOp = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: 'clamp' });

  // Matchbox
  const matchboxOp = interpolate(frame, [500, 530], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Chat 协议
  const chatProtoOp = interpolate(frame, [560, 590], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 底部标语
  const sloganOp = interpolate(frame, [620, 650], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f', padding: 80, color: '#ffffff' }}>
      {/* 标题 */}
      <div style={{ opacity: titleOp, marginBottom: 30 }}>
        <Title style={{ fontSize: 64, color: '#ffffff' }}>MCP 接入：Agent 如何与 LUI-for-All 交互</Title>
        <SubTitle style={{ fontSize: 30, color: '#a3a3a3', marginTop: 12 }}>
          通过标准 MCP 协议（Streamable HTTP），任何兼容 Agent 均可接入
        </SubTitle>
      </div>

      {/* MCP 端点 + 鉴权 */}
      <div style={{
        opacity: endpointOp,
        display: 'flex',
        gap: 20,
        marginBottom: 30,
      }}>
        <div style={{
          padding: '12px 24px',
          border: '2px solid #00d2ff',
          background: 'rgba(0, 210, 255, 0.08)',
        }}>
          <MonoText style={{ background: 'transparent', border: 'none', color: '#00d2ff', fontSize: 22 }}>
            端点: /mcp
          </MonoText>
        </div>
        <div style={{
          padding: '12px 24px',
          border: '1px solid #3f3f3f',
          background: '#171717',
        }}>
          <MonoText style={{ background: 'transparent', border: 'none', color: '#a3a3a3', fontSize: 22 }}>
            鉴权: Bearer Token（LUI_MCP_API_TOKEN）
          </MonoText>
        </div>
        <div style={{
          padding: '12px 24px',
          border: '1px solid #3f3f3f',
          background: '#171717',
        }}>
          <MonoText style={{ background: 'transparent', border: 'none', color: '#a3a3a3', fontSize: 22 }}>
            传输: Streamable HTTP
          </MonoText>
        </div>
      </div>

      {/* 5 个 MCP Tools */}
      <div style={{ opacity: toolsGridOp, marginBottom: 30 }}>
        <CaptionText style={{ color: '#a3a3a3', fontSize: 20, marginBottom: 12 }}>暴露 5 个 MCP Tools：</CaptionText>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {MCP_TOOLS.map((tool, i) => {
            const toolProgress = spring({ frame: frame - 80 - i * 10, fps, config: { damping: 200 } });
            const toolOp = interpolate(toolProgress, [0, 1], [0, 1]);
            const toolY = interpolate(toolProgress, [0, 1], [20, 0]);

            return (
              <div key={tool.name} style={{
                opacity: toolOp,
                transform: `translateY(${toolY}px)`,
                padding: '12px 20px',
                border: `1px solid ${tool.readOnly ? '#3f3f3f' : '#00d2ff'}`,
                background: tool.readOnly ? '#171717' : 'rgba(0, 210, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <MonoText style={{
                  background: 'transparent',
                  border: 'none',
                  color: tool.readOnly ? '#ffffff' : '#00d2ff',
                  fontSize: 18,
                  fontWeight: 600,
                }}>
                  {tool.name}
                </MonoText>
                <CaptionText style={{ color: '#737373', fontSize: 14 }}>{tool.desc}</CaptionText>
              </div>
            );
          })}
        </div>
      </div>

      {/* 交互流程 */}
      <div style={{ opacity: flowOp, marginBottom: 30 }}>
        <CaptionText style={{ color: '#a3a3a3', fontSize: 20, marginBottom: 16 }}>典型交互流程：</CaptionText>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}>
          {[
            { text: 'list_projects', label: '获取项目列表' },
            { text: '→', label: '' },
            { text: 'get_project_capabilities', label: '查看能力清单' },
            { text: '→', label: '' },
            { text: 'chat("查询本月采购单")', label: '发送指令' },
            { text: '→', label: '' },
            { text: '{ summary, tool_calls, ui_blocks }', label: '返回结果' },
          ].map((step, i) => {
            const stepProgress = spring({ frame: frame - 310 - i * 12, fps, config: { damping: 200 } });
            const stepOp = interpolate(stepProgress, [0, 1], [0, 1]);

            if (step.text === '→') {
              return (
                <div key={i} style={{ opacity: stepOp, color: '#737373', fontSize: 24 }}>→</div>
              );
            }

            const isChat = step.text.includes('chat');
            const isResult = step.text.includes('summary');

            return (
              <div key={i} style={{
                opacity: stepOp,
                padding: '8px 16px',
                border: `1px solid ${isChat ? '#00d2ff' : isResult ? '#22c55e' : '#3f3f3f'}`,
                background: isChat ? 'rgba(0, 210, 255, 0.08)' : isResult ? 'rgba(34, 197, 94, 0.08)' : '#171717',
              }}>
                <MonoText style={{
                  background: 'transparent',
                  border: 'none',
                  color: isChat ? '#00d2ff' : isResult ? '#22c55e' : '#ffffff',
                  fontSize: 16,
                }}>
                  {step.text}
                </MonoText>
                {step.label && <CaptionText style={{ color: '#737373', fontSize: 12, marginTop: 2 }}>{step.label}</CaptionText>}
              </div>
            );
          })}
        </div>
        <CaptionText style={{ color: '#a3a3a3', fontSize: 16, marginTop: 12 }}>
          chat 内部：LangGraph ReAct 循环 → 意图理解 → 接口选择 → HTTP 调用 → 汇总返回
        </CaptionText>
      </div>

      {/* 安全策略 */}
      <div style={{
        opacity: safetyOp,
        padding: 20,
        border: '1px solid #ef4444',
        background: 'rgba(239, 68, 68, 0.06)',
        marginBottom: 24,
      }}>
        <Text style={{ fontSize: 22, fontWeight: 600, color: '#ef4444', marginBottom: 8 }}>
          MCP 安全策略
        </Text>
        <CaptionText style={{ color: '#a3a3a3', fontSize: 16 }}>
          hard_write / critical 操作在 MCP 模式下自动跳过，需通过内置聊天界面审批 · 需主动将安全默认动作设为 allow 方可开放全自动通道
        </CaptionText>
      </div>

      {/* Agent Matchbox */}
      <div style={{
        opacity: matchboxOp,
        padding: 20,
        border: '1px solid #3f3f3f',
        background: '#171717',
        marginBottom: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 22, fontWeight: 700, color: '#ffffff' }}>Agent Matchbox 多模型网关</Text>
          <div style={{ display: 'flex', gap: 10 }}>
            {['GPT-4o', 'Claude 3.5', 'DeepSeek', 'Qwen'].map((model, i) => {
              const modelOp = interpolate(frame, [530 + i * 8, 548 + i * 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              return (
                <div key={model} style={{
                  opacity: modelOp,
                  padding: '4px 12px',
                  border: '1px solid #3f3f3f',
                  fontSize: 14,
                  fontFamily: 'var(--font-mono)',
                  color: i === 0 ? '#00d2ff' : '#a3a3a3',
                }}>
                  {model}
                </div>
              );
            })}
          </div>
        </div>
        <CaptionText style={{ color: '#737373', fontSize: 14, marginTop: 6 }}>
          切换模型无需改动业务代码 · Token 配额管理与用量统计
        </CaptionText>
      </div>

      {/* Chat 端点：不只是 MCP，开发者可直接嵌入 */}
      <div style={{
        opacity: chatProtoOp,
        padding: 24,
        border: '2px solid #22c55e',
        background: 'rgba(34, 197, 94, 0.06)',
        marginBottom: 16,
      }}>
        <Text style={{ fontSize: 24, fontWeight: 700, color: '#22c55e', marginBottom: 10 }}>
          Chat 端点：不只是 MCP，开发者可直接嵌入
        </Text>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { icon: '📱', label: '自有 App', desc: '嵌入你的移动端或桌面应用' },
            { icon: '⌨️', label: '终端 CLI', desc: '命令行直接对话后端' },
            { icon: '🎨', label: '自定义样式', desc: '完全控制 UI 渲染与交互' },
            { icon: '🔌', label: 'SSE 流式', desc: '实时接收 AI 思考与 UI Block' },
          ].map((item, i) => {
            const itemOp = interpolate(frame, [580 + i * 8, 596 + i * 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={item.label} style={{
                opacity: itemOp,
                padding: '10px 16px',
                border: '1px solid #3f3f3f',
                background: '#171717',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <MonoText style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: 16, fontWeight: 600 }}>{item.label}</MonoText>
                  <CaptionText style={{ color: '#737373', fontSize: 12 }}>{item.desc}</CaptionText>
                </div>
              </div>
            );
          })}
        </div>
        <CaptionText style={{ color: '#a3a3a3', fontSize: 14, marginTop: 12 }}>
          同一个 chat 端点 · MCP Agent 和自定义 GUI 共享能力内核 · 替换 UI 不替换逻辑
        </CaptionText>
      </div>

      {/* 底部标语 */}
      <div style={{
        opacity: sloganOp,
        padding: '16px 32px',
        border: '2px solid #00d2ff',
        background: 'rgba(0, 210, 255, 0.08)',
        textAlign: 'center',
      }}>
        <Text style={{ fontSize: 22, fontWeight: 600, color: '#00d2ff' }}>
          安全分级 + 人工确认 + 审计追踪 → 自动化与可控性并存
        </Text>
      </div>
    </AbsoluteFill>
  );
};
