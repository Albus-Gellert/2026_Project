export type Region =
  | 'North Africa & Western Asia'
  | 'Sub-Saharan Africa'
  | 'Eastern & Southern Asia'
  | 'Europe & Central Asia'
  | 'Americas'
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
