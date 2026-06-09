import { useSliderStore } from '../../store/sliderStore'
import { SCENARIOS } from '../../data/scenarios'

export default function CompareMode() {
  const { compareMode, scenarioA, scenarioB, setScenarioA, setScenarioB } = useSliderStore()
  if (!compareMode) return null

  const options = Object.entries(SCENARIOS)

  return (
    <div className="bg-white border border-brand-100 rounded-xl shadow-sm px-4 py-3 flex flex-wrap items-center gap-4 text-sm">
      <span className="font-semibold text-gray-700">Compare:</span>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#1565c0' }} />
        <label className="text-xs text-gray-500 mr-1">Scenario A</label>
        <select
          value={scenarioA}
          onChange={e => setScenarioA(e.target.value)}
          className="border border-gray-200 rounded px-2 py-1 text-xs"
        >
          {options.map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
        </select>
      </div>
      <span className="text-gray-400">vs</span>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full inline-block bg-green-700" />
        <label className="text-xs text-gray-500 mr-1">Scenario B</label>
        <select
          value={scenarioB}
          onChange={e => setScenarioB(e.target.value)}
          className="border border-gray-200 rounded px-2 py-1 text-xs"
        >
          {options.map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
        </select>
      </div>
    </div>
  )
}
