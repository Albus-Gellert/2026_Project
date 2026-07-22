<script setup lang="ts">
import { computed } from 'vue'
import type { CountryYearRecord, MetricKey } from '../types'
import { formatMetric, formatPlain, metricDefinitions } from '../metricConfig'

const props = defineProps<{
  scopedData: CountryYearRecord[]
  yearData: CountryYearRecord[]
  selectedCountry: string
  metric: MetricKey
}>()

const record = computed(() => props.yearData.find((item) => item.country === props.selectedCountry))

const observations = computed(() => {
  if (!record.value || !props.scopedData.length) return []
  const selected = record.value
  const value = selected[props.metric] as number
  const scopedMean = props.scopedData.reduce((sum, item) => sum + (item[props.metric] as number), 0) / props.scopedData.length
  const delta = scopedMean === 0 ? 0 : (value - scopedMean) / scopedMean * 100
  const direction = delta >= 0 ? 'above' : 'below'

  const regionData = props.yearData.filter((item) => item.region === selected.region)
  const regionalRank = [...regionData]
    .sort((a, b) => (b[props.metric] as number) - (a[props.metric] as number))
    .findIndex((item) => item.country === selected.country) + 1
  const regionAverage = regionData.reduce((sum, item) => sum + (item[props.metric] as number), 0) / regionData.length

  const variance = props.scopedData.reduce((sum, item) => {
    const difference = (item[props.metric] as number) - scopedMean
    return sum + difference * difference
  }, 0) / props.scopedData.length
  const deviation = Math.sqrt(variance)
  const zScore = deviation === 0 ? 0 : (value - scopedMean) / deviation
  const mostExtreme = [...props.scopedData].sort((a, b) => {
    return Math.abs((b[props.metric] as number) - scopedMean) - Math.abs((a[props.metric] as number) - scopedMean)
  })[0]

  return [
    {
      index: 'A',
      label: 'Current Observation',
      title: `${selected.country} sits ${direction} the current benchmark`,
      body: `${metricDefinitions[props.metric].shortLabel} is ${formatMetric(value, props.metric)}—about ${formatPlain(Math.abs(delta), 0)}% ${direction} the ${props.scopedData.length}-country mean.`,
      tone: 'teal',
    },
    {
      index: 'B',
      label: 'Country Comparison',
      title: `Rank ${regionalRank} of ${regionData.length} in its region`,
      body: `The regional average for ${selected.region} is ${formatMetric(regionAverage, props.metric)}. Use the ranking and scatter views to inspect what drives the gap.`,
      tone: 'gold',
    },
    {
      index: 'C',
      label: 'Possible Outlier',
      title: Math.abs(zScore) >= 1.4 ? `${selected.country} is a candidate outlier` : `${mostExtreme?.country ?? selected.country} is the stronger outlier candidate`,
      body: Math.abs(zScore) >= 1.4
        ? `Its standardized distance from the current mean is ${formatPlain(Math.abs(zScore), 1)}σ, making it a priority for further investigation.`
        : `${selected.country} is ${formatPlain(Math.abs(zScore), 1)}σ from the current mean. The stronger follow-up candidate is ${mostExtreme?.country ?? selected.country}.`,
      tone: 'coral',
    },
  ]
})
</script>

<template>
  <section class="findings-panel">
    <header class="findings-header">
      <div>
        <div class="section-kicker inverse"><span>06</span> FINDINGS WORKBENCH</div>
        <h2>From coordinated views to questions worth testing</h2>
      </div>
      <div class="findings-note">
        <strong>Current analytical view</strong>
        <span>Updates with the selected scope and metric</span>
      </div>
    </header>

    <div class="observation-grid">
      <article v-for="item in observations" :key="item.index" class="observation-card" :class="item.tone">
        <div class="observation-index">{{ item.index }}</div>
        <div>
          <span>{{ item.label }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
        </div>
      </article>
    </div>

    <footer>
      <span>NEXT RESEARCH STEP</span>
      Use these observations to compare the selected country with regional and cross-country patterns.
    </footer>
  </section>
</template>

<style scoped>
.findings-panel {
  padding: 26px 28px 22px;
  border-radius: var(--radius);
  color: #edf6f4;
  background: var(--navy);
  box-shadow: var(--shadow-sm);
}

.findings-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 30px; padding-bottom: 18px; border-bottom: 1px solid rgba(255, 255, 255, .11); }
.findings-header h2 { margin: 8px 0 0; font-size: 23px; font-weight: 650; line-height: 1.3; letter-spacing: -.025em; }
.section-kicker.inverse { color: #9ac7bc; }
.section-kicker.inverse span { color: var(--navy); background: #9ac7bc; }

.findings-note { padding: 11px 13px; border: 1px solid rgba(154, 199, 188, .28); border-radius: 7px; background: rgba(154, 199, 188, .07); text-align: right; }
.findings-note strong, .findings-note span { display: block; }
.findings-note strong { color: #acd1c8; font-size: 12px; }
.findings-note span { margin-top: 4px; color: #bdcacc; font-size: 10px; }

.observation-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 21px 0; }
.observation-card { min-height: 148px; display: grid; grid-template-columns: auto 1fr; gap: 14px; padding: 18px; border: 1px solid rgba(255, 255, 255, .11); border-top-width: 3px; border-radius: 7px; background: rgba(255, 255, 255, .04); }
.observation-card.teal { border-top-color: #6d9f95; }
.observation-card.gold { border-top-color: #c3a15b; }
.observation-card.coral { border-top-color: #c7735e; }
.observation-index { width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%; color: #11313a; background: #dfeae7; font-size: 13px; font-weight: 700; }
.observation-card span { color: #a2babd; font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.observation-card h3 { margin: 8px 0 7px; color: #f2f7f5; font-size: 16px; line-height: 1.4; }
.observation-card p { margin: 0; color: #c4d0d2; font-size: 12px; line-height: 1.65; }

footer { padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, .11); color: #afc0c2; font-size: 11px; line-height: 1.55; }
footer span { margin-right: 10px; color: #d4b66f; font-weight: 800; letter-spacing: .1em; }

@media (max-width: 900px) {
  .findings-header { display: grid; }
  .findings-note { text-align: left; }
  .observation-grid { grid-template-columns: 1fr; }
}
</style>
