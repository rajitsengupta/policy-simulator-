import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { useSliderStore } from '../../store/sliderStore'
import { GRAPH_CATEGORIES } from '../../data/graphs'
import FeaturedGraph from './FeaturedGraph'
import SmallGraph from './SmallGraph'

// Flat list of all graphs across all categories
const ALL_GRAPHS = Object.entries(GRAPH_CATEGORIES).map(([catKey, cat]) => ({
  catKey, catLabel: cat.label, graphs: cat.graphs,
}))

function GraphDropdown({ selectedId, onSelect }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selectedGraph = ALL_GRAPHS.flatMap(c => c.graphs).find(g => g.id === selectedId)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors shadow-sm w-full max-w-sm"
      >
        <span className="flex-1 text-left truncate text-gray-400 font-normal">
          Choose a graph
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-11 z-30 bg-white border border-gray-200 rounded-xl shadow-2xl w-80 py-2 max-h-96 overflow-y-auto">
          {ALL_GRAPHS.map(({ catKey, catLabel, graphs }) => (
            <div key={catKey}>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-4 py-2">{catLabel}</p>
              {graphs.map(g => (
                <button
                  key={g.id}
                  onClick={() => { onSelect(g.id); setOpen(false) }}
                  className={`w-full text-left px-4 py-2 transition-colors flex items-start gap-2 ${
                    g.id === selectedId ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${g.id === selectedId ? 'bg-brand-500' : 'bg-gray-300'}`} />
                  <p className="text-xs font-semibold leading-tight">{g.name}</p>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function GraphSection({ activeCategory, setActiveCategory, compact = false }) {
  const { values, activeScenario } = useSliderStore()
  const [page, setPage] = useState(0)
  const [recalculating, setRecalculating] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [selectedFeaturedId, setSelectedFeaturedId] = useState(null)

  const category = GRAPH_CATEGORIES[activeCategory]
  const graphs = category?.graphs || []
  const defaultFeatured = graphs.find(g => g.featured)

  // When category changes, reset to default featured
  useEffect(() => {
    setSelectedFeaturedId(null)
    setPage(0)
  }, [activeCategory])

  function handleGraphSelect(id) {
    // Find which category this graph belongs to
    const cat = ALL_GRAPHS.find(c => c.graphs.some(g => g.id === id))
    if (cat && cat.catKey !== activeCategory && setActiveCategory) {
      setActiveCategory(cat.catKey)
    }
    setSelectedFeaturedId(id)
    setPage(0)
  }

  const featuredId = selectedFeaturedId || defaultFeatured?.id
  const featured = graphs.find(g => g.id === featuredId) || defaultFeatured
  const smalls = graphs.filter(g => g.id !== featuredId)
  const pages = Math.ceil(smalls.length / 3)

  useEffect(() => {
    setRecalculating(true)
    setAnimate(true)
    const t = setTimeout(() => { setRecalculating(false); setAnimate(false) }, 600)
    return () => clearTimeout(t)
  }, [values])

  const visibleSmalls = smalls.slice(page * 3, page * 3 + 3)

  const pagination = pages > 1 && (
    <div className="flex items-center justify-center gap-3 pt-1">
      <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
        className="p-1.5 rounded-lg border hover:bg-gray-50 disabled:opacity-30">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <span className="text-xs text-gray-500">{page + 1} / {pages}</span>
      <button onClick={() => setPage(p => Math.min(pages - 1, p + 1))} disabled={page === pages - 1}
        className="p-1.5 rounded-lg border hover:bg-gray-50 disabled:opacity-30">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )

  const dropdown = (
    <div className="flex items-center justify-between mb-2">
      <GraphDropdown
        selectedId={featuredId}
        onSelect={handleGraphSelect}
      />
      {recalculating && (
        <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full animate-pulse font-medium">
          Recalculating…
        </span>
      )}
    </div>
  )

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-3" id="graph-grid">

      {/* ── COMPACT layout ── */}
      {compact ? (
        <div className="flex gap-3 h-full">
          <div className="flex-[3] min-w-0 flex flex-col">
            {dropdown}
            {featured && (
              <FeaturedGraph graph={featured} sliderValues={values}
                activeScenario={activeScenario} animate={animate} />
            )}
          </div>
          <div className="flex-[2] min-w-0 flex flex-col gap-2">
            {visibleSmalls.map((g, i) => (
              <SmallGraph key={g.id} graph={g} sliderValues={values}
                activeScenario={activeScenario} animate={animate} index={i} />
            ))}
            {pagination}
          </div>
        </div>
      ) : (
        /* ── NORMAL layout ── */
        <>
          {dropdown}
          {featured && (
            <FeaturedGraph graph={featured} sliderValues={values}
              activeScenario={activeScenario} animate={animate} />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {visibleSmalls.map((g, i) => (
              <SmallGraph key={g.id} graph={g} sliderValues={values}
                activeScenario={activeScenario} animate={animate} index={i} />
            ))}
          </div>
          {pagination}
        </>
      )}
    </div>
  )
}
