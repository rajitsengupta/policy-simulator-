import { useState } from 'react'
import { ChevronDown, Leaf, Zap, Car, Flame, ArrowLeftRight, TrendingUp, Recycle, ToggleRight } from 'lucide-react'
import { useSliderStore } from '../../store/sliderStore'
import SliderItem from './SliderItem'
import ToggleItem from './ToggleItem'

const ICONS = { Leaf, Zap, Car, Flame, ArrowLeftRight, TrendingUp, Recycle, ToggleRight }

export default function SliderGroup({ group, searchQuery }) {
  const [open, setOpen] = useState(false)
  const { values } = useSliderStore()
  const Icon = ICONS[group.icon] || Leaf

  const filteredSliders = searchQuery
    ? group.sliders.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : group.sliders

  if (filteredSliders.length === 0) return null

  const isModified = group.sliders.some(s => {
    const key = `${group.id}-${s.id}`
    return Math.abs((values[key] ?? s.defaultValue) - s.defaultValue) > 0.0001
  })

  const isOpen = open || !!searchQuery

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden mb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 hover:bg-brand-50 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-brand-500" />
          <span className="text-sm font-semibold text-gray-800">{group.name}</span>
          {isModified && (
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" title="Modified" />
          )}
          <span className="text-xs text-gray-400">({filteredSliders.length})</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="divide-y divide-gray-50">
          {filteredSliders.map(slider => (
            slider.isToggle
              ? <ToggleItem key={slider.id} groupId={group.id} slider={slider} />
              : <SliderItem key={slider.id} groupId={group.id} slider={slider} />
          ))}
        </div>
      )}
    </div>
  )
}
