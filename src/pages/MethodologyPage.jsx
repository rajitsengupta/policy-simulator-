import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { GROUPS } from '../data/sliders'

function AvailBadge({ val }) {
  const map = {
    Yes:       'bg-green-100 text-green-700',
    Partially: 'bg-amber-100 text-amber-700',
    No:        'bg-red-100 text-red-500',
  }
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full font-medium text-xs ${map[val] ?? 'bg-gray-100 text-gray-500'}`}>
      {val}
    </span>
  )
}

const DATA_SOURCES_TABLE = [
  {
    sector: 'Macroeconomy',
    color: 'bg-blue-50',
    headerColor: 'bg-blue-100 text-blue-800',
    rows: [
      { variable: 'System of National Accounts', available: 'Yes', national: 'Yes', sources: 'Data.gov.in · Agriculture Statistics, 2019 · Economic Survey, 2019–20 · MoSPI · IMF' },
      { variable: 'Investments', available: 'Yes', national: 'No', sources: 'World Bank' },
      { variable: 'Private final consumption', available: 'Yes', national: 'Yes', sources: 'MoSPI' },
      { variable: 'Government spending', available: 'Yes', national: 'Partially', sources: 'MoSPI · World Development Indicators' },
      { variable: 'Net value added', available: 'Partially', national: 'Yes', sources: 'Data.gov.in' },
      { variable: 'Gross value added', available: 'Yes', national: 'Yes', sources: 'Directorate of Economic and Statistics' },
      { variable: 'Taxes and revenue', available: 'Yes', national: 'Yes', sources: 'World Bank' },
      { variable: 'Trade', available: 'Yes', national: 'No', sources: 'IMF' },
    ],
  },
  {
    sector: 'Agriculture',
    color: 'bg-green-50',
    headerColor: 'bg-green-100 text-green-800',
    rows: [
      { variable: 'Agriculture and livestock value added', available: 'Yes', national: 'Yes', sources: 'MoSPI' },
      { variable: 'Area and area under irrigation for principal crops', available: 'Yes', national: 'Yes', sources: 'Land-Use Statistics, Ministry of Agriculture and Farmers Welfare' },
      { variable: 'Fallow land, culturable and unculturable wasteland', available: 'Yes', national: 'Yes', sources: 'Land-Use Statistics, Ministry of Agriculture and Farmers Welfare' },
      { variable: 'Agriculture yield of principal crops', available: 'Yes', national: 'Yes', sources: 'Ministry of Agriculture and Farmers Welfare, "Agricultural Statistics at a Glance"' },
      { variable: 'Livestock population', available: 'Yes', national: 'Yes', sources: 'Basic Animal Husbandry Statistics, Ministry of Fisheries, Animal Husbandry and Dairying' },
      { variable: 'Adoption rate of sustainable agriculture practices', available: 'Yes', national: 'No', sources: 'Council on Energy, Environment and Water, "Sustainable Agriculture in India 2021"' },
      { variable: 'Chemical fertiliser use, nitrogen content in manure and manure treatment', available: 'Yes', national: 'No', sources: 'FAOSTAT' },
    ],
  },
  {
    sector: 'Education',
    color: 'bg-purple-50',
    headerColor: 'bg-purple-100 text-purple-800',
    rows: [
      { variable: 'Gross enrolment ratio (at various levels)', available: 'Yes', national: 'Partially', sources: 'Ministry of Education · World Bank' },
      { variable: 'Literacy rate (15+ years) disaggregated by age and gender', available: 'Yes', national: 'No', sources: 'World Bank' },
      { variable: 'Illiterate population (15+ years) disaggregated by age and gender', available: 'Yes', national: 'No', sources: 'World Bank' },
      { variable: 'Gross intake ratio (at various levels)', available: 'Yes', national: 'Partially', sources: 'Ministry of Education' },
      { variable: 'Graduation / survival rate (at various levels)', available: 'Yes', national: 'Partially', sources: 'Ministry of Education' },
      { variable: 'Number of educational institutions', available: 'Yes', national: 'Partially', sources: 'Ministry of Education' },
      { variable: 'Gender parity index', available: 'Yes', national: 'Partially', sources: 'Ministry of Education' },
      { variable: 'Dropout rates', available: 'Yes', national: 'Partially', sources: 'Ministry of Education' },
    ],
  },
  {
    sector: 'Forests',
    color: 'bg-emerald-50',
    headerColor: 'bg-emerald-100 text-emerald-800',
    rows: [
      { variable: 'Land under forests', available: 'Yes', national: 'Yes', sources: 'Land-Use Statistics, Ministry of Agriculture and Farmers Welfare' },
      { variable: 'Estimates for tree and forest cover', available: 'Yes', national: 'Partially', sources: 'Forest Survey of India' },
      { variable: 'Estimates for agroforestry', available: 'Yes', national: 'No', sources: 'S.K. Dhyani, A.K. Handa, and Uma, "Area under Agroforestry in India," Indian Journal of Agroforestry 15(1) (2013)' },
      { variable: 'Economic contribution', available: 'Yes', national: 'Yes', sources: 'MoSPI' },
      { variable: 'Import value', available: 'No', national: 'No', sources: 'FAO' },
      { variable: 'Export value', available: 'No', national: 'Yes', sources: 'FAO' },
      { variable: 'Production', available: 'No', national: 'Yes', sources: 'FAO' },
    ],
  },
  {
    sector: 'Infrastructure',
    color: 'bg-amber-50',
    headerColor: 'bg-amber-100 text-amber-800',
    rows: [
      { variable: 'Road density', available: 'Yes', national: 'Yes', sources: 'Basic Road Statistics of India · Annual Reports, Ministry of Road, Transport and Highways' },
      { variable: 'Road construction', available: 'No', national: 'No', sources: '—' },
      { variable: 'Road-capital expenditure, O&M cost', available: 'Yes', national: 'Partially', sources: 'Basic Road Statistics of India · Annual Reports, Ministry of Road, Transport and Highways' },
      { variable: 'Road infrastructure employment', available: 'Yes', national: 'Partially', sources: 'Annual Reports, Ministry of Road, Transport and Highways' },
      { variable: 'Total number of registered vehicles', available: 'Yes', national: 'Yes', sources: 'Basic Road Statistics of India series · Annual Reports, Ministry of Road, Transport and Highways' },
      { variable: 'Kilometres travelled disaggregated by vehicle type', available: 'No', national: 'No', sources: '—' },
      { variable: 'Air pollution from transport by pollutant', available: 'No', national: 'No', sources: '—' },
      { variable: 'Rail network', available: 'Yes', national: 'Yes', sources: 'Indian Rail Yearbook · Indian Rail Statistics' },
      { variable: 'Rail energy consumption', available: 'Yes', national: 'Yes', sources: 'Indian Rail Yearbook · Indian Rail Statistics' },
    ],
  },
  {
    sector: 'Waste management',
    color: 'bg-orange-50',
    headerColor: 'bg-orange-100 text-orange-800',
    rows: [
      { variable: 'Waste generation per capita', available: 'No', national: 'No', sources: '—' },
      { variable: 'Total waste generation', available: 'No', national: 'Yes', sources: 'Central Pollution Control Board, Solid Waste Management: Annual Report' },
      { variable: 'Total waste collection', available: 'Yes', national: 'Partially', sources: 'Central Pollution Control Board, Solid Waste Management: Annual Report' },
      { variable: 'Waste incineration', available: 'No', national: 'No', sources: '—' },
      { variable: 'Waste landfilled', available: 'Yes', national: 'Partially', sources: 'Central Pollution Control Board, Solid Waste Management: Annual Report' },
      { variable: 'Waste recycled', available: 'No', national: 'No', sources: '—' },
      { variable: 'Waste recycling unit (registered and unregistered)', available: 'Yes', national: 'Partially', sources: 'Central Pollution Control Board, Plastic Waste Management: Annual Report' },
      { variable: 'Waste composition', available: 'No', national: 'No', sources: '—' },
      { variable: 'Employment', available: 'No', national: 'No', sources: '—' },
      { variable: 'Emissions', available: 'No', national: 'No', sources: '—' },
      { variable: 'Land requirement', available: 'No', national: 'No', sources: '—' },
      { variable: 'Government efforts (taxation, investment)', available: 'No', national: 'No', sources: '—' },
    ],
  },
  {
    sector: 'Health',
    color: 'bg-rose-50',
    headerColor: 'bg-rose-100 text-rose-800',
    rows: [
      { variable: 'Number of health care professionals (doctors and nurses)', available: 'Yes', national: 'Partially', sources: 'Indian Statistical Yearbooks' },
      { variable: 'Health infrastructure (hospitals and primary health centres)', available: 'Yes', national: 'Yes', sources: 'Indian Statistical Yearbooks' },
    ],
  },
  {
    sector: 'Water',
    color: 'bg-cyan-50',
    headerColor: 'bg-cyan-100 text-cyan-800',
    rows: [
      { variable: 'Residential water demand', available: 'No', national: 'No', sources: 'Social Statistics, Ministry of Statistics and Programme Implementation' },
      { variable: 'Industrial water demand', available: 'No', national: 'No', sources: 'DMEO, NITI Aayog, Water Resources Sector Report' },
    ],
  },
  {
    sector: 'GHG emissions',
    color: 'bg-red-50',
    headerColor: 'bg-red-100 text-red-800',
    rows: [
      { variable: 'Total annual GHG emissions', available: 'Yes', national: 'Partially', sources: 'India Biennial Update Report' },
    ],
  },
  {
    sector: 'Labour and employment',
    color: 'bg-indigo-50',
    headerColor: 'bg-indigo-100 text-indigo-800',
    rows: [
      { variable: 'Labour force', available: 'Yes', national: 'Yes', sources: 'Labour Statistics' },
      { variable: 'Total employment', available: 'Yes', national: 'Yes', sources: 'Labour Statistics · India Statistical Yearbook · Labour Bureau, Ministry of Labour and Employment' },
      { variable: 'Employment in agriculture', available: 'Yes', national: 'Partially', sources: 'Labour Statistics · India Statistical Yearbook · Labour Bureau, Ministry of Labour and Employment' },
      { variable: 'Employment in industry', available: 'Yes', national: 'Yes', sources: 'Labour Statistics · India Statistical Yearbook · Labour Bureau, Ministry of Labour and Employment' },
      { variable: 'Employment in services', available: 'Yes', national: 'Partially', sources: 'Labour Statistics · India Statistical Yearbook · Labour Bureau, Ministry of Labour and Employment' },
      { variable: 'Average earnings', available: 'Yes', national: 'Yes', sources: 'Labour Statistics · India Statistical Yearbook · Labour Bureau, Ministry of Labour and Employment' },
    ],
  },
  {
    sector: 'Industry',
    color: 'bg-slate-50',
    headerColor: 'bg-slate-100 text-slate-800',
    rows: [
      { variable: 'Initial GDP by industry', available: 'Yes', national: 'Yes', sources: 'Annual Survey of Industries · MoSPI' },
      { variable: 'Investment industry by sector', available: 'Yes', national: 'Yes', sources: 'Annual Survey of Industries · MoSPI' },
      { variable: 'Industrial wastewater generation', available: 'Yes', national: 'Partially', sources: 'Jal Shakti Ministry' },
      { variable: 'Grossly polluting industries', available: 'Yes', national: 'Partially', sources: 'Jal Shakti Ministry' },
    ],
  },
  {
    sector: 'Energy',
    color: 'bg-yellow-50',
    headerColor: 'bg-yellow-100 text-yellow-800',
    rows: [
      { variable: 'Supply of electricity (by source, thermal and renewables)', available: 'Yes', national: 'Partially', sources: 'Energy Statistics, MoSPI' },
      { variable: 'Total primary energy supply by source', available: 'Yes', national: 'Partially', sources: 'Energy Statistics, MoSPI' },
      { variable: 'Production capacity of electricity by source', available: 'Yes', national: 'Partially', sources: 'Energy Statistics, MoSPI' },
      { variable: 'Energy investment', available: 'Yes', national: 'Partially', sources: 'Annual Reports, Central Electricity Authority' },
      { variable: 'Plant load factor', available: 'Yes', national: 'Partially', sources: 'Annual Reports, Ministry of Power' },
      { variable: 'Total energy demand (by source)', available: 'Yes', national: 'Partially', sources: 'National Electricity Plan' },
      { variable: 'Land required for biofuels', available: 'No', national: 'No', sources: 'Observer Research Foundation' },
      { variable: 'Demand for petroleum products', available: 'No', national: 'No', sources: 'IEA Energy Demand Data' },
      { variable: 'Total energy demand (sectors: residential, commercial, industrial, transport)', available: 'Yes', national: 'No', sources: 'Energy Statistics, MoSPI' },
      { variable: 'Electricity final consumption by sector', available: 'Yes', national: 'Partially', sources: 'Energy Statistics, MoSPI' },
      { variable: 'Energy prices and costs (disaggregated by consumer sector)', available: 'Yes', national: 'Partially', sources: 'Energy Statistics, MoSPI' },
      { variable: 'Fossil fuel emissions', available: 'Yes', national: 'Partially', sources: 'Central Electricity Authority · India Biennial Update Report · GHG Platform India' },
      { variable: 'Primary energy supply', available: 'Yes', national: 'Partially', sources: 'Energy Statistics, MoSPI' },
      { variable: 'Employment', available: 'Yes', national: 'Partially', sources: 'Annual Reports, Ministry of Power' },
      { variable: 'Final consumption data in KTOE', available: 'Yes', national: 'Partially', sources: 'Energy Statistics, MoSPI' },
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
          <div className="space-y-3">
            <div className="mb-4">
              <h2 className="text-base font-bold text-gray-900">Sector-wise Datasets and Sources</h2>
              <p className="text-xs text-gray-500 mt-1">Source: GEM-India Technical Note, October 2024 (WRI India &amp; KnowlEdge Srl). Table B-1.</p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-4 text-xs text-gray-600">
              <span className="font-semibold text-gray-700">Data available:</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Yes</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Partially</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> No</span>
            </div>

            {DATA_SOURCES_TABLE.map(section => (
              <div key={section.sector} className="rounded-xl border border-gray-200 overflow-hidden">
                <div className={`px-4 py-2.5 ${section.headerColor} font-bold text-sm`}>
                  {section.sector}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left px-4 py-2 font-semibold text-gray-500 w-[35%]">Variable</th>
                        <th className="text-center px-3 py-2 font-semibold text-gray-500 w-[12%]">Data available</th>
                        <th className="text-center px-3 py-2 font-semibold text-gray-500 w-[12%]">National sources</th>
                        <th className="text-left px-4 py-2 font-semibold text-gray-500">Data sources</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {section.rows.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-2.5 text-gray-700 leading-snug">{row.variable}</td>
                          <td className="px-3 py-2.5 text-center">
                            <AvailBadge val={row.available} />
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <AvailBadge val={row.national} />
                          </td>
                          <td className="px-4 py-2.5 text-gray-500 leading-snug">{row.sources}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <p className="text-xs text-gray-400 pt-2">
              Abbreviations: DMEO = Development Monitoring and Evaluation Office · FAO = Food and Agriculture Organization · FAOSTAT = FAO Corporate Statistical Database · IEA = International Energy Agency · IMF = International Monetary Fund · KTOE = kilotonnes of oil equivalent · MoSPI = Ministry of Statistics and Programme Implementation · NITI = National Institution for Transforming India · O&amp;M = operations and maintenance.
            </p>
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
