<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'
import type { CountryYearRecord, MapRangeFilter, MetricKey, MetricRange } from '../types'
import { formatMetric, metricDefinitions } from '../metricConfig'

const props = defineProps<{
  data: CountryYearRecord[]
  selectedCountry: string
  metric: MetricKey
  rangeSelection: Record<string, boolean> | null
}>()

const emit = defineEmits<{
  selectCountry: [country: string]
  'update:rangeFilter': [filter: MapRangeFilter]
}>()

const MAP_NAME = 'aquastat-world'
const MAP_LAYOUT = {
  center: ['50%', '46%'] as [string, string],
  size: '108%',
  aspectScale: 0.75,
  zoom: 1.5,
}
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

const geoFeatures = computed(() => {
  if (!mapReady.value) return []
  const geo = echarts.getMap(MAP_NAME)?.geoJSON
  return geo ? geo.features : []
})

interface RangeDefinition extends MetricRange {
  label: string
  color: string
}

// SDG 6.4.2 官方水压力分级。100% 属于 High，只有 >100% 才属于 Critical。
const WATER_STRESS_RANGES: RangeDefinition[] = [
  { min: 0, max: 25, includeMin: true, includeMax: false, label: 'No stress (<25%)', color: '#4e877c' },
  { min: 25, max: 50, includeMin: true, includeMax: false, label: 'Low stress (25–50%)', color: '#86aa94' },
  { min: 50, max: 75, includeMin: true, includeMax: false, label: 'Medium stress (50–75%)', color: '#c5c6a0' },
  { min: 75, max: 100, includeMin: true, includeMax: true, label: 'High stress (75–100%)', color: '#d6a26f' },
  { min: 100, max: Number.POSITIVE_INFINITY, includeMin: false, includeMax: false, label: 'Critical stress (>100%)', color: '#c87460' },
]

const QUANTILE_COLORS = ['#c87460', '#d6a26f', '#c5c6a0', '#86aa94', '#4e877c']

function isValueInRange(value: number, range: MetricRange): boolean {
  const meetsMinimum = range.includeMin ? value >= range.min : value > range.min
  const meetsMaximum = range.includeMax ? value <= range.max : value < range.max
  return meetsMinimum && meetsMaximum
}

function toVisualPiece(range: RangeDefinition): Record<string, string | number> {
  const piece: Record<string, string | number> = {
    label: range.label,
    color: range.color,
  }
  if (Number.isFinite(range.min)) piece[range.includeMin ? 'gte' : 'gt'] = range.min
  if (Number.isFinite(range.max)) piece[range.includeMax ? 'lte' : 'lt'] = range.max
  return piece
}

const rangeDefinitions = computed<RangeDefinition[]>(() => {
  if (props.metric === 'waterStress') return WATER_STRESS_RANGES

  const values = props.data
    .map((record) => record[props.metric] as number)
    .filter(Number.isFinite)
    .sort((a, b) => a - b)
  if (!values.length) return []

  const segmentCount = Math.min(5, new Set(values).size)
  const percentile = (position: number) => values[Math.floor(position * (values.length - 1))]
  const rawBreaks = [Math.min(values[0], 0)]
  for (let index = 1; index < segmentCount; index += 1) {
    rawBreaks.push(percentile(index / segmentCount))
  }
  rawBreaks.push(values[values.length - 1])

  const breaks = rawBreaks.filter((value, index) => index === 0 || value > rawBreaks[index - 1])
  if (breaks.length === 1) {
    return [{
      min: breaks[0],
      max: breaks[0],
      includeMin: true,
      includeMax: true,
      color: QUANTILE_COLORS[QUANTILE_COLORS.length - 1],
      label: formatMetric(breaks[0], props.metric, true),
    }]
  }

  return breaks.slice(0, -1).map((min, index) => {
    const max = breaks[index + 1]
    const includeMax = index === breaks.length - 2
    const colorIndex = Math.round(index * (QUANTILE_COLORS.length - 1) / (breaks.length - 2))
    return {
      min,
      max,
      includeMin: true,
      includeMax,
      color: QUANTILE_COLORS[colorIndex],
      label: `${formatMetric(min, props.metric, true)} – ${formatMetric(max, props.metric, true)}`,
    }
  })
})

