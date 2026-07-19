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

const rankedData = computed(() => {
  const sorted = [...props.data].sort((a, b) => (b[props.metric] as number) - (a[props.metric] as number))
  const top = sorted.slice(0, 10)
  const selected = sorted.find((record) => record.country === props.selectedCountry)
  if (selected && !top.includes(selected)) top.push(selected)
  return top
})

const option = computed(() => ({
  animationDurationUpdate: 380,
  grid: { left: 8, right: 50, top: 8, bottom: 6, containLabel: true },
  tooltip: {
    trigger: 'item',
    backgroundColor: '#112f39',
    borderWidth: 0,
    padding: [9, 11],
    textStyle: { color: '#f4f8f7', fontSize: 11 },
    formatter: (params: any) => {
      const record = rankedData.value[params.dataIndex]
      if (!record) return ''
      const globalRank = [...props.data]
        .sort((a, b) => (b[props.metric] as number) - (a[props.metric] as number))
        .findIndex((item) => item.country === record.country) + 1
      return `<strong>${record.country}</strong><br/><span style="color:#9fb3b7">Rank ${globalRank} of ${props.data.length}</span><br/><span style="display:block;margin-top:6px">${formatMetric(record[props.metric] as number, props.metric)}</span>`
    },
  },
  xAxis: {
    type: 'value',
    splitNumber: 4,
    axisLabel: { color: '#7a898b', fontSize: 9 },
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
      color: (value: string) => value === props.selectedCountry ? '#173d43' : '#55676a',
      fontSize: 10,
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
        color: record.country === props.selectedCountry ? '#e8af47' : '#3d8f89',
        borderRadius: [0, 3, 3, 0],
      },
    })),
    label: {
      show: true,
      position: 'right',
      distance: 6,
      color: '#53676a',
      fontSize: 9,
      formatter: (params: any) => formatMetric(params.value, props.metric, true).replace(` ${metricDefinitions[props.metric].unit}`, ''),
    },
    emphasis: { itemStyle: { color: '#d89a2f' } },
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
        <h2>Where pressure concentrates</h2>
        <p>Top countries by {{ metricDefinitions[metric].shortLabel.toLowerCase() }} in the current scope.</p>
      </div>
      <div class="metric-unit">{{ metricDefinitions[metric].unit }}</div>
    </header>
    <VChart class="ranking-chart" :option="option" autoresize @click="handleClick" />
    <footer class="click-note"><span></span>Click any bar to coordinate the dashboard.</footer>
  </section>
</template>

<style scoped>
.ranking-panel { min-height: 420px; display: flex; flex-direction: column; }
.ranking-chart { width: 100%; min-height: 300px; flex: 1; }
.metric-unit { padding: 6px 8px; border-radius: 4px; color: #607477; background: #f1f4f2; font-size: 9px; }
.click-note { padding-top: 9px; border-top: 1px solid var(--line); color: #7b898b; font-size: 9px; }
.click-note span { display: inline-block; width: 12px; height: 3px; margin-right: 6px; vertical-align: middle; border-radius: 2px; background: #e6ad44; }
</style>
