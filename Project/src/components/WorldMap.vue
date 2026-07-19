<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'
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

const MAP_NAME = 'aquastat-world'
const mapReady = ref(false)
const mapError = ref(false)

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/world.json`)
    if (!response.ok) throw new Error('World map file could not be loaded.')
    const geoJson = await response.json()
    echarts.registerMap(MAP_NAME, geoJson as any)
    mapReady.value = true
  } catch (error) {
    console.error(error)
    mapError.value = true
  }
})

const extent = computed(() => {
  const values = props.data.map((record) => record[props.metric] as number)
  return {
    min: Math.min(...values, 0),
    max: Math.max(...values, 1),
  }
})

const option = computed(() => {
  const definition = metricDefinitions[props.metric]
  return {
    animationDurationUpdate: 420,
    tooltip: {
      trigger: 'item',
      backgroundColor: '#112f39',
      borderWidth: 0,
      padding: [10, 12],
      textStyle: { color: '#f4f8f7', fontSize: 11 },
      formatter: (params: any) => {
        const record = props.data.find((item) => item.country === params.name)
        if (!record) {
          return `<strong>${params.name || 'Territory'}</strong><br/><span style="color:#9fb3b7">No mock record in current scope</span>`
        }
        return [
          `<strong style="font-size:13px">${record.country}</strong>`,
          `<span style="color:#9fb3b7">${record.region}</span>`,
          `<span style="display:inline-block;margin-top:7px;color:#8fd1c5">${definition.shortLabel}</span>`,
          `<strong style="display:block;margin-top:2px">${formatMetric(record[props.metric] as number, props.metric)}</strong>`,
          `<span style="display:block;margin-top:7px;color:#9fb3b7">Click to open country profile</span>`,
        ].join('<br/>')
      },
    },
    visualMap: {
      min: extent.value.min,
      max: extent.value.max,
      orient: 'horizontal',
      left: 22,
      bottom: 8,
      itemWidth: 130,
      itemHeight: 7,
      calculable: false,
      text: ['High', 'Low'],
      textGap: 8,
      textStyle: { color: '#657b7f', fontSize: 9 },
      inRange: { color: definition.palette },
      formatter: (value: number) => formatMetric(value, props.metric, true),
    },
    series: [
      {
        type: 'map',
        map: MAP_NAME,
        roam: true,
        scaleLimit: { min: 1, max: 6 },
        zoom: 1.08,
        top: 12,
        bottom: 42,
        left: 15,
        right: 15,
        selectedMode: 'single',
        label: { show: false },
        itemStyle: {
          areaColor: '#e6e9e5',
          borderColor: '#f8faf7',
          borderWidth: .7,
        },
        emphasis: {
          label: { show: true, color: '#102e39', fontSize: 10, fontWeight: 700 },
          itemStyle: { areaColor: '#efc46f', borderColor: '#ffffff', borderWidth: 1.5 },
        },
        select: {
          label: { show: true, color: '#102e39', fontSize: 10, fontWeight: 800 },
          itemStyle: { areaColor: '#f0b84c', borderColor: '#102e39', borderWidth: 2 },
        },
        data: props.data.map((record) => ({
          name: record.country,
          value: record[props.metric],
          selected: record.country === props.selectedCountry,
        })),
      },
    ],
  }
})

function handleClick(params: any) {
  if (props.data.some((record) => record.country === params.name)) {
    emit('selectCountry', params.name)
  }
}
</script>

<template>
  <section class="panel map-panel">
    <header class="panel-header">
      <div>
        <div class="section-kicker"><span>02</span> SPATIAL OVERVIEW</div>
        <h2>{{ metricDefinitions[metric].label }} across countries</h2>
        <p>{{ metricDefinitions[metric].description }}. Grey areas are outside the mock dataset.</p>
      </div>
      <div class="map-hint">Drag to pan · scroll to zoom</div>
    </header>

    <div class="chart-stage">
      <VChart v-if="mapReady" class="map-chart" :option="option" autoresize @click="handleClick" />
      <div v-else-if="mapError" class="map-state error-state">
        <strong>Map unavailable</strong>
        <span>The other coordinated views remain usable.</span>
      </div>
      <div v-else class="map-state">
        <span class="loading-mark"></span>
        <strong>Preparing geographic view</strong>
      </div>
    </div>

    <footer class="panel-foot">
      <span><i class="legend-dot selected"></i>Selected: {{ selectedCountry }}</span>
      <span><i class="legend-dot neutral"></i>No prototype value</span>
      <span>Values are illustrative and not factual AQUASTAT observations.</span>
    </footer>
  </section>
</template>

<style scoped>
.map-panel { min-height: 500px; display: flex; flex-direction: column; }
.panel-header { padding-bottom: 4px; }
.chart-stage { position: relative; flex: 1; min-height: 370px; }
.map-chart { width: 100%; height: 100%; min-height: 370px; }

.map-hint {
  align-self: flex-start;
  margin-top: 4px;
  padding: 7px 9px;
  border-radius: 4px;
  color: #5e777b;
  background: #eef4f2;
  font-size: 9px;
  white-space: nowrap;
}

.map-state {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--muted);
  font-size: 11px;
}

.map-state strong { color: var(--ink); font-size: 13px; }
.loading-mark { width: 28px; height: 28px; border: 2px solid #d8e5e2; border-top-color: var(--teal); border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.panel-foot {
  min-height: 34px;
  padding-top: 9px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 18px;
  color: #738487;
  font-size: 9px;
}

.panel-foot span:last-child { margin-left: auto; text-align: right; }
.legend-dot { display: inline-block; width: 7px; height: 7px; margin-right: 5px; border-radius: 2px; }
.selected { background: #efb84d; border: 1px solid #173b43; }
.neutral { background: #e6e9e5; }

@media (max-width: 760px) {
  .map-panel { min-height: 440px; }
  .map-hint { display: none; }
  .chart-stage, .map-chart { min-height: 310px; }
  .panel-foot { flex-wrap: wrap; gap: 8px 14px; }
  .panel-foot span:last-child { width: 100%; margin-left: 0; text-align: left; }
}
</style>
