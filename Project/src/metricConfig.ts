import type { CountryYearRecord, MetricDefinition, MetricKey, MetricRange, MetricValue } from './types'

export interface MetricColorRange extends MetricRange {
  label: string
  color: string
  surface: string
  foreground: string
}

export interface WaterStressCategory extends MetricColorRange {
  name: string
}

// SDG 6.4.2 water-stress categories. 100% is High; only values above 100% are Critical.
export const waterStressCategories: WaterStressCategory[] = [
  { min: 0, max: 25, includeMin: true, includeMax: false, name: 'No stress', label: 'No stress (<25%)', color: '#4e877c', surface: '#edf4f2', foreground: '#355f57' },
  { min: 25, max: 50, includeMin: true, includeMax: false, name: 'Low stress', label: 'Low stress (25–50%)', color: '#86aa94', surface: '#f0f4ed', foreground: '#57725f' },
  { min: 50, max: 75, includeMin: true, includeMax: false, name: 'Medium stress', label: 'Medium stress (50–75%)', color: '#c5c6a0', surface: '#f4f2e6', foreground: '#6d6a3f' },
  { min: 75, max: 100, includeMin: true, includeMax: true, name: 'High stress', label: 'High stress (75–100%)', color: '#d6a26f', surface: '#f8efe5', foreground: '#8a5a31' },
  { min: 100, max: Number.POSITIVE_INFINITY, includeMin: false, includeMax: false, name: 'Critical stress', label: 'Critical stress (>100%)', color: '#c87460', surface: '#f6eae6', foreground: '#884c40' },
]

export function getWaterStressCategory(value: number): WaterStressCategory {
  return waterStressCategories.find((category) => {
    const meetsMinimum = category.includeMin ? value >= category.min : value > category.min
    const meetsMaximum = category.includeMax ? value <= category.max : value < category.max
    return meetsMinimum && meetsMaximum
  }) ?? waterStressCategories[0]
}

export const metricDefinitions: Record<MetricKey, MetricDefinition> = {
  population: {
    key: 'population',
    label: 'Population',
    shortLabel: 'Population',
    unit: 'million',
    decimals: 1,
    description: 'Estimated population represented in the current dataset',
    palette: ['#e4eeea', '#9abbb0', '#4e8b80', '#173942'],
    rankTitle: 'Top countries by population',
  },
  waterStress: {
    key: 'waterStress',
    label: 'Water stress level',
    shortLabel: 'Water stress',
    unit: '%',
    decimals: 0,
    description: 'Pressure on available renewable freshwater resources',
    palette: ['#e4eeea', '#86aa94', '#c5c6a0', '#d6a26f', '#c87460'],
    rankTitle: 'Top countries by water stress',
  },
  renewableWaterResources: {
    key: 'renewableWaterResources',
    label: 'Renewable water resources',
    shortLabel: 'Renewable resources',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Annual renewable freshwater resources',
    palette: ['#e8efed', '#a5c1ba', '#6a9b91', '#3c7d75', '#173942'],
    rankTitle: 'Top countries by renewable resources',
  },
  totalWaterWithdrawal: {
    key: 'totalWaterWithdrawal',
    label: 'Total water withdrawal',
    shortLabel: 'Total withdrawal',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Annual withdrawal across agriculture, industry and municipalities',
    palette: ['#e7eceb', '#a5b9b7', '#718f8d', '#476f6d', '#20383b'],
    rankTitle: 'Top countries by total withdrawal',
  },
  agriculturalWithdrawal: {
    key: 'agriculturalWithdrawal',
    label: 'Agricultural withdrawal',
    shortLabel: 'Agriculture',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Water withdrawal attributed to agriculture',
    palette: ['#f1ead9', '#d7c38e', '#c3a15b', '#7d693e'],
    rankTitle: 'Top countries by agricultural withdrawal',
  },
  industrialWithdrawal: {
    key: 'industrialWithdrawal',
    label: 'Industrial withdrawal',
    shortLabel: 'Industry',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Water withdrawal attributed to industry',
    palette: ['#e5e9eb', '#a7b7bd', '#617b86', '#344f59'],
    rankTitle: 'Top countries by industrial withdrawal',
  },
  municipalWithdrawal: {
    key: 'municipalWithdrawal',
    label: 'Municipal withdrawal',
    shortLabel: 'Municipal',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Water withdrawal attributed to municipal use',
    palette: ['#e4eeea', '#a5c1ba', '#6e9f95', '#3c7d75'],
    rankTitle: 'Top countries by municipal withdrawal',
  },
  waterUseEfficiency: {
    key: 'waterUseEfficiency',
    label: 'Water-use efficiency',
    shortLabel: 'Use efficiency',
    unit: 'US$/m³',
    decimals: 1,
    description: 'Economic value generated per cubic metre of water used',
    palette: ['#e8ebeb', '#b4c0c2', '#7c9198', '#526970'],
    rankTitle: 'Top countries by water-use efficiency',
  },
  irrigatedArea: {
    key: 'irrigatedArea',
    label: 'Area equipped for irrigation',
    shortLabel: 'Irrigated area',
    unit: 'Mha',
    decimals: 2,
    description: 'Irrigated land area in million hectares',
    palette: ['#e9eee5', '#b8c5a8', '#8fa991', '#596f5d'],
    rankTitle: 'Top countries by irrigated area',
  },
}

