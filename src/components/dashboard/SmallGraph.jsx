import { useState, useRef } from 'react'
import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import { Download, Maximize2, X, Table2, LineChart } from 'lucide-react'
import { buildChartData, YEARS } from '../../utils/modelProxy'
import { SCENARIOS } from '../../data/scenarios'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import FocusTrap from '../shared/FocusTrap'
import DataTable from '../shared/DataTable'

const SCENARIO_KEYS = ['BAU', 'MNR', 'NZ']
const CHART_TYPES = ['grouped-bar', 'stacked-bar', 'multi-line']


const miniTip = {
  contentStyle: { fontSize: 10, borderRadius: 6, padding: '4px 8px', border: '1px solid #e5e7eb' },
  labelStyle: { fontWeight: 600 },
  formatter: (v, name) => [typeof v === 'number' ? v.toFixed(3) : v, name],
}

function downloadCSV(graphName, unit, chartData, visibleKeys) {
  const csv = [[' Year', ...visibleKeys].join(','),
    ...chartData.map(d => [d.year, ...visibleKeys.map(s => d[s] ?? '')].join(','))].join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([`${graphName} (${unit})\n\n${csv}`], { type: 'text/csv' }))
  a.download = `${graphName.replace(/[^a-z0-9]/gi, '_')}.csv`
  a.click()
}

async function downloadPNG(ref, graphName) {
  const { default: html2canvas } = await import('html2canvas')
  const canvas = await html2canvas(ref.current, { scale: 2, backgroundColor: '#ffffff' })
  const a = document.createElement('a')
  a.href = canvas.toDataURL('image/png')
  a.download = `${graphName.replace(/[^a-z0-9]/gi, '_')}.png`
  a.click()
}

