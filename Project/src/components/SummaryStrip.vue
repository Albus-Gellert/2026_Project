<script setup lang="ts">
import { computed } from 'vue'
import type { CountryYearRecord } from '../types'
import { formatPlain } from '../metricConfig'

const props = defineProps<{
  data: CountryYearRecord[]
  selectedRegion: string
}>()

const summary = computed(() => {
  if (!props.data.length) return { averageStress: 0, withdrawal: 0, highStress: 0, population: 0 }
  return {
    averageStress: props.data.reduce((sum, record) => sum + record.waterStress, 0) / props.data.length,
    withdrawal: props.data.reduce((sum, record) => sum + record.totalWaterWithdrawal, 0),
    highStress: props.data.filter((record) => record.waterStress >= 80).length,
    population: props.data.reduce((sum, record) => sum + record.population, 0),
  }
})
</script>

<template>
  <section class="summary-strip" aria-label="Filtered summary">
    <div class="summary-context">
      <span>Current scope</span>
      <strong>{{ selectedRegion }}</strong>
      <small>{{ data.length }} countries in view</small>
    </div>
    <div class="summary-item">
      <span>Average stress</span>
      <strong>{{ formatPlain(summary.averageStress, 0) }}<small>%</small></strong>
      <i class="swatch stress"></i>
    </div>
    <div class="summary-item">
      <span>Total withdrawal</span>
      <strong>{{ formatPlain(summary.withdrawal, 0) }}<small> km³/yr</small></strong>
      <i class="swatch withdrawal"></i>
    </div>
    <div class="summary-item">
      <span>High-stress signals</span>
      <strong>{{ summary.highStress }}<small> countries</small></strong>
      <i class="swatch signal"></i>
    </div>
    <div class="summary-item">
      <span>Population represented</span>
      <strong>{{ formatPlain(summary.population / 1000, 1) }}<small> billion</small></strong>
      <i class="swatch population"></i>
    </div>
  </section>
</template>

<style scoped>
.summary-strip {
  display: grid;
  grid-template-columns: 1.25fr repeat(4, 1fr);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fdfcf8;
  overflow: hidden;
}

.summary-context,
.summary-item {
  min-height: 84px;
  padding: 17px 22px;
  box-sizing: border-box;
}

.summary-context {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #e8f0ec;
}

.summary-context span,
.summary-item > span {
  color: var(--muted);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.summary-context strong { margin: 4px 0 2px; color: var(--teal-dark); font-size: 15px; }
.summary-context small { color: #637b77; font-size: 11px; }

.summary-item {
  position: relative;
  display: grid;
  align-content: center;
  gap: 7px;
  border-left: 1px solid var(--line);
}

.summary-item strong {
  color: var(--ink);
  font-size: 24px;
  font-weight: 650;
  line-height: 1.15;
  letter-spacing: -.025em;
  font-variant-numeric: tabular-nums;
}

.summary-item strong small {
  color: var(--muted);
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
}

.swatch {
  position: absolute;
  right: 20px;
  bottom: 19px;
  width: 20px;
  height: 3px;
  border-radius: 2px;
}

.stress { background: var(--coral); }
.withdrawal { background: var(--teal); }
.signal { background: var(--sand); }
.population { background: var(--slate); }

@media (max-width: 950px) {
  .summary-strip { grid-template-columns: repeat(2, 1fr); }
  .summary-context { grid-column: 1 / -1; }
  .summary-item { border-top: 1px solid var(--line); }
}

@media (max-width: 540px) {
  .summary-item { padding: 14px; }
  .summary-item strong { font-size: 21px; }
}
</style>
