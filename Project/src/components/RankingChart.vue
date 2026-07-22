<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import type { CountryYearRecord, MetricKey } from '../types'
import { formatMetric, metricDefinitions } from '../metricConfig'

const props = defineProps<{
  data: CountryYearRecord[]
  selectedCountry: string
  metric: MetricKey
}>()

const emit = defineEmits<{
  selectCountry: [country: string]
}>()

const validData = computed(() => props.data.filter((record) => Number.isFinite(record[props.metric])))

const rankedData = computed(() => {
  const sorted = [...validData.value].sort((a, b) => (b[props.metric] ?? 0) - (a[props.metric] ?? 0))
  const top = sorted.slice(0, 10)
  const selected = sorted.find((record) => record.country === props.selectedCountry)
  if (selected && !top.includes(selected)) top.push(selected)
  return top
})

const option = computed(() => ({
  animationDurationUpdate: 380,
  textStyle: { fontFamily: 'Segoe UI Variable, Segoe UI, sans-serif' },
  grid: { left: 8, right: 50, top: 8, bottom: 6, containLabel: true },
  tooltip: {
    trigger: 'item',
    backgroundColor: '#173942',
    borderWidth: 0,
    padding: [9, 11],
    textStyle: { color: '#fffdf9', fontSize: 12 },
    formatter: (params: any) => {
      const record = rankedData.value[params.dataIndex]
      if (!record) return ''
      const globalRank = [...validData.value]
        .sort((a, b) => (b[props.metric] ?? 0) - (a[props.metric] ?? 0))
        .findIndex((item) => item.country === record.country) + 1
      return `<strong>${record.country}</strong><br/><span style="color:#bdc9c8">Rank ${globalRank} of ${validData.value.length}</span><br/><span style="display:block;margin-top:6px">${formatMetric(record[props.metric], props.metric)}</span>`
    },
  },
  xAxis: {
    type: 'value',
    splitNumber: 4,
    axisLabel: { color: '#5b6f72', fontSize: 12 },
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { lineStyle: { color: '#edf0ed' } },
  },
  yAxis: {
    type: 'category',
    inverse: true,
    data: rankedData.value.map((record) => record.country),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      width: 112,
      overflow: 'truncate',
      color: (value: string) => value === props.selectedCountry ? '#20383b' : '#56686a',
      fontSize: 12,
      fontWeight: (value: string) => value === props.selectedCountry ? 800 : 500,
    },
  },
  series: [{
    type: 'bar',
    barWidth: 13,
    data: rankedData.value.map((record) => ({
      name: record.country,
      value: record[props.metric],
      itemStyle: {
        color: record.country === props.selectedCountry ? '#c3a15b' : '#4e8b80',
        borderRadius: [0, 3, 3, 0],
      },
    })),
    label: {
      show: true,
      position: 'right',
      distance: 6,
      color: '#536769',
      fontSize: 11,
      formatter: (params: any) => formatMetric(params.value, props.metric, true).replace(` ${metricDefinitions[props.metric].unit}`, ''),
    },
    emphasis: { itemStyle: { color: '#b9893c' } },
  }],
}))

function handleClick(params: any) {
  if (params.name) emit('selectCountry', params.name)
}
</script>

<template>
  <section class="panel ranking-panel">
    <header class="panel-header compact-header">
      <div>
        <div class="section-kicker"><span>04</span> COUNTRY RANKING</div>
        <h2>{{ metricDefinitions[metric].rankTitle }}</h2>
        <p>{{ metricDefinitions[metric].description }}</p>
      </div>
      <div class="metric-unit">{{ metricDefinitions[metric].unit }}</div>
    </header>
    <VChart class="ranking-chart" :option="option" autoresize @click="handleClick" />
    <footer class="click-note"><span></span>Click any bar to coordinate the dashboard.</footer>
  </section>
</template>

<style scoped>
.ranking-panel { min-height: 460px; display: flex; flex-direction: column; }
.ranking-chart { width: 100%; min-height: 330px; flex: 1; }
.compact-header { flex-wrap: wrap; }
.compact-header > div:first-child { flex: 1 1 300px; min-width: 0; }
.compact-header h2 { max-width: 34ch; line-height: 1.18; text-wrap: balance; overflow-wrap: anywhere; }
.compact-header p { max-width: 58ch; }
.metric-unit { flex: none; max-width: 86px; margin-left: auto; padding: 7px 9px; border-radius: 6px; color: #566d71; background: #f0f4f2; font-size: 12px; text-align: center; overflow-wrap: anywhere; }
.click-note { padding-top: 11px; border-top: 1px solid var(--line); color: #5d7073; font-size: 12px; }
.click-note span { display: inline-block; width: 12px; height: 3px; margin-right: 6px; vertical-align: middle; border-radius: 2px; background: var(--sand); }

@media (max-width: 540px) {
  .compact-header { gap: 10px; }
  .compact-header h2 { font-size: 18px; }
  .metric-unit { max-width: 72px; padding: 6px 7px; font-size: 11px; }
}
</style>
