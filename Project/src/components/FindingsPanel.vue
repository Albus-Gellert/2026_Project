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
      body: `The mock regional average for ${selected.region} is ${formatMetric(regionAverage, props.metric)}. Use the ranking and scatter views to inspect what drives the gap.`,
      tone: 'gold',
    },
    {
      index: 'C',
      label: 'Possible Outlier',
      title: Math.abs(zScore) >= 1.4 ? `${selected.country} is a candidate outlier` : `${mostExtreme?.country ?? selected.country} is the stronger outlier candidate`,
      body: Math.abs(zScore) >= 1.4
        ? `Its standardized distance from the current mean is ${formatPlain(Math.abs(zScore), 1)}σ. This is a demo flag for later investigation, not a conclusion.`
        : `${selected.country} is ${formatPlain(Math.abs(zScore), 1)}σ from the current mean. The prototype would direct follow-up analysis toward ${mostExtreme?.country ?? selected.country}.`,
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
      <div class="demo-disclaimer">
        <strong>Demo observations only</strong>
        <span>Generated from synthetic values · not final insight</span>
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
      Replace these generated prompts with evidence-backed findings after the AQUASTAT variables and research question are finalized.
    </footer>
  </section>
</template>

<style scoped>
.findings-panel {
  padding: 22px 24px 18px;
  border-radius: var(--radius);
  color: #edf6f4;
  background: #13333d;
  box-shadow: var(--shadow-sm);
}

.findings-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 30px; padding-bottom: 18px; border-bottom: 1px solid rgba(255, 255, 255, .11); }
.findings-header h2 { margin: 7px 0 0; font-family: Georgia, serif; font-size: 22px; font-weight: 500; }
.section-kicker.inverse { color: #8fc9c0; }
.section-kicker.inverse span { color: #12333d; background: #8fc9c0; }

.demo-disclaimer { padding: 9px 11px; border: 1px solid rgba(236, 190, 100, .3); border-radius: 4px; background: rgba(236, 190, 100, .07); text-align: right; }
.demo-disclaimer strong, .demo-disclaimer span { display: block; }
.demo-disclaimer strong { color: #f0c878; font-size: 10px; }
.demo-disclaimer span { margin-top: 3px; color: #aebdc0; font-size: 8px; }

.observation-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; padding: 18px 0; }
.observation-card { min-height: 122px; display: grid; grid-template-columns: auto 1fr; gap: 13px; padding: 16px; border: 1px solid rgba(255, 255, 255, .1); border-top-width: 3px; background: rgba(255, 255, 255, .035); }
.observation-card.teal { border-top-color: #6db6aa; }
.observation-card.gold { border-top-color: #d8ac52; }
.observation-card.coral { border-top-color: #cf735c; }
.observation-index { width: 25px; height: 25px; display: grid; place-items: center; border-radius: 50%; color: #11313a; background: #dfeae7; font-family: Georgia, serif; font-size: 12px; }
.observation-card span { color: #91aaaD; font-size: 8px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.observation-card h3 { margin: 7px 0 6px; color: #f2f7f5; font-size: 13px; line-height: 1.3; }
.observation-card p { margin: 0; color: #b7c5c7; font-size: 10px; line-height: 1.55; }

footer { padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, .11); color: #9fb2b5; font-size: 9px; }
footer span { margin-right: 10px; color: #efc36c; font-weight: 800; letter-spacing: .1em; }

@media (max-width: 900px) {
  .findings-header { display: grid; }
  .demo-disclaimer { text-align: left; }
  .observation-grid { grid-template-columns: 1fr; }
}
</style>
