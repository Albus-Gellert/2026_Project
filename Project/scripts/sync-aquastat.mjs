import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = resolve(projectRoot, 'src/data')
const dataOutputPath = resolve(outputDirectory, 'aquastat-data.json')
const metadataOutputPath = resolve(outputDirectory, 'aquastat-metadata.json')

const AQUASTAT_RELEASE = 'May 2026 annual release'
const AQUASTAT_PORTAL = 'https://data.apps.fao.org/aquastat/?lang=en'
const UN_M49_URL = 'https://unstats.un.org/unsd/methodology/m49/overview/'
const YEARS = [2020, 2021, 2022, 2023]
const VARIABLE_GROUPS = [3008, 4007, 4010, 4016, 4019]
const SQL_URL = 'https://data.apps.fao.org/catalog/dataset/945666e6-7803-4621-b8ef-cfd885a84596/resource/4a000a1b-24f0-4328-aab6-b9b525892090/download/query_en.sql'
const queryUrl = new URL('https://api.data.apps.fao.org/api/v2/bigquery')
queryUrl.searchParams.set('sql_url', SQL_URL)
queryUrl.searchParams.set('area', 'World')
queryUrl.searchParams.set('type', 'all')
queryUrl.searchParams.set('variable', VARIABLE_GROUPS.join(','))
queryUrl.searchParams.set('year', YEARS.join(','))

// 193 UN member states plus the Holy See and the State of Palestine.
// Keeping this scope explicit prevents territories in the basemap from being
// silently counted as countries in dashboard totals.
const ANALYSIS_ISO3_CODES = new Set(`
  DZA AGO BEN BWA BFA BDI CPV CMR CAF TCD COM COG COD CIV DJI EGY GNQ ERI SWZ ETH GAB GMB GHA GIN GNB KEN LSO LBR LBY MDG MWI MLI MRT MUS MAR MOZ NAM NER NGA RWA STP SEN SYC SLE SOM ZAF SSD SDN TZA TGO TUN UGA ZMB ZWE
  ATG ARG BHS BRB BLZ BOL BRA CAN CHL COL CRI CUB DMA DOM ECU SLV GRD GTM GUY HTI HND JAM MEX NIC PAN PRY PER KNA LCA VCT SUR TTO USA URY VEN
  AFG ARM AZE BHR BGD BTN BRN KHM CHN CYP GEO IND IDN IRN IRQ ISR JPN JOR KAZ KWT KGZ LAO LBN MYS MDV MNG MMR NPL PRK OMN PAK PHL QAT KOR SAU SGP LKA SYR TJK THA TLS TUR TKM ARE UZB VNM YEM PSE
  ALB AND AUT BLR BEL BIH BGR HRV CZE DNK EST FIN FRA DEU GRC HUN ISL IRL ITA LVA LIE LTU LUX MLT MDA MCO MNE NLD MKD NOR POL PRT ROU RUS SMR SRB SVK SVN ESP SWE CHE UKR GBR VAT
  AUS FJI KIR MHL FSM NRU NZL PLW PNG WSM SLB TON TUV VUT
`.trim().split(/\s+/))

if (ANALYSIS_ISO3_CODES.size !== 195) {
  throw new Error(`Expected a 195-country analysis scope, received ${ANALYSIS_ISO3_CODES.size}`)
}

const fields = {
  population: { variable: 'Total population', scale: 0.001, targetUnit: 'million people' },
  waterStress: { variable: 'SDG 6.4.2. Water Stress', scale: 1, targetUnit: '%' },
  renewableWaterResources: { variable: 'Total renewable water resources', scale: 1, targetUnit: 'km³/year' },
  totalWaterWithdrawal: { variable: 'Total water withdrawal', scale: 1, targetUnit: 'km³/year' },
  agriculturalWithdrawal: { variable: 'Agricultural water withdrawal', scale: 1, targetUnit: 'km³/year' },
  industrialWithdrawal: { variable: 'Industrial water withdrawal', scale: 1, targetUnit: 'km³/year' },
  municipalWithdrawal: { variable: 'Municipal water withdrawal', scale: 1, targetUnit: 'km³/year' },
  waterUseEfficiency: { variable: 'SDG 6.4.1. Water Use Efficiency', scale: 1, targetUnit: 'US$/m³' },
  irrigatedArea: { variable: 'Area equipped for irrigation: total', scale: 0.001, targetUnit: 'million hectares' },
}

