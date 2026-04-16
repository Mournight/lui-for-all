import React from 'react';
import { Composition } from 'remotion';
import { Main } from './Main';
import { videoTextSchema } from './schemas';
import './styles/global.css';

// 14 场景总帧数：7560 + 13 个转场各 20 帧 ≈ 7300 帧
// 转场会缩短总时长，实际约 7300 帧 ≈ 243 秒
// springTiming 转场时长由 spring 物理计算决定，这里留余量
const TOTAL_FRAMES = 7600;
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainComposition"
        component={Main}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        schema={videoTextSchema}
        defaultProps={{
          s01_line1: '企业后端系统功能完备',
          s01_line2: '但操作路径深：多级菜单、组合筛选、重复表单',
          s01_pain1: 'N 层菜单',
          s01_pain2: 'M 个表单',
          s01_pain3: 'K 次跳转',
          s01_agentLine1: 'OpenClaw 让 Agent 从对话走向执行',
          s01_agentLine2: '但 Agent 只能操控浏览器和文件系统，绕不开低效的 GUI',
          s01_agentPain1: '模拟点击',
          s01_agentPain2: 'DOM 猜测',
          s01_agentPain3: '不稳定',
          s01_solution: 'LUI-for-All：在任何项目为用户和 Agent 打通自然语言接口',
          s01_cta: '不是替代 GUI，而是无声地提供自然语言的另一个入口',
          s02_title: 'LUI-for-All',
          s02_subtitle: '在任何项目为用户和 Agent 打通自然语言接口',
          s02_tag1: '零侵入',
          s02_tag2: '多层安全管控',
          s02_tag3: '企业级 AI 操作层',
          s02b_title: '三个阶段，从导入到操作',
          s02b_subtitle: '不需要写代码，不需要改后端，三步即可让任何后端系统支持自然语言交互',
          s02b_stage1Name: '导入项目',
          s02b_stage1Desc: '填写后端 URL 或源码路径',
          s02b_stage1Detail: '零侵入 · 不改一行代码',
          s02b_stage2Name: '自动发现',
          s02b_stage2Desc: '扫描 API 端点，生成能力地图',
          s02b_stage2Detail: 'OpenAPI + AST 双轨 · 自动标注安全等级',
          s02b_stage3Name: '自然语言操作',
          s02b_stage3Desc: '对话即操作，一句话完成',
          s02b_stage3Detail: '用户聊天 / MCP Agent / 自定义 Chat UI',
          s02b_summary: '不是替代 GUI，而是无声地提供自然语言的另一个入口',
          s03_title: '零侵入挂靠',
          s03_subtitle: '不改一行代码，以外挂文件夹形式独立运行，随时无痛废除。',
          s03_leftLabel: 'Legacy Backend',
          s03_leftPath: '/src/legacy-app',
          s03_leftBadge: '0 Code Changes',
          s03_rightLabel: 'LUI-for-All',
          s03_rightPath: '/lui-for-all',
          s03_point1: 'workspace/ 运行时隔离',
          s03_point2: '删除文件夹 = 完全移除',
          s03_point3: '零负担尝试接入',
          s03_step1: '导入项目：填写后端 URL',
          s03_step2: '自动发现：扫描 API 端点',
          s03_step3: '开始对话：自然语言操作',
          s04_title: '双轨语义发现引擎',
          s04_subtitle: '两种方式自动扫描你的后端，提取所有 API 端点及其语义',
          s04_track1Name: 'OpenAPI / Swagger',
          s04_track1Desc: '有 Swagger/OpenAPI 文档？直接摄取，零配置',
          s04_track1Result: 'swagger.json → routes[]',
          s04_track2Name: 'AST 源码分析',
          s04_track2Desc: '没有文档？直接读源码，精准提取路由函数签名',
          s04_track2Result: '*.py / *.js / *.java → routes[]',
          s04_mergeResult: '能力地图生成：每条 API 自动标注领域、安全等级、最佳交互方式',
          s04b_act1Title: '2026 年初，OpenClaw 让 AI Agent 从对话走向执行',
          s04b_act1Sub: '100k+ GitHub Stars · 本地运行 · 连接真实软件',
          s04b_question: 'Agent 能操作浏览器和文件系统，但无法结构化地访问企业后端 API',
          s04b_agentLabel: 'OpenClaw / Claude Desktop / 自定义 Agent',
          s04b_mcpLabel: 'MCP Protocol（标准协议）',
          s04b_luiLabel: 'LUI-for-All · 后端能力接入层',
          s04b_keyText: '通过 MCP 协议，Agent 获得对后端能力的结构化访问',
          s04b_hint: '后续将展开 MCP 接入方式与交互细节',
          s05_title: '自动识别 6 大后端框架的路由',
          s05_subtitle: 'AST 解析覆盖主流后端生态，无需文档即可提取 API 端点',
          s06_title: '能力地图详解',
          s06_subtitle: '每个 API 端点被结构化为一项能力，标注领域、安全等级与交互方式',
          s06_zombieNote: '僵尸接口自动过滤 · 上游变化时重新发现即可同步',
          s07_title: '8 种白名单 UI 组件',
          s07_subtitle: 'AI 只能从白名单中选择组件渲染，从根源约束渲染注入风险',
          s08_title: '5 级安全内核 + 审批流',
          s08_subtitle: '每条 API 自动标注安全等级，高危操作必须人工确认',
          s09_title: 'LangGraph 执行内核',
          s09_subtitle: '意图理解 → 接口选择 → HTTP 调用 → 汇总返回，全链路 ReAct 循环',
          s10_title: 'AG-UI 协议 + 全链路可观测',
          s10_subtitle: '实时事件流 · 思考折叠 · 统一 Trace ID',
          s10_hint: '当用户说「查一下本月采购单」，你能看到什么？',
          s11_title: 'MCP 接入：Agent 如何与 LUI-for-All 交互',
          s11_subtitle: '通过标准 MCP 协议（Streamable HTTP），任何兼容 Agent 均可接入',
          s11_safetyTitle: 'MCP 安全策略',
          s11_safetyDesc: 'hard_write / critical 操作在 MCP 模式下自动跳过，需通过内置聊天界面审批 · 需主动将安全默认动作设为 allow 方可开放全自动通道',
          s11_chatTitle: 'Chat 端点：不只是 MCP，开发者可直接嵌入',
          s11_chatSummary: '同一个 chat 端点 · MCP Agent 和自定义 GUI 共享能力内核 · 替换 UI 不替换逻辑',
          s11_slogan: '安全分级 + 人工确认 + 审计追踪 → 自动化与可控性并存',
          s12_title: 'LUI-for-All',
          s12_subtitle: '自然语言驱动的后端操作层。',
          s12_github: 'github.com/aidea/talk-to-interface',
          s12_license: 'Apache License 2.0 · 欢迎 Star & 贡献',
          s12_slogan: '让语言成为界面。',
        }}
      />
    </>
  );
};
