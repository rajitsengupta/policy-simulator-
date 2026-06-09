import { useSliderStore } from '../../store/sliderStore'
import { SENSITIVITY, SENSITIVITY_COLOR, SENSITIVITY_LABEL } from '../../data/sensitivity'

export default function SliderItem({ groupId, slider }) {
  const key = `${groupId}-${slider.id}`
  const { values, setValue } = useSliderStore()
  const value = values[key] ?? slider.defaultValue
  const isModified = Math.abs(value - slider.defaultValue) > 0.0001
  const sensitivity = SENSITIVITY[slider.id]
  const tagColor = sensitivity ? SENSITIVITY_COLOR[sensitivity] : null
  const pct = ((value - slider.min) / (slider.max - slider.min)) * 100

  function format(v) {
    if (slider.unit === 'Ha/Year') return v.toLocaleString('en-IN')
    if (slider.unit === '₹/ton') return '₹' + v.toLocaleString('en-IN')
    if (slider.unit === 'Dmnl' || slider.unit === '') return v.toFixed(2)
    return v
  }

  return (
    <div className="py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-1 gap-2">
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-medium leading-snug ${isModified ? 'text-brand-600' : 'text-gray-700'}`}>
            {slider.name}
            {isModified && <span className="ml-1 text-amber-500" aria-label="Modified">●</span>}
          </p>
          {sensitivity && sensitivity !== 'low' && (
            <span className={`inline-block mt-0.5 text-xs px-1.5 py-0 rounded-full border font-semibold leading-4 ${tagColor}`}>
              {SENSITIVITY_LABEL[sensitivity]}
            </span>
          )}
        </div>
        <span className="text-xs font-semibold text-brand-600 whitespace-nowrap tabular-nums flex-shrink-0">
          {format(value)} {slider.unit && slider.unit !== 'Dmnl' ? slider.unit : ''}
        </span>
      </div>
      <label htmlFor={`slider-${key}`} className="sr-only">{slider.name}</label>
      <input
        id={`slider-${key}`}
        type="range"
        min={slider.min}
        max={slider.max}
        step={slider.step}
        value={value}
        onChange={e => setValue(key, parseFloat(e.target.value))}
        aria-label={slider.name}
        aria-valuemin={slider.min}
        aria-valuemax={slider.max}
        aria-valuenow={value}
        aria-valuetext={`${format(value)} ${slider.unit}`}
        className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
        style={{ background: `linear-gradient(to right, #1565c0 ${pct}%, #e2e8f0 ${pct}%)` }}
      />
      <p className="text-xs text-gray-500 mt-0.5 leading-tight">{slider.description}</p>
    </div>
  )
}
