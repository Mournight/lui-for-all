import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Sequence, Easing } from 'remotion';
import { FullSection } from '../components/Layout';
import { Title, SubTitle, MonoText, Text, CaptionText } from '../components/Typography';
import { ProgressBar } from '../components/ProgressBar';
import { VideoTextProps } from '../schemas';

/* 场景 4：双轨发现引擎 —— OpenAPI + Tree-sitter AST */
export const Scene04DualDiscovery: React.FC<{ t: VideoTextProps }> = ({ t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 标题
  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Track 区域
  const trackOp = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });

  // 汇合结果
  const resultOp = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: 'clamp' });
  const resultScale = spring({ frame: frame - 180, fps, config: { damping: 200 } });

  // 降级提示
  const fallbackOp = interpolate(frame, [220, 250], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f0f0f', padding: 80, color: '#ffffff' }}>
      {/* 标题 */}
      <div style={{ opacity: titleOp, marginBottom: 50 }}>
        <Title style={{ fontSize: 72, color: '#ffffff' }}>{t.s04_title}</Title>
        <SubTitle style={{ fontSize: 36, color: '#a3a3a3', marginTop: 16 }}>
          {t.s04_subtitle}
        </SubTitle>
      </div>

      {/* 双轨道 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, opacity: trackOp }}>
        {/* Track 1: OpenAPI */}
        <div style={{ border: '2px solid #3f3f3f', padding: 36, backgroundColor: '#0f0f0f' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
            <div>
              <Text style={{ color: '#ffffff', fontSize: 30, fontWeight: 700 }}>Track 1: OpenAPI 规约摄取</Text>
              <CaptionText style={{ color: '#a3a3a3', fontSize: 18, marginTop: 4 }}>有 Swagger/OpenAPI 文档？直接摄取，零配置</CaptionText>
            </div>
            <MonoText style={{ background: 'transparent', color: '#00d2ff', border: '1px solid #00d2ff', fontSize: 22 }}>
              swagger.json → routes[]
            </MonoText>
          </div>
          <ProgressBar
            color="#00d2ff"
            height={10}
            delay={40}
            durationInFrames={120}
            dark
          />
          <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
            {['GET /api/orders', 'POST /api/users', 'DELETE /api/items/{id}'].map((route, i) => {
              const routeOp = interpolate(frame, [60 + i * 20, 80 + i * 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              return (
                <div key={i} style={{ opacity: routeOp, padding: '4px 12px', background: '#171717', border: '1px solid #3f3f3f', fontSize: 16, fontFamily: 'var(--font-mono)', color: '#00d2ff' }}>
                  {route}
                </div>
              );
            })}
          </div>
        </div>

        {/* Track 2: Tree-sitter AST */}
        <div style={{ border: '2px solid #3f3f3f', padding: 36, backgroundColor: '#0f0f0f' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
            <div>
              <Text style={{ color: '#ffffff', fontSize: 30, fontWeight: 700 }}>Track 2: Tree-sitter AST 源码解析</Text>
              <CaptionText style={{ color: '#a3a3a3', fontSize: 18, marginTop: 4 }}>没有文档？直接读源码，精准提取路由函数签名</CaptionText>
            </div>
            <MonoText style={{ background: 'transparent', color: '#ffffff', border: '1px solid #ffffff', fontSize: 22 }}>
              *.py / *.js / *.java → routes[]
            </MonoText>
          </div>
          <ProgressBar
            color="#ffffff"
            height={10}
            delay={60}
            durationInFrames={100}
            dark
          />
          <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
            {['AST Query', 'RouteSnippet', '函数体提取'].map((item, i) => {
              const itemOp = interpolate(frame, [80 + i * 20, 100 + i * 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              return (
                <div key={i} style={{ opacity: itemOp, padding: '4px 12px', background: '#171717', border: '1px solid #3f3f3f', fontSize: 16, fontFamily: 'var(--font-mono)', color: '#ffffff' }}>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 汇合结果 */}
      <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          opacity: resultOp,
          border: '2px solid #00d2ff',
          padding: '28px 56px',
          background: 'rgba(0, 210, 255, 0.08)',
          transform: `scale(${interpolate(resultScale, [0, 1], [0.9, 1])})`,
        }}>
          <Text style={{ color: '#00d2ff', fontSize: 36, fontWeight: 700, fontFamily: 'var(--font-ui)' }}>
            {t.s04_mergeResult}
          </Text>
        </div>
      </div>

      {/* 降级提示 */}
      <div style={{ marginTop: 24, textAlign: 'center', opacity: fallbackOp }}>
        <CaptionText style={{ color: '#a3a3a3', fontSize: 22 }}>
          OpenAPI 缺失时自动切换 AST 解析 · 两种通道互为兜底
        </CaptionText>
      </div>
    </AbsoluteFill>
  );
};
