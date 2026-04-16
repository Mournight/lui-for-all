import { z } from 'zod';

/* 所有场景文字内容的 Zod Schema，注册到 Composition 后可在 Studio 交互式编辑 */

export const videoTextSchema = z.object({
  // ── Scene01 痛点引入 ──
  s01_line1: z.string().default('企业后端系统功能完备'),
  s01_line2: z.string().default('但操作路径深：多级菜单、组合筛选、重复表单'),
  s01_pain1: z.string().default('N 层菜单'),
  s01_pain2: z.string().default('M 个表单'),
  s01_pain3: z.string().default('K 次跳转'),
  s01_agentLine1: z.string().default('OpenClaw 让 Agent 从对话走向执行'),
  s01_agentLine2: z.string().default('但 Agent 只能操控浏览器和文件系统，绕不开低效的 GUI'),
  s01_agentPain1: z.string().default('模拟点击'),
  s01_agentPain2: z.string().default('DOM 猜测'),
  s01_agentPain3: z.string().default('不稳定'),
  s01_solution: z.string().default('LUI-for-All：在任何项目为用户和 Agent 打通自然语言接口'),
  s01_cta: z.string().default('不是替代 GUI，而是无声地提供自然语言的另一个入口'),

  // ── Scene02 产品亮相 ──
  s02_title: z.string().default('LUI-for-All'),
  s02_subtitle: z.string().default('在任何项目为用户和 Agent 打通自然语言接口'),
  s02_tag1: z.string().default('零侵入'),
  s02_tag2: z.string().default('多层安全管控'),
  s02_tag3: z.string().default('企业级 AI 操作层'),

  // ── Scene02B 工作阶段总览 ──
  s02b_title: z.string().default('三个阶段，从导入到操作'),
  s02b_subtitle: z.string().default('不需要写代码，不需要改后端，三步即可让任何后端系统支持自然语言交互'),
  s02b_stage1Name: z.string().default('导入项目'),
  s02b_stage1Desc: z.string().default('填写后端 URL 或源码路径'),
  s02b_stage1Detail: z.string().default('零侵入 · 不改一行代码'),
  s02b_stage2Name: z.string().default('自动发现'),
  s02b_stage2Desc: z.string().default('扫描 API 端点，生成能力地图'),
  s02b_stage2Detail: z.string().default('OpenAPI + AST 双轨 · 自动标注安全等级'),
  s02b_stage3Name: z.string().default('自然语言操作'),
  s02b_stage3Desc: z.string().default('对话即操作，一句话完成'),
  s02b_stage3Detail: z.string().default('用户聊天 / MCP Agent / 自定义 Chat UI'),
  s02b_summary: z.string().default('不是替代 GUI，而是无声地提供自然语言的另一个入口'),

  // ── Scene03 零侵入接入 ──
  s03_title: z.string().default('零侵入挂靠'),
  s03_subtitle: z.string().default('不改一行代码，以外挂文件夹形式独立运行，随时无痛废除。'),
  s03_leftLabel: z.string().default('Legacy Backend'),
  s03_leftPath: z.string().default('/src/legacy-app'),
  s03_leftBadge: z.string().default('0 Code Changes'),
  s03_rightLabel: z.string().default('LUI-for-All'),
  s03_rightPath: z.string().default('/lui-for-all'),
  s03_point1: z.string().default('workspace/ 运行时隔离'),
  s03_point2: z.string().default('删除文件夹 = 完全移除'),
  s03_point3: z.string().default('零负担尝试接入'),
  s03_step1: z.string().default('导入项目：填写后端 URL'),
  s03_step2: z.string().default('自动发现：扫描 API 端点'),
  s03_step3: z.string().default('开始对话：自然语言操作'),

  // ── Scene04 双轨发现 ──
  s04_title: z.string().default('双轨语义发现引擎'),
  s04_subtitle: z.string().default('两种方式自动扫描你的后端，提取所有 API 端点及其语义'),
  s04_track1Name: z.string().default('OpenAPI / Swagger'),
  s04_track1Desc: z.string().default('有 Swagger/OpenAPI 文档？直接摄取，零配置'),
  s04_track1Result: z.string().default('swagger.json → routes[]'),
  s04_track2Name: z.string().default('AST 源码分析'),
  s04_track2Desc: z.string().default('没有文档？直接读源码，精准提取路由函数签名'),
  s04_track2Result: z.string().default('*.py / *.js / *.java → routes[]'),
  s04_mergeResult: z.string().default('能力地图生成：每条 API 自动标注领域、安全等级、最佳交互方式'),

  // ── Scene04B 开放生态引入 ──
  s04b_act1Title: z.string().default('2026 年初，OpenClaw 让 AI Agent 从对话走向执行'),
  s04b_act1Sub: z.string().default('100k+ GitHub Stars · 本地运行 · 连接真实软件'),
  s04b_question: z.string().default('Agent 能操作浏览器和文件系统，但无法结构化地访问企业后端 API'),
  s04b_agentLabel: z.string().default('OpenClaw / Claude Desktop / 自定义 Agent'),
  s04b_mcpLabel: z.string().default('MCP Protocol（标准协议）'),
  s04b_luiLabel: z.string().default('LUI-for-All · 后端能力接入层'),
  s04b_keyText: z.string().default('通过 MCP 协议，Agent 获得对后端能力的结构化访问'),
  s04b_hint: z.string().default('后续将展开 MCP 接入方式与交互细节'),

  // ── Scene05 AST 范式 ──
  s05_title: z.string().default('自动识别 6 大后端框架的路由'),
  s05_subtitle: z.string().default('AST 解析覆盖主流后端生态，无需文档即可提取 API 端点'),

  // ── Scene06 能力地图 ──
  s06_title: z.string().default('能力地图详解'),
  s06_subtitle: z.string().default('每个 API 端点被结构化为一项能力，标注领域、安全等级与交互方式'),
  s06_zombieNote: z.string().default('僵尸接口自动过滤 · 上游变化时重新发现即可同步'),

  // ── Scene07 UI 组件 ──
  s07_title: z.string().default('8 种白名单 UI 组件'),
  s07_subtitle: z.string().default('AI 只能从白名单中选择组件渲染，从根源约束渲染注入风险'),

  // ── Scene08 安全审批 ──
  s08_title: z.string().default('5 级安全内核 + 审批流'),
  s08_subtitle: z.string().default('每条 API 自动标注安全等级，高危操作必须人工确认'),

  // ── Scene09 LangGraph ──
  s09_title: z.string().default('LangGraph 执行内核'),
  s09_subtitle: z.string().default('意图理解 → 接口选择 → HTTP 调用 → 汇总返回，全链路 ReAct 循环'),

  // ── Scene10 AG-UI ──
  s10_title: z.string().default('AG-UI 协议 + 全链路可观测'),
  s10_subtitle: z.string().default('实时事件流 · 思考折叠 · 统一 Trace ID'),
  s10_hint: z.string().default('当用户说「查一下本月采购单」，你能看到什么？'),

  // ── Scene11 MCP 接入 ──
  s11_title: z.string().default('MCP 接入：Agent 如何与 LUI-for-All 交互'),
  s11_subtitle: z.string().default('通过标准 MCP 协议（Streamable HTTP），任何兼容 Agent 均可接入'),
  s11_safetyTitle: z.string().default('MCP 安全策略'),
  s11_safetyDesc: z.string().default('hard_write / critical 操作在 MCP 模式下自动跳过，需通过内置聊天界面审批 · 需主动将安全默认动作设为 allow 方可开放全自动通道'),
  s11_chatTitle: z.string().default('Chat 端点：不只是 MCP，开发者可直接嵌入'),
  s11_chatSummary: z.string().default('同一个 chat 端点 · MCP Agent 和自定义 GUI 共享能力内核 · 替换 UI 不替换逻辑'),
  s11_slogan: z.string().default('安全分级 + 人工确认 + 审计追踪 → 自动化与可控性并存'),

  // ── Scene12 尾声 ──
  s12_title: z.string().default('LUI-for-All'),
  s12_subtitle: z.string().default('自然语言驱动的后端操作层。'),
  s12_github: z.string().default('github.com/aidea/talk-to-interface'),
  s12_license: z.string().default('Apache License 2.0 · 欢迎 Star & 贡献'),
  s12_slogan: z.string().default('让语言成为界面。'),
});

export type VideoTextProps = z.infer<typeof videoTextSchema>;

/* 默认值（从 schema 提取） */
export const defaultVideoText: VideoTextProps = videoTextSchema.parse({});
