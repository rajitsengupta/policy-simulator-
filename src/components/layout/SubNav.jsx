import { GRAPH_CATEGORIES } from '../../data/graphs'
import { buildChartData, YEARS } from '../../utils/modelProxy'
import { useSliderStore } from '../../store/sliderStore'

const SCENARIO_META = [
  { key: 'BAU', label: 'BAU',      color: '#E53935' },
  { key: 'MNR', label: 'MNR',      color: '#2E7D32' },
  { key: 'NZ',  label: 'Net Zero', color: '#0097A7' },
]

// Sum all years for cumulative CO₂ (Gt × 5-yr intervals ≈ GtCO₂e total)
function cumulative(data) {
  return data.reduce((sum, d) => sum + (d?.scenario ?? 0), 0)
}

export default function SubNav({ activeCategory, setActiveCategory }) {
  const { values, activeScenario, modifiedCount } = useSliderStore()

  // Cumulative CO₂ for each baseline scenario (unmodified)
  const scenarioKPIs = SCENARIO_META.map(s => {
    const data = buildChartData('co2_sectoral', {}, s.key, YEARS)
    const cum  = cumulative(data)
    return { ...s, value: `${Math.round(cum).toLocaleString()} Gt` }
  })

  // User's custom scenario — only shown when sliders are modified
  const userKPI = modifiedCount > 0 ? (() => {
    const data = buildChartData('co2_sectoral', values, activeScenario, YEARS)
    const cum  = cumulative(data)
    return { value: `${Math.round(cum).toLocaleString()} Gt`, scenario: activeScenario }
  })() : null

  return (
    <nav className="bg-white border-b border-gray-200 flex-shrink-0 flex items-center justify-between pr-3"
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
      <div className="flex items-center gap-3 flex-shrink-0 pl-3 border-l border-gray-100 ml-2">
        <span className="text-xs text-gray-400 hidden lg:block whitespace-nowrap">Cumulative CO₂e</span>

        {scenarioKPIs.map(s => (
          <div key={s.key} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
            <span className="text-xs hidden xl:block" style={{ color: s.color }}>{s.label}</span>
            <span className="text-xs font-bold" style={{ color: s.color }}>{s.value}</span>
          </div>
        ))}

        {/* Your scenario chip — appears only when sliders are modified */}
        {userKPI && (
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
            <span className="text-xs text-amber-700 font-bold whitespace-nowrap">
              Your scenario: {userKPI.value}
            </span>
          </div>
        )}
      </div>
    </nav>
  )
}
