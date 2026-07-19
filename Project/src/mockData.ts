import type { CountryYearRecord, Region } from './types'

interface CountryBase {
  country: string
  iso3: string
  region: Region
  population: number
  resources: number
  withdrawal: number
  stress: number
  agricultureShare: number
  industryShare: number
  efficiency: number
  irrigatedArea: number
}

const countryBases: CountryBase[] = [
  { country: 'Morocco', iso3: 'MAR', region: 'North Africa & Western Asia', population: 37.5, resources: 29, withdrawal: 10.4, stress: 51, agricultureShare: .85, industryShare: .04, efficiency: 8.1, irrigatedArea: 1.5 },
  { country: 'Algeria', iso3: 'DZA', region: 'North Africa & Western Asia', population: 45, resources: 11, withdrawal: 9, stress: 84, agricultureShare: .64, industryShare: .16, efficiency: 11.5, irrigatedArea: 1.4 },
  { country: 'Egypt', iso3: 'EGY', region: 'North Africa & Western Asia', population: 110, resources: 59, withdrawal: 80, stress: 121, agricultureShare: .78, industryShare: .08, efficiency: 5.2, irrigatedArea: 10.5 },
  { country: 'Tunisia', iso3: 'TUN', region: 'North Africa & Western Asia', population: 12.4, resources: 4.6, withdrawal: 3.2, stress: 96, agricultureShare: .76, industryShare: .08, efficiency: 9.5, irrigatedArea: .45 },
  { country: 'United Arab Emirates', iso3: 'ARE', region: 'North Africa & Western Asia', population: 9.4, resources: .15, withdrawal: 4.1, stress: 179, agricultureShare: .12, industryShare: .29, efficiency: 43, irrigatedArea: .07 },
  { country: 'Saudi Arabia', iso3: 'SAU', region: 'North Africa & Western Asia', population: 36, resources: 2.4, withdrawal: 24, stress: 168, agricultureShare: .82, industryShare: .06, efficiency: 23, irrigatedArea: 1.6 },
  { country: 'Jordan', iso3: 'JOR', region: 'North Africa & Western Asia', population: 11.3, resources: .9, withdrawal: 1.1, stress: 143, agricultureShare: .53, industryShare: .12, efficiency: 13, irrigatedArea: .1 },
  { country: 'Israel', iso3: 'ISR', region: 'North Africa & Western Asia', population: 9.7, resources: 2.1, withdrawal: 2.4, stress: 134, agricultureShare: .47, industryShare: .08, efficiency: 51, irrigatedArea: .23 },
  { country: 'Turkey', iso3: 'TUR', region: 'North Africa & Western Asia', population: 85, resources: 234, withdrawal: 61, stress: 43, agricultureShare: .72, industryShare: .14, efficiency: 14, irrigatedArea: 5.2 },
  { country: 'Iran', iso3: 'IRN', region: 'North Africa & Western Asia', population: 88, resources: 128, withdrawal: 93, stress: 81, agricultureShare: .89, industryShare: .03, efficiency: 8.5, irrigatedArea: 8.9 },

  { country: 'South Africa', iso3: 'ZAF', region: 'Sub-Saharan Africa', population: 60.6, resources: 51, withdrawal: 15, stress: 43, agricultureShare: .62, industryShare: .21, efficiency: 19, irrigatedArea: 1.7 },
  { country: 'Ethiopia', iso3: 'ETH', region: 'Sub-Saharan Africa', population: 123, resources: 122, withdrawal: 10, stress: 32, agricultureShare: .86, industryShare: .03, efficiency: 3.1, irrigatedArea: .72 },
  { country: 'Kenya', iso3: 'KEN', region: 'Sub-Saharan Africa', population: 54, resources: 21, withdrawal: 5.5, stress: 39, agricultureShare: .72, industryShare: .08, efficiency: 4.5, irrigatedArea: .32 },
  { country: 'Nigeria', iso3: 'NGA', region: 'Sub-Saharan Africa', population: 216, resources: 286, withdrawal: 13, stress: 18, agricultureShare: .55, industryShare: .18, efficiency: 6.2, irrigatedArea: .29 },
  { country: 'Ghana', iso3: 'GHA', region: 'Sub-Saharan Africa', population: 33.5, resources: 53, withdrawal: 2.8, stress: 15, agricultureShare: .63, industryShare: .12, efficiency: 8.4, irrigatedArea: .04 },
  { country: 'Senegal', iso3: 'SEN', region: 'Sub-Saharan Africa', population: 17.3, resources: 39, withdrawal: 3.1, stress: 31, agricultureShare: .89, industryShare: .02, efficiency: 3.7, irrigatedArea: .16 },
  { country: 'Tanzania', iso3: 'TZA', region: 'Sub-Saharan Africa', population: 65, resources: 96, withdrawal: 5.8, stress: 22, agricultureShare: .84, industryShare: .04, efficiency: 3, irrigatedArea: .45 },
  { country: 'Namibia', iso3: 'NAM', region: 'Sub-Saharan Africa', population: 2.6, resources: 17.7, withdrawal: .32, stress: 27, agricultureShare: .63, industryShare: .09, efficiency: 10.5, irrigatedArea: .05 },

  { country: 'China', iso3: 'CHN', region: 'Eastern & Southern Asia', population: 1412, resources: 2840, withdrawal: 604, stress: 44, agricultureShare: .61, industryShare: .23, efficiency: 17, irrigatedArea: 70 },
  { country: 'India', iso3: 'IND', region: 'Eastern & Southern Asia', population: 1417, resources: 1911, withdrawal: 761, stress: 66, agricultureShare: .9, industryShare: .02, efficiency: 6.4, irrigatedArea: 71 },
  { country: 'Japan', iso3: 'JPN', region: 'Eastern & Southern Asia', population: 125, resources: 430, withdrawal: 79, stress: 25, agricultureShare: .64, industryShare: .17, efficiency: 45, irrigatedArea: 2.5 },
  { country: 'Korea', iso3: 'KOR', region: 'Eastern & Southern Asia', population: 51.6, resources: 70, withdrawal: 25, stress: 55, agricultureShare: .48, industryShare: .16, efficiency: 41, irrigatedArea: .73 },
  { country: 'Indonesia', iso3: 'IDN', region: 'Eastern & Southern Asia', population: 275, resources: 2019, withdrawal: 113, stress: 24, agricultureShare: .81, industryShare: .08, efficiency: 7.3, irrigatedArea: 6.7 },
  { country: 'Vietnam', iso3: 'VNM', region: 'Eastern & Southern Asia', population: 98.6, resources: 884, withdrawal: 82, stress: 24, agricultureShare: .93, industryShare: .02, efficiency: 5.9, irrigatedArea: 4.7 },
  { country: 'Thailand', iso3: 'THA', region: 'Eastern & Southern Asia', population: 71.7, resources: 438, withdrawal: 57, stress: 39, agricultureShare: .9, industryShare: .03, efficiency: 8.1, irrigatedArea: 5 },
  { country: 'Pakistan', iso3: 'PAK', region: 'Eastern & Southern Asia', population: 231, resources: 247, withdrawal: 183, stress: 116, agricultureShare: .94, industryShare: .01, efficiency: 4.1, irrigatedArea: 19 },
  { country: 'Bangladesh', iso3: 'BGD', region: 'Eastern & Southern Asia', population: 171, resources: 1227, withdrawal: 35, stress: 36, agricultureShare: .88, industryShare: .03, efficiency: 4.4, irrigatedArea: 5.6 },

  { country: 'Germany', iso3: 'DEU', region: 'Europe & Central Asia', population: 84, resources: 188, withdrawal: 30, stress: 25, agricultureShare: .03, industryShare: .72, efficiency: 58, irrigatedArea: .5 },
  { country: 'France', iso3: 'FRA', region: 'Europe & Central Asia', population: 68, resources: 211, withdrawal: 26, stress: 21, agricultureShare: .48, industryShare: .31, efficiency: 41, irrigatedArea: 2.7 },
  { country: 'Spain', iso3: 'ESP', region: 'Europe & Central Asia', population: 47.6, resources: 112, withdrawal: 31, stress: 58, agricultureShare: .71, industryShare: .18, efficiency: 34, irrigatedArea: 3.7 },
  { country: 'Italy', iso3: 'ITA', region: 'Europe & Central Asia', population: 59, resources: 191, withdrawal: 34, stress: 42, agricultureShare: .53, industryShare: .29, efficiency: 37, irrigatedArea: 2.4 },
  { country: 'United Kingdom', iso3: 'GBR', region: 'Europe & Central Asia', population: 67.5, resources: 147, withdrawal: 10.5, stress: 16, agricultureShare: .11, industryShare: .49, efficiency: 66, irrigatedArea: .16 },
  { country: 'Netherlands', iso3: 'NLD', region: 'Europe & Central Asia', population: 17.7, resources: 91, withdrawal: 8.9, stress: 18, agricultureShare: .04, industryShare: .72, efficiency: 73, irrigatedArea: .58 },
  { country: 'Sweden', iso3: 'SWE', region: 'Europe & Central Asia', population: 10.5, resources: 171, withdrawal: 2.7, stress: 7, agricultureShare: .08, industryShare: .65, efficiency: 62, irrigatedArea: .16 },
  { country: 'Poland', iso3: 'POL', region: 'Europe & Central Asia', population: 37.7, resources: 61, withdrawal: 10.7, stress: 30, agricultureShare: .09, industryShare: .68, efficiency: 32, irrigatedArea: .12 },
  { country: 'Kazakhstan', iso3: 'KAZ', region: 'Europe & Central Asia', population: 19.6, resources: 108, withdrawal: 25, stress: 65, agricultureShare: .66, industryShare: .25, efficiency: 12, irrigatedArea: 2.1 },

  { country: 'United States', iso3: 'USA', region: 'Americas', population: 333, resources: 3069, withdrawal: 445, stress: 32, agricultureShare: .41, industryShare: .46, efficiency: 55, irrigatedArea: 21 },
  { country: 'Canada', iso3: 'CAN', region: 'Americas', population: 39, resources: 2902, withdrawal: 37, stress: 8, agricultureShare: .11, industryShare: .68, efficiency: 61, irrigatedArea: .87 },
  { country: 'Mexico', iso3: 'MEX', region: 'Americas', population: 128, resources: 461, withdrawal: 87, stress: 59, agricultureShare: .76, industryShare: .12, efficiency: 18, irrigatedArea: 6.2 },
  { country: 'Brazil', iso3: 'BRA', region: 'Americas', population: 215, resources: 8647, withdrawal: 67, stress: 12, agricultureShare: .62, industryShare: .2, efficiency: 11, irrigatedArea: 6.9 },
  { country: 'Argentina', iso3: 'ARG', region: 'Americas', population: 46, resources: 814, withdrawal: 38, stress: 20, agricultureShare: .74, industryShare: .17, efficiency: 17, irrigatedArea: 2.4 },
  { country: 'Chile', iso3: 'CHL', region: 'Americas', population: 19.6, resources: 923, withdrawal: 35, stress: 74, agricultureShare: .73, industryShare: .18, efficiency: 31, irrigatedArea: 1.2 },
  { country: 'Peru', iso3: 'PER', region: 'Americas', population: 34, resources: 1894, withdrawal: 22, stress: 21, agricultureShare: .87, industryShare: .05, efficiency: 9.5, irrigatedArea: 2.7 },
  { country: 'Colombia', iso3: 'COL', region: 'Americas', population: 52, resources: 2132, withdrawal: 15, stress: 11, agricultureShare: .6, industryShare: .19, efficiency: 9.1, irrigatedArea: 1.1 },

  { country: 'Australia', iso3: 'AUS', region: 'Oceania', population: 26, resources: 492, withdrawal: 17, stress: 34, agricultureShare: .65, industryShare: .14, efficiency: 48, irrigatedArea: 1.9 },
  { country: 'New Zealand', iso3: 'NZL', region: 'Oceania', population: 5.2, resources: 327, withdrawal: 5.4, stress: 10, agricultureShare: .64, industryShare: .11, efficiency: 43, irrigatedArea: .72 },
]