function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let quoted = false

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index]
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        cell += '"'
        index += 1
      } else if (character === '"') {
        quoted = false
      } else {
        cell += character
      }
    } else if (character === '"') {
      quoted = true
    } else if (character === ',') {
      row.push(cell)
      cell = ''
    } else if (character === '\n') {
      row.push(cell.replace(/\r$/, ''))
      rows.push(row)
      row = []
      cell = ''
    } else {
      cell += character
    }
  }

  if (cell.length || row.length) {
    row.push(cell.replace(/\r$/, ''))
    rows.push(row)
  }

  const [header, ...dataRows] = rows
  return dataRows
    .filter((values) => values.some(Boolean))
    .map((values) => Object.fromEntries(header.map((key, index) => [key, values[index] ?? ''])))
}

function decodeHtml(value) {
  const namedEntities = {
    amp: '&', apos: "'", gt: '>', lt: '<', nbsp: ' ', quot: '"',
  }
  return value
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&([a-z]+);/gi, (entity, name) => namedEntities[name.toLowerCase()] ?? entity)
}

function cleanHtmlCell(value) {
  return decodeHtml(value)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeM49(value) {
  const digits = String(value ?? '').trim()
  return /^\d+$/.test(digits) ? digits.padStart(3, '0') : ''
}

function analysisRegion(regionName, subregionName) {
  if (regionName === 'Americas') {
    return subregionName === 'South America' ? 'South America' : 'North America'
  }
  if (['Africa', 'Asia', 'Europe', 'Oceania'].includes(regionName)) return regionName
  return null
}

function parseM49Directory(html) {
  const byIso3 = new Map()
  for (const rowMatch of html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...rowMatch[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)]
      .map((match) => cleanHtmlCell(match[1]))
    if (cells.length < 12) continue

    const m49 = normalizeM49(cells[9])
    const iso3 = cells[11]
    if (!m49 || !/^[A-Z]{3}$/.test(iso3) || byIso3.has(iso3)) continue

    const region = analysisRegion(cells[3], cells[5])
    if (!region) continue

    byIso3.set(iso3, {
      country: cells[8],
      m49,
      iso3,
      region,
    })
  }
  return byIso3
}

