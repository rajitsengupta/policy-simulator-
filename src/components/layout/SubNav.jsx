import { GRAPH_CATEGORIES } from '../../data/graphs'
import { buildChartData, YEARS } from '../../utils/modelProxy'
import { useSliderStore } from '../../store/sliderStore'

const BASE_YEAR_CO2 = 4022

const KPI_SCENARIOS = [
  { key: null,  label: 'Base',     color: '#94a3b8' },
  { key: 'BAU', label: 'BAU',      color: '#546e7a' },
  { key: 'NZ',  label: 'Net Zero', color: '#32864B' },
]

export default function SubNav({ activeCategory, setActiveCategory }) {
  const { values } = useSliderStore()

  const bauData = buildChartData('co2_sectoral', values, 'BAU', YEARS)
  const bauPeak = Math.max(...bauData.map(d => d?.scenario ?? 0))
  const nzData  = buildChartData('co2_sectoral', values, 'NZ',  YEARS)
  const nz2070  = nzData[YEARS.indexOf(2070)]?.scenario ?? 0

  const kpiValues = [
    `${BASE_YEAR_CO2.toLocaleString()} Mt`,
    `${Math.round(bauPeak * 1000).toLocaleString()} Mt`,
    `${Math.round(nz2070  * 1000).toLocaleString()} Mt`,
  ]

  return (
    <nav className="bg-white border-b border-gray-200 flex-shrink-0 flex items-center justify-between pr-4"
      aria-label="Indicator categories">

      {/* Category tabs */}
      <div className="flex overflow-x-auto">
        {Object.entries(GRAPH_CATEGORIES).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            aria-current={activeCategory === key ? 'page' : undefined}
            className={`flex-shrink-0 px-4 py-3 text-sm font-semibold border-b-[3px] transition-all whitespace-nowrap ${
              activeCategory === key
                ? 'border-brand-500 text-brand-700 bg-brand-50/60'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* KPI chips — right aligned */}
      <div className="flex items-center gap-3 flex-shrink-0 pl-4 border-l border-gray-100 ml-2">
        <span className="text-xs text-gray-400 hidden lg:block">CO₂e</span>
        {KPI_SCENARIOS.map((s, i) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
            <span className="text-xs hidden xl:block" style={{ color: s.color }}>{s.label}</span>
            <span className="text-xs font-bold" style={{ color: s.color }}>{kpiValues[i]}</span>
          </div>
        ))}
      </div>
    </nav>
  )
}
