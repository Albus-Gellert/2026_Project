export type Region =
  | 'Asia'
  | 'Africa'
  | 'Europe'
  | 'North America'
  | 'South America'
  | 'Oceania'

export type MetricKey =
  | 'population'
  | 'waterStress'
  | 'renewableWaterResources'
  | 'totalWaterWithdrawal'
  | 'agriculturalWithdrawal'
  | 'industrialWithdrawal'
  | 'municipalWithdrawal'
  | 'waterUseEfficiency'
  | 'irrigatedArea'

export interface CountryYearRecord {
  country: string
  iso3: string
  region: Region
  year: number
  population: number
  waterStress: number
  renewableWaterResources: number
  totalWaterWithdrawal: number
  agriculturalWithdrawal: number
  industrialWithdrawal: number
  municipalWithdrawal: number
  waterUseEfficiency: number
  irrigatedArea: number
}

export interface MetricDefinition {
  key: MetricKey
  label: string
  shortLabel: string
  unit: string
  decimals: number
  description: string
  palette: string[]
}

export interface MetricRange {
  min: number
  max: number
  includeMin: boolean
  includeMax: boolean
}

export interface MapRangeFilter {
  selected: Record<string, boolean>
  ranges: MetricRange[] | null
}
