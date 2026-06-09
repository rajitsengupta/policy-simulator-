import { useSliderStore } from '../../store/sliderStore'

export default function ToggleItem({ groupId, slider }) {
  const key = `${groupId}-${slider.id}`
  const { values, setValue } = useSliderStore()
  const value = values[key] ?? slider.defaultValue
  const isOn = value >= 0.5

  return (
    <div className="flex items-start justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-700 leading-snug">{slider.name}</p>
        <p className="text-xs text-gray-400 mt-0.5 leading-tight">{slider.description}</p>
      </div>
      <button
        onClick={() => setValue(key, isOn ? 0 : 1)}
        className={`flex-shrink-0 mt-0.5 w-9 h-5 rounded-full transition-colors relative ${
          isOn ? 'bg-brand-500' : 'bg-gray-300'
        }`}
      >
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
          isOn ? 'translate-x-4' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  )
}
