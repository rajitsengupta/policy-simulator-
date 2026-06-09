import { useState, useRef } from 'react'
import {
  ComposedChart, Area, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend,
} from 'recharts'
import { Download, Maximize2, X, Table2, LineChart } from 'lucide-react'
import { buildChartData, YEARS } from '../../utils/modelProxy'
import { SCENARIOS } from '../../data/scenarios'
import { LOWER_IS_BETTER } from '../../data/graphs'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import FocusTrap from '../shared/FocusTrap'
import DataTable from '../shared/DataTable'

const SCENARIO_KEYS = ['BAU', 'MNR', 'NZ']

// Custom dot shapes for accessibility (colour + shape encoding)
const DOT_SHAPES = {
  BAU: (props) => {
    const { cx, cy, fill } = props
    return <circle cx={cx} cy={cy} r={3} fill={fill} stroke="#fff" strokeWidth={1} />
  },
  MNR: (props) => {
    const { cx, cy, fill } = props
    return <rect x={cx - 3} y={cy - 3} width={6} height={6} fill={fill} stroke="#fff" strokeWidth={1} />
  },
  NZ: (props) => {
    const { cx, cy, fill } = props
    return <polygon points={`${cx},${cy - 4} ${cx + 3.5},${cy + 2} ${cx - 3.5},${cy + 2}`} fill={fill} stroke="#fff" strokeWidth={1} />
  },
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs min-w-[160px]" role="tooltip">
      <p className="font-bold text-gray-800 mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex justify-between gap-4 mb-0.5">
          <span style={{ color: p.color }} className="font-medium flex items-center gap-1">
            {p.name === 'BAU' ? '●' : p.name === 'MNR' ? '■' : '▲'} {p.name}
          </span>
          <span className="font-bold text-gray-900 tabular-nums">
            {typeof p.value === 'number' ? p.value.toFixed(3) : p.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function downloadCSV(graphName, unit, chartData, visibleScenarios) {
  const keys = SCENARIO_KEYS.filter(s => visibleScenarios[s])
  const csv = [
    `${graphName} (${unit})`,
    ['Year', ...keys].join(','),
    ...chartData.map(d => [d.year, ...keys.map(s => d[s] ?? '')].join(',')),
  ].join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
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

function DeltaBadge({ graph, chartData, visible }) {
  if (!visible.MNR && !visible.NZ) return null
  const last = chartData[chartData.length - 1]
  const lowerBetter = LOWER_IS_BETTER.has(graph.id)

  return (
    <div className="flex gap-2 flex-wrap mt-2">
      {['MNR', 'NZ'].map(s => {
        if (!visible[s] || !visible.BAU) return null
        const delta = last[s] - last.BAU
        const good = lowerBetter ? delta < 0 : delta > 0
        return (
          <div key={s} className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${
            good ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
          }`}
            aria-label={`${s} vs BAU by ${last.year}: ${delta > 0 ? '+' : ''}${delta.toFixed(2)} ${graph.unit}`}>
            {s} {delta > 0 ? '+' : ''}{delta.toFixed(2)} vs BAU by {last.year}
          </div>
        )
      })}
    </div>
  )
}

function GraphChart({ graph, sliderValues, activeScenario, animate, visible, toggleVisible, chartData, height }) {
  const color = SCENARIOS[activeScenario]?.color || '#1565c0'
  return (
    <ResponsiveContainer width="100%" height={height} aria-hidden="true">
      <ComposedChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id={`band-${graph.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.10} />
            <stop offset="100%" stopColor={color} stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#6b7280' }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickLine={false} axisLine={false} width={48} />
        <Tooltip content={<CustomTooltip />} />
        <Area dataKey="upperBound" stroke="none" fill={`url(#band-${graph.id})`} isAnimationActive={false} legendType="none" />
        <Area dataKey="lowerBound" stroke="none" fill="#ffffff" fillOpacity={1} isAnimationActive={false} legendType="none" />
        {SCENARIO_KEYS.map(s => (
          <Line key={s} dataKey={s} stroke={SCENARIOS[s].color}
            strokeWidth={visible[s] ? (s === activeScenario ? 2.5 : 1.5) : 1}
            strokeOpacity={visible[s] ? (s === activeScenario ? 1 : 0.65) : 0.12}
            strokeDasharray={s === 'BAU' ? '5 3' : s === 'NZ' ? '2 2' : undefined}
            dot={visible[s] ? DOT_SHAPES[s] : false}
            activeDot={visible[s] ? { r: 5, strokeWidth: 2, stroke: '#fff' } : false}
            name={s} isAnimationActive={animate && s === activeScenario && visible[s]}
          />
        ))}
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 10, cursor: 'pointer' }}
          onClick={({ dataKey }) => {
            if (!dataKey || !SCENARIOS[dataKey]) return
            const next = { ...visible, [dataKey]: !visible[dataKey] }
            if (Object.values(next).every(v => !v)) return
            toggleVisible(next)
          }}
          formatter={(v) => {
            const hidden = !visible[v]
            return (
              <span style={{
                color: hidden ? '#9ca3af' : SCENARIOS[v]?.color,
                fontWeight: 600,
                textDecoration: hidden ? 'line-through' : 'none',
                opacity: hidden ? 0.5 : 1,
                userSelect: 'none',
              }}
                title={`${hidden ? 'Show' : 'Hide'} ${SCENARIOS[v]?.label}`}
              >
                {v === 'BAU' ? '● ' : v === 'MNR' ? '■ ' : '▲ '}{SCENARIOS[v]?.label ?? v}
              </span>
            )
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default function FeaturedGraph({ graph, sliderValues, activeScenario, animate: animateProp }) {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState({ BAU: true, MNR: true, NZ: true })
  const [showDownload, setShowDownload] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const reducedMotion = useReducedMotion()
  const animate = animateProp && !reducedMotion

  const allData = {}
  SCENARIO_KEYS.forEach(s => { allData[s] = buildChartData(graph.id, sliderValues, s, YEARS) })
  const chartData = YEARS.map((yr, i) => {
    const pt = { year: yr }
    SCENARIO_KEYS.forEach(s => { pt[s] = allData[s][i].scenario })
    pt.upperBound = allData[activeScenario][i].upperBound
    pt.lowerBound = allData[activeScenario][i].lowerBound
    return pt
  })
  const visibleKeys = SCENARIO_KEYS.filter(s => visible[s])

  function toggleScenario(s) {
    const next = { ...visible, [s]: !visible[s] }
    if (Object.values(next).every(v => !v)) return
    setVisible(next)
  }
  function toggleVisible(next) { setVisible(next) }

  const controls = (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Table toggle */}
      <button onClick={() => setShowTable(!showTable)}
        aria-pressed={showTable}
        aria-label={showTable ? 'Switch to chart view' : 'Switch to data table view'}
        className={`min-w-[36px] min-h-[36px] p-2 rounded-lg border transition-colors ${
          showTable ? 'bg-brand-50 border-brand-300 text-brand-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
        {showTable ? <LineChart className="w-4 h-4" /> : <Table2 className="w-4 h-4" />}
      </button>

      {/* Download */}
      <div className="relative">
        <button onClick={() => setShowDownload(!showDownload)}
          aria-label="Download options"
          aria-expanded={showDownload}
          aria-haspopup="menu"
          className="min-w-[36px] min-h-[36px] p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
          <Download className="w-4 h-4" />
        </button>
        {showDownload && (
          <div role="menu" className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-36 py-1">
            <button role="menuitem" onClick={() => { downloadCSV(graph.name, graph.unit, chartData, visibleKeys); setShowDownload(false) }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 text-gray-700">Download CSV</button>
            <button role="menuitem" onClick={() => { downloadPNG(containerRef, graph.name); setShowDownload(false) }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 text-gray-700">Download PNG</button>
          </div>
        )}
      </div>

      {/* Expand */}
      <button onClick={() => setExpanded(true)}
        aria-label={`Expand ${graph.name} to full screen`}
        className="min-w-[36px] min-h-[36px] p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
        <Maximize2 className="w-4 h-4" />
      </button>
    </div>
  )

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4" ref={containerRef}>
        <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">{graph.name}</h3>
            {graph.subtitle && <p className="text-xs text-gray-500 mt-0.5">{graph.subtitle}</p>}
            <p className="text-xs text-gray-400">{graph.unit}</p>
          </div>
          {controls}
        </div>
        <DeltaBadge graph={graph} chartData={chartData} visible={visible} />
        <div className="mt-3">
          {showTable
            ? <DataTable graph={graph} chartData={chartData} visibleScenarios={visible} />
            : <GraphChart graph={graph} sliderValues={sliderValues} activeScenario={activeScenario}
                animate={animate} visible={visible} toggleVisible={toggleVisible} chartData={chartData} height={240} />}
        </div>
        {/* Screen-reader only data table always present */}
        <div className="sr-only">
          <DataTable graph={graph} chartData={chartData} visibleScenarios={{ BAU: true, MNR: true, NZ: true }} />
        </div>
      </div>

      {/* Fullscreen modal */}
      {expanded && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
          onClick={() => setExpanded(false)}
          role="dialog" aria-modal="true" aria-label={`Expanded view: ${graph.name}`}>
          <FocusTrap active={expanded}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-6 relative"
              onClick={e => e.stopPropagation()}>
              <button onClick={() => setExpanded(false)}
                aria-label="Close expanded view"
                className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-bold text-gray-900 mb-0.5">{graph.name}</h2>
              {graph.subtitle && <p className="text-sm text-gray-500 mb-1">{graph.subtitle}</p>}
              <p className="text-xs text-gray-400 mb-4">{graph.unit}</p>
              <div className="flex gap-2 mb-2 flex-wrap">{controls}</div>
              <DeltaBadge graph={graph} chartData={chartData} visible={visible} />
              <div className="mt-3">
                {showTable
                  ? <DataTable graph={graph} chartData={chartData} visibleScenarios={visible} />
                  : <GraphChart graph={graph} sliderValues={sliderValues} activeScenario={activeScenario}
                      animate={false} visible={visible} toggleVisible={toggleVisible} chartData={chartData} height={420} />}
              </div>
            </div>
          </FocusTrap>
        </div>
      )}
    </>
  )
}
