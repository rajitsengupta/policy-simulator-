export const SCENARIOS = {
  BAU: {
    label: 'Business as usual',
    description: 'No new policies',
    color: '#E53935',  // red
    kpis: {
      gdp: '6.4%', co2: '8.2 Gt', re: '42%', fc: '24%',
      heroValue: '+2.8 Gt', heroLabel: 'above NDC target by 2050',
    },
    note: 'Baseline trajectory with current policies. No additional climate interventions assumed.',
  },
  MNR: {
    label: 'Managing natural resources',
    description: 'Sustainable resource management',
    color: '#2E7D32',  // green
    kpis: {
      gdp: '6.7%', co2: '6.1 Gt', re: '61%', fc: '27%',
      heroValue: '+0.9 Gt', heroLabel: 'above NDC target by 2050',
    },
    note: 'Sustainable resource management policies active. Moderate emissions reduction pathway.',
  },
  NZ: {
    label: 'Net Zero 2070',
    description: 'Deep decarbonisation',
    color: '#0097A7',  // teal/cyan — distinct from green
    kpis: {
      gdp: '6.2%', co2: '2.8 Gt', re: '88%', fc: '33%',
      heroValue: '−1.4 Gt', heroLabel: 'below NDC target by 2050',
    },
    note: 'Deep decarbonisation by 2070. Aggressive renewable transition and land restoration.',
  },
}
