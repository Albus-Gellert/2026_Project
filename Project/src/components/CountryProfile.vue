<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import type { CountryYearRecord, MetricKey } from '../types'
import { formatMetric, formatPlain, getWaterStressCategory, metricDefinitions } from '../metricConfig'

const props = defineProps<{
  data: CountryYearRecord[]
  selectedCountry: string
  activeMetric: MetricKey
}>()

const record = computed(() => props.data.find((item) => item.country === props.selectedCountry))
const regionalData = computed(() => record.value
  ? props.data.filter((item) => item.region === record.value?.region)
  : [])

const sectorChartStyle = {
  center: ['32%', '52%'],
  radius: ['57%', '86%'],
  colors: {
    agriculture: '#c3a15b',
    industry: '#617b86',
    municipal: '#4e8b80',
  },
}

function average(key: MetricKey): number {
  const values = regionalData.value
    .map((item) => item[key] as number)
    .filter(Number.isFinite)
  if (!values.length) return 0
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

const rank = computed(() => {
  if (!record.value) return 0
  return [...props.data]
    .sort((a, b) => (b[props.activeMetric] as number) - (a[props.activeMetric] as number))
    .findIndex((item) => item.country === record.value?.country) + 1
})

const metricDisplayInfo = computed(() => {
  if (!record.value) return null

  const definition = metricDefinitions[props.activeMetric]
  const value = record.value[props.activeMetric] as number
  const accentIndex = Math.max(definition.palette.length - 2, 0)
  let color = definition.palette[accentIndex]
  let surface = definition.palette[0]
  let foreground = definition.palette[definition.palette.length - 1]
  let categoryName: string | null = null

  if (props.activeMetric === 'waterStress') {
    const category = getWaterStressCategory(value)
    color = category.color
    surface = category.surface
    foreground = category.foreground
    categoryName = category.name
  }

  return {
    label: definition.label,
    value: formatMetric(value, props.activeMetric),
    categoryName,
    color,
    surface,
    foreground,
  }
})

const sectorOption = computed(() => {
  if (!record.value) return {}
  const selected = record.value
  return {
    animationDurationUpdate: 350,
    textStyle: { fontFamily: 'Segoe UI Variable, Segoe UI, sans-serif' },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#173942',
      borderWidth: 0,
      textStyle: { color: '#fff', fontSize: 12 },
      formatter: (params: any) => `<strong>${params.name}</strong><br/>${formatPlain(params.value, 1)} km³/yr · ${formatPlain(params.percent, 0)}%`,
    },
    legend: {
      orient: 'vertical',
      right: 0,
      top: 'center',
      itemWidth: 9,
      itemHeight: 9,
      itemGap: 13,
      textStyle: { color: '#4f6669', fontSize: 13, fontWeight: 500 },
    },
    series: [{
      type: 'pie',
      radius: sectorChartStyle.radius,
      center: sectorChartStyle.center,
      avoidLabelOverlap: true,
      label: { show: false },
      itemStyle: { borderColor: '#fff', borderWidth: 2 },
      data: [
        { name: 'Agriculture', value: selected.agriculturalWithdrawal, itemStyle: { color: sectorChartStyle.colors.agriculture } },
        { name: 'Industry', value: selected.industrialWithdrawal, itemStyle: { color: sectorChartStyle.colors.industry } },
        { name: 'Municipal', value: selected.municipalWithdrawal, itemStyle: { color: sectorChartStyle.colors.municipal } },
      ],
    }],
  }
})

const comparisons = computed(() => {
  if (!record.value) return []
  const selected = record.value
  return [
    { label: 'Water stress', value: selected.waterStress, benchmark: average('waterStress'), unit: '%' },
    { label: 'Use efficiency', value: selected.waterUseEfficiency, benchmark: average('waterUseEfficiency'), unit: 'index' },
    { label: 'Resources / capita', value: selected.renewableWaterResources / selected.population, benchmark: averagePerCapita(), unit: 'thousand m³' },
  ].map((item) => ({
    ...item,
    // The selected country's continental mean is the fixed midpoint.
    countryPosition: item.benchmark > 0
      ? Math.min(Math.max(item.value / item.benchmark * 50, 0), 100)
      : item.value > 0 ? 100 : 50,
  }))
})

