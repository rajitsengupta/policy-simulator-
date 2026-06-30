import { YEARS as GEM_YEARS, REAL_DATA, SYNTHETIC_GRAPHS } from '../data/gemData'

export const YEARS = GEM_YEARS

// ─── Synthetic baselines (BAU) ────────────────────────────────────────────────
const SYNTH_BASELINE = {
  // Economic — GDP breakdown
  gdp_total:            [200, 295, 420, 580, 775, 1010, 1270, 1550, 1840, 2140],
  gdp_agriculture:      [28,  38,  50,  63,  77,   91,  105,  118,  130,  141],
  gdp_industry:         [62,  90, 128, 172, 224,  284,  348,  415,  482,  548],
  gdp_services:         [110, 167, 242, 345, 474,  635,  817, 1017, 1228, 1451],
  employment_total:     [440, 455, 470, 482, 492,  500,  507,  512,  515,  517],
  // Economic
  employment_agri:      [230, 220, 208, 195, 182, 170, 160, 152, 146, 141],
  employment_services:  [140, 162, 185, 209, 234, 258, 280, 299, 314, 325],
  employment_industry:  [68,  78,  89, 100, 111, 121, 130, 137, 142, 146],
  unemployment:         [7.8, 7.5, 7.1, 6.8, 6.5, 6.2, 6.0, 5.8, 5.7, 5.6],
  employment_re:        [0.8, 1.4, 2.2, 3.2, 4.4, 5.8, 7.2, 8.5, 9.6, 10.4],
  // Environmental
  livestock_emissions:  [14.2, 14.0, 13.5, 13.1, 12.7, 12.2, 11.8, 11.4, 11.1, 10.8],
  energy_share_emissions:[72, 73, 73, 74, 74, 73, 73, 73, 73, 73],
  // Public finance
  govt_budget:          [55, 68, 84, 102, 123, 147, 174, 204, 237, 273],
  public_debt:          [83, 82, 80, 78, 76, 74, 73, 72, 71, 70],
  dev_expenditure:      [38, 39, 41, 42, 43, 44, 45, 46, 46, 47],
  // Social
  healthcare:           [65, 70, 74, 78, 82, 85, 88, 90, 92, 93],
  schooling:            [6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.4, 9.7, 9.9, 10.1],
  pop_served:           [72, 76, 80, 83, 86, 88, 90, 92, 93, 94],

  // Energy demand by fuel
  energy_demand_biofuel:[4.2, 4.8, 5.4, 5.8, 6.1, 6.3, 6.4, 6.4, 6.3, 6.1],
  energy_demand_gas:    [2.1, 2.8, 3.6, 4.5, 5.4, 6.2, 6.9, 7.4, 7.7, 7.8],
  energy_demand_coal:   [14, 17, 20, 22, 24, 25, 25, 24, 23, 21],
  energy_demand_elec:   [5.2, 7.1, 9.5, 12.3, 15.6, 19.2, 23.0, 26.8, 30.2, 33.0],
  energy_demand_petro:  [8.4, 10.2, 12.1, 13.8, 15.2, 16.3, 17.0, 17.4, 17.5, 17.3],

  // Sectoral CO₂e
  co2_industry:         [0.72, 0.88, 1.05, 1.20, 1.34, 1.45, 1.52, 1.56, 1.57, 1.55],
  co2_livestock:        [0.62, 0.64, 0.66, 0.67, 0.68, 0.68, 0.67, 0.66, 0.65, 0.63],
  co2_soils:            [0.18, 0.19, 0.20, 0.21, 0.21, 0.21, 0.20, 0.20, 0.19, 0.18],
  co2_waste:            [0.14, 0.17, 0.20, 0.23, 0.25, 0.27, 0.28, 0.29, 0.29, 0.28],
  co2_land:             [0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01, 0.00, -0.01],

  // Land-use breakdown (Million Ha)
  land_agriculture:     [182, 180, 178, 175, 172, 169, 166, 163, 161, 159],
  land_urban:           [9.2, 10.1, 11.2, 12.4, 13.7, 15.1, 16.4, 17.6, 18.7, 19.6],
  land_fallow:          [25, 24, 23, 22, 21, 20, 19, 18, 18, 17],
  land_culturable_waste: [14, 13.5, 13, 12.5, 12, 11.5, 11, 10.5, 10, 9.5],
  land_unculturable_waste:[20, 20, 20, 19.5, 19.5, 19, 19, 19, 18.5, 18.5],

  // GDP shares (%)
  gdp_share_agri:       [17, 16, 15, 14, 13, 12, 11, 10, 9, 8.5],
  gdp_share_industry:   [28, 28, 29, 29, 29, 29, 28, 28, 27, 27],
  gdp_share_services:   [55, 56, 56, 57, 58, 59, 61, 62, 64, 64.5],

  // Employment extras
  employment_agri_rel:  [52, 48, 44, 40, 37, 34, 31, 29, 28, 27],
  employment_fossil:    [0.9, 1.0, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3],
  employment_nonfossil: [0.4, 0.7, 1.2, 1.8, 2.6, 3.5, 4.5, 5.4, 6.1, 6.7],
  employment_elec:      [1.3, 1.7, 2.2, 2.7, 3.4, 4.2, 5.1, 5.9, 6.5, 7.0],
  employment_re_other:  [0.1, 0.2, 0.3, 0.5, 0.7, 1.0, 1.3, 1.6, 1.9, 2.1],
  employment_agri_sust: [2, 3, 5, 7, 9, 12, 15, 17, 19, 21],
  employment_labor_energy:[1.2, 1.6, 2.1, 2.7, 3.4, 4.2, 5.1, 6.0, 6.8, 7.5],
  green_jobs_share:     [1.5, 2.2, 3.1, 4.3, 5.6, 7.1, 8.8, 10.2, 11.4, 12.3],
  green_jobs_additional:[0, 0.8, 1.8, 3.2, 4.8, 6.6, 8.5, 10.2, 11.6, 12.8],

  // Investment & income
  nominal_investment:   [45, 68, 98, 138, 188, 248, 315, 388, 464, 542],
  nominal_investment_gdp:[22, 23, 23, 24, 24, 25, 25, 25, 25, 25],
  private_savings:      [38, 57, 82, 115, 156, 205, 260, 319, 380, 442],
  income_labour:        [82, 122, 176, 244, 328, 425, 533, 648, 766, 882],

  // Productivity
  tfp_industry:         [1.0, 1.08, 1.17, 1.26, 1.35, 1.44, 1.52, 1.59, 1.65, 1.70],
  tfp_services:         [1.0, 1.10, 1.21, 1.33, 1.45, 1.58, 1.70, 1.81, 1.91, 1.99],

  // Cost indicators
  cumulative_scc:       [0, 18, 42, 74, 115, 166, 228, 302, 388, 486],
  lc_cost:              [0, 4, 10, 18, 28, 40, 54, 69, 84, 99],

  // Power generation
  power_capacity_total: [480, 620, 810, 1020, 1240, 1470, 1700, 1920, 2110, 2270],
  elec_gen_shares:      [55, 52, 47, 42, 38, 34, 31, 28, 26, 25],
  capacity_installed:   [72, 75, 77, 79, 81, 83, 85, 86, 87, 88],
  nonfossil_share:      [28, 35, 44, 51, 57, 63, 68, 72, 75, 78],
  other_re_share:       [8, 9, 10, 11, 12, 13, 14, 14, 15, 15],

  // Energy emissions
  co2_energy_sector:    [2.94, 3.18, 3.50, 3.92, 4.37, 4.84, 5.04, 5.34, 5.55, 5.66],
  carbon_intensity_energy:[68, 70, 72, 73, 73, 72, 70, 68, 65, 62],
  co2_proxy:            [3.8, 4.2, 4.7, 5.2, 5.7, 6.1, 6.3, 6.5, 6.5, 6.4],

  // Emission shares
  land_share_emissions: [2.1, 1.8, 1.5, 1.2, 0.9, 0.6, 0.4, 0.2, 0.0, -0.2],
  waste_share_emissions:[3.8, 4.0, 4.1, 4.2, 4.2, 4.2, 4.1, 4.0, 3.9, 3.8],
  soils_share_emissions:[4.8, 4.6, 4.5, 4.4, 4.2, 4.0, 3.9, 3.8, 3.7, 3.6],
  ippu_share_emissions: [5.2, 5.5, 5.7, 5.8, 5.8, 5.7, 5.6, 5.5, 5.4, 5.3],

  // Public finance extras
  govt_revenue:         [42, 54, 70, 90, 115, 145, 178, 216, 258, 303],
  govt_expenditure:     [48, 61, 77, 97, 122, 151, 184, 221, 262, 307],
  govt_investment:      [12, 16, 21, 27, 34, 43, 53, 64, 76, 89],
  non_dev_expenditure:  [18, 22, 27, 33, 40, 48, 57, 67, 78, 90],

  // Social / Demographic
  birth_rate:           [18.2, 17.0, 15.8, 14.7, 13.7, 12.8, 12.0, 11.4, 10.9, 10.5],
  death_rate:           [7.2, 7.0, 6.8, 6.7, 6.7, 6.8, 6.9, 7.1, 7.4, 7.8],
  life_expectancy:      [70.5, 72.0, 73.4, 74.7, 75.9, 77.0, 78.0, 78.8, 79.5, 80.1],

  // Natural resource extras
  land_bioethanol:      [0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.2, 2.4, 2.5, 2.6],
  sustainable_cropland: [28, 35, 44, 54, 65, 76, 86, 95, 102, 108],
  sustainable_agri_prod:[180, 220, 270, 325, 385, 445, 500, 550, 590, 620],
  organic_agri_share:   [3, 4, 6, 8, 10, 13, 16, 18, 20, 22],
  fertilizer_rel:       [1.0, 1.02, 1.04, 1.05, 1.06, 1.06, 1.05, 1.04, 1.03, 1.02],
  fertilizer_organic:   [12, 14, 17, 20, 24, 28, 32, 36, 39, 42],
  bioethanol_ha:        [0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.2, 2.4, 2.5, 2.6],
  energy_demand_sector: [38, 47, 57, 68, 80, 92, 103, 113, 121, 127],
}

