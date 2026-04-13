import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SplitLayout, FullSection } from '../components/Layout';
import { Title, SubTitle, MonoText, Text, CaptionText } from '../components/Typography';
import { UIBlockGrid } from '../components/UIBlockCard';

/* 场景 7：8 种白名单 UI 组件 */
export const Scene07UIBlocks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 右侧大字强调
  const emphasisOp = interpolate(frame, [200, 230], [0, 1], { extrapolateRight: 'clamp' });
  const emphasisScale = spring({ frame: frame - 200, fps, config: { damping: 200 } });

  // 底部灵感来源
  const sourceOp = interpolate(frame, [260, 290], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <FullSection>
        {/* 标题 */}
        <div style={{ opacity: titleOp, marginBottom: 40 }}>
          <Title style={{ fontSize: 72 }}>8 种白名单 UI 组件</Title>
          <SubTitle style={{ fontSize: 36, marginTop: 16 }}>
            声明式白名单渲染，模型输出仅限 8 类 JSON 组件，无法注入原始 HTML/JS/CSS。
          </SubTitle>
        </div>

        {/* 内容区 */}
        <div style={{ display: 'flex', gap: 60, flex: 1 }}>
          {/* 左侧：8 种组件网格 */}
          <div style={{ flex: 2 }}>
            <UIBlockGrid staggerDelay={8} />
          </div>

          {/* 右侧：强调信息 */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 30,
          }}>
            {/* 核心强调 */}
            <div style={{
              opacity: emphasisOp,
              transform: `scale(${interpolate(emphasisScale, [0, 1], [0.9, 1])})`,
              padding: 32,
              border: '4px solid #171717',
              background: '#171717',
              color: '#ffffff',
              textAlign: 'center',
            }}>
              <Text style={{ fontSize: 32, fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-ui)' }}>
                模型永远不允许
              </Text>
              <Text style={{ fontSize: 32, fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-ui)' }}>
                输出原始 HTML / JS / CSS
              </Text>
            </div>

            {/* JSON 协议说明 */}
            <div style={{
              opacity: emphasisOp,
              padding: 24,
              border: '1px solid #e5e5e5',
              background: '#fcfcfc',
            }}>
              <MonoText style={{ fontSize: 18, background: 'transparent', border: 'none', display: 'block', marginBottom: 8, color: '#737373' }}>
                所有界面元素均通过
              </MonoText>
              <MonoText style={{ fontSize: 20, background: '#f4f4f4', display: 'block', marginBottom: 8 }}>
                严格的声明式 JSON 协议下发
              </MonoText>
              <MonoText style={{ fontSize: 18, background: 'transparent', border: 'none', display: 'block', color: '#737373' }}>
                前端只渲染白名单组件
              </MonoText>
            </div>

            {/* 灵感来源 */}
            <div style={{ opacity: sourceOp, textAlign: 'center' }}>
              <CaptionText style={{ fontSize: 20, color: '#737373' }}>
                灵感源自 Google A2UI 协议
              </CaptionText>
              <CaptionText style={{ fontSize: 20, color: '#737373', marginTop: 4 }}>
                从渲染层消除 prompt injection 导致的 XSS 风险
              </CaptionText>
            </div>
          </div>
        </div>
      </FullSection>
    </AbsoluteFill>
  );
};
