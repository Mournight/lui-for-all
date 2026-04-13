import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FullSection } from '../components/Layout';
import { Title, SubTitle, MonoText, Text, CaptionText } from '../components/Typography';

const CAPABILITIES = [
  { domain: '财务', name: '查询采购单', modality: 'data_table', safety: 'readonly_safe', safetyColor: '#22c55e', intent: '"查一下本月采购单"' },
  { domain: '用户管理', name: '批量删除用户', modality: 'confirm_panel', safety: 'hard_write', safetyColor: '#ef4444', intent: '"删除这批测试用户"' },
  { domain: '审批流', name: '审批工单', modality: 'confirm_panel', safety: 'soft_write', safetyColor: '#f97316', intent: '"批准这个工单"' },
  { domain: '库存', name: '库存概览', modality: 'metric_card', safety: 'readonly_safe', safetyColor: '#22c55e', intent: '"看看库存情况"' },
];

/* 场景 6：能力地图详解 */
export const Scene06CapabilityMap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 僵尸接口过滤
  const zombieOp = interpolate(frame, [250, 280], [0, 1], { extrapolateRight: 'clamp' });

  // 底部同步说明
  const syncOp = interpolate(frame, [300, 340], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <FullSection>
        {/* 标题 */}
        <div style={{ opacity: titleOp, marginBottom: 40 }}>
          <Title style={{ fontSize: 72 }}>能力地图：从代码到语义</Title>
          <SubTitle style={{ fontSize: 36, marginTop: 16 }}>
            每条路由自动归属领域、标记最佳组件、预标注安全等级。
          </SubTitle>
        </div>

        {/* 能力卡片 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          {CAPABILITIES.map((cap, i) => {
            const progress = spring({ frame: frame - 20 - i * 20, fps, config: { damping: 200 } });
            const opacity = interpolate(progress, [0, 1], [0, 1]);
            const translateX = interpolate(progress, [0, 1], [-40, 0]);

            return (
              <div key={i} style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '20px 28px',
                border: '1px solid #e5e5e5',
                background: '#ffffff',
              }}>
                {/* Domain */}
                <div style={{
                  padding: '6px 16px',
                  background: '#171717',
                  color: '#ffffff',
                  fontSize: 20,
                  fontWeight: 600,
                  fontFamily: 'var(--font-ui)',
                  minWidth: 80,
                  textAlign: 'center',
                }}>
                  {cap.domain}
                </div>

                {/* Name */}
                <Text style={{ fontSize: 28, fontWeight: 600, flex: 1 }}>{cap.name}</Text>

                {/* Modality */}
                <MonoText style={{ background: '#f4f4f4', border: '1px solid #e5e5e5', fontSize: 20, color: '#0f0f0f' }}>
                  {cap.modality}
                </MonoText>

                {/* Intent */}
                <MonoText style={{ background: 'transparent', border: 'none', fontSize: 18, color: '#737373', fontStyle: 'italic' }}>
                  {cap.intent}
                </MonoText>

                {/* Safety */}
                <div style={{
                  padding: '6px 16px',
                  border: `2px solid ${cap.safetyColor}`,
                  background: `${cap.safetyColor}11`,
                  fontSize: 18,
                  fontFamily: 'var(--font-mono)',
                  color: cap.safetyColor,
                  fontWeight: 600,
                }}>
                  {cap.safety}
                </div>
              </div>
            );
          })}

          {/* 僵尸接口 */}
          <div style={{
            opacity: zombieOp,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '20px 28px',
            border: '1px solid #e5e5e5',
            background: '#fcfcfc',
          }}>
            <div style={{
              padding: '6px 16px',
              background: '#a3a3a3',
              color: '#ffffff',
              fontSize: 20,
              fontWeight: 600,
              fontFamily: 'var(--font-ui)',
              minWidth: 80,
              textAlign: 'center',
            }}>
              未知
            </div>
            <Text style={{ fontSize: 28, color: '#a3a3a3', textDecoration: 'line-through', flex: 1 }}>
              /api/legacy/deprecated_endpoint
            </Text>
            <MonoText style={{ background: '#f4f4f4', border: '1px solid #e5e5e5', fontSize: 18, color: '#a3a3a3' }}>
              未被前端调用
            </MonoText>
            <div style={{ padding: '6px 16px', border: '1px solid #a3a3a3', fontSize: 18, fontFamily: 'var(--font-mono)', color: '#a3a3a3' }}>
              僵尸接口
            </div>
          </div>
        </div>

        {/* 底部同步说明 */}
        <div style={{
          opacity: syncOp,
          marginTop: 30,
          padding: '16px 32px',
          border: '1px solid #171717',
          background: '#171717',
          color: '#ffffff',
          textAlign: 'center',
        }}>
          <Text style={{ fontSize: 24, color: '#ffffff' }}>
            上游接口或源码一旦变化 → 重新发现即可同步
          </Text>
        </div>
      </FullSection>
    </AbsoluteFill>
  );
};
