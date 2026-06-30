import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, PanelBottom, PanelLeft, Search, X } from 'lucide-react'
import GraphSection from '../components/dashboard/GraphSection'
import ScenarioPanel from '../components/dashboard/ScenarioPanel'
import PolicyLevers from '../components/sliders/PolicyLevers'
import SliderItem from '../components/sliders/SliderItem'
import ToggleItem from '../components/sliders/ToggleItem'
import SubNav from '../components/layout/SubNav'
import OnboardingOverlay from '../components/shared/OnboardingOverlay'
import { GROUPS } from '../data/sliders'
import { useSliderStore } from '../store/sliderStore'

// ── Bottom-panel slider grid ──────────────────────────────────────────────────
function BottomPanelLevers() {
  const [activeGroupId, setActiveGroupId] = useState(GROUPS[0].id)
  const [search, setSearch] = useState('')
  const { values } = useSliderStore()

  const activeGroup = GROUPS.find(g => g.id === activeGroupId) || GROUPS[0]

  const filteredSliders = search
    ? activeGroup.sliders.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()))
    : activeGroup.sliders

  const isGroupModified = g => g.sliders.some(s => {
    const key = `${g.id}-${s.id}`
    return Math.abs((values[key] ?? s.defaultValue) - s.defaultValue) > 0.0001
  })

  return (
    <div className="flex flex-1 overflow-hidden" id="policy-levers">
      {/* Group tabs — vertical left rail */}
      <div className="w-36 flex-shrink-0 border-r border-gray-100 overflow-y-auto bg-gray-50">
        {GROUPS.map(g => (
          <button key={g.id} onClick={() => setActiveGroupId(g.id)}
            className={`w-full text-left px-3 py-2.5 text-xs font-medium border-b border-gray-100 flex items-center justify-between transition-colors ${
              activeGroupId === g.id ? 'bg-brand-500 text-white' : 'text-gray-600 hover:bg-white'
            }`}>
            <span className="truncate">{g.name}</span>
            {isGroupModified(g) && (
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ml-1 ${
                activeGroupId === g.id ? 'bg-amber-300' : 'bg-amber-400'}`} />
            )}
          </button>
        ))}
      </div>

      {/* Slider grid — right area */}
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-3 py-1.5 z-10">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder={`Search in ${activeGroup.name}…`}
              className="w-full pl-7 pr-7 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-brand-400" />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-x divide-y divide-gray-50">
          {filteredSliders.map(slider => (
            <div key={slider.id} className="p-1">
              {slider.isToggle
                ? <ToggleItem groupId={activeGroup.id} slider={slider} />
                : <SliderItem groupId={activeGroup.id} slider={slider} />}
            </div>
          ))}
          {filteredSliders.length === 0 && (
            <div className="col-span-4 p-6 text-center text-xs text-gray-400">
              No sliders match "{search}"
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Dashboard page ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState('environmental')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(true)
  const [layout, setLayout] = useState('sidebar')   // 'sidebar' | 'bottom'
  const [bottomOpen, setBottomOpen] = useState(true)
  const BOTTOM_H = 280

  // Auto-open sidebar briefly on first visit to hint at "Create your scenario"
  useEffect(() => {
    if (localStorage.getItem('sidebar-hinted')) return
    const openTimer  = setTimeout(() => setSidebarOpen(true),  800)
    const closeTimer = setTimeout(() => {
      setSidebarOpen(false)
      localStorage.setItem('sidebar-hinted', '1')
    }, 3200)
    return () => { clearTimeout(openTimer); clearTimeout(closeTimer) }
  }, [])

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <OnboardingOverlay />
      <SubNav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* Layout switcher */}
      <div className="flex justify-end items-center px-3 py-1 bg-white border-b border-gray-100 gap-1">
        <span className="text-xs text-gray-400 mr-1">Layout:</span>
        <button onClick={() => setLayout('sidebar')}
          title="Left sidebar"
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-colors ${
            layout === 'sidebar' ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-gray-400 hover:text-gray-600'}`}>
          <PanelLeft className="w-3.5 h-3.5" /> Sidebar
        </button>
        <button onClick={() => setLayout('bottom')}
          title="Bottom panel"
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-colors ${
            layout === 'bottom' ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-gray-400 hover:text-gray-600'}`}>
          <PanelBottom className="w-3.5 h-3.5" /> Bottom panel
        </button>
      </div>

      {/* ── SIDEBAR LAYOUT ── */}
      {layout === 'sidebar' && (
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* Left — policy levers */}
          <aside className={`hidden xl:flex flex-col border-r border-gray-200 bg-white transition-all duration-300 flex-shrink-0 overflow-hidden shadow-md z-10 ${
            sidebarOpen ? 'w-72' : 'w-10'}`}>
            {/* Toggle button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? 'Collapse policy levers' : 'Expand policy levers'}
              className="flex items-center justify-center h-9 bg-brand-50 border-b border-brand-100 hover:bg-brand-100 transition-colors flex-shrink-0 gap-1.5"
            >
              {sidebarOpen
                ? <><ChevronLeft className="w-4 h-4 text-brand-600" /></>
                : <ChevronRight className="w-4 h-4 text-brand-600" />}
            </button>

            {sidebarOpen ? (
              <div className="flex-1 overflow-y-auto p-3">
                <PolicyLevers />
              </div>
            ) : (
              /* Collapsed label — rotated */
              <div className="flex-1 flex items-center justify-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="flex items-center gap-2 text-brand-600 hover:text-brand-800 transition-colors"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  <PanelLeft className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold tracking-wide whitespace-nowrap">Create your scenario</span>
                </button>
              </div>
            )}
          </aside>

          {/* Centre — graphs */}
          <main className="flex-1 overflow-y-auto bg-surface min-w-0">
            <div className="flex gap-3 items-start p-4">
              <GraphSection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

              {/* Right — scenario panel */}
              <div className={`flex-shrink-0 flex flex-col transition-all duration-300 ${rightOpen ? 'w-56' : 'w-10'}`}>
                {/* Toggle button */}
                <button
                  onClick={() => setRightOpen(!rightOpen)}
                  aria-label={rightOpen ? 'Collapse scenario panel' : 'Expand scenario panel'}
                  className="flex items-center justify-center h-9 bg-gray-50 border border-gray-200 rounded-lg mb-2 hover:bg-gray-100 transition-colors gap-1.5 flex-shrink-0"
                >
                  {rightOpen
                    ? <ChevronRight className="w-4 h-4 text-gray-500" />
                    : <ChevronLeft className="w-4 h-4 text-gray-500" />}
                </button>

                {rightOpen ? (
                  <ScenarioPanel />
                ) : (
                  /* Collapsed label — rotated */
                  <div className="flex-1 flex items-center justify-center mt-4">
                    <button
                      onClick={() => setRightOpen(true)}
                      className="flex items-center gap-2 text-gray-500 hover:text-brand-600 transition-colors"
                      style={{ writingMode: 'vertical-rl' }}
                    >
                      <span className="text-xs font-bold tracking-wide whitespace-nowrap">Policy assumptions</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}


      {/* ── BOTTOM PANEL LAYOUT ── */}
      {layout === 'bottom' && (
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {/* Graphs — full width */}
          <main className="flex-1 overflow-y-auto bg-surface min-h-0">
            <div className="flex gap-3 items-start p-4">
              <GraphSection activeCategory={activeCategory} compact />
              <ScenarioPanel />
            </div>
          </main>

          {/* Bottom lever panel */}
          <div className="bg-white border-t-2 border-brand-200 flex flex-col flex-shrink-0 transition-all duration-200"
            style={{ height: bottomOpen ? BOTTOM_H : 40 }}>
            {/* Handle */}
            <button onClick={() => setBottomOpen(!bottomOpen)}
              className="flex items-center justify-between px-4 h-10 bg-brand-50 hover:bg-brand-100 transition-colors flex-shrink-0">
              <div className="flex items-center gap-2">
                <PanelBottom className="w-3.5 h-3.5 text-brand-600" />
                <span className="text-xs font-bold text-brand-700">Policy Levers</span>
                <span className="text-xs text-brand-300 hidden sm:inline">· select a category on the left, tune sliders on the right</span>
              </div>
              {bottomOpen
                ? <ChevronDown className="w-4 h-4 text-brand-500" />
                : <ChevronUp className="w-4 h-4 text-brand-500" />}
            </button>

            {bottomOpen && <BottomPanelLevers />}
          </div>
        </div>
      )}
    </div>
  )
}
