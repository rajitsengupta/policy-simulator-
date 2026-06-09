export const GRAPH_CATEGORIES = {
  economic: {
    label: 'Economic',
    graphs: [
      { id: 'gdp_growth',            name: 'Real GDP growth rate',                          subtitle: 'How fast is India\'s economy growing?',                        unit: '% per year',      featured: true  },
      { id: 'employment_agri',       name: 'Total employment – agricultural sector',         subtitle: 'How many people work in farming, forestry and fisheries?',      unit: 'Million workers'                  },
      { id: 'employment_services',   name: 'Employment in services',                         subtitle: 'Jobs in trade, finance, IT and other service industries.',       unit: 'Million workers'                  },
      { id: 'employment_industry',   name: 'Employment in industry',                         subtitle: 'Jobs in manufacturing, construction and energy.',                unit: 'Million workers'                  },
      { id: 'unemployment',          name: 'Unemployment rate',                              subtitle: 'Share of the workforce without jobs.',                          unit: '%'                                },
      { id: 'employment_re',         name: 'Total renewable energy employment',               subtitle: 'Jobs created by solar, wind and other clean energy sectors.',   unit: 'Million workers'                  },
    ],
  },
  energy: {
    label: 'Energy',
    graphs: [
      { id: 'co2_energy',            name: 'Total CO₂e emissions from energy',               subtitle: 'Greenhouse gases from burning fossil fuels for power and heat.', unit: 'Gt CO₂e/year',    featured: true  },
      { id: 're_share',              name: 'Share of power generation – renewable',           subtitle: 'What fraction of India\'s electricity comes from clean sources?', unit: '%'                                },
      { id: 'energy_demand',         name: 'Total normalised energy demand',                  subtitle: 'How much total energy does India consume each year?',            unit: 'EJ/year'                          },
      { id: 'industry_ei',           name: 'Industry emission intensity per unit GDP',        subtitle: 'How carbon-intensive is India\'s industrial output?',            unit: 'tCO₂e/₹Cr'                       },
    ],
  },
  environmental: {
    label: 'Environmental',
    graphs: [
      { id: 'co2_sectoral',          name: 'Total annual CO₂e emissions',                    subtitle: 'India\'s total greenhouse gas emissions across all sectors.',     unit: 'Gt CO₂e/year',    featured: true  },
      { id: 'livestock_emissions',   name: 'Livestock share in total emissions',              subtitle: 'How much of India\'s emissions come from cattle and farming?',   unit: '%'                                },
      { id: 'energy_share_emissions',name: 'Energy share in total emissions',                 subtitle: 'The portion of emissions driven by power generation and fuels.',  unit: '%'                                },
      { id: 'sustainable_agri',      name: 'Sustainable agricultural production share',       subtitle: 'Share of farming area using low-impact practices.',              unit: '%'                                },
    ],
  },
  public_finance: {
    label: 'Public finance',
    graphs: [
      { id: 'govt_budget',           name: 'Government budget',                              subtitle: 'Total government revenues minus expenditures.',                  unit: '₹ Trillion',      featured: true  },
      { id: 'lc_investment',         name: 'Low-carbon public investment',                   subtitle: 'Clean energy infrastructure capacity funded or enabled publicly.', unit: 'GW installed'                    },
      { id: 'public_debt',           name: 'Public debt',                                    subtitle: 'Government debt as a share of total economic output.',           unit: '% of GDP'                         },
      { id: 'dev_expenditure',       name: 'Development expenditure',                        subtitle: 'Government spending on health, education and infrastructure.',    unit: '%'                                },
    ],
  },
  social: {
    label: 'Social',
    graphs: [
      { id: 'population',            name: 'Total population',                               subtitle: 'How many people live in India?',                                unit: 'Billion',         featured: true  },
      { id: 'healthcare',            name: 'Access to basic healthcare',                     subtitle: 'Share of the population with access to essential health services.', unit: '% of population'               },
      { id: 'schooling',             name: 'Average years of schooling per capita',           subtitle: 'Educational attainment across the Indian population.',           unit: 'Years'                            },
      { id: 'pop_served',            name: 'Fraction of population served',                  subtitle: 'Share receiving basic public services like water and sanitation.', unit: '%'                               },
    ],
  },
  natural_resources: {
    label: 'Natural resources',
    graphs: [
      { id: 'forest_cover',          name: 'Forest and tree cover',                          subtitle: 'Total area of forests and tree plantations across India.',        unit: 'Million Ha',      featured: true  },
      { id: 'land_use',              name: 'Total land use for power generation',             subtitle: 'Land area occupied by solar, wind and other energy infrastructure.', unit: 'Million Ha'                   },
      { id: 'emission_intensity',    name: 'Industry emission intensity per unit GDP',        subtitle: 'Carbon per unit of economic value created by industry.',         unit: 'tCO₂e/₹Cr'                       },
      { id: 'emission_intensity_lcu',name: 'Emissions intensity per million LCU',             subtitle: 'Greenhouse gas intensity measured per million rupees of output.', unit: 'tCO₂e/₹M'                        },
    ],
  },
}

export const YEARS = [2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060, 2065, 2070]

// Which graphs have a lower-is-better direction (falling = good)
export const LOWER_IS_BETTER = new Set([
  'co2_sectoral', 'co2_energy', 'emission_intensity', 'emission_intensity_lcu',
  'industry_ei', 'livestock_emissions', 'energy_share_emissions', 'unemployment',
  'public_debt', 'land_use',
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
