<script setup lang="ts">
import { ref, watch } from 'vue'
import { mainMetricKeys, metricDefinitions } from '../metricConfig'
import type { CountryYearRecord, MetricKey } from '../types'

const props = defineProps<{
  years: number[]
  regions: string[]
  countries: CountryYearRecord[]
  selectedYear: number
  selectedRegion: string
  selectedMetric: MetricKey
  selectedCountry: string
}>()

const emit = defineEmits<{
  'update:selectedYear': [value: number]
  'update:selectedRegion': [value: string]
  'update:selectedMetric': [value: MetricKey]
  selectCountry: [value: string]
  reset: []
}>()

const searchValue = ref(props.selectedCountry)

watch(() => props.selectedCountry, (value) => {
  searchValue.value = value
})

function selectSearchResult() {
  const normalized = searchValue.value.trim().toLowerCase()
  const match = props.countries.find((record) => record.country.toLowerCase() === normalized)
  if (match) emit('selectCountry', match.country)
}
</script>

<template>
  <section class="filter-panel" aria-label="Dashboard filters">
    <div class="filter-intro">
      <span class="section-index">01</span>
      <div>
        <strong>Explore the system</strong>
        <span>Change one control to update every view.</span>
      </div>
    </div>

    <div class="control-group">
      <label for="year-select">Year</label>
      <select
        id="year-select"
        :value="selectedYear"
        @change="emit('update:selectedYear', Number(($event.target as HTMLSelectElement).value))"
      >
        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>

    <div class="control-group region-control">
      <label for="region-select">Region</label>
      <select
        id="region-select"
        :value="selectedRegion"
        @change="emit('update:selectedRegion', ($event.target as HTMLSelectElement).value)"
      >
        <option value="All regions">All regions</option>
        <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
      </select>
    </div>

    <div class="control-group metric-control">
      <label for="metric-select">Map & ranking metric</label>
      <select
        id="metric-select"
        :value="selectedMetric"
        @change="emit('update:selectedMetric', ($event.target as HTMLSelectElement).value as MetricKey)"
      >
        <option v-for="key in mainMetricKeys" :key="key" :value="key">
          {{ metricDefinitions[key].label }}
        </option>
      </select>
    </div>

    <div class="control-group search-control">
      <label for="country-search">Find country</label>
      <div class="search-wrap">
        <input
          id="country-search"
          v-model="searchValue"
          list="country-options"
          type="search"
          placeholder="Type a country…"
          @change="selectSearchResult"
          @keyup.enter="selectSearchResult"
        >
        <span aria-hidden="true">⌕</span>
      </div>
      <datalist id="country-options">
        <option v-for="record in countries" :key="record.iso3" :value="record.country" />
      </datalist>
    </div>

    <button class="reset-button" type="button" @click="emit('reset')">
      Reset view
    </button>
  </section>
</template>

<style scoped>
.filter-panel {
  display: grid;
  grid-template-columns: minmax(230px, 1.1fr) minmax(105px, .45fr) minmax(165px, .75fr) minmax(205px, .95fr) minmax(180px, .8fr) auto;
  align-items: end;
  gap: 16px;
  padding: 22px 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: var(--shadow-sm);
}

.filter-intro {
  display: flex;
  align-items: center;
  gap: 15px;
  align-self: center;
}

.section-index {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  border-radius: 50%;
  color: var(--teal-dark);
  background: var(--teal-soft);
  font-size: 14px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.filter-intro div { display: grid; gap: 4px; }
.filter-intro strong { color: var(--ink); font-size: 14px; font-weight: 700; }
.filter-intro span:last-child { color: var(--muted); font-size: 12px; line-height: 1.45; }

.control-group {
  display: grid;
  gap: 7px;
  min-width: 0;
}

label {
  color: #596e70;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
}

select,
input {
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  border: 1px solid #d9dfda;
  border-radius: 7px;
  color: var(--ink);
  background: #fffefa;
  font: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color .18s ease, box-shadow .18s ease;
}

select { padding: 0 32px 0 12px; cursor: pointer; }
input { padding: 0 34px 0 12px; }

select:focus,
input:focus {
  border-color: var(--teal);
  box-shadow: 0 0 0 3px rgba(60, 125, 117, .12);
}

.search-wrap { position: relative; }
.search-wrap span {
  position: absolute;
  right: 11px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--teal);
  font-size: 17px;
  pointer-events: none;
}

.reset-button {
  height: 42px;
  padding: 0 18px;
  border: 1px solid #b9c9c5;
  border-radius: 7px;
  color: var(--teal-dark);
  background: transparent;
  font: inherit;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: background .18s ease, color .18s ease;
}

.reset-button:hover { color: #fffdf9; background: var(--teal-dark); }

@media (max-width: 1320px) {
  .filter-panel { grid-template-columns: repeat(3, 1fr); }
  .reset-button { align-self: end; }
}

@media (max-width: 920px) {
  .filter-panel { grid-template-columns: repeat(2, 1fr); }
  .filter-intro { grid-column: 1 / -1; }
}

@media (max-width: 760px) {
  .filter-panel { grid-template-columns: 1fr 1fr; gap: 14px; padding: 19px 16px; }
  .filter-intro { grid-column: 1 / -1; }
  .metric-control, .search-control { grid-column: 1 / -1; }
}
</style>
