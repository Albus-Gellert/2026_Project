<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import HeaderPanel from '../components/HeaderPanel.vue'
import FilterPanel from '../components/FilterPanel.vue'
import SummaryStrip from '../components/SummaryStrip.vue'
import WorldMap from '../components/WorldMap.vue'
import CountryProfile from '../components/CountryProfile.vue'
import RankingChart from '../components/RankingChart.vue'
import RelationshipScatter from '../components/RelationshipScatter.vue'
import FindingsPanel from '../components/FindingsPanel.vue'
import { mockData, regions, years } from '../mockData'
import type { MapRangeFilter, MetricKey, MetricRange } from '../types'

const DEFAULTS = {
  year: 2022,
  region: 'All regions',
  metric: 'waterStress' as MetricKey,
  country: 'Jordan',
  xMetric: 'renewableWaterResources' as MetricKey,
  yMetric: 'waterStress' as MetricKey,
}

const selectedCountry = ref(DEFAULTS.country)
const selectedYear = ref(DEFAULTS.year)
const selectedRegion = ref(DEFAULTS.region)
const selectedMetric = ref<MetricKey>(DEFAULTS.metric)
const selectedXMetric = ref<MetricKey>(DEFAULTS.xMetric)
const selectedYMetric = ref<MetricKey>(DEFAULTS.yMetric)
const mapRangeSelection = ref<Record<string, boolean> | null>(null)
const activeMetricRanges = ref<MetricRange[] | null>(null)

const yearData = computed(() => mockData.filter((record) => record.year === selectedYear.value))
const filteredData = computed(() => yearData.value.filter((record) => {
  return selectedRegion.value === 'All regions' || record.region === selectedRegion.value
}))
const analysisData = computed(() => {
  if (activeMetricRanges.value === null) return filteredData.value
  return filteredData.value.filter((record) => {
    const value = record[selectedMetric.value] as number
    return activeMetricRanges.value?.some((range) => {
      const meetsMinimum = range.includeMin ? value >= range.min : value > range.min
      const meetsMaximum = range.includeMax ? value <= range.max : value < range.max
      return meetsMinimum && meetsMaximum
    })
  })
})

function clearMapRangeFilter() {
  mapRangeSelection.value = null
  activeMetricRanges.value = null
}

function updateMapRangeFilter(filter: MapRangeFilter) {
  mapRangeSelection.value = filter.selected
  activeMetricRanges.value = filter.ranges
}

watch([selectedYear, selectedRegion, selectedMetric], clearMapRangeFilter, { flush: 'sync' })

watch(filteredData, (records) => {
  if (!records.some((record) => record.country === selectedCountry.value)) {
    const next = [...records].sort((a, b) => {
      return (b[selectedMetric.value] as number) - (a[selectedMetric.value] as number)
    })[0]
    if (next) selectedCountry.value = next.country
  }
}, { immediate: true })

function selectCountry(country: string) {
  selectedCountry.value = country
}

function selectCountryFromSearch(country: string) {
  const match = yearData.value.find((record) => record.country === country)
  if (!match) return
  if (selectedRegion.value !== 'All regions' && match.region !== selectedRegion.value) {
    selectedRegion.value = 'All regions'
  }
  selectedCountry.value = country
}

function resetDashboard() {
  selectedYear.value = DEFAULTS.year
  selectedRegion.value = DEFAULTS.region
  selectedMetric.value = DEFAULTS.metric
  selectedCountry.value = DEFAULTS.country
  selectedXMetric.value = DEFAULTS.xMetric
  selectedYMetric.value = DEFAULTS.yMetric
  clearMapRangeFilter()
}
</script>

<template>
  <div class="app-shell">
    <HeaderPanel :selected-country="selectedCountry" :selected-year="selectedYear" />

    <main class="dashboard">
      <FilterPanel
        :years="years"
        :regions="regions"
        :countries="yearData"
        :selected-year="selectedYear"
        :selected-region="selectedRegion"
        :selected-metric="selectedMetric"
        :selected-country="selectedCountry"
        @update:selected-year="selectedYear = $event"
        @update:selected-region="selectedRegion = $event"
        @update:selected-metric="selectedMetric = $event"
        @select-country="selectCountryFromSearch"
        @reset="resetDashboard"
      />

      <SummaryStrip :data="analysisData" :selected-region="selectedRegion" />

      <section class="overview-grid">
        <WorldMap
          :data="filteredData"
          :selected-country="selectedCountry"
          :metric="selectedMetric"
          :range-selection="mapRangeSelection"
          @select-country="selectCountry"
          @update:range-filter="updateMapRangeFilter"
        />
        <CountryProfile
          :data="filteredData"
          :selected-country="selectedCountry"
          :active-metric="selectedMetric"
        />
      </section>

      <section class="analysis-grid">
        <RankingChart
          :data="analysisData"
          :selected-country="selectedCountry"
          :metric="selectedMetric"
          @select-country="selectCountry"
        />
        <RelationshipScatter
          :data="analysisData"
          :selected-country="selectedCountry"
          :x-metric="selectedXMetric"
          :y-metric="selectedYMetric"
          @update:x-metric="selectedXMetric = $event"
          @update:y-metric="selectedYMetric = $event"
          @select-country="selectCountry"
        />
      </section>

      <FindingsPanel
        :scoped-data="analysisData"
        :year-data="yearData"
        :selected-country="selectedCountry"
        :metric="selectedMetric"
      />

      <footer class="page-footer">
        <div>
          <strong>Global Water Stress Explorer</strong>
          <span>Vue 3 + Apache ECharts</span>
        </div>
        <p>Explore water stress, freshwater availability, withdrawals, and related indicators through coordinated views.</p>
      </footer>
    </main>
  </div>
</template>
