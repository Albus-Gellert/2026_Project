# Global Water Stress Explorer

基于 Vue 3、TypeScript 和 Apache ECharts 的全球水压力可视分析仪表板。

```powershell
pnpm install
pnpm run dev
```

生产构建：

```powershell
pnpm run build
```

## 界面模块调节指南

### 引导首页与路由

- `/`：引导首页，实现在 [`src/pages/HomePage.vue`](src/pages/HomePage.vue)。
- `/explorer`：完整仪表板，实现在 [`src/pages/ExplorerPage.vue`](src/pages/ExplorerPage.vue)。
- 路由入口位于 [`src/router.ts`](src/router.ts)，应用通过 [`src/main.ts`](src/main.ts) 安装路由。
- 仪表板顶部标题可以点击返回引导首页。

### 全局配色

颜色变量集中在 [`src/styles.css`](src/styles.css) 的 `:root`：

- `--navy`：页头和深色信息区。
- `--teal`、`--teal-dark`：主要交互色和常规数据色。
- `--sage`：低压力和自然资源辅助色。
- `--sand`：选中态与关键提示。
- `--coral`：高压力和风险提示。
- `--slate`：工业用水及第四类信息。

水压力的官方五档及配色位于 [`src/metricConfig.ts`](src/metricConfig.ts) 的 `waterStressCategories`，地图与国家卡片共用该配置；其他地图指标的五分位数样式位于同一文件的 `QUANTILE_STYLES`，区域散点色位于 `regionColors`。

### 世界地图

地图主要参数位于 [`src/components/WorldMap.vue`](src/components/WorldMap.vue)：

- `MAP_LAYOUT.center`：地图在画布中的中心位置。
- `MAP_LAYOUT.size`：地图整体缩放尺寸。
- `MAP_LAYOUT.aspectScale`：地图纵横比例；数值越小越偏横向。
- `MAP_LAYOUT.zoom`：初始缩放级别，不影响用户后续拖拽和滚轮缩放。
- `.map-panel`、`.chart-stage`：地图面板与画布的最小高度。
- 水压力采用 SDG 6.4.2 固定五档：No stress（<25%）、Low（25%–50%）、Medium（50%–75%）、High（75%–100%）、Critical（>100%）；其他指标继续按当前数据的分位数分档。
- 地图底部的颜色分段可以点击启用或排除数值范围；关闭后的国家使用 `visualMap.outOfRange` 中的灰色。
- 颜色分段的选中状态和数值区间由 `WorldMap.vue` 的 `handleRangeSelection` 发出，再由 [`src/pages/ExplorerPage.vue`](src/pages/ExplorerPage.vue) 的 `analysisData` 同步给摘要、04 排名、05 散点和结论区。
- `range-filter-note` 控制地图底部的操作说明与当前筛选国家数量。

地图和国家详情两栏的宽度比例位于 [`src/styles.css`](src/styles.css) 的 `.overview-grid`。当前使用 `2.05fr / 0.95fr`，修改这里可以整体调整地图和右侧国家详情的宽度。

### 部门取水环形图

环形图位于 [`src/components/CountryProfile.vue`](src/components/CountryProfile.vue)：

- `sectorChartStyle.center`：圆环中心位置。
- `sectorChartStyle.radius`：圆环内外半径；第二个值控制整体大小，第一个值控制圆环厚度。
- `sectorChartStyle.colors`：农业、工业和生活用水的三组颜色。
- `.sector-chart-wrap`：图表整体高度。
- `.sector-total`：中心数值位置和字号。它的 `left`、`top` 应与 `sectorChartStyle.center` 保持一致。
- `.mini-heading`：03 下半部分两个分区标题与右侧说明文字。
- `.comparison-label`、`.benchmark-track`：大洲基准的标签、数值、单位字号和基准线粗细；所选国家所属大洲的平均线固定在轨道中点，国家条长度表示该国相对该大洲平均值的位置。

### 页面文字

页面中可见的暂定版本标签已移除。指标说明集中在 [`src/metricConfig.ts`](src/metricConfig.ts)，顶部与页脚文案分别位于 [`src/components/HeaderPanel.vue`](src/components/HeaderPanel.vue) 和 [`src/pages/ExplorerPage.vue`](src/pages/ExplorerPage.vue)。

## 数据说明

系统运行时使用 [`src/data/aquastat-data.json`](src/data/aquastat-data.json) 中的 FAO AQUASTAT 数据快照，通过 [`src/aquastatData.ts`](src/aquastatData.ts) 加载；`src/mockData.ts` 只保留为早期原型记录，不再被页面引用。

- 分析范围固定为 195 个国家：193 个联合国会员国，加上 Holy See 和 Palestine。
- AQUASTAT 的国家名称和指标数据使用联合国 M49 数字代码连接，ISO3 仅用于内部地图匹配，不在页面展示。
- 缺失值保存为 `null`，地图显示为灰色，并从平均值、排名、分位数和异常值计算中排除。
- `Water stress level` 使用 SDG 6.4.2 固定五档；其他地图指标使用当前范围内有效值的五分位数。
- 数据质量代码、字段单位、覆盖数量、查询地址和生成时间记录在 [`src/data/aquastat-metadata.json`](src/data/aquastat-metadata.json)。

重新从官方来源生成快照：

```powershell
npm run data:sync
```

同步脚本位于 [`scripts/sync-aquastat.mjs`](scripts/sync-aquastat.mjs)。应用部署后直接读取仓库内快照，不会在浏览器运行时请求 FAO 接口。

完整的项目状态、组件说明、数据替换方法和新手指南见上级目录的 [`README.md`](../README.md) 与 [`ARCHITECTURE.md`](../ARCHITECTURE.md)。
