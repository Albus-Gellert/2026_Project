# Global Water Stress Explorer — 高保真可视分析原型

这是浙江大学可视化课程 Project 2 的 UI-first 原型。项目暂时以全球水资源、水压力与行业用水结构为分析主题，使用 Vue 3、TypeScript、Vite 和 Apache ECharts 实现。

当前版本的重点不是给出最终研究结论，而是先建立一套完整、可讨论的分析界面：用户如何限定观察范围、如何从全球分布进入国家个案、如何比较国家位置、如何探索指标关系，以及如何把图表观察收束为后续需要验证的问题。

> **数据声明：** `src/mockData.ts` 中的全部数值都是 AQUASTAT-style 模拟数据，仅用于演示界面、图表和联动。它们不能被引用为 AQUASTAT 事实数据，也不能作为课程项目的最终研究结论。

## 当前状态

- 已完成一个可运行的高保真单页仪表板。
- 页面包含 01–06 六个连续分析模块，以及页首语境、范围摘要和页尾数据声明。
- 已实现世界地图、国家画像、国家排名、关系散点图与发现工作台。
- 已实现 3 个年份、6 个区域、46 个国家的确定性模拟数据，共 138 条国家—年份记录。
- 已实现年份、区域、主指标、散点图 X/Y 指标、国家搜索和重置。
- 地图、排名和散点图中的国家选择会联动国家画像及发现工作台。
- 已通过 TypeScript 检查和生产构建。
- 最终研究问题、真实变量、真实数据与最终洞察仍需团队确定。

## 项目位置

可运行的 Vue 项目位于：

```text
Project/
```

课程要求、数据来源和往届项目材料统一保存在 `Reference/` 中，不参与应用运行。

## 01–06 的整体叙述逻辑

01–06 不是六个独立页面，而是同一张仪表板中从上到下排列的六个模块。整体顺序是：

```text
选择范围 → 查看空间分布 → 查看国家详情 → 比较排名 → 探索指标关系 → 整理发现
```

## 页面模块说明

| 模块 | 作用 |
| --- | --- |
| **01 · Explore the system** | 选择年份、区域、主指标和国家。下方摘要显示当前范围的平均水压力、总取水量、高压力国家数和覆盖人口。 |
| **02 · Spatial Overview** | 用世界地图查看主指标的国家分布，发现高值区域并点击国家。 |
| **03 · Country Profile** | 显示当前国家的关键指标、范围排名、行业用水结构和区域平均对比。 |
| **04 · Country Ranking** | 按主指标排列当前范围内的国家，查看谁最高以及当前国家的位置。 |
| **05 · Relationship View** | 自选 X/Y 指标，用散点图观察指标关系、区域分组和可能的离群点。 |
| **06 · Findings Workbench** | 汇总当前国家与范围均值、区域排名和离群程度，作为后续研究问题的演示提示。 |

地图、排名和散点图都可以点击国家，其他模块会同步更新。06 中的文字由模拟数据生成，只用于展示未来结论区域的形式。

## 整体排版原则

- 01 和范围摘要通栏显示，先确定分析条件。
- 02 地图与 03 国家画像左右排列，组成“整体分布 + 单国详情”。
- 04 排名与 05 散点图左右排列，组成“数值比较 + 关系探索”。
- 06 通栏显示并使用深色背景，作为页面结尾。
- `1150px` 以下改为单栏，但仍保持 01 → 06 的阅读顺序。

## 组件职责

`App.vue` 负责全局布局、共享状态和筛选后的数据。ECharts 配置分别保留在地图、排名、散点和国家画像组件中。

- `FilterPanel` 发送筛选条件，不直接修改原始数据。
- `WorldMap`、`RankingChart` 和 `RelationshipScatter` 都发送 `selectCountry` 事件。
- `CountryProfile` 展示当前国家的关键值、行业用水构成和区域比较。
- `FindingsPanel` 生成三个演示观察，未来可替换为真实分析结论。
- `metricConfig.ts` 统一管理指标标题、单位、格式和颜色。

## 跨模块联动逻辑

六个共享状态集中在 `App.vue`：

- `selectedCountry`
- `selectedYear`
- `selectedRegion`
- `selectedMetric`
- `selectedXMetric`
- `selectedYMetric`

典型联动流程如下：

```text
用户点击地图、排名条形或散点气泡
  → 子组件发送 selectCountry
  → App.vue 更新 selectedCountry
  → 地图高亮、国家画像、排名、散点标签和发现工作台共同刷新
```

`App.vue` 负责共享状态、筛选结果和页面组合；各组件只负责自己的表达方式。指标标题、单位、格式和配色统一从 `metricConfig.ts` 读取，从而避免同一指标在不同模块中出现口径差异。

## 文件结构

