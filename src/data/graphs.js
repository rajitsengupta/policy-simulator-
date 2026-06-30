export const GRAPH_CATEGORIES = {
  economic: {
    label: 'Economic',
    graphs: [
      // GDP
      { id: 'gdp_growth',             name: 'Real GDP growth rate',                                subtitle: 'How fast is India\'s economy growing?',                            unit: '% per year',     featured: true },
      { id: 'gdp_total',              name: 'Total real GDP',                                       subtitle: 'India\'s total economic output in constant prices.',                unit: '₹ Trillion' },
      { id: 'gdp_agriculture',        name: 'Real GDP – agriculture sector',                        subtitle: 'Economic output from farming, forestry and fisheries.',             unit: '₹ Trillion' },
      { id: 'gdp_industry',           name: 'Real GDP – industry',                                  subtitle: 'Economic output from manufacturing, construction and energy.',       unit: '₹ Trillion' },
      { id: 'gdp_services',           name: 'Real GDP – services',                                  subtitle: 'Economic output from trade, finance, IT and services.',             unit: '₹ Trillion' },
      { id: 'gdp_share_agri',         name: 'Agriculture share in real GDP',                        subtitle: 'Share of agriculture sector in total GDP.',                         unit: '%' },
      { id: 'gdp_share_industry',     name: 'Industry share in real GDP',                           subtitle: 'Share of industry sector in total GDP.',                            unit: '%' },
      { id: 'gdp_share_services',     name: 'Services share in real GDP',                           subtitle: 'Share of services sector in total GDP.',                            unit: '%' },
      // Employment
      { id: 'employment_total',       name: 'Total employment',                                     subtitle: 'All workers across agriculture, industry and services.',             unit: 'Million workers' },
      { id: 'employment_agri',        name: 'Total employment – agricultural sector',               subtitle: 'How many people work in farming, forestry and fisheries?',          unit: 'Million workers' },
      { id: 'employment_agri_rel',    name: 'Relative employment in agricultural sector',           subtitle: 'Agricultural workers as a share of total employment.',               unit: '%' },
      { id: 'employment_industry',    name: 'Employment in industry',                               subtitle: 'Jobs in manufacturing, construction and energy.',                    unit: 'Million workers' },
      { id: 'employment_services',    name: 'Employment in services',                               subtitle: 'Jobs in trade, finance, IT and other service industries.',           unit: 'Million workers' },
      { id: 'unemployment',           name: 'Unemployment rate',                                    subtitle: 'Share of the workforce without jobs.',                              unit: '%' },
      { id: 'employment_re',          name: 'Employment for power generation',                      subtitle: 'Jobs created by solar, wind and other clean energy sectors.',       unit: 'Million workers' },
      { id: 'employment_fossil',      name: 'Employment from fossil fuel capacity',                 subtitle: 'Jobs supported by coal, gas and oil power generation.',             unit: 'Million workers' },
      { id: 'employment_nonfossil',   name: 'Employment from non-fossil fuel capacity',             subtitle: 'Jobs in nuclear, hydro and renewable power generation.',            unit: 'Million workers' },
      { id: 'employment_elec',        name: 'Electricity employment',                               subtitle: 'Total jobs across the electricity generation sector.',              unit: 'Million workers' },
      { id: 'employment_re_other',    name: 'Total other RE employment',                            subtitle: 'Jobs in renewable energy sectors beyond solar and wind.',            unit: 'Million workers' },
      { id: 'employment_agri_sust',   name: 'Sustainable agriculture employment',                   subtitle: 'Jobs in sustainable and organic farming practices.',                 unit: 'Million workers' },
      { id: 'employment_labor_energy',name: 'Total labour income – energy sector',                  subtitle: 'Total wages and earnings generated in the energy sector.',           unit: '₹ Trillion' },
      { id: 'green_jobs_share',       name: 'Green jobs as a share of total employment',            subtitle: 'Low-carbon and clean-energy jobs as % of all jobs.',                unit: '%' },
      { id: 'green_jobs_additional',  name: 'Additional green jobs',                                subtitle: 'Net new green jobs created relative to BAU.',                       unit: 'Million workers' },
      // Investment & savings
      { id: 'nominal_investment',     name: 'Nominal investment',                                   subtitle: 'Total gross fixed capital formation in current prices.',             unit: '₹ Trillion' },
      { id: 'nominal_investment_gdp', name: 'Nominal investment as share of GDP',                   subtitle: 'Gross fixed capital formation as % of GDP.',                        unit: '%' },
      { id: 'private_savings',        name: 'Private savings for private investment',               subtitle: 'Household and corporate savings available for investment.',         unit: '₹ Trillion' },
      { id: 'income_labour',          name: 'Income of labour',                                     subtitle: 'Total wages and compensation earned by workers.',                   unit: '₹ Trillion' },
      // Productivity
      { id: 'tfp_industry',           name: 'Total factor productivity – industry',                 subtitle: 'Efficiency of inputs used in industrial production.',                unit: 'Index' },
      { id: 'tfp_services',           name: 'Total factor productivity – services',                 subtitle: 'Efficiency of inputs used in service sector production.',            unit: 'Index' },
      // Emission & cost
      { id: 'emission_intensity_lcu', name: 'Emissions intensity per million LCU',                  subtitle: 'Greenhouse gas intensity per million rupees of output.',            unit: 'tCO₂e/₹M' },
      { id: 'industry_ei',            name: 'Industry sector emission intensity per unit GDP',      subtitle: 'How carbon-intensive is India\'s industrial output?',               unit: 'tCO₂e/₹Cr' },
      { id: 'cumulative_scc',         name: 'Cumulative social cost of carbon',                     subtitle: 'Economic cost of cumulative CO₂e emissions to society.',            unit: '₹ Trillion' },
      { id: 'lc_cost',                name: 'Total cost of low-carbon interventions',               subtitle: 'Investment required to implement all low-carbon policies.',          unit: '₹ Trillion' },
    ],
  },

  energy: {
    label: 'Energy',
    graphs: [
      { id: 'co2_energy',             name: 'Total CO₂e emissions from energy',                    subtitle: 'Greenhouse gases from burning fossil fuels for power and heat.',    unit: 'Gt CO₂e/year',   featured: true },
      { id: 'energy_demand',          name: 'Total normalised energy demand',                       subtitle: 'How much total energy does India consume each year?',               unit: 'EJ/year' },
      { id: 'energy_demand_sector',   name: 'Total energy demand by sector',                        subtitle: 'Energy consumption broken down by end-use sector.',                 unit: 'EJ/year' },
      { id: 'energy_demand_biofuel',  name: 'Total biofuels & waste demand',                        subtitle: 'Total biofuel and waste energy consumption across sectors.',        unit: 'EJ/year' },
      { id: 'energy_demand_gas',      name: 'Total natural gas demand',                             subtitle: 'Total natural gas consumption across sectors.',                     unit: 'EJ/year' },
      { id: 'energy_demand_coal',     name: 'Total coal demand',                                    subtitle: 'Total coal consumption across sectors.',                            unit: 'EJ/year' },
      { id: 'energy_demand_elec',     name: 'Total electricity demand',                             subtitle: 'Total electricity consumption across sectors.',                     unit: 'EJ/year' },
      { id: 'energy_demand_petro',    name: 'Total petroleum demand',                               subtitle: 'Total petroleum consumption across sectors.',                       unit: 'EJ/year' },
      // Power generation
      { id: 're_share',               name: 'Share of power generation capacity – renewable',       subtitle: 'What fraction of India\'s electricity comes from clean sources?',   unit: '%' },
      { id: 'power_capacity_total',   name: 'Total power generation capacity',                      subtitle: 'Installed electricity generation capacity across all technologies.', unit: 'GW' },
      { id: 'elec_gen_shares',        name: 'Electricity generation shares by technology',          subtitle: 'Breakdown of power generation by coal, gas, solar, wind etc.',      unit: '%' },
      { id: 'capacity_installed',     name: 'Share of capacity installed',                          subtitle: 'Actual installed capacity as a share of planned capacity.',         unit: '%' },
      { id: 'nonfossil_share',        name: 'Share of non-fossil fuel capacity',                    subtitle: 'Nuclear, hydro and renewables as share of total power capacity.',   unit: '%' },
      { id: 'other_re_share',         name: 'Share – other renewables',                             subtitle: 'Hydro, biomass, geothermal and other RE as share of total.',        unit: '%' },
      // Emissions
      { id: 'co2_energy_sector',      name: 'Total energy emissions by sector',                     subtitle: 'Energy-related CO₂e broken down by end-use sector.',                unit: 'Gt CO₂e/year' },
      { id: 'carbon_intensity_energy',name: 'Carbon intensity of energy',                           subtitle: 'CO₂e emitted per unit of energy consumed.',                         unit: 'tCO₂e/TJ' },
      { id: 'emission_intensity',     name: 'Industry emission intensity per unit GDP',             subtitle: 'Carbon per unit of economic value created by industry.',            unit: 'tCO₂e/₹Cr' },
    ],
  },

  environmental: {
    label: 'Environmental',
    graphs: [
      { id: 'co2_sectoral',           name: 'Total annual CO₂e emissions',                         subtitle: 'India\'s total greenhouse gas emissions across all sectors.',       unit: 'Gt CO₂e/year',   featured: true },
      { id: 'co2_proxy',              name: 'Proxy for total CO₂e emissions',                      subtitle: 'Model estimate of total GHG including indirect effects.',           unit: 'Gt CO₂e/year' },
      { id: 'co2_industry',           name: 'CO₂e emissions from industry',                        subtitle: 'Greenhouse gases from manufacturing, steel, cement and chemicals.',  unit: 'Gt CO₂e/year' },
      { id: 'co2_livestock',          name: 'Total CO₂e emissions from livestock',                 subtitle: 'Methane and nitrous oxide from cattle and livestock farming.',      unit: 'Gt CO₂e/year' },
      { id: 'co2_soils',              name: 'CO₂e emissions from managed soils',                   subtitle: 'Nitrous oxide from fertiliser use and soil management.',            unit: 'Gt CO₂e/year' },
      { id: 'co2_waste',              name: 'CO₂e emissions from waste',                           subtitle: 'Methane from landfills and wastewater treatment.',                  unit: 'Gt CO₂e/year' },
      { id: 'co2_land',               name: 'CO₂e emissions from land',                            subtitle: 'Net emissions or removals from land-use change and forestry.',      unit: 'Gt CO₂e/year' },
      // Shares
      { id: 'energy_share_emissions', name: 'Energy share in total emissions',                     subtitle: 'The portion of emissions driven by power generation and fuels.',    unit: '%' },
      { id: 'livestock_emissions',    name: 'Livestock share in total emissions',                  subtitle: 'How much of India\'s emissions come from cattle and farming?',     unit: '%' },
      { id: 'land_share_emissions',   name: 'Land share in total emissions',                       subtitle: 'Contribution of land-use change to total GHG emissions.',          unit: '%' },
      { id: 'waste_share_emissions',  name: 'Waste share in total emissions',                      subtitle: 'Contribution of waste sector to total GHG emissions.',             unit: '%' },
      { id: 'soils_share_emissions',  name: 'Managed soils share in total emissions',              subtitle: 'Nitrous oxide from soils as share of total emissions.',             unit: '%' },
      { id: 'ippu_share_emissions',   name: 'IPPU share in total emissions',                       subtitle: 'Industrial Processes and Product Use share of total GHG.',          unit: '%' },
      // Agriculture
      { id: 'sustainable_agri',       name: 'Sustainable agricultural production share',           subtitle: 'Share of farming area using low-impact practices.',                 unit: '%' },
    ],
  },

  public_finance: {
    label: 'Public finance',
    graphs: [
      { id: 'govt_budget',            name: 'Government budget',                                   subtitle: 'Total government revenues minus expenditures.',                    unit: '₹ Trillion',     featured: true },
      { id: 'govt_revenue',           name: 'Government domestic revenue (excl. grants)',          subtitle: 'Tax and non-tax revenues collected by government.',                 unit: '₹ Trillion' },
      { id: 'govt_expenditure',       name: 'Government expenditure',                              subtitle: 'Total government spending on all programmes.',                      unit: '₹ Trillion' },
      { id: 'govt_investment',        name: 'Government investment',                               subtitle: 'Public sector capital expenditure and infrastructure spending.',    unit: '₹ Trillion' },
      { id: 'dev_expenditure',        name: 'Development expenditure',                             subtitle: 'Government spending on health, education and infrastructure.',      unit: '%' },
      { id: 'non_dev_expenditure',    name: 'Non-development expenditure',                         subtitle: 'Administrative and debt-servicing government spending.',            unit: '₹ Trillion' },
      { id: 'lc_investment',          name: 'Low-carbon public investment',                        subtitle: 'Clean energy infrastructure capacity funded or enabled publicly.',   unit: 'GW installed' },
      { id: 'public_debt',            name: 'Public debt',                                         subtitle: 'Government debt as a share of total economic output.',             unit: '% of GDP' },
    ],
  },

  social: {
    label: 'Social',
    graphs: [
      { id: 'population',             name: 'Total population',                                    subtitle: 'How many people live in India?',                                  unit: 'Billion',        featured: true },
      { id: 'birth_rate',             name: 'Birth rate',                                          subtitle: 'Number of births per 1,000 people per year.',                     unit: 'per 1,000' },
      { id: 'death_rate',             name: 'Death rate',                                          subtitle: 'Number of deaths per 1,000 people per year.',                     unit: 'per 1,000' },
      { id: 'life_expectancy',        name: 'Life expectancy',                                     subtitle: 'Average number of years a newborn is expected to live.',           unit: 'Years' },
      { id: 'healthcare',             name: 'Access to basic healthcare',                          subtitle: 'Share of the population with access to essential health services.', unit: '% of population' },
      { id: 'schooling',              name: 'Average years of schooling per capita',               subtitle: 'Educational attainment across the Indian population.',             unit: 'Years' },
      { id: 'pop_served',             name: 'Fraction of population served',                       subtitle: 'Share receiving basic public services like water and sanitation.',  unit: '%' },
    ],
  },

  natural_resources: {
    label: 'Natural resources',
    graphs: [
      { id: 'forest_cover',           name: 'Forest and tree cover',                               subtitle: 'Total area of forests and tree plantations across India.',          unit: 'Million Ha',     featured: true },
      { id: 'land_agriculture',       name: 'Agriculture land',                                    subtitle: 'Total area under crop cultivation and pasture.',                    unit: 'Million Ha' },
      { id: 'land_urban',             name: 'Urban and industrial land',                           subtitle: 'Land area under cities, towns and industrial zones.',               unit: 'Million Ha' },
      { id: 'land_fallow',            name: 'Fallow land',                                         subtitle: 'Temporarily uncultivated agricultural land.',                       unit: 'Million Ha' },
      { id: 'land_culturable_waste',  name: 'Culturable wasteland',                                subtitle: 'Degraded land with potential for restoration.',                     unit: 'Million Ha' },
      { id: 'land_unculturable_waste',name: 'Unculturable wasteland',                              subtitle: 'Land unsuitable for cultivation or restoration.',                   unit: 'Million Ha' },
      { id: 'land_use',               name: 'Total land use for power generation',                 subtitle: 'Land area occupied by solar, wind and other energy infrastructure.', unit: 'Million Ha' },
      { id: 'land_bioethanol',        name: 'Additional land demand for bioethanol',               subtitle: 'Extra land required to meet bioethanol blending targets.',           unit: 'Million Ha' },
      { id: 'sustainable_cropland',   name: 'Sustainable cropland',                                subtitle: 'Cropland managed under sustainable agricultural practices.',         unit: 'Million Ha' },
      { id: 'sustainable_agri_prod',  name: 'Sustainable agriculture production',                  subtitle: 'Output from land under sustainable management.',                    unit: 'Million tonnes' },
      { id: 'organic_agri_share',     name: 'Share of organic agriculture land',                   subtitle: 'Farmland certified under organic or natural farming.',              unit: '%' },
      { id: 'fertilizer_rel',         name: 'Relative chemical fertiliser application',            subtitle: 'Chemical fertiliser use relative to BAU baseline.',                 unit: 'Index' },
      { id: 'fertilizer_organic',     name: 'Total organic fertiliser application rate',           subtitle: 'Total organic fertiliser applied across all cropland.',             unit: 'Mt/year' },
      { id: 'bioethanol_ha',          name: 'Total hectares of bioethanol',                        subtitle: 'Total land area dedicated to bioethanol crop production.',          unit: 'Million Ha' },
    ],
  },
}

