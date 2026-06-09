import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, BookOpen } from 'lucide-react'
import { GROUPS } from '../data/sliders'

const DATA_SOURCES = [
  {
    name: 'IPCC (Intergovernmental Panel on Climate Change)',
    color: 'border-blue-200 bg-blue-50',
    titleColor: 'text-blue-700',
    url: 'https://www.ipcc.ch',
    desc: 'Climate science assessments, emission scenarios, and climate change projections',
    datasets: [
      'AR6 Climate Change 2021: The Physical Science Basis',
      'AR6 Climate Change 2022: Impacts, Adaptation and Vulnerability',
      'Special Report on Global Warming of 1.5°C',
      'Emission Factor Database',
    ],
  },
  {
    name: 'IEA (International Energy Agency)',
    color: 'border-amber-200 bg-amber-50',
    titleColor: 'text-amber-700',
    url: 'https://www.iea.org',
    desc: 'Energy statistics, technology data, and energy transition pathways',
    datasets: [
      'World Energy Outlook 2023',
      'India Energy Outlook 2021',
      'Net Zero by 2050 Roadmap',
      'Global EV Outlook',
      'Renewable Energy Market Update',
    ],
  },
  {
    name: 'World Bank',
    color: 'border-teal-200 bg-teal-50',
    titleColor: 'text-teal-700',
    url: 'https://www.worldbank.org',
    desc: 'Economic indicators, development data, and climate finance information',
    datasets: [
      'World Development Indicators',
      'GDP Growth Projections',
      'Climate Change Knowledge Portal',
      'Carbon Pricing Dashboard',
    ],
  },
  {
    name: 'Ministry of New & Renewable Energy (MNRE)',
    color: 'border-green-200 bg-green-50',
    titleColor: 'text-green-700',
    url: 'https://mnre.gov.in',
    desc: 'India-specific renewable energy targets, capacity data and policy documents',
    datasets: [
      'Annual Reports 2020–2024',
      'National Solar Mission data',
      'Wind Energy targets and installation data',
      'PM-KUSUM scheme statistics',
    ],
  },
  {
    name: 'Ministry of Environment, Forest and Climate Change (MoEFCC)',
    color: 'border-emerald-200 bg-emerald-50',
    titleColor: 'text-emerald-700',
    url: 'https://moef.gov.in',
    desc: 'India\'s national GHG inventories, forest cover data, and NDC commitments',
    datasets: [
      'National GHG Inventory 2016',
      'India\'s Updated NDC 2022',
      'State of Forest Report 2021',
      'National Action Plan on Climate Change (NAPCC)',
    ],
  },
  {
    name: 'Central Statistics Office (CSO) / MoSPI',
    color: 'border-purple-200 bg-purple-50',
    titleColor: 'text-purple-700',
    url: 'https://mospi.gov.in',
    desc: 'National accounts, employment and population data for India',
    datasets: [
      'National Accounts Statistics',
      'Periodic Labour Force Survey (PLFS)',
      'Consumer Price Index data',
      'Population projections 2011–2036',
    ],
  },
]