function getFeatureISO3(feature: any): string | undefined {
  const props = feature.properties || {}
  return props.iso_a3 || props.ISO_A3 || props.adm0_a3 || props.iso3 || props.ISO3
}

const mapData = computed(() => {
  const iso3Map = new Map<string, CountryYearRecord>()
  const countryMap = new Map<string, CountryYearRecord>()
  props.data.forEach(record => {
    if (record.iso3) iso3Map.set(record.iso3.toUpperCase(), record)
    if (record.country) countryMap.set(record.country.toLowerCase(), record)
  })

  return geoFeatures.value.map((feature: any) => {
    const featureISO3 = getFeatureISO3(feature)?.toUpperCase()
    let record = featureISO3 ? iso3Map.get(featureISO3) : undefined
    if (!record) {
      const featureName = feature.properties.name
      if (featureName) record = countryMap.get(featureName.toLowerCase())
    }
    return {
      name: feature.properties.name,
      value: record ? record[props.metric] : undefined,
      selected: record ? record.country === props.selectedCountry : false,
      rawCountry: record?.country || feature.properties.name,
      region: record?.region || '',
      record: record || null,
    }
  })
})

const option = computed(() => {
  return {
    textStyle: { fontFamily: 'Segoe UI Variable, Segoe UI, sans-serif' },
    tooltip: {
    trigger: 'item',
    backgroundColor: '#173942',
    borderWidth: 0,
    padding: [10, 12],
    textStyle: { color: '#fffdf9', fontSize: 12 },
    formatter: (params: any) => {
    const data = params.data
    if (!data || data.value === undefined) {
      return `<strong style="font-size:14px">${params.name}</strong><br/><span style="color:#bdc9c8">No data available</span>`
    }
    const label = metricDefinitions[props.metric].shortLabel || props.metric
    return [
      `<strong style="font-size:14px">${data.rawCountry || params.name}</strong>`,
      data.region ? `<span style="color:#bdc9c8">${data.region}</span>` : '',
      `<span style="display:block;margin-top:7px">${label}: <strong>${formatMetric(data.value, props.metric)}</strong></span>`,
    ].filter(Boolean).join('<br/>')
  }, },
    visualMap: {
      type: 'piecewise',
      orient: 'horizontal',
      inverse: false,
      left: 22,
      bottom: 8,
      itemWidth: 18,
      itemHeight: 12,
      textStyle: { color: '#55696b', fontSize: 12 },
      selected: props.rangeSelection || undefined,
      outOfRange: { color: '#d8ddda', opacity: 0.92 },
      pieces: rangeDefinitions.value.map(toVisualPiece),
    },
    series: [{
      type: 'map',
      map: MAP_NAME,
      roam: true,
      scaleLimit: { min: 1, max: 6 },
      layoutCenter: MAP_LAYOUT.center,
      layoutSize: MAP_LAYOUT.size,
      aspectScale: MAP_LAYOUT.aspectScale,
      zoom: MAP_LAYOUT.zoom,
      selectedMode: 'single',
      label: { show: false },
      itemStyle: {
        areaColor: '#e7e9e5',
        borderColor: '#fffdf9',
        borderWidth: 0.7,
      },
      emphasis: {
        label: { show: true, color: '#20383b', fontSize: 12, fontWeight: 700 },
        itemStyle: { borderColor: '#ffffff', borderWidth: 1.5 },
      },
      select: {
        label: { show: true, color: '#20383b', fontSize: 12, fontWeight: 800 },
        itemStyle: { borderColor: '#20383b', borderWidth: 2 },
      },
      // 数据中不需要再包含 itemStyle.color，由 visualMap 自动控制
      data: mapData.value,  // 这里的 mapData 需要输出原始值，不要带 itemStyle.color
    }],
  }
})

