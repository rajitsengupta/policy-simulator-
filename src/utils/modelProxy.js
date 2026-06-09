import { YEARS as GEM_YEARS, REAL_DATA, SYNTHETIC_GRAPHS } from '../data/gemData'

export const YEARS = GEM_YEARS

// ─── Synthetic baselines (BAU) ────────────────────────────────────────────────
const SYNTH_BASELINE = {
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
}

// Scenario offsets applied on top of BAU baseline (MNR and NZ vs BAU)
const SYNTH_OFFSET = {
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