function toNumber(value) {
  if (value === '' || value == null) return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function round(value, decimals = 6) {
  if (value === null) return null
  return Number(value.toFixed(decimals))
}

console.log(`Downloading AQUASTAT data for ${YEARS.join(', ')} and the UN M49 code table...`)
const [aquastatResponse, m49Response] = await Promise.all([
  fetch(queryUrl),
  fetch(UN_M49_URL),
])
if (!aquastatResponse.ok) {
  throw new Error(`AQUASTAT request failed: ${aquastatResponse.status} ${aquastatResponse.statusText}`)
}
if (!m49Response.ok) {
  throw new Error(`UN M49 request failed: ${m49Response.status} ${m49Response.statusText}`)
}

const [csv, m49Html] = await Promise.all([
  aquastatResponse.text(),
  m49Response.text(),
])
const sourceRows = parseCsv(csv)
const m49Directory = parseM49Directory(m49Html)

const sourceCountryNameByM49 = new Map()
for (const row of sourceRows) {
  if (String(row.IsAggregate).toLowerCase() === 'true') continue
  const m49 = normalizeM49(row.m49)
  if (m49 && row.Country && !sourceCountryNameByM49.has(m49)) {
    sourceCountryNameByM49.set(m49, row.Country)
  }
}

const countryDirectory = [...ANALYSIS_ISO3_CODES]
  .map((iso3) => {
    const unEntry = m49Directory.get(iso3)
    if (!unEntry) throw new Error(`UN M49 entry not found for ${iso3}`)
    const officialCountry = sourceCountryNameByM49.get(unEntry.m49) ?? unEntry.country
    return {
      country: officialCountry,
      officialCountry,
      m49: unEntry.m49,
      iso3,
      region: unEntry.region,
    }
  })
  .sort((a, b) => a.country.localeCompare(b.country, 'en'))

const rowIndex = new Map()
for (const row of sourceRows) {
  if (!row.Variable || !row.Year || String(row.IsAggregate).toLowerCase() === 'true') continue
  const m49 = normalizeM49(row.m49)
  if (!m49) continue
  rowIndex.set(`${m49}\u0000${row.Year}\u0000${row.Variable}`, row)
}

const records = []
for (const country of countryDirectory) {
  for (const year of YEARS) {
    const record = {
      ...country,
      year,
      quality: {},
    }

    for (const [key, definition] of Object.entries(fields)) {
      const sourceRow = rowIndex.get(`${country.m49}\u0000${year}\u0000${definition.variable}`)
      const value = toNumber(sourceRow?.Value)
      record[key] = round(value === null ? null : value * definition.scale)
      if (sourceRow && value !== null) {
        record.quality[key] = {
          code: sourceRow.Symbol || '',
          description: sourceRow.SymbolDescription || '',
          sourceVariable: sourceRow.Variable,
          sourceVariableCode: sourceRow.VariableCode || '',
          sourceUnit: sourceRow.Unit || '',
        }
      }
    }
    records.push(record)
  }
}

const countriesWithoutAnyValues = countryDirectory
  .filter((country) => !records.some((record) => (
    record.iso3 === country.iso3
    && Object.keys(fields).some((key) => record[key] !== null)
  )))
  .map(({ country, m49, iso3 }) => ({ country, m49, iso3 }))

const coverageByYear = Object.fromEntries(YEARS.map((year) => [
  year,
  Object.fromEntries(Object.keys(fields).map((key) => [
    key,
    records.filter((record) => record.year === year && record[key] !== null).length,
  ])),
]))

const generatedAt = new Date().toISOString()
const metadata = {
  source: 'FAO AQUASTAT',
  sourcePortal: AQUASTAT_PORTAL,
  sourceQuery: queryUrl.toString(),
  countryCodeSource: UN_M49_URL,
  release: AQUASTAT_RELEASE,
  generatedAt,
  years: YEARS,
  variableGroups: VARIABLE_GROUPS,
  fields,
  qualityCodes: {
    A: 'Official value',
    I: 'Imputed value',
    E: 'AQUASTAT estimate',
    X: 'External value reported by FAOSTAT or another international agency',
    W: 'WaPOR-derived value',
  },
  rules: [
    'The analysis directory contains 193 UN member states plus the Holy See and the State of Palestine.',
    'AQUASTAT rows are joined to the country directory with the official UN M49 numeric code.',
    'ISO3 is retained only as an internal map and record identifier.',
    'Official AQUASTAT values are preserved; no synthetic year interpolation is applied.',
    'Missing values are stored as null and must not be treated as zero.',
    'Population is converted from thousand inhabitants to million people.',
    'Irrigated area is converted from thousand hectares to million hectares.',
  ],
  recordCount: records.length,
  countryCount: countryDirectory.length,
  coverageByYear,
  countriesWithoutAnyValues,
}

await mkdir(outputDirectory, { recursive: true })
await writeFile(dataOutputPath, `${JSON.stringify(records, null, 2)}\n`, 'utf8')
await writeFile(metadataOutputPath, `${JSON.stringify(metadata, null, 2)}\n`, 'utf8')

console.log(JSON.stringify({
  generatedAt,
  records: records.length,
  countries: countryDirectory.length,
  sourceRows: sourceRows.length,
  coverageByYear,
  countriesWithoutAnyValues,
}, null, 2))
