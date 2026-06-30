import { useState } from 'react'
import { ChevronDown, RotateCcw, Download, X, SlidersHorizontal } from 'lucide-react'
import { useSliderStore } from '../../store/sliderStore'
import { SCENARIOS } from '../../data/scenarios'
import { GROUPS } from '../../data/sliders'
import { buildChartData, YEARS } from '../../utils/modelProxy'
import { GRAPH_CATEGORIES } from '../../data/graphs'

// ── Helpers ──────────────────────────────────────────────────────────────────

const KPI_META = {
  gdp:  { label: 'GDP growth',   desc: 'Average annual real GDP growth rate for this scenario.' },
  co2:  { label: 'CO₂e by 2050', desc: 'Projected total CO₂e emissions in 2050 under this scenario.' },
  re:   { label: 'RE share',     desc: 'Share of power generation from renewable sources by 2050.' },
  fc:   { label: 'Forest cover', desc: 'Percentage of land area under forest and tree cover by 2050.' },
}

function formatValue(slider, value) {
  if (slider.unit === 'Ha/Year') return value.toLocaleString('en-IN')
  if (slider.unit === '₹/ton') return '₹' + value.toLocaleString('en-IN')
  if (slider.isToggle) return value >= 0.5 ? 'ON' : 'OFF'
  if (['1/2/3', '0/2/3'].includes(slider.unit)) return String(value)
  return Number(value).toFixed(2)
}

function getModifiedLevers(values) {
  const modified = []
  GROUPS.forEach(g => g.sliders.forEach(s => {
    const key = `${g.id}-${s.id}`
    const val = values[key] ?? s.defaultValue
    if (Math.abs(val - s.defaultValue) > 0.0001)
      modified.push({ key, label: s.name, value: val, defaultValue: s.defaultValue, slider: s })
  }))
  return modified
}

function downloadScenarioCSV(activeScenario, values) {
  const lines = [`GEM-India — ${SCENARIOS[activeScenario].label}`, `Exported: ${new Date().toLocaleString()}`, '']
  Object.entries(GRAPH_CATEGORIES).forEach(([, cat]) => {
    lines.push(`## ${cat.label}`)
    cat.graphs.forEach(g => {
      const data = buildChartData(g.id, values, activeScenario, YEARS)
      lines.push(`${g.name} (${g.unit})`)
      lines.push(['Year', 'Value'].join(','))
      data.forEach(d => lines.push([d.year, d.scenario].join(',')))
      lines.push('')
    })
  })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' }))
  a.download = `GEM_${activeScenario}_${Date.now()}.csv`
  a.click()
}

function downloadScenarioJSON(activeScenario, values, modifiedLevers) {
  const payload = {
    scenario: activeScenario,
    label: SCENARIOS[activeScenario].label,
    exportedAt: new Date().toISOString(),
    modifiedLevers: modifiedLevers.map(l => ({
      key: l.key, label: l.label, value: l.value,
      default: l.defaultValue, unit: l.slider.unit,
    })),
    allSliderValues: values,
  }
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }))
  a.download = `GEM_${activeScenario}_${Date.now()}.json`
  a.click()
}

