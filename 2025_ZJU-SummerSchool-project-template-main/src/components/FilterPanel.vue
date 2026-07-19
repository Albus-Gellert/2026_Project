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
  grid-template-columns: minmax(250px, 1.2fr) minmax(100px, .45fr) minmax(185px, .85fr) minmax(205px, 1fr) minmax(185px, .8fr) auto;
  align-items: end;
  gap: 18px;
  padding: 18px 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: var(--shadow-sm);
}

.filter-intro {
  display: flex;
  align-items: center;
  gap: 14px;
  align-self: center;
}

.section-index {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  border-radius: 50%;
  color: #2c746f;
  background: var(--teal-soft);
  font-family: Georgia, serif;
  font-size: 15px;
}

.filter-intro div { display: grid; gap: 3px; }
.filter-intro strong { color: var(--ink); font-size: 13px; }
.filter-intro span:last-child { color: var(--muted); font-size: 11px; line-height: 1.35; }

.control-group {
  display: grid;
  gap: 7px;
  min-width: 0;
}

label {
  color: var(--muted);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
}

select,
input {
  width: 100%;
  height: 38px;
  box-sizing: border-box;
  border: 1px solid #d6dedc;
  border-radius: 5px;
  color: var(--ink);
  background: #fbfdfc;
  font: inherit;
  font-size: 12px;
  outline: none;
  transition: border-color .18s ease, box-shadow .18s ease;
}

select { padding: 0 30px 0 10px; cursor: pointer; }
input { padding: 0 32px 0 10px; }

select:focus,
input:focus {
  border-color: var(--teal);
  box-shadow: 0 0 0 3px rgba(52, 139, 132, .11);
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
  height: 38px;
  padding: 0 16px;
  border: 1px solid #b8c8c6;
  border-radius: 5px;
  color: #285d5a;
  background: transparent;
  font: inherit;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  transition: background .18s ease, color .18s ease;
}

.reset-button:hover { color: white; background: #245e5a; }

@media (max-width: 1250px) {
  .filter-panel { grid-template-columns: repeat(4, 1fr); }
  .filter-intro { grid-column: span 2; }
  .reset-button { align-self: end; }
}

@media (max-width: 760px) {
  .filter-panel { grid-template-columns: 1fr 1fr; gap: 14px; }
  .filter-intro { grid-column: 1 / -1; }
  .metric-control, .search-control { grid-column: 1 / -1; }
}
</style>
