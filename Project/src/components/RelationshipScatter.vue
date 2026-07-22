<script setup lang="ts">
import { computed } from 'vue'
import VChart from 'vue-echarts'
import type { CountryYearRecord, MetricKey } from '../types'
import { formatMetric, metricDefinitions, regionColors, scatterMetricKeys } from '../metricConfig'

const props = defineProps<{
  data: CountryYearRecord[]
  selectedCountry: string
  xMetric: MetricKey
  yMetric: MetricKey
}>()

const emit = defineEmits<{
  'update:xMetric': [metric: MetricKey]
  'update:yMetric': [metric: MetricKey]
  selectCountry: [country: string]
}>()

function useLogAxis(metric: MetricKey) {
  const values = props.data.map((record) => record[metric] as number).filter((value) => value > 0)
  return Math.max(...values) / Math.min(...values) > 100
}

const option = computed(() => {
  const activeRegions = new Set(props.data.map((record) => record.region))
  const grouped = Object.entries(regionColors)
    .filter(([region]) => activeRegions.has(region as CountryYearRecord['region']))
    .map(([region, color]) => ({
      name: region,
      type: 'scatter',
      symbolSize: (value: any[]) => Math.max(8, Math.min(23, 7 + Math.log10((value[4] as number) + 1) * 4)),
      data: props.data
        .filter((record) => record.region === region && record.country !== props.selectedCountry)
        .map((record) => ({
          name: record.country,
          value: [record[props.xMetric], record[props.yMetric], record.country, record.region, record.population],
        })),
      itemStyle: { color, opacity: .76, borderColor: '#fffdf9', borderWidth: 1 },
      emphasis: { scale: 1.35, itemStyle: { opacity: 1, borderColor: '#20383b', borderWidth: 2 } },
    }))

  const selected = props.data.find((record) => record.country === props.selectedCountry)
  const selectedSeries = selected ? [{
    name: 'Selected country',
    type: 'scatter',
    symbolSize: 25,
    z: 8,
    data: [{
      name: selected.country,
      value: [selected[props.xMetric], selected[props.yMetric], selected.country, selected.region, selected.population],
    }],
    itemStyle: { color: '#c3a15b', borderColor: '#20383b', borderWidth: 3 },
    label: {
      show: true,
      position: 'top',
      distance: 6,
      color: '#20383b',
      fontSize: 12,
      fontWeight: 800,
      formatter: selected.country,
    },
  }] : []

  return {
    animationDurationUpdate: 420,
    textStyle: { fontFamily: 'Segoe UI Variable, Segoe UI, sans-serif' },
    color: Object.values(regionColors),
    grid: { left: 14, right: 18, top: 44, bottom: 34, containLabel: true },
    legend: {
      top: 0,
      left: 0,
      right: 0,
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 12,
      textStyle: { color: '#566c6f', fontSize: 12 },
      data: grouped.map((series) => series.name),
      type: 'scroll',
      pageIconSize: 8,
      pageTextStyle: { fontSize: 11 },
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: '#173942',
      borderWidth: 0,
      padding: [10, 12],
      textStyle: { color: '#fffdf9', fontSize: 12 },
      formatter: (params: any) => {
        const value = params.value as [number, number, string, string, number]
        return [
          `<strong style="font-size:14px">${value[2]}</strong>`,
          `<span style="color:#bdc9c8">${value[3]}</span>`,
          `<span style="display:block;margin-top:7px">${metricDefinitions[props.xMetric].shortLabel}: <strong>${formatMetric(value[0], props.xMetric)}</strong></span>`,
          `${metricDefinitions[props.yMetric].shortLabel}: <strong>${formatMetric(value[1], props.yMetric)}</strong>`,
        ].join('<br/>')
      },
    },
    xAxis: {
      type: useLogAxis(props.xMetric) ? 'log' : 'value',
      name: metricDefinitions[props.xMetric].shortLabel,
      nameLocation: 'middle',
      nameGap: 29,
      nameTextStyle: { color: '#536b6f', fontSize: 12, fontWeight: 700 },
      axisLine: { lineStyle: { color: '#cdd7d5' } },
      axisTick: { show: false },
      axisLabel: { color: '#5d7073', fontSize: 11, formatter: (value: number) => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value) },
      splitLine: { lineStyle: { color: '#edf0ed' } },
      scale: true,
    },
    yAxis: {
      type: useLogAxis(props.yMetric) ? 'log' : 'value',
      name: metricDefinitions[props.yMetric].shortLabel,
      nameLocation: 'middle',
      nameGap: 42,
      nameTextStyle: { color: '#536b6f', fontSize: 12, fontWeight: 700 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#5d7073', fontSize: 11, formatter: (value: number) => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value) },
      splitLine: { lineStyle: { color: '#e9eeeb' } },
      scale: true,
    },
    series: [...grouped, ...selectedSeries],
  }
})

function handleClick(params: any) {
  const country = params.name || params.data?.value?.[2] || params.value?.[2]
  if (country) emit('selectCountry', country)
}
</script>

<template>
  <section class="panel scatter-panel">
    <header class="panel-header scatter-header">
      <div>
        <div class="section-kicker"><span>05</span> RELATIONSHIP VIEW</div>
        <h2>How indicators move together</h2>
        <p>Bubble size represents population. Log scales are applied automatically where needed.</p>
      </div>
      <div class="axis-controls">
        <label>
          <span>X axis</span>
          <select :value="xMetric" @change="emit('update:xMetric', ($event.target as HTMLSelectElement).value as MetricKey)">
            <option v-for="key in scatterMetricKeys" :key="key" :value="key">{{ metricDefinitions[key].shortLabel }}</option>
          </select>
        </label>
        <label>
          <span>Y axis</span>
          <select :value="yMetric" @change="emit('update:yMetric', ($event.target as HTMLSelectElement).value as MetricKey)">
            <option v-for="key in scatterMetricKeys" :key="key" :value="key">{{ metricDefinitions[key].shortLabel }}</option>
          </select>
        </label>
      </div>
    </header>
    <VChart class="scatter-chart" :option="option" autoresize @click="handleClick" />
  </section>
</template>

<style scoped>
.scatter-panel { min-height: 460px; display: flex; flex-direction: column; }
.scatter-header { align-items: flex-start; }
.scatter-chart { width: 100%; min-height: 330px; flex: 1; }
.axis-controls { display: flex; gap: 8px; }
.axis-controls label { display: grid; gap: 5px; }
.axis-controls span { color: #526b6f; font-size: 11px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; }
.axis-controls select {
  width: 154px;
  height: 36px;
  border: 1px solid #d6dedc;
  border-radius: 6px;
  padding: 0 9px;
  color: #26474b;
  background: #fbfcfb;
  font: inherit;
  font-size: 13px;
  outline: none;
}

@media (max-width: 680px) {
  .scatter-header { display: grid; gap: 12px; }
  .axis-controls { width: 100%; }
  .axis-controls label { flex: 1; }
  .axis-controls select { width: 100%; }
}
</style>
