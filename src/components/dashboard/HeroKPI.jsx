import { useSliderStore } from '../../store/sliderStore'
import { buildChartData, YEARS } from '../../utils/modelProxy'

const BASE_YEAR_CO2 = 4022

export default function HeroKPI() {
  const { values, modifiedCount } = useSliderStore()

  const bauData  = buildChartData('co2_sectoral', values, 'BAU', YEARS)
  const bauPeak  = Math.max(...bauData.map(d => d?.scenario ?? 0))
  const bauPeakYear = YEARS[bauData.findIndex(d => (d?.scenario ?? 0) === bauPeak)] ?? 2070

  const nzData  = buildChartData('co2_sectoral', values, 'NZ', YEARS)
  const nz2070  = nzData[YEARS.indexOf(2070)]?.scenario ?? 0

  const cards = [
    { label: 'Base Year',  value: `${BASE_YEAR_CO2.toLocaleString()} Mt`, sub: '2025',          color: '#94a3b8' },
    { label: 'BAU peak',   value: `${Math.round(bauPeak * 1000).toLocaleString()} Mt`, sub: bauPeakYear, color: '#546e7a' },
    { label: 'Net Zero',   value: `${Math.round(nz2070  * 1000).toLocaleString()} Mt`, sub: '2070',       color: '#32864B' },
  ]

  return (
    <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center gap-6 flex-wrap">
      <p className="text-xs font-semibold text-gray-500 whitespace-nowrap">CO₂e projections</p>

      <div className="flex items-center gap-4 flex-wrap">
        {cards.map(c => (
          <div key={c.label} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
            <div>
              <span className="text-xs text-gray-400">{c.label} · </span>
              <span className="text-xs font-bold text-gray-700">{c.value}</span>
              <span className="text-xs text-gray-400"> ({c.sub})</span>
            </div>
          </div>
        ))}
      </div>

      {modifiedCount > 0 && (
        <span className="ml-auto text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
          {modifiedCount} lever{modifiedCount > 1 ? 's' : ''} modified
        </span>
      )}
    </div>
  )
}