const USER_GUIDE_STEPS = [
  {
    step: '01',
    title: 'Choose a baseline scenario',
    body: 'Open the Scenario Panel on the right side of the dashboard. Select one of three pathways — Business as Usual (BAU), Managing Natural Resources (MNR), or Net Zero 2070 (NZ) — as your starting point. Each pre-sets all 46 levers to that scenario\'s values.',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  {
    step: '02',
    title: 'Adjust policy levers',
    body: 'Click "Create Your Scenario" on the left panel to open the Policy Levers sidebar. Use the group tabs to navigate between Agriculture, Power, Transport, Fuel Switching and other sectors. Move any slider to instantly see the impact on all graphs.',
    color: 'bg-green-50 border-green-200 text-green-700',
  },
  {
    step: '03',
    title: 'Read the graphs',
    body: 'The centre panel shows outcome graphs grouped by category — Environmental, Economic, Social and Energy. Switch categories using the sub-navigation bar. The headline KPI at the top always shows your current CO₂ gap to the NDC target.',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
  },
  {
    step: '04',
    title: 'Use Projections for comparison',
    body: 'Go to the Projections page to see all three baseline scenarios side-by-side across 20 indicators from 2025 to 2070. Use the category filters to focus on a specific domain.',
    color: 'bg-purple-50 border-purple-200 text-purple-700',
  },
  {
    step: '05',
    title: 'Share or download your scenario',
    body: 'Click "Share your Scenario" in the top navigation to copy a URL that encodes all your lever settings — anyone with the link will see exactly your configuration. Use "Download Scenarios" to export data as CSV.',
    color: 'bg-teal-50 border-teal-200 text-teal-700',
  },
  {
    step: '06',
    title: 'Switch layouts',
    body: 'On the Dashboard, use the Layout switcher to move the policy levers from the left sidebar to a bottom panel — useful on wider screens when you want more space for the graphs.',
    color: 'bg-rose-50 border-rose-200 text-rose-700',
  },
]

export default function MethodologyPage() {
  const [tab, setTab] = useState('variables')
  const navigate = useNavigate()

  return (
    <div className="flex-1 overflow-y-auto bg-surface">
      {/* Back + header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <button onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-600 transition-colors mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>

        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Methodology</h1>
              <p className="text-xs text-gray-500">Policy variables, definitions, and guidance on using the dashboard</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4">
          {[
            { id: 'variables', label: 'Policy Variables' },
            { id: 'sources',   label: 'Data Sources' },
            { id: 'guide',     label: 'User Guide' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                tab === t.id
                  ? 'bg-brand-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* ── Policy Variables tab ── */}
        {tab === 'variables' && (
          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              The dashboard exposes <strong>46 policy levers</strong> across 6 sectors. Each lever maps to a parameter inside the GEM-India system-dynamics model. Below are all variables grouped by sector.
            </p>
            {GROUPS.map(group => (
              <div key={group.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 bg-brand-50 border-b border-brand-100">
                  <h2 className="text-sm font-bold text-brand-800">{group.name}</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {group.sliders.map(s => (
                    <div key={s.id} className="px-4 py-3 flex gap-4 items-start">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800">{s.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        {s.isToggle ? (
                          <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-medium">Toggle</span>
                        ) : (
                          <div>
                            <p className="text-xs text-gray-400 font-mono">{s.unit || '—'}</p>
                            <p className="text-xs text-gray-500">{s.min} – {s.max}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Data Sources tab ── */}
        {tab === 'sources' && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-gray-900">Primary Data Sources</h2>
            {DATA_SOURCES.map(src => (
              <div key={src.name} className={`rounded-xl border-2 p-5 ${src.color}`}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className={`text-sm font-bold ${src.titleColor}`}>{src.name}</h3>
                  <a href={src.url} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-1 text-xs font-medium flex-shrink-0 ${src.titleColor} hover:underline`}>
                    Visit <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-gray-600 mb-3">{src.desc}</p>
                <p className="text-xs font-semibold text-gray-500 mb-1">Key Datasets Used:</p>
                <ul className="space-y-0.5">
                  {src.datasets.map(d => (
                    <li key={d} className="text-xs text-gray-600 flex items-start gap-1.5">
                      <span className="mt-1 flex-shrink-0">•</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* ── User Guide tab ── */}
        {tab === 'guide' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-6">
              New to GEM-India? Follow these steps to get the most out of the dashboard.
            </p>
            {USER_GUIDE_STEPS.map(s => (
              <div key={s.step} className={`rounded-xl border-2 p-5 flex gap-4 ${s.color}`}>
                <div className="flex-shrink-0">
                  <span className="text-2xl font-black opacity-30">{s.step}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}

            <div className="mt-8 bg-gray-50 rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-2">About the model</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-2">
                GEM-India is a peer-reviewed system-dynamics model developed by WRI India and KnowlEdge Srl, based on Bassi (2015). It captures feedback loops between the economy, energy system, land use and climate — links that siloed sector models miss.
              </p>
              <p className="text-xs text-gray-400">
                Golechha, Raman, Srivastava, Bassi, Pallaske, Cholayil & Dayal · doi.org/10.46830/writn.21.00033.v2
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
