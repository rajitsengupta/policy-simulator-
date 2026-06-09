import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSliderStore } from '../../store/sliderStore'
import { GRAPH_CATEGORIES } from '../../data/graphs'
import FeaturedGraph from './FeaturedGraph'
import SmallGraph from './SmallGraph'

export default function GraphSection({ activeCategory, compact = false }) {
  const { values, activeScenario } = useSliderStore()
  const [page, setPage] = useState(0)
  const [recalculating, setRecalculating] = useState(false)
  const [animate, setAnimate] = useState(false)

  const category = GRAPH_CATEGORIES[activeCategory]
  const graphs = category?.graphs || []
  const featured = graphs.find(g => g.featured)
  const smalls = graphs.filter(g => !g.featured)
  const pages = Math.ceil(smalls.length / 3)

  useEffect(() => {
    setRecalculating(true)
    setAnimate(true)
    const t = setTimeout(() => { setRecalculating(false); setAnimate(false) }, 600)
    return () => clearTimeout(t)
  }, [values])

  useEffect(() => { setPage(0) }, [activeCategory])

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

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-3" id="graph-grid">
      {recalculating && (
        <div className="self-end text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full animate-pulse font-medium">
          Recalculating…
        </div>
      )}

      {/* ── COMPACT: featured left, smalls stacked right ── */}
      {compact ? (
        <div className="flex gap-3 h-full">
          {/* Featured — takes ~60% */}
          {featured && (
            <div className="flex-[3] min-w-0">
              <FeaturedGraph graph={featured} sliderValues={values}
                activeScenario={activeScenario} animate={animate} />
            </div>
          )}
          {/* Smalls stacked vertically — ~40% */}
          <div className="flex-[2] min-w-0 flex flex-col gap-2">
            {visibleSmalls.map((g, i) => (
              <SmallGraph key={g.id} graph={g} sliderValues={values}
                activeScenario={activeScenario} animate={animate} index={i} />
            ))}
            {pagination}
          </div>
        </div>
      ) : (
        /* ── NORMAL: featured top, smalls row below ── */
        <>
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