```text
2026_Project/
├─ README.md                          # 项目说明、01–06 叙事与文件结构
├─ ARCHITECTURE.md                    # 组件关系、共享状态与数据流
├─ Reference/                         # 课程、数据来源与往届作品参考材料
│  ├─ Project2要求.pdf                # Project 2 课程要求
│  ├─ Reference.md                    # AQUASTAT 与往届项目链接
│  └─ Previous Project/
│     └─ 前年学长项目.png             # 往届作品界面截图
└─ Project/                           # 可运行的 Vue 仪表板项目
   ├─ public/
   │  ├─ data/world.json              # 当前地图使用的本地 GeoJSON
   │  ├─ demo-data/                    # 原始模板 Demo 数据，当前仪表板未使用
   │  └─ icon.svg
   ├─ src/
   │  ├─ App.vue                      # 当前仪表板布局、筛选与共享状态中心
   │  ├─ main.ts                      # 当前入口，直接挂载 App.vue
   │  ├─ styles.css                   # 全局视觉变量、网格与响应式布局
   │  ├─ types.ts                     # 水资源记录与指标类型
   │  ├─ metricConfig.ts              # 指标名称、单位、格式、颜色与候选项
   │  ├─ mockData.ts                  # 46 国 × 3 年模拟数据
   │  ├─ components/
   │  │  ├─ HeaderPanel.vue           # 页首主题、当前语境与数据状态
   │  │  ├─ FilterPanel.vue           # 01 筛选与搜索
   │  │  ├─ SummaryStrip.vue          # 当前范围统计摘要
   │  │  ├─ WorldMap.vue              # 02 空间总览
   │  │  ├─ CountryProfile.vue        # 03 国家画像
   │  │  ├─ RankingChart.vue          # 04 国家排名
   │  │  ├─ RelationshipScatter.vue   # 05 指标关系
   │  │  ├─ FindingsPanel.vue         # 06 发现工作台
   │  │  ├─ ConnectionGraph.vue       # 原始模板示例，当前入口未使用
   │  │  ├─ UserConnectionGraph.vue   # 原始模板示例，当前入口未使用
   │  │  └─ UserDistributionPieChart.vue # 原始模板示例，当前入口未使用
   │  ├─ pages/                        # 原始模板路由页面，当前入口未挂载
   │  ├─ router.ts                     # 保留的模板路由，main.ts 当前未启用
   │  ├─ data.ts                       # 原始模板 Demo 数据加载器
   │  ├─ models.ts                     # 原始模板 Demo 类型
   │  └─ util/colors.ts                # 原始模板颜色工具
   ├─ package.json
   ├─ pnpm-lock.yaml
   └─ vite.config.ts
```

`node_modules/` 和 `dist/` 分别是依赖目录和构建产物，因此没有展开在结构图中。`Reference/` 只用于保存课程要求、数据入口和往届参考，不参与应用运行。

## 环境要求与运行方式

- Node.js 18 或更高版本；课程材料推荐 Node.js 22 LTS。
- pnpm。

进入可运行项目目录：

```powershell
cd Project
```

首次安装并启动：

```powershell
pnpm install
pnpm run dev
```

根据终端输出打开本地地址，通常是 `http://localhost:5173/`。

检查 TypeScript 并生成生产构建：

```powershell
pnpm run build
```

## 模拟数据结构

每条 `CountryYearRecord` 包含：

- `country`、`iso3`、`region`、`year`
- `population`：百万人
- `waterStress`：百分比
- `renewableWaterResources`：km³/yr
- `totalWaterWithdrawal`：km³/yr
- `agriculturalWithdrawal`、`industrialWithdrawal`、`municipalWithdrawal`：km³/yr
- `waterUseEfficiency`：本原型中的合成指数
- `irrigatedArea`：百万公顷

模拟数据不是让每个字段独立随机变化：行业用水由总取水量和行业份额推导，年份变化由地区人口增长、资源波动和取水趋势共同产生，因此不同图表之间可以呈现一致关系和少量刻意设置的离群点。

## 哪些内容是临时的

- 页面标题 `Global Water Stress Explorer`。
- 全球水压力这一分析主题。
- 所有模拟数值及其变化规律。
- 当前的主指标和散点图候选指标。
- 国家画像中的关键指标。
- 发现工作台中的三类文案与离群点阈值。
- 当前图表组合和颜色编码。

这些内容集中在数据、指标配置和独立组件中，便于后续替换。

## 如何替换为真实数据

1. 将真实 AQUASTAT 数据预处理为 `types.ts` 中的 `CountryYearRecord` 结构，或根据最终字段修改该接口。
2. 保持 `country + year` 唯一；统一单位，避免同一字段混用 m³、百万 m³ 和 km³。
3. 将 `mockData.ts` 的导出替换为真实数据导入，例如本地 JSON、CSV 转换结果或 API 加载器。
4. 将国家名称映射到 `public/data/world.json` 的国家名称；如果名称不一致，在数据加载阶段建立显式映射表。
5. 在 `metricConfig.ts` 中更新指标标题、单位、小数位、说明和颜色。
6. 对缺失值做明确处理，不要用 0 代替未知值。
7. 删除或改写页面中的 `Prototype / Mock Data` 和演示观察文案，前提是数据已经验证。

## 如何替换图表和发现区域

- 替换地图指标：编辑 `mainMetricKeys` 和 `metricDefinitions`。
- 替换散点候选指标：编辑 `scatterMetricKeys`。
- 新增图表：创建独立组件，通过 props 接收筛选数据，通过事件发送选择结果，再在 `App.vue` 布局中组合。
- 改国家画像：修改 `CountryProfile.vue`，不要把画像逻辑放回 `App.vue`。
- 替换发现文案：在真实分析完成后，用验证过的规则或预先撰写的案例替换 `FindingsPanel.vue` 中的模拟计算。
- 如果最终研究问题不再需要地图，可以保留相同的 `selectCountry` 事件契约，用其他主视图替换 `WorldMap.vue`。

更详细的组件关系、数据流和常见修改入口见 [ARCHITECTURE.md](./ARCHITECTURE.md)。