// ── Accordion section ─────────────────────────────────────────────────────────
function Section({ title, badge, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-gray-100 first:border-t-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{title}</span>
          {badge}
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 pb-3">{children}</div>}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ScenarioPanel() {
  const { activeScenario, setScenario, resetAll, modifiedCount, values, setValue } = useSliderStore()
  const [confirmScenario, setConfirmScenario] = useState(null)

  const scenario = SCENARIOS[activeScenario]
  const modifiedLevers = getModifiedLevers(values)

  function handleScenarioClick(key) {
    if (key === activeScenario) return
    if (modifiedCount > 3) setConfirmScenario(key)
    else setScenario(key)
  }

  function confirmSwitch() {
    setScenario(confirmScenario)
    setConfirmScenario(null)
  }

  return (
    <aside className="w-full xl:w-56 flex-shrink-0" id="scenario-panel">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        {/* ── Scenario selector ── */}
        <Section title="Scenario" defaultOpen={true}>
          <div className="flex flex-col gap-1.5">
            {Object.entries(SCENARIOS).map(([key, s]) => (
              <button key={key} onClick={() => handleScenarioClick(key)}
                className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                  activeScenario === key ? 'font-semibold' : 'border-gray-200 hover:border-brand-200 text-gray-600'
                }`}
                style={activeScenario === key
                  ? { borderColor: s.color, backgroundColor: s.color + '12', color: s.color }
                  : {}}
              >
                <span className="font-bold block text-sm">{key}</span>
                <span className="opacity-70">{s.description}</span>
              </button>
            ))}
          </div>
          {modifiedCount > 0 && (
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                Custom · {modifiedCount} changed
              </span>
              <button onClick={resetAll} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-0.5">
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>
          )}
        </Section>

        {/* ── Key assumptions (what the scenario assumes) ── */}
        <Section title="Scenario assumptions" defaultOpen={true}>
          <p className="text-xs text-gray-500 leading-relaxed mb-3">{scenario.note}</p>
          <div className="flex flex-col gap-2">
            {Object.entries(scenario.kpis)
              .filter(([k]) => KPI_META[k])
              .map(([key, val]) => {
                // Compute comparison bars across all scenarios for this KPI
                const allVals = Object.values(SCENARIOS).map(s => parseFloat(s.kpis[key]))
                const maxVal = Math.max(...allVals)
                const thisVal = parseFloat(val)
                const pct = maxVal > 0 ? Math.round((thisVal / maxVal) * 100) : 0
                return (
                  <div key={key} title={KPI_META[key].desc}>
                    <div className="flex items-baseline justify-between mb-0.5">
                      <span className="text-xs text-gray-500">{KPI_META[key].label}</span>
                      <span className="text-base font-black text-gray-500">{val}</span>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: '#9E9E9E' }} />
                    </div>
                  </div>
                )
              })}
          </div>
        </Section>

        {/* ── Modified levers ── */}
        {modifiedLevers.length > 0 && (
          <Section
            title="My changes"
            defaultOpen={true}
            badge={
              <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">
                {modifiedLevers.length}
              </span>
            }
          >
            <div className="space-y-1 max-h-44 overflow-y-auto">
              {modifiedLevers.map(({ key, label, value, defaultValue, slider }) => (
                <div key={key} className="flex items-start justify-between gap-2 group bg-amber-50 rounded-lg px-2 py-1.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 font-medium truncate">{label}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-amber-700">{formatValue(slider, value)}</span>
                      <span className="text-xs text-gray-400">← {formatValue(slider, defaultValue)}</span>
                    </div>
                  </div>
                  <button onClick={() => setValue(key, defaultValue)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 flex-shrink-0 mt-0.5"
                    title="Undo this change">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Export ── */}
        <Section title="Export" defaultOpen={false}>
          <div className="flex flex-col gap-1.5">
            <button onClick={() => downloadScenarioCSV(activeScenario, values)}
              className="flex items-center gap-2 w-full text-xs px-3 py-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600 transition-colors font-medium">
              <Download className="w-3.5 h-3.5" /> Download results (CSV)
            </button>
            <button onClick={() => downloadScenarioJSON(activeScenario, values, modifiedLevers)}
              className="flex items-center gap-2 w-full text-xs px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
              <Download className="w-3.5 h-3.5" /> Save settings (JSON)
            </button>
          </div>
        </Section>

      </div>

      {/* Confirm switch dialog */}
      {confirmScenario && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-5 w-72 shadow-xl">
            <p className="font-semibold text-gray-900 mb-2">Switch scenario?</p>
            <p className="text-sm text-gray-600 mb-4">
              You have {modifiedCount} custom changes. Switching to <strong>{confirmScenario}</strong> will reset all sliders.
            </p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setConfirmScenario(null)}
                className="text-sm text-gray-500 px-3 py-1.5 border rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={confirmSwitch}
                className="text-sm bg-brand-500 text-white px-3 py-1.5 rounded-lg hover:bg-brand-600">Switch</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
