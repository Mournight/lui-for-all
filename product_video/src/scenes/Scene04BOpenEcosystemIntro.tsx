import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ScreenCenter } from '../components/Layout';
import { Title, SubTitle, MonoText, Text, CaptionText } from '../components/Typography';

/* 场景 04B：开放生态引入 —— OpenClaw 背景 + LUI 角色 */
export const Scene04BOpenEcosystemIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 第一幕（0-150f）：OpenClaw 背景
  const act1TitleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const act1SubOp = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: 'clamp' });
  const act1Fade = interpolate(frame, [120, 150], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 第二幕（150-300f）：问题 + LUI 角色
  const act2Op = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 问题
  const questionOp = interpolate(frame, [180, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 三层图
  const agentOp = interpolate(frame, [220, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bridgeOp = interpolate(frame, [250, 270], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const luiOp = interpolate(frame, [280, 300], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 关键文字
  const keyTextOp = interpolate(frame, [320, 350], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // MCP 协议说明
  const mcpOp = interpolate(frame, [370, 400], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f' }}>
      {/* 第一幕：OpenClaw 背景 */}
      <div style={{
        opacity: act1Fade,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}>
        <ScreenCenter>
          <div style={{ textAlign: 'center' }}>
            <div style={{ opacity: act1TitleOp }}>
              <Title style={{ fontSize: 72, color: '#ffffff' }}>
                2026 年初，OpenClaw 让 AI Agent 从对话走向执行
              </Title>
            </div>
            <div style={{ opacity: act1SubOp, marginTop: 30 }}>
              <SubTitle style={{ fontSize: 36, color: '#a3a3a3' }}>
                100k+ GitHub Stars · 本地运行 · 连接真实软件
              </SubTitle>
            </div>
          </div>
        </ScreenCenter>
      </div>

      {/* 第二幕：问题 + LUI 角色 */}
      <div style={{
        opacity: act2Op,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 80,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* 问题 */}
        <div style={{ opacity: questionOp, marginBottom: 60, textAlign: 'center' }}>
          <Text style={{ fontSize: 36, color: '#a3a3a3' }}>
            Agent 能操作浏览器和文件系统，但无法结构化地访问企业后端 API
          </Text>
        </div>

        {/* 三层图 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          {/* 上层：Agent */}
          <div style={{
            opacity: agentOp,
            padding: '16px 48px',
            border: '2px solid #3f3f3f',
            background: '#171717',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <Text style={{ fontSize: 28, fontWeight: 700, color: '#ffffff' }}>OpenClaw / Claude Desktop / 自定义 Agent</Text>
            <CaptionText style={{ color: '#a3a3a3', fontSize: 18 }}>自然语言驱动</CaptionText>
          </div>

          {/* 连接线 */}
          <div style={{
            width: 4,
            height: 40,
            background: '#00d2ff',
            opacity: bridgeOp,
          }} />

          {/* MCP Bridge */}
          <div style={{
            opacity: bridgeOp,
            padding: '10px 36px',
            border: '2px solid #00d2ff',
            background: 'rgba(0, 210, 255, 0.1)',
          }}>
            <MonoText style={{ background: 'transparent', border: 'none', color: '#00d2ff', fontSize: 22, fontWeight: 600 }}>
              MCP Protocol（标准协议）
            </MonoText>
          </div>

          {/* 连接线 */}
          <div style={{
            width: 4,
            height: 40,
            background: '#00d2ff',
            opacity: bridgeOp,
          }} />

          {/* 下层：LUI-for-All */}
          <div style={{
            opacity: luiOp,
            padding: '20px 64px',
            border: '4px solid #ffffff',
            background: '#171717',
          }}>
            <Text style={{ fontSize: 36, fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-ui)' }}>
              LUI-for-All · 后端能力接入层
            </Text>
          </div>
        </div>

        {/* 关键文字 */}
        <div style={{
          opacity: keyTextOp,
          marginTop: 50,
          textAlign: 'center',
        }}>
          <Text style={{ fontSize: 30, fontWeight: 600, color: '#00d2ff' }}>
            通过 MCP 协议，Agent 获得对后端能力的结构化访问
          </Text>
        </div>

        {/* MCP 协议说明 */}
        <div style={{
          opacity: mcpOp,
          marginTop: 24,
          textAlign: 'center',
        }}>
          <CaptionText style={{ color: '#737373', fontSize: 20 }}>
            后续将展开 MCP 接入方式与交互细节
          </CaptionText>
        </div>
      </div>
    </AbsoluteFill>
  );
};