// Scenario offsets applied on top of BAU baseline (MNR and NZ vs BAU)
const SYNTH_OFFSET = {
  // GDP breakdown
  gdp_total:            { MNR: [5,10,18,28,42,60,80,102,126,152],      NZ: [8,18,32,50,72,98,128,160,194,230] },
  gdp_agriculture:      { MNR: [1,1.5,2,2.5,3,3.5,4,4.5,5,5.5],       NZ: [0.5,1,1.5,2,2.5,3,3.5,4,4.5,5] },
  gdp_industry:         { MNR: [2,4,6,9,12,16,20,24,28,32],            NZ: [3,6,10,14,19,25,31,38,44,50] },
  gdp_services:         { MNR: [2,5,10,17,27,41,56,74,93,115],         NZ: [4,11,21,34,50,70,93,118,145,175] },
  employment_total:     { MNR: [2,4,6,8,9,10,11,12,12,13],             NZ: [1,3,5,7,8,9,10,10,11,11] },
  // Energy demand by fuel
  energy_demand_biofuel:{ MNR: [0.3,0.5,0.7,0.8,0.9,0.8,0.7,0.6,0.5,0.4], NZ: [0.5,0.8,1.0,1.0,0.9,0.8,0.6,0.4,0.2,0.0] },
  energy_demand_gas:    { MNR: [0.1,0.2,0.3,0.4,0.5,0.5,0.4,0.3,0.2,0.1], NZ: [-0.1,-0.3,-0.5,-0.7,-0.9,-1.1,-1.3,-1.4,-1.5,-1.5] },
  energy_demand_coal:   { MNR: [-0.5,-1,-1.5,-2,-2.5,-3,-3.5,-4,-4.5,-5],  NZ: [-1,-2.5,-4,-5.5,-7,-8.5,-10,-11,-12,-12.5] },
  energy_demand_elec:   { MNR: [0.3,0.6,1.0,1.4,1.8,2.2,2.6,3.0,3.3,3.5], NZ: [0.5,1.2,2.0,2.8,3.6,4.4,5.2,5.9,6.5,7.0] },
  energy_demand_petro:  { MNR: [-0.2,-0.4,-0.6,-0.8,-1.0,-1.2,-1.4,-1.5,-1.6,-1.6], NZ: [-0.4,-0.9,-1.5,-2.2,-2.9,-3.6,-4.3,-4.8,-5.2,-5.4] },
  // Sectoral CO₂e
  co2_industry:         { MNR: [-0.02,-0.05,-0.08,-0.12,-0.16,-0.20,-0.24,-0.28,-0.32,-0.36], NZ: [-0.04,-0.10,-0.18,-0.27,-0.36,-0.46,-0.55,-0.63,-0.70,-0.76] },
  co2_livestock:        { MNR: [-0.04,-0.06,-0.08,-0.10,-0.12,-0.14,-0.15,-0.16,-0.17,-0.18], NZ: [-0.02,-0.04,-0.06,-0.08,-0.10,-0.12,-0.14,-0.16,-0.17,-0.18] },
  co2_soils:            { MNR: [-0.01,-0.02,-0.03,-0.04,-0.04,-0.05,-0.05,-0.05,-0.06,-0.06], NZ: [-0.01,-0.02,-0.03,-0.04,-0.05,-0.05,-0.06,-0.06,-0.07,-0.07] },
  co2_waste:            { MNR: [-0.01,-0.02,-0.03,-0.04,-0.05,-0.06,-0.06,-0.07,-0.07,-0.07], NZ: [-0.02,-0.04,-0.06,-0.08,-0.09,-0.10,-0.11,-0.12,-0.12,-0.12] },
  co2_land:             { MNR: [-0.02,-0.03,-0.03,-0.04,-0.04,-0.04,-0.05,-0.05,-0.05,-0.06], NZ: [-0.03,-0.05,-0.06,-0.07,-0.07,-0.08,-0.08,-0.08,-0.09,-0.09] },
  // Land-use
  land_agriculture:     { MNR: [-1,-2,-3,-3,-4,-4,-5,-5,-5,-6],        NZ: [-0.5,-1,-2,-2,-3,-3,-4,-4,-4,-5] },
  land_urban:           { MNR: [0,0,0,0,0,0,0,0,0,0],                  NZ: [0,0,0,0,0,0,0,0,0,0] },
  land_fallow:          { MNR: [-1,-1,-1,-1,-2,-2,-2,-2,-2,-2],         NZ: [-0.5,-1,-1,-1,-1,-1,-1,-1,-1,-1] },
  land_culturable_waste:{ MNR: [-0.5,-0.5,-1,-1,-1,-1,-1,-1,-1,-1],    NZ: [-0.5,-1,-1,-1,-1.5,-1.5,-1.5,-1.5,-2,-2] },
  land_unculturable_waste:{ MNR:[0,0,0,0,0,0,0,0,0,0],                 NZ: [0,0,0,0,0,0,0,0,0,0] },
  employment_agri:      { MNR: [5,8,10,11,12,13,14,14,15,15],    NZ: [3,5,7,8,9,10,11,11,12,12] },
  employment_services:  { MNR: [3,5,7,9,11,13,15,16,17,18],      NZ: [5,8,12,15,18,21,23,25,26,27] },
  employment_industry:  { MNR: [1,2,3,4,5,5,6,6,7,7],            NZ: [2,3,4,5,6,7,8,8,9,9] },
  unemployment:         { MNR: [-0.3,-0.4,-0.5,-0.5,-0.6,-0.6,-0.7,-0.7,-0.7,-0.8], NZ: [-0.2,-0.3,-0.4,-0.4,-0.5,-0.5,-0.6,-0.6,-0.6,-0.7] },
  employment_re:        { MNR: [0.2,0.5,1.0,1.8,2.8,3.9,5.1,6.2,7.0,7.7],           NZ: [0.4,0.9,1.8,3.0,4.5,6.2,7.9,9.4,10.6,11.5] },
  livestock_emissions:  { MNR: [-1.0,-1.2,-1.5,-1.7,-2.0,-2.2,-2.4,-2.5,-2.6,-2.7], NZ: [-0.5,-0.8,-1.0,-1.2,-1.4,-1.6,-1.8,-2.0,-2.1,-2.2] },
  energy_share_emissions:{ MNR:[-1,-2,-3,-3,-4,-4,-4,-5,-5,-5],                      NZ: [-2,-4,-5,-6,-7,-7,-8,-8,-9,-9] },
  govt_budget:          { MNR: [1,2,3,4,5,7,9,11,13,15],         NZ: [-1,-1,-2,-2,-2,-3,-3,-4,-4,-5] },
  public_debt:          { MNR: [-0.5,-1,-1.5,-2,-2.5,-3,-3.5,-4,-4.5,-5], NZ: [0.5,1,1.5,2,2.5,3,3.5,4,4.5,5] },
  dev_expenditure:      { MNR: [1,2,2,3,3,4,4,5,5,5],            NZ: [2,3,4,5,6,7,8,9,10,11] },
  healthcare:           { MNR: [2,3,4,5,6,6,7,7,8,8],            NZ: [1,2,3,4,4,5,5,5,6,6] },
  schooling:            { MNR: [0.2,0.3,0.4,0.5,0.5,0.6,0.6,0.7,0.7,0.8], NZ: [0.3,0.4,0.5,0.6,0.7,0.8,0.9,0.9,1.0,1.0] },
  pop_served:           { MNR: [1,2,3,3,4,4,4,5,5,5],            NZ: [0.5,1,2,2,3,3,3,4,4,4] },
}

