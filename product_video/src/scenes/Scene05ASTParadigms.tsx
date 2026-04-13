import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FullSection } from '../components/Layout';
import { Title, SubTitle, MonoText, Text, CaptionText } from '../components/Typography';

const PARADIGMS = [
  {
    name: '注解 / 装饰器路由',
    code: '@app.get("/api/orders")',
    frameworks: 'FastAPI · Flask · Spring Boot · ASP.NET Core',
    color: '#00d2ff',
  },
  {
    name: '函数调用注册',
    code: 'app.get("/api/users", handler)',
    frameworks: 'Express · NestJS · Fastify · Gin · Echo · Chi',
    color: '#22c55e',
  },
  {
    name: '集中式路由表',
    code: 'urlpatterns = [path(...)]',
    frameworks: 'Django URLConf',
    color: '#eab308',
  },
  {
    name: '命令式分发',
    code: 'if (req.url === "/api/...")',
    frameworks: '原生 Node.js http',
    color: '#f97316',
  },
];

/* 场景 5：自动识别 6 大后端框架的路由 */
export const Scene05ASTParadigms: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 底部统一输出说明
  const unifiedOp = interpolate(frame, [180, 210], [0, 1], { extrapolateRight: 'clamp' });

  // 语言生态
  const langOp = interpolate(frame, [220, 250], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <FullSection>
        {/* 标题 */}
        <div style={{ opacity: titleOp, marginBottom: 50 }}>
          <Title style={{ fontSize: 72 }}>自动识别 6 大后端框架的路由</Title>
          <SubTitle style={{ fontSize: 36, marginTop: 16 }}>
            4 种路由范式归一化处理，无论你的后端用什么风格写，都能自动提取。
          </SubTitle>
        </div>

        {/* 四范式网格 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          flex: 1,
        }}>
          {PARADIGMS.map((p, i) => {
            const progress = spring({ frame: frame - 20 - i * 15, fps, config: { damping: 200 } });
            const opacity = interpolate(progress, [0, 1], [0, 1]);
            const translateY = interpolate(progress, [0, 1], [30, 0]);

            return (
              <div key={p.name} style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                border: `2px solid ${p.color}`,
                padding: 32,
                background: `${p.color}08`,
              }}>
                <Text style={{ fontSize: 26, color: '#0f0f0f', fontWeight: 700, marginBottom: 12 }}>{p.name}</Text>
                <MonoText style={{ background: 'transparent', border: 'none', color: p.color, fontSize: 22, padding: 0, display: 'block', marginBottom: 12 }}>
                  {p.code}
                </MonoText>
                <CaptionText style={{ fontSize: 20, color: '#737373' }}>{p.frameworks}</CaptionText>
              </div>
            );
          })}
        </div>

        {/* 统一输出说明 */}
        <div style={{
          opacity: unifiedOp,
          marginTop: 30,
          padding: '20px 40px',
          border: '1px solid #e5e5e5',
          background: '#fcfcfc',
          textAlign: 'center',
        }}>
          <Text style={{ fontSize: 26, fontWeight: 600 }}>
            统一 <MonoText style={{ fontSize: 22, background: '#171717', color: '#ffffff', border: 'none' }}>RouteSnippet</MonoText> 结构 → 同一 LLM 上下文注入流程
          </Text>
        </div>

        {/* 语言生态 */}
        <div style={{
          opacity: langOp,
          marginTop: 16,
          textAlign: 'center',
        }}>
          <CaptionText style={{ fontSize: 22, color: '#737373' }}>
            覆盖 Python · Node.js · Java · C# · Go 五大语言生态
          </CaptionText>
        </div>
      </FullSection>
    </AbsoluteFill>
  );
};
