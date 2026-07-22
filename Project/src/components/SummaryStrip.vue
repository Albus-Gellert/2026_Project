<script setup lang="ts">
import { computed } from 'vue'
import type { CountryYearRecord } from '../types'
import { formatPlain, getWaterStressCategory, waterStressCategories } from '../metricConfig'

const props = defineProps<{
  data: CountryYearRecord[]
  selectedRegion: string
}>()

const criticalStressCategory = waterStressCategories[waterStressCategories.length - 1]

function finiteValues(key: keyof CountryYearRecord): number[] {
  return props.data
    .map((record) => record[key])
    .filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
}

function sumOrNull(values: number[]): number | null {
  return values.length ? values.reduce((sum, value) => sum + value, 0) : null
}

const summary = computed(() => {
  const stressValues = finiteValues('waterStress')
  const withdrawalValues = finiteValues('totalWaterWithdrawal')
  const populationValues = finiteValues('population')
  return {
    averageStress: stressValues.length
      ? stressValues.reduce((sum, value) => sum + value, 0) / stressValues.length
      : null,
    withdrawal: sumOrNull(withdrawalValues),
    criticalStress: stressValues.length
      ? stressValues.filter((value) => getWaterStressCategory(value) === criticalStressCategory).length
      : null,
    population: sumOrNull(populationValues),
  }
})
</script>

<template>
  <section class="summary-strip" aria-label="Filtered summary">
    <div class="summary-context">
      <span>Current scope</span>
      <strong>{{ selectedRegion }}</strong>
      <small>{{ data.length }} countries in scope</small>
    </div>
    <div class="summary-item">
      <span>Average country stress</span>
      <strong>{{ formatPlain(summary.averageStress, 0) }}<small v-if="summary.averageStress !== null">%</small></strong>
      <i class="swatch stress"></i>
    </div>
    <div class="summary-item">
      <span>Total withdrawal</span>
      <strong>{{ formatPlain(summary.withdrawal, 0) }}<small v-if="summary.withdrawal !== null"> km³/yr</small></strong>
      <i class="swatch withdrawal"></i>
    </div>
    <div class="summary-item">
      <span>Critical-stress signals</span>
      <strong>{{ summary.criticalStress ?? 'N/A' }}<small v-if="summary.criticalStress !== null"> countries</small></strong>
      <i class="swatch signal" :style="{ background: criticalStressCategory.color }"></i>
    </div>
    <div class="summary-item">
      <span>Population represented</span>
      <strong>{{ formatPlain(summary.population === null ? null : summary.population / 1000, 1) }}<small v-if="summary.population !== null"> billion</small></strong>
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
