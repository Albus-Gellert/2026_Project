import type { MetricDefinition, MetricKey } from './types'

export const metricDefinitions: Record<MetricKey, MetricDefinition> = {
  population: {
    key: 'population',
    label: 'Population',
    shortLabel: 'Population',
    unit: 'million',
    decimals: 1,
    description: 'Estimated population represented in the prototype',
    palette: ['#dcebe7', '#83bcb2', '#2b7d76', '#123d45'],
  },
  waterStress: {
    key: 'waterStress',
    label: 'Water stress level',
    shortLabel: 'Water stress',
    unit: '%',
    decimals: 0,
    description: 'Mock pressure on available renewable freshwater resources',
    palette: ['#d8eee8', '#7fc1b4', '#edbd64', '#dd7657', '#9f394b'],
  },
  renewableWaterResources: {
    key: 'renewableWaterResources',
    label: 'Renewable water resources',
    shortLabel: 'Renewable resources',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Mock annual renewable freshwater resources',
    palette: ['#e1eef1', '#9bc9cc', '#4a9aa0', '#17616d', '#0c3845'],
  },
  totalWaterWithdrawal: {
    key: 'totalWaterWithdrawal',
    label: 'Total water withdrawal',
    shortLabel: 'Total withdrawal',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Mock annual withdrawal across agriculture, industry and municipalities',
    palette: ['#e6eced', '#9abfc3', '#4f8c95', '#255865', '#142f3c'],
  },
  agriculturalWithdrawal: {
    key: 'agriculturalWithdrawal',
    label: 'Agricultural withdrawal',
    shortLabel: 'Agriculture',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Mock water withdrawal attributed to agriculture',
    palette: ['#f3ecd8', '#d6c47a', '#a8963e', '#6c672c'],
  },
  industrialWithdrawal: {
    key: 'industrialWithdrawal',
    label: 'Industrial withdrawal',
    shortLabel: 'Industry',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Mock water withdrawal attributed to industry',
    palette: ['#e2e8ee', '#9aaec1', '#586f89', '#293c51'],
  },
  municipalWithdrawal: {
    key: 'municipalWithdrawal',
    label: 'Municipal withdrawal',
    shortLabel: 'Municipal',
    unit: 'km³/yr',
    decimals: 1,
    description: 'Mock water withdrawal attributed to municipal use',
    palette: ['#e6ebee', '#a8bbc2', '#657f8a', '#314d5b'],
  },
  waterUseEfficiency: {
    key: 'waterUseEfficiency',
    label: 'Water-use efficiency',
    shortLabel: 'Use efficiency',
    unit: 'index',
    decimals: 1,
    description: 'A synthetic efficiency index used only for prototype comparison',
    palette: ['#e9e4f0', '#b9a7ca', '#806a9f', '#4a355f'],
  },
  irrigatedArea: {
    key: 'irrigatedArea',
    label: 'Area equipped for irrigation',
    shortLabel: 'Irrigated area',
    unit: 'Mha',
    decimals: 2,
    description: 'Mock irrigated land area in million hectares',
    palette: ['#e9eedf', '#b7c98d', '#7f9f54', '#496b31'],
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
  'North Africa & Western Asia': '#d8845f',
  'Sub-Saharan Africa': '#b69a4c',
  'Eastern & Southern Asia': '#4a908a',
  'Europe & Central Asia': '#6483a6',
  Americas: '#9b6f91',
  Oceania: '#6f9d72',
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
