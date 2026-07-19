<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import type { CountryYearRecord, MetricKey } from '../types'
import { formatMetric, formatPlain, metricDefinitions } from '../metricConfig'

const props = defineProps<{
  data: CountryYearRecord[]
  selectedCountry: string
  activeMetric: MetricKey
}>()

const record = computed(() => props.data.find((item) => item.country === props.selectedCountry))
const regionalData = computed(() => record.value ? props.data.filter((item) => item.region === record.value?.region) : [])

function average(key: MetricKey): number {
  if (!regionalData.value.length) return 0
  return regionalData.value.reduce((sum, item) => sum + (item[key] as number), 0) / regionalData.value.length
}

const rank = computed(() => {
  if (!record.value) return 0
  return [...props.data]
    .sort((a, b) => (b[props.activeMetric] as number) - (a[props.activeMetric] as number))
    .findIndex((item) => item.country === record.value?.country) + 1
})

const stressLabel = computed(() => {
  const value = record.value?.waterStress ?? 0
  if (value >= 100) return 'Critical prototype signal'
  if (value >= 80) return 'High prototype signal'
  if (value >= 40) return 'Elevated prototype signal'
  return 'Lower prototype signal'
})

const sectorOption = computed(() => {
  if (!record.value) return {}
  const selected = record.value
  return {
    animationDurationUpdate: 350,
    tooltip: {
      trigger: 'item',
      backgroundColor: '#112f39',
      borderWidth: 0,
      textStyle: { color: '#fff', fontSize: 10 },
      formatter: (params: any) => `<strong>${params.name}</strong><br/>${formatPlain(params.value, 1)} km³/yr · ${formatPlain(params.percent, 0)}%`,
    },
    legend: {
      orient: 'vertical',
      right: 0,
      top: 'center',
      itemWidth: 7,
      itemHeight: 7,
      itemGap: 10,
      textStyle: { color: '#607477', fontSize: 9 },
    },
    series: [{
      type: 'pie',
      radius: ['54%', '76%'],
      center: ['31%', '51%'],
      avoidLabelOverlap: true,
      label: { show: false },
      itemStyle: { borderColor: '#fff', borderWidth: 2 },
      data: [
        { name: 'Agriculture', value: selected.agriculturalWithdrawal, itemStyle: { color: '#c0a956' } },
        { name: 'Industry', value: selected.industrialWithdrawal, itemStyle: { color: '#507287' } },
        { name: 'Municipal', value: selected.municipalWithdrawal, itemStyle: { color: '#4f9a91' } },
      ],
    }],
    graphic: [{
      type: 'text',
      left: '23%',
      top: '43%',
      style: {
        text: `${formatPlain(selected.totalWaterWithdrawal, 1)}\nkm³/yr`,
        textAlign: 'center',
        fill: '#173e46',
        fontSize: 11,
        fontWeight: 700,
        lineHeight: 15,
      },
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
  ].map((item) => ({ ...item, max: Math.max(item.value, item.benchmark, 1) * 1.15 }))
})

function averagePerCapita(): number {
  if (!regionalData.value.length) return 0
  return regionalData.value.reduce((sum, item) => sum + item.renewableWaterResources / item.population, 0) / regionalData.value.length
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

      <div class="signal-banner">
        <div class="signal-mark"></div>
        <div>
          <span>Water stress lens</span>
          <strong>{{ stressLabel }}</strong>
        </div>
        <b>{{ formatMetric(record.waterStress, 'waterStress') }}</b>
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
          <small>synthetic index</small>
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
          <span>mock composition</span>
        </div>
        <VChart class="sector-chart" :option="sectorOption" autoresize />
      </div>

      <div class="profile-section compare-section">
        <div class="mini-heading">
          <strong>Regional benchmark</strong>
          <span>country <i></i> region avg</span>
        </div>
        <div v-for="item in comparisons" :key="item.label" class="comparison-row">
          <div class="comparison-label">
            <span>{{ item.label }}</span>
            <b>{{ formatPlain(item.value, 1) }} <small>{{ item.unit }}</small></b>
          </div>
          <div class="benchmark-track">
            <span class="country-bar" :style="{ width: `${item.value / item.max * 100}%` }"></span>
            <i :style="{ left: `${item.benchmark / item.max * 100}%` }"></i>
          </div>
        </div>
      </div>
    </template>
  </aside>
</template>

<style scoped>
.profile-panel { min-height: 500px; }
.profile-header { display: flex; justify-content: space-between; gap: 20px; padding-bottom: 15px; border-bottom: 1px solid var(--line); }
.profile-header h2 { margin: 7px 0 3px; font-family: Georgia, serif; font-size: 26px; font-weight: 500; color: var(--ink); }
.profile-header p { margin: 0; color: var(--muted); font-size: 10px; }

.rank-chip { min-width: 92px; padding: 9px 10px; border-radius: 5px; background: #edf4f2; text-align: right; }
.rank-chip span, .rank-chip small { display: block; color: #6d8382; font-size: 8px; }
.rank-chip strong { display: block; margin: 2px 0; color: #286c67; font-family: Georgia, serif; font-size: 20px; font-weight: 500; }

.signal-banner { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 10px; margin: 14px 0; padding: 10px 12px; border-left: 3px solid #d47757; background: #f8eee8; }
.signal-mark { width: 9px; height: 9px; border-radius: 50%; background: #d47757; box-shadow: 0 0 0 4px rgba(212, 119, 87, .13); }
.signal-banner div:nth-child(2) { display: grid; gap: 2px; }
.signal-banner span { color: #8c6d62; font-size: 8px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }
.signal-banner strong { color: #754b3e; font-size: 10px; }
.signal-banner b { color: #8f3c34; font-family: Georgia, serif; font-size: 17px; font-weight: 500; }

.indicator-grid { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--line); border-radius: 5px; overflow: hidden; }
.indicator { padding: 11px 12px; display: grid; gap: 2px; }
.indicator:nth-child(even) { border-left: 1px solid var(--line); }
.indicator:nth-child(n+3) { border-top: 1px solid var(--line); }
.indicator span { color: var(--muted); font-size: 8px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
.indicator strong { margin-top: 3px; color: var(--ink); font-family: Georgia, serif; font-size: 18px; font-weight: 500; }
.indicator small { color: #879496; font-size: 8px; }

.profile-section { margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--line); }
.mini-heading { display: flex; align-items: center; justify-content: space-between; }
.mini-heading strong { color: #324d51; font-size: 10px; }
.mini-heading span { color: #899697; font-size: 8px; text-transform: uppercase; letter-spacing: .06em; }
.mini-heading i { display: inline-block; width: 2px; height: 9px; margin: 0 3px; background: #cf7c5c; vertical-align: middle; }
.sector-chart { height: 120px; width: 100%; }

.comparison-row { margin-top: 9px; }
.comparison-label { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 4px; }
.comparison-label span { color: #657679; font-size: 8px; }
.comparison-label b { color: #334d52; font-size: 9px; }
.comparison-label small { color: #8a9697; font-size: 7px; font-weight: 500; }
.benchmark-track { position: relative; height: 5px; border-radius: 4px; background: #e9edeb; }
.country-bar { display: block; height: 100%; border-radius: inherit; background: #4c9991; }
.benchmark-track i { position: absolute; top: -3px; width: 2px; height: 11px; border-radius: 1px; background: #cf7c5c; transform: translateX(-1px); }
</style>
