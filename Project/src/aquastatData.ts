import rawData from './data/aquastat-data.json'
import type { CountryYearRecord, Region } from './types'

export const aquastatData = rawData as CountryYearRecord[]

export const years = [...new Set(aquastatData.map((record) => record.year))]
  .sort((a, b) => a - b)

export const regions = [...new Set(aquastatData.map((record) => record.region))]
  .sort() as Region[]