// ─── Slider impact on real-data graphs ───────────────────────────────────────
const SLIDER_IMPACT = {
  co2_sectoral:      ['coal_electrified','coal_to_h2','gas_electrified','petroleum_electrified','carbon_price_mnr','switch_ccs'],
  co2_energy:        ['coal_electrified','gas_electrified','petroleum_electrified','biomass_electrified','carbon_price_mnr'],
  gdp_growth:        ['gdp_growth_switch','local_manufacturing','carbon_price_mnr'],
  energy_demand:     ['floating_solar','re_storage_baseline','generation_shares_bau','biomass_electrified'],
  re_share:          ['floating_solar','generation_shares_bau','re_storage_baseline'],
  industry_ei:       ['carbon_price_mnr','coal_to_h2','gas_to_h2_nz','coal_electrified'],
  sustainable_agri:  ['organic_farming_mnr','agroforestry_rate','crop_choices_mnr'],
  forest_cover:      ['afforestation','reforestation_bau','switch_agroforestry','agroforestry_rate'],
  lc_investment:     ['local_manufacturing','generation_shares_bau','floating_solar'],
  land_use:          ['floating_solar','agroforestry_rate','switch_precision_farming'],
  emission_intensity:['carbon_price_mnr','coal_to_h2','gas_to_h2_nz'],
  emission_intensity_lcu: ['carbon_price_mnr','coal_to_h2','gas_to_h2_nz'],
}

