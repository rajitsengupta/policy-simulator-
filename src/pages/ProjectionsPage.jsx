import { useState } from 'react'
import { Download } from 'lucide-react'
import { GRAPH_CATEGORIES } from '../data/graphs'
import { buildChartData, YEARS } from '../utils/modelProxy'
import { useSliderStore } from '../store/sliderStore'
import { SCENARIOS } from '../data/scenarios'
import { ComposedChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

const SCENARIO_KEYS = ['BAU', 'MNR', 'NZ']

function downloadAllCSV(values) {
  const lines = ['GEM-India Policy Simulator — All Projections\n']
  Object.entries(GRAPH_CATEGORIES).forEach(([, cat]) => {
    lines.push(`\n## ${cat.label}`)
    cat.graphs.forEach(graph => {
      lines.push(`\n${graph.name} (${graph.unit})`)
      const rows = [['Year', ...SCENARIO_KEYS]]
      SCENARIO_KEYS.forEach(s => {
        const data = buildChartData(graph.id, values, s, YEARS)
        data.forEach((d, i) => {
          if (!rows[i + 1]) rows[i + 1] = [d.year]
          rows[i + 1].push(d.scenario)
        })
      })
      rows.forEach(r => lines.push(r.join(',')))
    })
  })
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'GEM_India_all_projections.csv'
  a.click()
}

export default function ProjectionsPage() {
  const { values, activeScenario } = useSliderStore()
  const [visibleScenarios, setVisibleScenarios] = useState({ BAU: true, MNR: true, NZ: true })

  function toggle(s) {
    const next = { ...visibleScenarios, [s]: !visibleScenarios[s] }
    if (Object.values(next).every(v => !v)) return
    setVisibleScenarios(next)
  }

  return (
    <div className="p-6 bg-surface flex-1 overflow-y-auto">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">All Projections</h1>
          <p className="text-sm text-gray-500">20 indicators across all categories · 2025–2070</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Global scenario toggles */}
          <div className="flex gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2">
            {SCENARIO_KEYS.map(s => (
              <button key={s} onClick={() => toggle(s)}
                className={`text-xs px-3 py-1 rounded-full font-semibold border transition-all ${
                  visibleScenarios[s] ? 'text-white border-transparent' : 'bg-white border-gray-200 text-gray-400'
                }`}
                style={visibleScenarios[s] ? { background: SCENARIOS[s].color } : {}}>
                {s} — {SCENARIOS[s].description}
              </button>
            ))}
          </div>
          <button onClick={() => downloadAllCSV(values)}
            className="flex items-center gap-2 text-sm bg-brand-500 text-white px-4 py-2 rounded-xl hover:bg-brand-600 transition-colors">
            <Download className="w-4 h-4" /> Download all CSV
          </button>
        </div>
      </div>

      {Object.entries(GRAPH_CATEGORIES).map(([catKey, cat]) => (
        <div key={catKey} className="mb-8">
          <h2 className="text-base font-bold text-brand-700 mb-3 border-b border-brand-100 pb-1">{cat.label}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {cat.graphs.map(graph => {
              const allData = {}
              SCENARIO_KEYS.forEach(s => { allData[s] = buildChartData(graph.id, values, s, YEARS) })
              const chartData = YEARS.map((yr, i) => {
                const pt = { year: yr }
                SCENARIO_KEYS.forEach(s => { pt[s] = allData[s][i].scenario })
                return pt
              })
              return (
                <div key={graph.id} className="bg-white rounded-xl shadow-sm border border-brand-100 p-3">
                  <h3 className="text-xs font-semibold text-gray-700 mb-0.5">{graph.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">{graph.unit}</p>
                  <ResponsiveContainer width="100%" height={120}>
                    <ComposedChart data={chartData} margin={{ top: 2, right: 5, left: -25, bottom: 2 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="year" tick={{ fontSize: 9 }} tickLine={false} axisLine={false} interval={3} />
                      <YAxis tick={{ fontSize: 9 }} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ fontSize: 10, borderRadius: 6 }}
                        formatter={(v, name) => [typeof v === 'number' ? v.toFixed(3) : v, name]}
                      />
                      {SCENARIO_KEYS.map(s => visibleScenarios[s] && (
                        <Line key={s} dataKey={s} stroke={SCENARIOS[s].color}
                          strokeWidth={s === activeScenario ? 2 : 1.5}
                          strokeOpacity={s === activeScenario ? 1 : 0.65}
                          strokeDasharray={s === 'BAU' ? '4 2' : s === 'NZ' ? '2 2' : undefined}
                          dot={false} isAnimationActive name={s} />
                      ))}
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
