import { useState } from 'react'
import { Search, SlidersHorizontal, X, Sparkles, Settings2 } from 'lucide-react'
import { GROUPS } from '../../data/sliders'
import { KEY_LEVERS } from '../../data/graphs'
import { SENSITIVITY, SENSITIVITY_COLOR, SENSITIVITY_LABEL } from '../../data/sensitivity'
import { useSliderStore } from '../../store/sliderStore'
import SliderGroup from './SliderGroup'
import SliderItem from './SliderItem'
import ToggleItem from './ToggleItem'

// Beginner mode — renders only the 10 key levers in a flat list
function BeginnerLevers() {
  const { values } = useSliderStore()
  const levers = KEY_LEVERS.map(({ groupId, id }) => {
    const group = GROUPS.find(g => g.id === groupId)
    const slider = group?.sliders.find(s => s.id === id)
    return slider ? { groupId, slider } : null
  }).filter(Boolean)

  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-500 px-1 pb-1">
        10 highest-impact levers — move these first to see the biggest changes.
      </p>
      {levers.map(({ groupId, slider }) => {
        const tag = SENSITIVITY[slider.id]
        const tagColor = SENSITIVITY_COLOR[tag] || SENSITIVITY_COLOR.low
        return (
          <div key={`${groupId}-${slider.id}`} className="rounded-lg border border-gray-100">
            <div className="flex items-center justify-between px-3 pt-2 pb-0">
              <span className={`text-xs px-1.5 py-0.5 rounded-full border font-semibold ${tagColor}`}>
                {SENSITIVITY_LABEL[tag]}
              </span>
            </div>
            {slider.isToggle
              ? <ToggleItem groupId={groupId} slider={slider} />
              : <SliderItem groupId={groupId} slider={slider} />}
          </div>
        )
      })}
    </div>
  )
}

export default function PolicyLevers({ mobile = false }) {
  const [search, setSearch] = useState('')
  const [activeGroup, setActiveGroup] = useState(null)
  const [beginnerMode, setBeginnerMode] = useState(false)

  const displayGroups = activeGroup
    ? GROUPS.filter(g => g.id === activeGroup)
    : GROUPS

  return (
    <div className={`flex flex-col gap-2 ${mobile ? '' : 'h-full'}`} id="policy-levers">
      {/* Header + mode toggle */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-500 flex-shrink-0" />
          <span className="text-sm font-bold text-gray-800">Policy Levers</span>
        </div>
        <button
          onClick={() => setBeginnerMode(!beginnerMode)}
          aria-pressed={beginnerMode}
          title={beginnerMode ? 'Switch to advanced mode (all 46 levers)' : 'Switch to beginner mode (10 key levers)'}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg border transition-colors ${
            beginnerMode
              ? 'bg-brand-50 border-brand-300 text-brand-700 font-semibold'
              : 'border-gray-200 text-gray-500 hover:bg-gray-50'
          }`}
        >
          {beginnerMode ? <Settings2 className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
          {beginnerMode ? 'Advanced' : 'Beginner'}
        </button>
      </div>

      {beginnerMode ? (
        <div className={`overflow-y-auto flex-1 ${mobile ? 'max-h-64' : ''}`}>
          <BeginnerLevers />
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search levers…"
              aria-label="Search policy levers"
              className="w-full pl-8 pr-7 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-200"
            />
            {search && (
              <button onClick={() => setSearch('')} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Group pills */}
          {!search && (
            <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by policy group">
              <button
                onClick={() => setActiveGroup(null)}
                aria-pressed={!activeGroup}
                className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                  !activeGroup ? 'bg-brand-500 text-white border-brand-500' : 'text-gray-600 border-gray-200 hover:border-brand-300'
                }`}
              >All</button>
              {GROUPS.map(g => (
                <button key={g.id}
                  onClick={() => setActiveGroup(activeGroup === g.id ? null : g.id)}
                  aria-pressed={activeGroup === g.id}
                  className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                    activeGroup === g.id ? 'bg-brand-500 text-white border-brand-500' : 'text-gray-600 border-gray-200 hover:border-brand-300'
                  }`}
                >{g.name}</button>
              ))}
            </div>
          )}

          {/* Accordion groups */}
          <div className={`overflow-y-auto flex-1 ${mobile ? 'max-h-64' : ''}`}>
            {displayGroups.map(group => (
              <SliderGroup key={group.id} group={group} searchQuery={search} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
