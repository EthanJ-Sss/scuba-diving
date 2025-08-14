### 潜水潜点推荐平台（Scuba Dive Sites Recommender）

本仓库用于构建一个面向全球潜水爱好者的潜点推荐与社区平台。目标是在较短周期内完成 MVP，并持续迭代到具备数据、社区、AI 推荐与商业化能力的完整平台。

---

## 1. 项目概览
- **核心价值**：
  - 全面的潜点数据库（基础信息、生物、风险、配套）
  - 地图与多维度搜索/筛选
  - 潜点详情与社区互动（评论、日志、图片/视频）
  - 智能推荐与自然语言检索（中后期）

- **技术栈**：
  - 前端：Next.js + React + TypeScript + Tailwind（Shadcn/ui）
  - 后端/BaaS：Firebase（Auth、Firestore、Storage、Functions、Hosting）
  - 地图：Mapbox（主），Google Maps（备）
  - 测试：Jest、Playwright/Cypress（后续加入）
  - 部署：Firebase Hosting

- **目录结构（初始化后）**：
```
.
├─ README.md                 # 当前文档（持续更新）
├─ cursorrule.md             # 协作与执行原则
├─ 潜水潜点推荐平台开发文档.md   # 详细产品/技术规划
└─ web/                      # Next.js 应用（MVP 与后续代码）
   ├─ app/                   # App Router 页面
   ├─ src/                   # 业务代码与组件
   ├─ public/                # 静态资源
   ├─ package.json
   ├─ next.config.js
   └─ .env.example           # 环境变量模板（需复制为 .env.local）
```

---

## 2. 环境准备
- Node.js 18+（建议 20+）
- 包管理器：npm / pnpm（默认使用 npm）
- Firebase 账号与项目
- Mapbox 账号与 Access Token

---

## 3. 快速开始
1) 初始化与安装（首次已由脚本完成，若需要手动重来）：
```
# 在仓库根目录
npx create-next-app@latest web --ts --eslint --tailwind --app --src-dir --import-alias "@/*" --use-npm
```

2) 复制环境变量模板并填写：
```
cd web
copy .env.example .env.local  # Windows
# 或：cp .env.example .env.local  # macOS/Linux
```

3) 启动开发：
```
cd web
npm install
npm run dev
```

4) 构建与预览：
```
cd web
npm run build
npm run start
```

---

## 4. 环境变量（位于 web/.env.local）
```
# 地图引擎开关（maplibre 或 mapbox），默认 maplibre（免 Token）
NEXT_PUBLIC_MAP_ENGINE=maplibre

# Mapbox（仅当引擎为 mapbox 时需要）
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=

# Firebase Web App
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

---

## 5. 数据模型（Firestore 草案）
- `users`：基础资料、等级、收藏、足迹
- `dive_sites`：潜点基础信息、环境数据、特色生物、风险、配套
- `reviews`：用户对潜点的评分与评论
- `logs`：潜水日志（日期、能见度、水温、生物观察、评分）
- `creatures`：生物字典（名称、季节、风险等级等）

详细字段定义与关系请参考《潜水潜点推荐平台开发文档.md》的数据库章节。

---

## 6. 运行与部署
- 本地开发：`npm run dev`
- 构建：`npm run build`
- 生产启动：`npm run start`
- 部署目标：Firebase Hosting（后续在 `web/firebase.json` 与 GitHub Actions/CI 中配置）

---

## 7. 质量与规范
- 代码规范：ESLint + Prettier（随 Next.js 初始化）
- 类型规范：TypeScript 严格模式
- UI 规范：Shadcn/ui 组件库与 Tailwind 设计约定
- 测试：单测（Jest）与端到端（Playwright/Cypress）逐步引入

---

## 8. 开发日志（持续更新）
- 2025-08-14：
  - 初始化 README 基础框架与项目规划
  - 已创建 `web/` Next.js 应用（TypeScript + Tailwind + App Router）
  - 已生成 `web/.env.example`
  - 首次构建通过（`npm run build`）
  - 新增 `web/src/lib/firebase.ts`（Firebase 初始化）
  - 新增 `web/src/lib/types/models.ts`（核心数据模型类型）
  - 安装 `mapbox-gl` 并新增 `web/src/components/Map.tsx` 地图组件
  - 首页集成地图（`web/src/app/page.tsx`）
  - 新增认证基础：`AuthProvider`、`login`/`register` 页、`Header` 导航、`profile` 受保护页
  - 构建通过；待补充第三方登录与表单校验
  - 首页新增搜索框与难度筛选（静态 UI），地图在无 Token 时显示引导提示
  - 切换地图为 MapLibre（免 Token），样式使用 `https://demotiles.maplibre.org/style.json`
  - 首页新增交互：名称搜索、难度筛选、结果列表点击定位地图（飞行动效）
  - 气泡内增加“查看详情”链接；输入框支持联想下拉
  - 新增详情页 `/(site)/sites/[id]` 信息区块（示例数据）

### 已知卡点与备注
- Windows PowerShell 下 `npx` 与 `cat` 管道存在兼容性问题，已通过临时提升执行策略与直接运行命令规避
- 动态引入 `Map` 组件在 Server Component 中使用 `ssr:false` 报错，已改为在 Client 组件内直接使用
- 构建期报错 `Firebase: auth/invalid-api-key`：原因是服务端预渲染时初始化了 Firebase。已将 `firebase` 初始化改为仅在浏览器端懒加载（`getFirebaseApp/getFirebaseAuth`）并在客户端组件内调用，避免 SSR 触发。
- 运行时仍可能因 `.env.local` 未配置导致 `auth/invalid-api-key`。临时方案：
  - 新增 `isFirebaseEnabled()`，当未配置时：
    - `AuthProvider` 不订阅状态
    - 登录/注册页显示提示且不调用 Firebase
    - `profile` 页面展示占位信息
  - 地图使用 MapLibre 免 Token 实现，避免 Token 配置带来的阻塞

---

## 9. ToDo（按阶段）

### 第一阶段：MVP
- [ ] 项目与基础设施：Next.js 应用、PWA、CI/CD、README 持续更新
- [ ] Firestore 结构、索引与安全规则草案
- [ ] 认证：邮箱/密码、Google 登录，会话/退出/重置
- [ ] 地图与搜索（基础）：Mapbox、标记、弹窗、名称/国家搜索
- [ ] 潜点详情页：基础信息、生物与景观、风险提示、配套信息
- [ ] 初始数据填充：Top 100 潜点与常见生物
- [ ] 质量保障：单测与基础 E2E，性能基线

### 第二阶段：社区与移动端增强
- [ ] 评论/评分、潜水日志、媒体上传与管理
- [ ] 内容审核（图片/Text）与举报机制最小版
- [ ] 高级筛选与排序，结果分页与缓存
- [ ] 移动端适配与 PWA 体验强化

### 第三阶段：AI 与数据更新、性能优化
- [ ] AI 文案与推荐，自然语言搜索
- [ ] 第三方数据接入与定时同步，清洗与版本记录
- [ ] 查询与资源优化，缓存策略与成本控制

### 第四阶段：商业化与扩展
- [ ] 会员订阅（Stripe）、广告/赞助位、合作伙伴推广
- [ ] 国际化（i18n）与数据规模化扩充
- [ ] 分析看板与洞察

---

## 10. 变更记录（Changelog）
- 0.0.1（MVP 初始化）：创建 README、初始化前端应用、环境变量模板

---

## 11. 参考
- 详见《潜水潜点推荐平台开发文档.md》附录与外部链接


