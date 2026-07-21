import type { MetricDefinition, MetricKey, MetricRange } from './types'

export interface WaterStressCategory extends MetricRange {
  name: string
  label: string
  color: string
  surface: string
  foreground: string
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
  },
  waterStress: {
    key: 'waterStress',
    label: 'Water stress level',
    shortLabel: 'Water stress',
    unit: '%',
    decimals: 0,
    description: 'Pressure on available renewable freshwater resources',
    palette: ['#e4eeea', '#86aa94', '#c5c6a0', '#d6a26f', '#c87460'],
  },
  renewableWaterResources: {
    key: 'renewableWaterResources',
    label: 'Renewable water resources',
    shortLabel: 'Renewable resources',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Annual renewable freshwater resources',
    palette: ['#e8efed', '#a5c1ba', '#6a9b91', '#3c7d75', '#173942'],
  },
  totalWaterWithdrawal: {
    key: 'totalWaterWithdrawal',
    label: 'Total water withdrawal',
    shortLabel: 'Total withdrawal',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Annual withdrawal across agriculture, industry and municipalities',
    palette: ['#e7eceb', '#a5b9b7', '#718f8d', '#476f6d', '#20383b'],
  },
  agriculturalWithdrawal: {
    key: 'agriculturalWithdrawal',
    label: 'Agricultural withdrawal',
    shortLabel: 'Agriculture',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Water withdrawal attributed to agriculture',
    palette: ['#f1ead9', '#d7c38e', '#c3a15b', '#7d693e'],
  },
  industrialWithdrawal: {
    key: 'industrialWithdrawal',
    label: 'Industrial withdrawal',
    shortLabel: 'Industry',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Water withdrawal attributed to industry',
    palette: ['#e5e9eb', '#a7b7bd', '#617b86', '#344f59'],
  },
  municipalWithdrawal: {
    key: 'municipalWithdrawal',
    label: 'Municipal withdrawal',
    shortLabel: 'Municipal',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Water withdrawal attributed to municipal use',
    palette: ['#e4eeea', '#a5c1ba', '#6e9f95', '#3c7d75'],
  },
  waterUseEfficiency: {
    key: 'waterUseEfficiency',
    label: 'Water-use efficiency',
    shortLabel: 'Use efficiency',
    unit: 'index',
    decimals: 1,
    description: 'Water-use efficiency index for cross-country comparison',
    palette: ['#e8ebeb', '#b4c0c2', '#7c9198', '#526970'],
  },
  irrigatedArea: {
    key: 'irrigatedArea',
    label: 'Area equipped for irrigation',
    shortLabel: 'Irrigated area',
    unit: 'Mha',
    decimals: 2,
    description: 'Irrigated land area in million hectares',
    palette: ['#e9eee5', '#b8c5a8', '#8fa991', '#596f5d'],
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

export function formatMetric(value: number, key: MetricKey, compact = false): string {
  const definition = metricDefinitions[key]
  const number = new Intl.NumberFormat('en-US', {
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : definition.decimals,
    minimumFractionDigits: compact ? 0 : Math.min(definition.decimals, 1),
  }).format(value)
  return definition.unit === '%' ? `${number}%` : `${number} ${definition.unit}`
}

export function formatPlain(value: number, decimals = 1): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value)
}
