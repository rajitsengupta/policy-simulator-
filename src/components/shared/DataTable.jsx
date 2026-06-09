// Accessible data table view for graph data — toggleable alternative to chart
import { SCENARIOS } from '../../data/scenarios'

const SCENARIO_KEYS = ['BAU', 'MNR', 'NZ']

export default function DataTable({ graph, chartData, visibleScenarios }) {
  const visibleKeys = SCENARIO_KEYS.filter(s => visibleScenarios[s])

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table
        className="w-full text-xs"
        aria-label={`Data table: ${graph.name} (${graph.unit})`}
      >
        <caption className="sr-only">
          {graph.name} — {graph.subtitle} — Values in {graph.unit}
        </caption>
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th scope="col" className="text-left px-3 py-2 font-bold text-gray-700 w-16">Year</th>
            {visibleKeys.map(s => (
              <th key={s} scope="col" className="text-right px-3 py-2 font-bold"
                style={{ color: SCENARIOS[s].color }}>
                {s}
                <span className="sr-only"> — {SCENARIOS[s].label}</span>
              </th>
            ))}
            {visibleKeys.length > 1 && (
              <th scope="col" className="text-right px-3 py-2 font-bold text-gray-500">
                NZ vs BAU
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {chartData.map((row, i) => {
            const delta = visibleScenarios.NZ && visibleScenarios.BAU
              ? row['NZ'] - row['BAU']
              : null
            return (
              <tr key={row.year} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-3 py-1.5 font-semibold text-gray-700">{row.year}</td>
                {visibleKeys.map(s => (
                  <td key={s} className="px-3 py-1.5 text-right tabular-nums"
                    style={{ color: SCENARIOS[s].color }}>
                    {typeof row[s] === 'number' ? row[s].toFixed(3) : '—'}
                  </td>
                ))}
                {delta !== null && (
                  <td className={`px-3 py-1.5 text-right font-semibold tabular-nums ${
                    delta < 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {delta > 0 ? '+' : ''}{delta.toFixed(3)}
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50 border-t border-gray-200">
            <td colSpan={visibleKeys.length + 2} className="px-3 py-1.5 text-gray-400 italic">
              Unit: {graph.unit} · Source: GEM-India model (WRI India / KnowlEdge Srl, 2024)
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
