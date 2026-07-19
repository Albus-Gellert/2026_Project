# Global Water Stress Explorer - 高保真原型

这是一个浙江大学可视化课程 Project 2 的 UI-first 可视分析原型。当前临时主题是全球水资源、水压力和用水结构，界面采用 Vue 3、TypeScript、Vite 与 Apache ECharts 实现。

本版本的目标是提前展示一个接近最终项目的页面形态，包括信息层级、仪表板构成、跨视图联动、国家画像和可替换的洞察区域。它不是最终研究成果，也不应被当成 AQUASTAT 的事实展示。

## 当前状态

- 已完成可运行的高保真单页仪表板。
- 已实现世界地图、国家排名、关系散点图、国家画像、行业用水构成和发现工作台。
- 已实现 3 个年份、6 个区域、46 个国家的确定性模拟数据，共 138 条国家-年份记录。
- 已实现地图、排名、散点图之间的国家选择联动。
- 已实现年份、区域、主指标、X/Y 轴指标、国家搜索和重置。
- 已通过 TypeScript 检查与生产构建。
- 最终研究问题、真实变量、最终数据与洞察仍待团队确定。

## 重要说明：数据并非事实

`src/mockData.ts` 中的值是为了让界面和交互可见而生成的 AQUASTAT-style 模拟值。国家名称、指标名称和单位看起来接近真实分析情境，但数值不能引用、解释或作为研究结论使用。

页面中的 `Current Observation`、`Country Comparison` 和 `Possible Outlier` 也是从模拟值自动生成的演示文案，只表示未来洞察区域可能如何工作。

## 项目位置

可运行的 Vue 项目位于：

```text
2025_ZJU-SummerSchool-project-template-main/
```

课程要求 PDF、往届参考材料和根目录 `Reference.md` 均保留在原位置，没有被覆盖或删除。

## 环境要求

- Node.js 18 或更高版本；课程材料推荐 Node.js 22 LTS。
- pnpm。

## 安装与运行

在 PowerShell 或终端中进入项目目录：

```powershell
cd 2025_ZJU-SummerSchool-project-template-main
```

首次运行时安装依赖：

```powershell
pnpm install
```

启动开发服务器：

```powershell
pnpm run dev
```

按照终端输出打开本地地址，通常是 `http://localhost:5173/`。

检查 TypeScript 并生成生产版本：

```powershell
pnpm run build
```

## 文件夹结构

```text
2026_Project/
├─ README.md                         # 当前文档
├─ ARCHITECTURE.md                   # 组件关系、状态和数据流说明
├─ Project2要求.pdf                   # 课程要求，未修改
├─ Reference.md                      # 数据与往届项目链接，未修改
├─ Previous Project/                 # 往届参考，未修改
└─ 2025_ZJU-SummerSchool-project-template-main/
   ├─ public/
   │  └─ data/world.json             # 本地世界地图 GeoJSON
   ├─ src/
   │  ├─ App.vue                     # 页面布局、筛选结果和共享状态
   │  ├─ main.ts                     # Vue 入口
   │  ├─ styles.css                  # 全局视觉变量与响应式布局
   │  ├─ types.ts                    # 数据和指标 TypeScript 类型
   │  ├─ metricConfig.ts             # 指标名称、单位、格式与颜色
   │  ├─ mockData.ts                 # 46 国 × 3 年模拟数据
   │  └─ components/
   │     ├─ HeaderPanel.vue          # 标题、活动国家与 Mock Data 标签
   │     ├─ FilterPanel.vue          # 年份、区域、指标、搜索与重置
   │     ├─ SummaryStrip.vue         # 当前筛选范围摘要
   │     ├─ WorldMap.vue             # 世界地图与国家点击
   │     ├─ RankingChart.vue         # 横向排名与国家点击
   │     ├─ RelationshipScatter.vue  # X/Y 指标关系与国家点击
   │     ├─ CountryProfile.vue       # 国家指标、行业构成和区域比较
   │     └─ FindingsPanel.vue        # 动态演示观察与未来洞察占位
   ├─ package.json
   └─ vite.config.ts
```