export const YEARS = [2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060, 2065, 2070]

// Which graphs have a lower-is-better direction (falling = good)
export const LOWER_IS_BETTER = new Set([
  'co2_sectoral', 'co2_energy', 'co2_industry', 'co2_livestock', 'co2_soils', 'co2_waste', 'co2_land', 'co2_proxy',
  'co2_energy_sector',
  'emission_intensity', 'emission_intensity_lcu', 'industry_ei', 'carbon_intensity_energy',
  'livestock_emissions', 'energy_share_emissions', 'land_share_emissions', 'waste_share_emissions',
  'soils_share_emissions', 'ippu_share_emissions',
  'unemployment', 'public_debt',
  'land_use', 'land_fallow', 'land_culturable_waste', 'land_unculturable_waste', 'land_bioethanol',
  'energy_demand_coal', 'energy_demand_petro',
  'fertilizer_rel', 'cumulative_scc', 'lc_cost',
  'death_rate',
])

// Beginner mode: the 8 most impactful levers for a first-time user
export const KEY_LEVERS = [
  { groupId: 'cross',    id: 'carbon_price_mnr' },
  { groupId: 'cross',    id: 'switch_ccs' },
  { groupId: 'power',    id: 'generation_shares_bau' },
  { groupId: 'power',    id: 'floating_solar' },
  { groupId: 'agri',     id: 'afforestation' },
  { groupId: 'agri',     id: 'switch_agroforestry' },
  { groupId: 'econ',     id: 'gdp_growth_switch' },
  { groupId: 'fuel',     id: 'coal_electrified' },
  { groupId: 'transport',id: 'nmt_nz' },
  { groupId: 'agri',     id: 'organic_farming_mnr' },
]
