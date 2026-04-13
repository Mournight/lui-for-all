import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';

import { Scene01PainPoint } from './scenes/Scene01PainPoint';
import { Scene02ProductReveal } from './scenes/Scene02ProductReveal';
import { Scene02BWorkflowOverview } from './scenes/Scene02BWorkflowOverview';
import { Scene03ZeroIntrusion } from './scenes/Scene03ZeroIntrusion';
import { Scene04DualDiscovery } from './scenes/Scene04DualDiscovery';
import { Scene04BOpenEcosystemIntro } from './scenes/Scene04BOpenEcosystemIntro';
import { Scene05ASTParadigms } from './scenes/Scene05ASTParadigms';
import { Scene06CapabilityMap } from './scenes/Scene06CapabilityMap';
import { Scene07UIBlocks } from './scenes/Scene07UIBlocks';
import { Scene08SecurityApproval } from './scenes/Scene08SecurityApproval';
import { Scene09LangGraph } from './scenes/Scene09LangGraph';
import { Scene10AGUIObservability } from './scenes/Scene10AGUIObservability';
import { Scene11MCPEcosystem } from './scenes/Scene11MCPEcosystem';
import { Scene12Outro } from './scenes/Scene12Outro';

/* 场景时长定义（30fps） */
const SCENE_DURATIONS = {
  scene01: 750,   // 25s 痛点引入
  scene02: 300,   // 10s 产品亮相
  scene02b: 360,  // 12s 工作阶段总览（三步走）
  scene03: 660,   // 22s 零侵入接入
  scene04: 840,   // 28s 双轨发现引擎
  scene04b: 450,  // 15s 开放生态引入（OpenClaw + LUI 角色）
  scene05: 600,   // 20s 自动识别 6 大后端框架
  scene06: 540,   // 18s 能力地图详解
  scene07: 540,   // 18s 8 种 UI 组件
  scene08: 660,   // 22s 5 级安全 + 审批
  scene09: 450,   // 15s LangGraph 执行内核
  scene10: 450,   // 15s AG-UI + SSE + 可观测
  scene11: 660,   // 22s MCP 接入详解
  scene12: 360,   // 12s 尾声
} as const;

/* 转场时长 */
const TRANSITION_DURATION = 20;

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <TransitionSeries>
        {/* Scene 1: 痛点引入（白底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene01}>
          <Scene01PainPoint />
        </TransitionSeries.Sequence>

        {/* 转场：亮→暗，slide */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: 产品亮相（黑底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene02}>
          <Scene02ProductReveal />
        </TransitionSeries.Sequence>

        {/* 转场：暗→暗，slide */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2B: 工作阶段总览（黑底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene02b}>
          <Scene02BWorkflowOverview />
        </TransitionSeries.Sequence>

        {/* 转场：暗→亮，fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 } })}
        />

        {/* Scene 3: 零侵入接入（白底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene03}>
          <Scene03ZeroIntrusion />
        </TransitionSeries.Sequence>

        {/* 转场：亮→暗，wipe 强调核心创新 */}
        <TransitionSeries.Transition
          presentation={wipe()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4: 双轨发现引擎（黑底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene04}>
          <Scene04DualDiscovery />
        </TransitionSeries.Sequence>

        {/* 转场：暗→暗，fade（衔接开放生态） */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 } })}
        />

        {/* Scene 4B: 开放生态引入（黑底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene04b}>
          <Scene04BOpenEcosystemIntro />
        </TransitionSeries.Sequence>

        {/* 转场：暗→亮，fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 } })}
        />

        {/* Scene 5: 自动识别 6 大后端框架（白底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene05}>
          <Scene05ASTParadigms />
        </TransitionSeries.Sequence>

        {/* 转场：亮→亮，slide */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 6: 能力地图详解（白底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene06}>
          <Scene06CapabilityMap />
        </TransitionSeries.Sequence>

        {/* 转场：亮→亮，slide */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 7: 8 种 UI 组件（白底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene07}>
          <Scene07UIBlocks />
        </TransitionSeries.Sequence>

        {/* 转场：亮→白灰，wipe 强调安全 */}
        <TransitionSeries.Transition
          presentation={wipe()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 8: 5 级安全 + 审批（白灰底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene08}>
          <Scene08SecurityApproval />
        </TransitionSeries.Sequence>

        {/* 转场：亮→暗，slide */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 9: LangGraph 执行内核（黑底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene09}>
          <Scene09LangGraph />
        </TransitionSeries.Sequence>

        {/* 转场：暗→亮，fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 } })}
        />

        {/* Scene 10: AG-UI + SSE + 可观测（白底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene10}>
          <Scene10AGUIObservability />
        </TransitionSeries.Sequence>

        {/* 转场：亮→暗，slide */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 11: MCP 接入详解（黑底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene11}>
          <Scene11MCPEcosystem />
        </TransitionSeries.Sequence>

        {/* 转场：暗→亮，fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 } })}
        />

        {/* Scene 12: 尾声（白底） */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene12}>
          <Scene12Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