## 组件职责

`App.vue` 只负责全局布局、共享状态和筛选后的数据。ECharts 的配置分别留在地图、排名、散点和国家画像组件中，因此未来替换某个图表时不需要重写整页。

- `FilterPanel` 只发送筛选意图，不直接改数据。
- `WorldMap`、`RankingChart` 和 `RelationshipScatter` 都发送同一种 `selectCountry` 事件。
- `CountryProfile` 根据当前国家展示关键值、行业用水构成和区域平均线。
- `FindingsPanel` 根据当前筛选范围生成三个演示观察，未来可以替换为真实分析结论。
- `metricConfig.ts` 是指标显示规则的单一来源；标题、单位、格式和地图配色都从这里读取。

## 共享交互逻辑

共享状态都在 `App.vue` 中：

- `selectedCountry`
- `selectedYear`
- `selectedRegion`
- `selectedMetric`
- `selectedXMetric`
- `selectedYMetric`

交互流程示例：

1. 用户点击地图中的国家。
2. `WorldMap` 发送 `selectCountry`。
3. `App.vue` 更新 `selectedCountry`。
4. 地图、排名、散点、国家画像和发现工作台同时收到新值并重新渲染。

当区域筛选导致原国家不再可见时，页面会自动选择该区域内水压力最高的模拟国家，避免出现空画像。通过搜索选择区域外国家时，区域会自动切回 `All regions`。

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

模拟数据不是每个字段独立随机生成：各行业用水由总取水量和行业份额推导，年份变化由地区人口增长、资源波动和取水趋势共同产生，因此图表之间有可见关系和少量刻意设置的离群点。

## 哪些内容是临时的

- 页面标题 `Global Water Stress Explorer`。
- 全球水压力这一分析主题。
- 所有模拟数值及其变化规律。
- 当前的 5 个主指标和 6 个散点候选指标。
- 国家画像中的 4 个关键指标。
- 发现工作台中的三类文案与离群点阈值。
- 当前图表组合和颜色编码。

这些内容被集中在数据、指标配置和独立组件中，便于后续替换。

## 如何替换为真实数据

1. 将真实 AQUASTAT 数据预处理为 `types.ts` 中的 `CountryYearRecord` 结构，或根据最终字段修改该接口。
2. 保持 `country + year` 唯一；统一单位，避免同一字段混用 m³、百万 m³ 和 km³。
3. 将 `mockData.ts` 的导出替换为真实数据导入，例如本地 JSON、CSV 转换结果或 API 加载器。
4. 将国家名称映射到 `public/data/world.json` 的国家名称；如果名称不一致，在数据加载阶段建立显式映射表。
5. 在 `metricConfig.ts` 中更新指标标题、单位、小数位、说明和颜色。
6. 对缺失值做明确处理，不要用 0 代替未知值。
7. 删除或改写页面所有 `Prototype / Mock Data` 和演示观察文案，前提是数据已经验证。

## 如何替换图表和发现区域

- 替换地图指标：编辑 `mainMetricKeys` 和 `metricDefinitions`。
- 替换散点候选指标：编辑 `scatterMetricKeys`。
- 新增图表：创建独立组件，通过 props 接收筛选数据，通过事件发送选择结果，再在 `App.vue` 布局中组合。
- 改国家画像：修改 `CountryProfile.vue`，不要把画像逻辑放回 `App.vue`。
- 替换发现文案：在真实分析完成后，用验证过的规则或预先撰写的案例替换 `FindingsPanel.vue` 中的模拟计算。
- 如果最终研究问题不再需要地图，可以保留相同的 `selectCountry` 事件契约，用其他主视图替换 `WorldMap.vue`。

更详细的数据流和后续修改入口见 [ARCHITECTURE.md](./ARCHITECTURE.md)。
