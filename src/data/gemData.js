// Real scenario data — GEM-India model run (25 Nov 2025)
// Source: WRI India / KnowlEdge Srl — "Data for UI UX" model output
// Years: 2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060, 2065, 2070

export const YEARS = [2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060, 2065, 2070]

export const REAL_DATA = {
  // ── Economic ──────────────────────────────────────────────────────────────

  // Real GDP growth rate — % per year (annualised 5-yr CAGR from model GDP levels)
  gdp_growth: {
    NZ:  [9.65, 9.65, 8.69, 7.37, 6.43, 5.66, 4.63, 3.62, 2.64, 1.73],
    MNR: [9.53, 9.53, 8.69, 7.45, 6.53, 5.76, 4.70, 3.68, 2.69, 1.78],
    BAU: [7.90, 7.90, 6.72, 5.50, 4.55, 3.92, 3.12, 2.40, 1.74, 1.23],
  },

  // ── Energy ────────────────────────────────────────────────────────────────

  // CO₂e from energy — approximated as ~73% of total CO₂e (energy sector share)
  co2_energy: {
    NZ:  [2.70, 2.70, 2.45, 2.35, 2.20, 1.86, 1.55, 1.40, 1.07, 0.71],
    MNR: [2.65, 2.42, 2.07, 1.88, 1.64, 1.22, 0.89, 0.72, 0.39, 0.03],
    BAU: [2.94, 3.18, 3.50, 3.92, 4.37, 4.84, 5.04, 5.34, 5.55, 5.66],
  },

  // Share of renewable power generation — %
  re_share: {
    NZ:  [19.2, 35.6, 54.7, 61.7, 69.2, 73.5, 80.5, 81.7, 87.6, 91.8],
    MNR: [19.2, 35.6, 54.5, 61.6, 69.3, 73.6, 80.5, 81.7, 87.6, 91.8],
    BAU: [19.4, 25.6, 35.8, 36.0, 36.1, 35.6, 37.6, 34.8, 33.0, 29.9],
  },

  // Total normalised energy demand — EJ/year
  energy_demand: {
    NZ:  [0.0302, 0.0279, 0.0287, 0.0292, 0.0295, 0.0303, 0.0285, 0.0263, 0.0228, 0.0189],
    MNR: [0.0302, 0.0278, 0.0286, 0.0292, 0.0296, 0.0306, 0.0288, 0.0266, 0.0232, 0.0192],
    BAU: [0.0341, 0.0345, 0.0368, 0.0380, 0.0385, 0.0394, 0.0374, 0.0354, 0.0328, 0.0298],
  },

  // Industry emission intensity per unit GDP — tCO₂e/₹Cr
  industry_ei: {
    NZ:  [96.77, 60.97, 36.55, 24.57, 16.84, 10.81, 7.16, 5.42, 3.64, 2.22],
    MNR: [94.97, 54.95, 31.06, 19.66, 12.49,  7.05, 4.06, 2.75, 1.30, 0.08],
    BAU: [107.69, 79.79, 63.45, 54.30, 48.48, 44.34, 39.63, 37.27, 35.53, 34.07],
  },

  // ── Environmental ─────────────────────────────────────────────────────────

  // Total annual CO₂e emissions — Gt CO₂e/year
  co2_sectoral: {
    NZ:  [3.6978, 3.6929, 3.3569, 3.2197, 3.0141, 2.5487, 2.1173, 1.9129, 1.4641, 0.9715],
    MNR: [3.6357, 3.3159, 2.8426, 2.5764, 2.2454, 1.6768, 1.2140, 0.9875, 0.5314, 0.0379],
    BAU: [4.0224, 4.3578, 4.7967, 5.3647, 5.9816, 6.6305, 6.9080, 7.3147, 7.6027, 7.7492],
  },

  // Sustainable agricultural production share — % (RE generation share as proxy)
  sustainable_agri: {
    NZ:  [19.2, 35.6, 54.7, 61.7, 69.2, 73.5, 80.5, 81.7, 87.6, 91.8],
    MNR: [19.2, 35.6, 54.5, 61.6, 69.3, 73.6, 80.5, 81.7, 87.6, 91.8],
    BAU: [19.4, 25.6, 35.8, 36.0, 36.1, 35.6, 37.6, 34.8, 33.0, 29.9],
  },

  // ── Public finance ────────────────────────────────────────────────────────

  // Low-carbon public investment — GW installed power capacity
  lc_investment: {
    NZ:  [526.8, 1049.4, 1706.5, 2621.1, 3466.1, 4490.5, 5348.7, 6219.0, 6970.1, 7591.6],
    MNR: [527.4, 1047.7, 1658.4, 2509.9, 3354.5, 4388.8, 5259.7, 6168.0, 6994.4, 7713.9],
    BAU: [529.4,  742.3,  897.1, 1218.5, 1482.5, 1745.3, 1865.8, 2088.2, 2215.1, 2280.3],
  },

  // ── Social ────────────────────────────────────────────────────────────────

  // Total population — Billion persons
  population: {
    NZ:  [1.407, 1.451, 1.488, 1.519, 1.538, 1.546, 1.544, 1.534, 1.518, 1.495],
    MNR: [1.407, 1.451, 1.488, 1.519, 1.538, 1.546, 1.544, 1.534, 1.518, 1.495],
    BAU: [1.407, 1.452, 1.488, 1.519, 1.538, 1.546, 1.544, 1.534, 1.518, 1.495],
  },

  // ── Natural resources ─────────────────────────────────────────────────────

  // Forest and tree cover — Million Ha
  forest_cover: {
    NZ:  [78.94, 78.79, 78.36, 77.75, 77.07, 76.43, 75.92, 75.72, 75.88, 76.40],
    MNR: [80.19, 84.10, 87.92, 91.84, 95.99, 99.23, 103.32, 106.61, 109.25, 111.76],
    BAU: [78.94, 78.80, 78.44, 77.94, 77.35, 76.76, 76.30, 76.12, 76.28, 76.77],
  },

  // Total land use for power generation — Million Ha
  land_use: {
    NZ:  [0.462, 1.230, 2.441, 3.979, 5.625, 7.504, 9.563, 11.514, 13.630, 15.469],
    MNR: [0.462, 1.141, 2.128, 3.369, 4.786, 6.470, 8.434, 10.473, 12.787, 14.919],
    BAU: [0.466, 0.769, 1.052, 1.454, 1.785, 2.007, 2.155,  2.328,  2.470,  2.517],
  },

  // Industry emission intensity per unit GDP — tCO₂e/₹Cr (same source as industry_ei)
  emission_intensity: {
    NZ:  [96.77, 60.97, 36.55, 24.57, 16.84, 10.81, 7.16, 5.42, 3.64, 2.22],
    MNR: [94.97, 54.95, 31.06, 19.66, 12.49,  7.05, 4.06, 2.75, 1.30, 0.08],
    BAU: [107.69, 79.79, 63.45, 54.30, 48.48, 44.34, 39.63, 37.27, 35.53, 34.07],
  },

  // Emissions intensity per million LCU — scaled version (×10 of above for LCU units)
  emission_intensity_lcu: {
    NZ:  [967.7, 609.7, 365.5, 245.7, 168.4, 108.1, 71.6, 54.2, 36.4, 22.2],
    MNR: [949.7, 549.5, 310.6, 196.6, 124.9,  70.5, 40.6, 27.5, 13.0,  0.8],
    BAU: [1076.9, 797.9, 634.5, 543.0, 484.8, 443.4, 396.3, 372.7, 355.3, 340.7],
  },
}