const rangeFilterActive = computed(() => {
  return !!props.rangeSelection && Object.values(props.rangeSelection).some((selected) => !selected)
})

const activeCountryCount = computed(() => {
  if (!rangeFilterActive.value) return props.data.length
  return props.data.filter((record) => {
    const value = record[props.metric] as number
    return rangeDefinitions.value.some((range, index) => {
      if (props.rangeSelection?.[String(index)] === false) return false
      return isValueInRange(value, range)
    })
  }).length
})

function handleClick(params: any) {
  const rawCountry = params.data?.rawCountry
  if (rawCountry) {
    emit('selectCountry', rawCountry)
  }
}

function handleRangeSelection(params: any) {
  const selected = Object.fromEntries(rangeDefinitions.value.map((_, index) => [
    String(index),
    params?.selected?.[String(index)] !== false,
  ]))
  const activeRanges = rangeDefinitions.value.flatMap((range, index) => {
    if (!selected[String(index)]) return []
    const { min, max, includeMin, includeMax } = range
    return [{ min, max, includeMin, includeMax }]
  })

  emit('update:rangeFilter', {
    selected,
    ranges: activeRanges.length === rangeDefinitions.value.length ? null : activeRanges,
  })
}
</script>

<template>
   <section class="panel map-panel">
    <header class="panel-header">
      <div>
        <div class="section-kicker"><span>02</span> SPATIAL OVERVIEW</div>
        <h2>{{ metricDefinitions[metric].label }} across countries</h2>
        <p>{{ metricDefinitions[metric].description }}. Grey areas are outside the current dataset.</p>
      </div>
      <div class="map-hint">Drag to pan · scroll to zoom</div>
    </header>

    <div class="chart-stage">
      <VChart
        v-if="mapReady"
        class="map-chart"
        :option="option"
        autoresize
        @click="handleClick"
        @datarangeselected="handleRangeSelection"
      />
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
      <span><i class="legend-dot neutral"></i>No value available</span>
      <span class="range-filter-note">
        <b v-if="rangeFilterActive">Color filter active · {{ activeCountryCount }} countries</b>
        <template v-else>Click color ranges to include or exclude them from analysis.</template>
      </span>
    </footer>
  </section>
</template>

<style scoped>
/* 你的样式完全不变 */
.map-panel { min-height: 500px; display: flex; flex-direction: column; }
.panel-header { padding-bottom: 4px; }
.chart-stage { position: relative; flex: 1; min-height: 370px; }
.map-chart { width: 100%; height: 100%; min-height: 370px; }
.map-hint {
  align-self: flex-start;
  margin-top: 4px;
  padding: 8px 10px;
  border-radius: 6px;
  color: #596f70;
  background: #edf2ee;
  font-size: 12px;
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
  font-size: 12px;
}
.map-state strong { color: var(--ink); font-size: 14px; }
.loading-mark { width: 28px; height: 28px; border: 2px solid #d8e5e2; border-top-color: var(--teal); border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.panel-foot {
  min-height: 40px;
  padding-top: 11px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 18px;
  color: #5c6f71;
  font-size: 12px;
  line-height: 1.45;
}
.panel-foot span:last-child { margin-left: auto; text-align: right; }
.range-filter-note b { color: var(--teal-dark); font-size: inherit; font-weight: 750; }
.legend-dot { display: inline-block; width: 7px; height: 7px; margin-right: 5px; border-radius: 2px; }
.selected { background: var(--sand); border: 1px solid var(--ink); }
.neutral { background: #e2e4df; }
@media (max-width: 760px) {
  .map-panel { min-height: 440px; }
  .map-hint { display: none; }
  .chart-stage, .map-chart { min-height: 310px; }
  .panel-foot { flex-wrap: wrap; gap: 8px 14px; }
  .panel-foot span:last-child { width: 100%; margin-left: 0; text-align: left; }
}
</style>