const SLIDER_DEFAULTS = {
  coal_electrified:0.10, coal_to_h2:0.05, gas_electrified:0.12, petroleum_electrified:0.15,
  carbon_price_mnr:5000, switch_ccs:0, biomass_electrified:0.15, gdp_growth_switch:2,
  local_manufacturing:0.50, floating_solar:0.10, re_storage_baseline:0.15,
  generation_shares_bau:0.40, afforestation:300000, reforestation_bau:20000,
  switch_agroforestry:0, agroforestry_rate:0.10, gas_to_h2_nz:0.10,
  organic_farming_mnr:0.20, crop_choices_mnr:0.25, switch_precision_farming:0,
}

function sliderDelta(graphId, sliderValues) {
  const keys = SLIDER_IMPACT[graphId] || []
  let total = 0
  for (const k of keys) {
    const fk = Object.keys(sliderValues).find(x => x.endsWith('-' + k))
    if (fk == null) continue
    const def = SLIDER_DEFAULTS[k] ?? 0
    const max = k === 'carbon_price_mnr' ? 50000 : k === 'afforestation' ? 700000 : k === 'reforestation_bau' ? 100000 : k === 'gdp_growth_switch' ? 3 : 1
    total += (sliderValues[fk] - def) / max
  }
  return keys.length > 0 ? total / keys.length : 0
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function buildChartData(graphId, sliderValues, scenarioKey = 'BAU', years = YEARS) {
  return SYNTHETIC_GRAPHS.has(graphId)
    ? buildSynthetic(graphId, sliderValues, scenarioKey, years)
    : buildReal(graphId, sliderValues, scenarioKey, years)
}

function buildReal(graphId, sliderValues, scenarioKey, years) {
  const bucket = REAL_DATA[graphId]
  if (!bucket) return buildSynthetic(graphId, sliderValues, scenarioKey, years)

  const bau      = bucket['BAU']
  const scenario = bucket[scenarioKey] ?? bau
  const delta    = sliderDelta(graphId, sliderValues)
  const co2like  = ['co2_sectoral','co2_energy','emission_intensity','emission_intensity_lcu','industry_ei'].includes(graphId)
  const sign     = co2like ? -1 : 1

  const adjusted = scenario.map((v, i) =>
    Math.max(0, v + v * delta * sign * 0.15 * (1 + i * 0.04))
  )

  return years.map((yr, i) => ({
    year: yr,
    baseline:   +bau[i].toFixed(4),
    scenario:   +adjusted[i].toFixed(4),
    upperBound: +(adjusted[i] * 1.10).toFixed(4),
    lowerBound: +(adjusted[i] * 0.90).toFixed(4),
  }))
}

function buildSynthetic(graphId, sliderValues, scenarioKey, years) {
  const bau    = SYNTH_BASELINE[graphId] || years.map((_, i) => 50 + i * 2)
  const offset = (SYNTH_OFFSET[graphId] || {})[scenarioKey] || new Array(years.length).fill(0)
  const delta  = sliderDelta(graphId, sliderValues)

  const scenario = bau.map((v, i) => {
    const base = v + (offset[i] || 0)
    return Math.max(0, base + base * delta * 0.10 * (1 + i * 0.04))
  })

  return years.map((yr, i) => ({
    year: yr,
    baseline:   +bau[i].toFixed(3),
    scenario:   +scenario[i].toFixed(3),
    upperBound: +(scenario[i] * 1.10).toFixed(3),
    lowerBound: +(scenario[i] * 0.90).toFixed(3),
  }))
}