function averagePerCapita(): number {
  const values = regionalData.value
    .filter((item) => item.population > 0)
    .map((item) => item.renewableWaterResources / item.population)
    .filter(Number.isFinite)
  if (!values.length) return 0
  return values.reduce((sum, value) => sum + value, 0) / values.length
}
</script>

<template>
  <aside class="panel profile-panel">
    <template v-if="record">
      <header class="profile-header">
        <div>
          <div class="section-kicker"><span>03</span> COUNTRY PROFILE</div>
          <h2>{{ record.country }}</h2>
          <p>{{ record.region }} · {{ record.iso3 }}</p>
        </div>
        <div class="rank-chip">
          <span>Scope rank</span>
          <strong>#{{ rank }}</strong>
          <small>by {{ metricDefinitions[activeMetric].shortLabel.toLowerCase() }}</small>
        </div>
      </header>

      <div
        v-if="metricDisplayInfo"
        class="signal-banner"
        :style="{
          '--lens-color': metricDisplayInfo.color,
          '--lens-surface': metricDisplayInfo.surface,
          '--lens-foreground': metricDisplayInfo.foreground,
        }"
      >
        <div class="signal-mark"></div>
        <div>
          <span>{{ metricDisplayInfo.label }} lens</span>
          <strong v-if="metricDisplayInfo.categoryName">{{ metricDisplayInfo.categoryName }}</strong>
        </div>
        <b>{{ metricDisplayInfo.value }}</b>
      </div>

      <div class="indicator-grid">
        <div class="indicator">
          <span>Renewable resources</span>
          <strong>{{ formatPlain(record.renewableWaterResources, 1) }}</strong>
          <small>km³ / year</small>
        </div>
        <div class="indicator">
          <span>Total withdrawal</span>
          <strong>{{ formatPlain(record.totalWaterWithdrawal, 1) }}</strong>
          <small>km³ / year</small>
        </div>
        <div class="indicator">
          <span>Use efficiency</span>
          <strong>{{ formatPlain(record.waterUseEfficiency, 1) }}</strong>
          <small>efficiency index</small>
        </div>
        <div class="indicator">
          <span>Irrigated area</span>
          <strong>{{ formatPlain(record.irrigatedArea, 2) }}</strong>
          <small>million hectares</small>
        </div>
      </div>

      <div class="profile-section sector-section">
        <div class="mini-heading">
          <strong>Withdrawal by sector</strong>
          <span>sector share</span>
        </div>
        <div class="sector-chart-wrap">
          <VChart class="sector-chart" :option="sectorOption" autoresize />
          <div class="sector-total">
            <strong>{{ formatPlain(record.totalWaterWithdrawal, 1) }}</strong>
            <span>km³/yr</span>
          </div>
        </div>
      </div>

      <div class="profile-section compare-section">
        <div class="mini-heading benchmark-heading">
          <div>
            <strong>Continental benchmark</strong>
            <small>{{ record.region }} · {{ record.year }} · {{ regionalData.length }} countries</small>
          </div>
          <span><i class="country-key"></i> country <i class="average-key"></i> continent avg</span>
        </div>
        <div v-for="item in comparisons" :key="item.label" class="comparison-row">
          <div class="comparison-label">
            <span>{{ item.label }}</span>
            <div class="comparison-values">
              <b>{{ formatPlain(item.value, 1) }} <small>{{ item.unit }}</small></b>
              <em>avg {{ formatPlain(item.benchmark, 1) }}</em>
            </div>
          </div>
          <div class="benchmark-track">
            <span class="country-bar" :style="{ width: `${item.countryPosition}%` }"></span>
            <i class="average-marker"></i>
          </div>
        </div>
      </div>
    </template>
  </aside>
</template>

<style scoped>
.profile-panel { min-height: 540px; }
.profile-header { display: flex; justify-content: space-between; gap: 20px; padding-bottom: 15px; border-bottom: 1px solid var(--line); }
.profile-header h2 { margin: 8px 0 3px; font-size: 28px; font-weight: 650; line-height: 1.15; letter-spacing: -.035em; color: var(--ink); }
.profile-header p { margin: 0; color: var(--muted); font-size: 13px; }

