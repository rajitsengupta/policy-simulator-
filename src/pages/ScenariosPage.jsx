import { SCENARIOS } from '../data/scenarios'
import { useSliderStore } from '../store/sliderStore'

const KPI_LABELS = { gdp: 'GDP Growth', co2: 'CO₂e 2050', re: 'RE Share', fc: 'Forest Cover' }

export default function ScenariosPage() {
  const { activeScenario, setScenario } = useSliderStore()

  return (
    <div className="p-6 bg-surface flex-1">
      <h1 className="text-xl font-bold text-gray-900 mb-1">Scenarios</h1>
      <p className="text-sm text-gray-500 mb-6">Compare India's three long-run policy pathways</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Object.entries(SCENARIOS).map(([key, s]) => (
          <div
            key={key}
            className={`bg-white rounded-2xl shadow-sm border-2 p-5 transition-all ${
              activeScenario === key ? 'border-brand-500 shadow-md' : 'border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: s.color }}>{key}</span>
                <h2 className="text-base font-bold text-gray-900 mt-0.5">{s.label}</h2>
              </div>
              <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ background: s.color }} />
            </div>
            <p className="text-sm text-gray-600 mb-4">{s.note}</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {Object.entries(s.kpis).filter(([k]) => KPI_LABELS[k]).map(([k, v]) => (
                <div key={k} className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-lg font-bold" style={{ color: s.color }}>{v}</p>
                  <p className="text-xs text-gray-500">{KPI_LABELS[k]}</p>
                </div>
              ))}
            </div>
            <div className="bg-brand-50 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold text-gray-700">{s.kpis.heroValue}</p>
              <p className="text-xs text-gray-500">{s.kpis.heroLabel}</p>
            </div>
            <button
              onClick={() => setScenario(key)}
              className={`w-full py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeScenario === key
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-brand-50 hover:text-brand-700'
              }`}
            >
              {activeScenario === key ? 'Active' : 'Use this scenario'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