export const mainMetricKeys: MetricKey[] = [
  'waterStress',
  'renewableWaterResources',
  'totalWaterWithdrawal',
  'waterUseEfficiency',
  'irrigatedArea',
]

export const scatterMetricKeys: MetricKey[] = [
  'renewableWaterResources',
  'waterStress',
  'totalWaterWithdrawal',
  'population',
  'waterUseEfficiency',
  'irrigatedArea',
]

export const regionColors: Record<string, string> = {
  'Asia': '#c97a62',
  'Africa': '#b69a5c',
  'Europe': '#7d718c',
  'North America': '#4c8c82',
  'South America': '#638095',
  'Oceania': '#7c9a78',
}

export function formatMetric(value: MetricValue, key: MetricKey, compact = false): string {
  if (!Number.isFinite(value)) return 'N/A'
  const definition = metricDefinitions[key]
  const number = new Intl.NumberFormat('en-US', {
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : definition.decimals,
    minimumFractionDigits: compact ? 0 : Math.min(definition.decimals, 1),
  }).format(value as number)
  return definition.unit === '%' ? `${number}%` : `${number} ${definition.unit}`
}

export function formatPlain(value: MetricValue, decimals = 1): string {
  if (!Number.isFinite(value)) return 'N/A'
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value as number)
}

const QUANTILE_STYLES = [
  { color: '#c87460', surface: '#f6eae6', foreground: '#884c40' },
  { color: '#d6a26f', surface: '#f8efe5', foreground: '#8a5a31' },
  { color: '#c5c6a0', surface: '#f4f2e6', foreground: '#6d6a3f' },
  { color: '#86aa94', surface: '#f0f4ed', foreground: '#57725f' },
  { color: '#4e877c', surface: '#edf4f2', foreground: '#355f57' },
]

export function isValueInMetricRange(value: MetricValue, range: MetricRange): boolean {
  if (!Number.isFinite(value)) return false
  const numericValue = value as number
  const meetsMinimum = range.includeMin ? numericValue >= range.min : numericValue > range.min
  const meetsMaximum = range.includeMax ? numericValue <= range.max : numericValue < range.max
  return meetsMinimum && meetsMaximum
}

export function getMetricColorRanges(metric: MetricKey, data: CountryYearRecord[]): MetricColorRange[] {
  if (metric === 'waterStress') return waterStressCategories

  const values = data
    .map((record) => record[metric])
    .filter((value): value is number => Number.isFinite(value))
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
    const style = QUANTILE_STYLES[QUANTILE_STYLES.length - 1]
    return [{
      min: breaks[0],
      max: breaks[0],
      includeMin: true,
      includeMax: true,
      ...style,
      label: formatMetric(breaks[0], metric, true),
    }]
  }

  return breaks.slice(0, -1).map((min, index) => {
    const max = breaks[index + 1]
    const includeMax = index === breaks.length - 2
    const colorIndex = Math.round(index * (QUANTILE_STYLES.length - 1) / (breaks.length - 2))
    return {
      min,
      max,
      includeMin: true,
      includeMax,
      ...QUANTILE_STYLES[colorIndex],
      label: `${formatMetric(min, metric, true)} – ${formatMetric(max, metric, true)}`,
    }
  })
}

export function getMetricColorRange(value: MetricValue, metric: MetricKey, data: CountryYearRecord[]): MetricColorRange {
  const ranges = getMetricColorRanges(metric, data)
  return ranges.find((range) => isValueInMetricRange(value, range))
    ?? ranges[0]
    ?? waterStressCategories[0]
}