export const years = [2020, 2021, 2022]
export const regions = Array.from(new Set(countryBases.map((country) => country.region)))

const growthByRegion: Record<Region, number> = {
  'North Africa & Western Asia': .014,
  'Sub-Saharan Africa': .024,
  'Eastern & Southern Asia': .009,
  'Europe & Central Asia': .002,
  Americas: .008,
  Oceania: .011,
}

function rounded(value: number, decimals = 2): number {
  return Number(value.toFixed(decimals))
}

export const mockData: CountryYearRecord[] = countryBases.flatMap((base) => {
  const signature = [...base.iso3].reduce((total, character) => total + character.charCodeAt(0), 0)
  return years.map((year, index) => {
    const yearsFromBase = year - 2022
    const resourcePulse = [1.018, .982, 1][index] * (1 + ((signature % 7) - 3) * .004)
    const withdrawalTrend = 1 + yearsFromBase * (.014 + (signature % 3) * .003)
    const population = base.population * Math.pow(1 + growthByRegion[base.region], yearsFromBase)
    const renewableWaterResources = base.resources * resourcePulse
    const totalWaterWithdrawal = base.withdrawal * withdrawalTrend
    const stressPulse = [1.025, 1.045, 1][index] * (1 + ((signature % 5) - 2) * .005)
    const waterStress = base.stress * stressPulse
    const agriculturalWithdrawal = totalWaterWithdrawal * base.agricultureShare
    const industrialWithdrawal = totalWaterWithdrawal * base.industryShare
    const municipalWithdrawal = totalWaterWithdrawal - agriculturalWithdrawal - industrialWithdrawal

    return {
      country: base.country,
      iso3: base.iso3,
      region: base.region,
      year,
      population: rounded(population),
      waterStress: rounded(waterStress, 1),
      renewableWaterResources: rounded(renewableWaterResources),
      totalWaterWithdrawal: rounded(totalWaterWithdrawal),
      agriculturalWithdrawal: rounded(agriculturalWithdrawal),
      industrialWithdrawal: rounded(industrialWithdrawal),
      municipalWithdrawal: rounded(municipalWithdrawal),
      waterUseEfficiency: rounded(base.efficiency * (1 + yearsFromBase * .028) * (1 + ((signature % 3) - 1) * .006), 1),
      irrigatedArea: rounded(base.irrigatedArea * (1 + yearsFromBase * .009), 2),
    }
  })
})

export const countryCount = countryBases.length