// Graphs without real model data — use calibrated synthetic curves
export const SYNTHETIC_GRAPHS = new Set([
  // Economic — GDP
  'gdp_total', 'gdp_agriculture', 'gdp_industry', 'gdp_services',
  'gdp_share_agri', 'gdp_share_industry', 'gdp_share_services',
  // Employment
  'employment_agri', 'employment_agri_rel', 'employment_services', 'employment_industry',
  'employment_total', 'unemployment', 'employment_re',
  'employment_fossil', 'employment_nonfossil', 'employment_elec',
  'employment_re_other', 'employment_agri_sust', 'employment_labor_energy',
  'green_jobs_share', 'green_jobs_additional',
  // Investment & income
  'nominal_investment', 'nominal_investment_gdp', 'private_savings', 'income_labour',
  // Productivity & cost
  'tfp_industry', 'tfp_services', 'cumulative_scc', 'lc_cost',
  // Environmental — sectoral emissions
  'co2_industry', 'co2_livestock', 'co2_soils', 'co2_waste', 'co2_land', 'co2_proxy',
  'livestock_emissions', 'energy_share_emissions',
  'land_share_emissions', 'waste_share_emissions', 'soils_share_emissions', 'ippu_share_emissions',
  // Energy demand by fuel
  'energy_demand_biofuel', 'energy_demand_gas', 'energy_demand_coal',
  'energy_demand_elec', 'energy_demand_petro', 'energy_demand_sector',
  // Power generation
  'power_capacity_total', 'elec_gen_shares', 'capacity_installed', 'nonfossil_share', 'other_re_share',
  'co2_energy_sector', 'carbon_intensity_energy',
  // Public finance
  'govt_budget', 'govt_revenue', 'govt_expenditure', 'govt_investment',
  'public_debt', 'dev_expenditure', 'non_dev_expenditure',
  // Social & demographic
  'healthcare', 'schooling', 'pop_served',
  'birth_rate', 'death_rate', 'life_expectancy',
  // Land-use
  'land_agriculture', 'land_urban', 'land_fallow',
  'land_culturable_waste', 'land_unculturable_waste',
  'land_bioethanol', 'sustainable_cropland', 'sustainable_agri_prod',
  'organic_agri_share', 'fertilizer_rel', 'fertilizer_organic', 'bioethanol_ha',
])