.rank-chip { min-width: 106px; padding: 11px 12px; border-radius: 7px; background: #edf2ee; text-align: right; }
.rank-chip span, .rank-chip small { display: block; color: #607a78; font-size: 11px; }
.rank-chip strong { display: block; margin: 2px 0; color: var(--teal-dark); font-size: 22px; font-weight: 700; font-variant-numeric: tabular-nums; }

.signal-banner { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 12px; margin: 16px 0; padding: 12px 14px; border-left: 3px solid var(--lens-color); background: var(--lens-surface); }
.signal-mark { width: 9px; height: 9px; border-radius: 50%; background: var(--lens-color); box-shadow: 0 0 0 4px color-mix(in srgb, var(--lens-color) 18%, transparent); }
.signal-banner div:nth-child(2) { display: grid; min-width: 0; gap: 2px; }
.signal-banner span { color: var(--lens-foreground); font-size: 11px; font-weight: 800; line-height: 1.3; text-transform: uppercase; letter-spacing: .08em; overflow-wrap: anywhere; }
.signal-banner strong { color: var(--lens-foreground); font-size: 13px; }
.signal-banner b { color: var(--lens-foreground); font-size: 20px; font-weight: 700; font-variant-numeric: tabular-nums; white-space: nowrap; }

.indicator-grid { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--line); border-radius: 5px; overflow: hidden; }
.indicator { padding: 13px 14px; display: grid; gap: 3px; }
.indicator:nth-child(even) { border-left: 1px solid var(--line); }
.indicator:nth-child(n+3) { border-top: 1px solid var(--line); }
.indicator span { color: #52696c; font-size: 11px; font-weight: 800; letter-spacing: .045em; text-transform: uppercase; }
.indicator strong { margin-top: 3px; color: var(--ink); font-size: 21px; font-weight: 650; font-variant-numeric: tabular-nums; }
.indicator small { color: #5f7477; font-size: 12px; line-height: 1.35; }

.profile-section { margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--line); }
.mini-heading { display: flex; align-items: center; justify-content: space-between; }
.mini-heading strong { color: #294a4f; font-size: 14px; font-weight: 700; line-height: 1.3; }
.mini-heading span { color: #607477; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .065em; }
.mini-heading i { display: inline-block; margin: 0 3px; vertical-align: middle; }
.sector-chart-wrap { position: relative; height: 154px; }
.sector-chart { width: 100%; height: 100%; }
.sector-total {
  position: absolute;
  left: 32%;
  top: 52%;
  z-index: 1;
  display: grid;
  justify-items: center;
  transform: translate(-50%, -50%);
  color: var(--ink);
  line-height: 1.05;
  pointer-events: none;
}
.sector-total strong { font-size: 18px; font-weight: 750; font-variant-numeric: tabular-nums; }
.sector-total span { margin-top: 3px; color: #50686c; font-size: 12px; font-weight: 650; }

.comparison-row { margin-top: 13px; }
.comparison-label { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 6px; }
.comparison-label span { color: #52696d; font-size: 12px; line-height: 1.35; }
.comparison-label b { color: #24464c; font-size: 13px; font-weight: 750; }
.comparison-label small { color: #607679; font-size: 11px; font-weight: 500; }
.benchmark-heading { align-items: flex-start; gap: 12px; }
.benchmark-heading > div { display: grid; gap: 2px; }
.benchmark-heading small { color: #718386; font-size: 10px; line-height: 1.35; }
.benchmark-heading > span { flex: none; padding-top: 1px; }
.country-key { width: 8px; height: 5px; border-radius: 3px; background: var(--teal); }
.average-key { width: 2px; height: 9px; background: var(--coral); }
.comparison-values { display: flex; align-items: baseline; gap: 8px; }
.comparison-values em { color: var(--coral); font-size: 10px; font-style: normal; font-weight: 650; }
.benchmark-track { position: relative; height: 6px; border-radius: 4px; background: #e7ecea; }
.country-bar { display: block; height: 100%; border-radius: inherit; background: var(--teal); }
.benchmark-track .average-marker { position: absolute; top: -3px; left: 50%; width: 2px; height: 11px; border-radius: 1px; background: var(--coral); transform: translateX(-1px); }
</style>