export default function SmallGraph({ graph, sliderValues, activeScenario, animate: animateProp, index = 0 }) {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState({ BAU: true, MNR: true, NZ: true })
  const [showDownload, setShowDownload] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const reducedMotion = useReducedMotion()
  const animate = animateProp && !reducedMotion
  const type = CHART_TYPES[index % CHART_TYPES.length]

  const allData = {}
  SCENARIO_KEYS.forEach(s => { allData[s] = buildChartData(graph.id, sliderValues, s, YEARS) })
  const chartData = YEARS.map((yr, i) => {
    const pt = { year: yr }
    SCENARIO_KEYS.forEach(s => { pt[s] = allData[s][i].scenario })
    return pt
  })
  const visibleKeys = SCENARIO_KEYS.filter(s => visible[s])

  function toggle(s) {
    const next = { ...visible, [s]: !visible[s] }
    if (Object.values(next).every(v => !v)) return
    setVisible(next)
  }

  const xAxis = <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#9ca3af' }} tickLine={false} axisLine={false} interval={2} />
  const yAxis = <YAxis tick={{ fontSize: 9, fill: '#9ca3af' }} tickLine={false} axisLine={false} width={30} />
  const grid  = <CartesianGrid strokeDasharray="2 3" stroke="#f1f5f9" vertical={false} />

  function MiniChart({ height }) {
    return (
      <div aria-hidden="true">
        {/* Shared clickable legend renderer */}
        {(() => {
          const clickableLegend = (
            <Legend
              wrapperStyle={{ fontSize: 9, paddingTop: 4, cursor: 'pointer' }}
              onClick={({ dataKey }) => {
                if (!SCENARIOS[dataKey]) return
                const next = { ...visible, [dataKey]: !visible[dataKey] }
                if (Object.values(next).every(v => !v)) return
                toggle(dataKey)
              }}
              formatter={(v) => {
                const hidden = !visible[v]
                return (
                  <span style={{
                    color: hidden ? '#d1d5db' : SCENARIOS[v]?.color,
                    fontWeight: 600,
                    textDecoration: hidden ? 'line-through' : 'none',
                    userSelect: 'none',
                  }}>{v}</span>
                )
              }}
            />
          )
          return null
        })()}

        {type === 'grouped-bar' && (
          <ResponsiveContainer width="100%" height={height}>
            <ComposedChart data={chartData} margin={{ top: 2, right: 3, left: -8, bottom: 2 }} barCategoryGap="35%">
              {grid}{xAxis}{yAxis}<Tooltip {...miniTip} />
              {SCENARIO_KEYS.map(s => (
                <Bar key={s} dataKey={s} fill={SCENARIOS[s].color}
                  fillOpacity={visible[s] ? 0.75 : 0.10}
                  radius={[2, 2, 0, 0]} maxBarSize={10} name={s} isAnimationActive={animate && s === activeScenario} />
              ))}
              <Legend iconType="none" wrapperStyle={{ fontSize: 9, paddingTop: 4, cursor: 'pointer' }}
                onClick={({ dataKey }) => { if (SCENARIOS[dataKey]) toggle(dataKey) }}
                formatter={v => <span style={{ color: visible[v] ? SCENARIOS[v]?.color : '#d1d5db', fontWeight: 700, textDecoration: visible[v] ? 'none' : 'line-through', userSelect: 'none' }}>{v}</span>} />
            </ComposedChart>
          </ResponsiveContainer>
        )}
        {type === 'stacked-bar' && (
          <ResponsiveContainer width="100%" height={height}>
            <ComposedChart data={chartData} margin={{ top: 2, right: 3, left: -8, bottom: 2 }}>
              {grid}{xAxis}{yAxis}<Tooltip {...miniTip} />
              {visible.BAU && <Bar dataKey="BAU" fill={SCENARIOS.BAU.color} fillOpacity={0.6} radius={[0,0,0,0]} maxBarSize={18} stackId="a" isAnimationActive={animate} />}
              {visible.MNR && <Bar dataKey="MNR" fill={SCENARIOS.MNR.color} fillOpacity={0.85} radius={[2,2,0,0]} maxBarSize={18} isAnimationActive={animate} />}
              {visible.NZ  && <Line dataKey="NZ" stroke={SCENARIOS.NZ.color} strokeWidth={2} dot={false} isAnimationActive={animate} />}
              <Legend iconType="none" wrapperStyle={{ fontSize: 9, paddingTop: 4, cursor: 'pointer' }}
                onClick={({ dataKey }) => { if (SCENARIOS[dataKey]) toggle(dataKey) }}
                formatter={v => <span style={{ color: visible[v] ? SCENARIOS[v]?.color : '#d1d5db', fontWeight: 700, textDecoration: visible[v] ? 'none' : 'line-through', userSelect: 'none' }}>{v}</span>} />
            </ComposedChart>
          </ResponsiveContainer>
        )}
        {type === 'multi-line' && (
          <ResponsiveContainer width="100%" height={height}>
            <ComposedChart data={chartData} margin={{ top: 2, right: 3, left: -8, bottom: 2 }}>
              {grid}{xAxis}{yAxis}<Tooltip {...miniTip} />
              {SCENARIO_KEYS.map(s => (
                <Line key={s} dataKey={s} stroke={SCENARIOS[s].color}
                  strokeWidth={visible[s] ? (s === activeScenario ? 2.5 : 1.5) : 0.8}
                  strokeOpacity={visible[s] ? (s === activeScenario ? 1 : 0.6) : 0.12}
                  strokeDasharray={undefined}
                  strokeWidth={visible[s] ? (s === activeScenario ? 2.5 : 1.8) : 0.5}
                  dot={false}
                  activeDot={visible[s] ? { r: 3, fill: SCENARIOS[s].color } : false}
                  name={s} isAnimationActive={animate && s === activeScenario && visible[s]} />
              ))}
              <Legend iconType="none" wrapperStyle={{ fontSize: 9, paddingTop: 4, cursor: 'pointer' }}
                onClick={({ dataKey }) => { if (SCENARIOS[dataKey]) toggle(dataKey) }}
                formatter={v => <span style={{ color: visible[v] ? SCENARIOS[v]?.color : '#d1d5db', fontWeight: 700, textDecoration: visible[v] ? 'none' : 'line-through', userSelect: 'none' }}>{v}</span>} />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3" ref={containerRef}>
        {/* Header */}
        <div className="flex items-start justify-between mb-1 gap-1">
          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-gray-700 truncate">{graph.name}</h4>
            {graph.subtitle && <p className="text-xs text-gray-400 leading-tight truncate">{graph.subtitle}</p>}
            <p className="text-xs text-gray-400">{graph.unit}</p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* Table toggle */}
            <button onClick={() => setShowTable(!showTable)}
              aria-pressed={showTable} aria-label={showTable ? 'Chart view' : 'Table view'}
              className={`min-w-[28px] min-h-[28px] flex items-center justify-center rounded border transition-colors ${
                showTable ? 'bg-brand-50 border-brand-300 text-brand-600' : 'border-gray-200 text-gray-400 hover:bg-gray-50'}`}>
              {showTable ? <LineChart className="w-3 h-3" /> : <Table2 className="w-3 h-3" />}
            </button>
            {/* Download */}
            <div className="relative">
              <button onClick={() => setShowDownload(!showDownload)} aria-label="Download"
                aria-expanded={showDownload} aria-haspopup="menu"
                className="min-w-[28px] min-h-[28px] flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400">
                <Download className="w-3 h-3" />
              </button>
              {showDownload && (
                <div role="menu" className="absolute right-0 top-7 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-28 py-1">
                  <button role="menuitem" onClick={() => { downloadCSV(graph.name, graph.unit, chartData, visibleKeys); setShowDownload(false) }}
                    className="w-full text-left px-3 py-1 text-xs hover:bg-gray-50 text-gray-700">CSV</button>
                  <button role="menuitem" onClick={() => { downloadPNG(containerRef, graph.name); setShowDownload(false) }}
                    className="w-full text-left px-3 py-1 text-xs hover:bg-gray-50 text-gray-700">PNG</button>
                </div>
              )}
            </div>
            {/* Expand */}
            <button onClick={() => setExpanded(true)}
              aria-label={`Expand ${graph.name}`}
              className="min-w-[28px] min-h-[28px] flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50 text-gray-400">
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {showTable
          ? <DataTable graph={graph} chartData={chartData} visibleScenarios={visible} />
          : <MiniChart height={115} />}

        {/* Always-present SR table */}
        <div className="sr-only">
          <DataTable graph={graph} chartData={chartData} visibleScenarios={{ BAU: true, MNR: true, NZ: true }} />
        </div>
      </div>

      {/* Expand modal */}
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
          onClick={() => setExpanded(false)}
          role="dialog" aria-modal="true" aria-label={`Expanded: ${graph.name}`}>
          <FocusTrap active={expanded}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setExpanded(false)} aria-label="Close"
                className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-bold text-gray-900 mb-0.5">{graph.name}</h2>
              {graph.subtitle && <p className="text-sm text-gray-500 mb-0.5">{graph.subtitle}</p>}
              <p className="text-xs text-gray-400 mb-4">{graph.unit}</p>
              {showTable
                ? <DataTable graph={graph} chartData={chartData} visibleScenarios={visible} />
                : <MiniChart height={380} />}
            </div>
          </FocusTrap>
        </div>
      )}
    </>
  )
}
