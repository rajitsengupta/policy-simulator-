import { useNavigate } from 'react-router-dom'
import { ArrowRight, BarChart2, SlidersHorizontal, Zap, Leaf, Users, TrendingUp } from 'lucide-react'
import IndiaFlag from '../components/shared/IndiaFlag'

const WHY_IT_MATTERS = [
  { icon: Users,       color: 'bg-blue-50 text-blue-700',   title: 'Jobs & livelihoods',    body: 'Which policies create the most green jobs? Who gains and who is at risk in the transition away from fossil fuels?' },
  { icon: Zap,         color: 'bg-amber-50 text-amber-700', title: 'Energy access',          body: 'Can India meet its growing energy needs while cutting emissions? How fast can renewables scale without disrupting supply?' },
  { icon: Leaf,        color: 'bg-green-50 text-green-700', title: 'Forests & food',         body: 'How do land-use choices affect both carbon sinks and agricultural productivity? What is the agroforestry opportunity?' },
  { icon: TrendingUp,  color: 'bg-purple-50 text-purple-700',title: 'Growth & investment',   body: 'Is a low-carbon transition compatible with 7%+ GDP growth? Where should public investment go to maximise co-benefits?' },
]

const SCENARIOS = [
  { key: 'BAU', label: 'Business as Usual', color: '#546e7a', bg: 'bg-slate-50 border-slate-200',
    desc: 'No new policies beyond what exists today. The baseline against which everything else is measured.',
    co2: '7.7 Gt', gdp: '6.4%', re: '30%' },
  { key: 'MNR', label: 'Managing Natural Resources', color: '#1565c0', bg: 'bg-blue-50 border-blue-200',
    desc: 'Sustainable farming, agroforestry, renewable scale-up and moderate carbon pricing — a pragmatic middle path.',
    co2: '0.04 Gt', gdp: '6.7%', re: '92%' },
  { key: 'NZ',  label: 'Net Zero 2070', color: '#2e7d32', bg: 'bg-green-50 border-green-200',
    desc: 'Deep decarbonisation across all sectors — hydrogen, CCS, full renewable transition and land restoration.',
    co2: '0.97 Gt', gdp: '6.2%', re: '92%' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-white flex-1 overflow-y-auto">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <IndiaFlag size={48} />
            <div>
              <p className="font-black text-lg leading-tight">India Green Economy Model</p>
              <p className="text-blue-200 text-sm">GEM-India · WRI India & KnowlEdge Srl · v2.0</p>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5 max-w-3xl">
            What does a low-carbon India look like — for people?
          </h1>
          <p className="text-lg text-blue-100 leading-relaxed mb-10 max-w-2xl">
            This tool models how India's climate and development policies play out together — in jobs, energy, forests and GDP — from 2025 to 2070. Built on a peer-reviewed system-dynamics model, not assumptions.
          </p>

          {/* Equal-weight CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <button onClick={() => navigate('/projections')}
              className="flex flex-col gap-1 bg-white text-brand-700 rounded-2xl px-5 py-4 hover:bg-blue-50 transition shadow-lg text-left group">
              <div className="flex items-center gap-2 font-bold text-sm">
                <BarChart2 className="w-4 h-4" />
                Explore projections
                <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-gray-500 font-normal">See all three scenarios side-by-side across 20 indicators. No setup required.</p>
            </button>
            <button onClick={() => navigate('/dashboard')}
              className="flex flex-col gap-1 bg-white/10 border border-white/30 text-white rounded-2xl px-5 py-4 hover:bg-white/20 transition text-left group">
              <div className="flex items-center gap-2 font-bold text-sm">
                <SlidersHorizontal className="w-4 h-4" />
                Build your scenario
                <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs text-blue-200 font-normal">Tune 46 policy levers and see the impact on every graph in real time.</p>
            </button>
          </div>
        </div>
      </section>

      {/* ── Why it matters ── */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs text-brand-500 font-black uppercase tracking-widest mb-2">Why it matters</p>
          <h2 className="text-2xl font-black text-gray-900">India's climate choices aren't just about emissions</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            Every policy lever affects jobs, health, energy costs and economic growth — often in ways that don't show up in siloed models. GEM-India captures these links.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WHY_IT_MATTERS.map(m => {
            const Icon = m.icon
            return (
              <div key={m.title} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-sm transition-all">
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{m.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{m.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Three scenarios ── */}
      <section className="bg-surface px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs text-brand-500 font-black uppercase tracking-widest mb-2">Three pathways</p>
            <h2 className="text-2xl font-black text-gray-900">What happens under each policy choice?</h2>
            <p className="text-sm text-gray-500 mt-2">All graphs show all three lines. Toggle any on or off.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SCENARIOS.map(s => (
              <div key={s.key} className={`rounded-2xl border-2 p-5 ${s.bg}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: s.color }}>{s.key}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{s.label}</h3>
                <p className="text-xs text-gray-600 mb-4 leading-relaxed">{s.desc}</p>
                <div className="grid grid-cols-3 gap-2">
                  {[['CO₂e 2070', s.co2], ['GDP growth', s.gdp], ['RE share 2070', s.re]].map(([l, v]) => (
                    <div key={l} className="bg-white/70 rounded-xl px-2 py-2 text-center">
                      <p className="font-bold text-sm text-gray-900">{v}</p>
                      <p className="text-xs text-gray-500 leading-tight">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Systems thinking / CLD ── */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="flex flex-col gap-10">
          {/* Text + feedback loops side by side */}
          <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1">
            <p className="text-xs text-brand-500 font-black uppercase tracking-widest mb-2">The model</p>
            <h2 className="text-2xl font-black text-gray-900 mb-4">Built on systems thinking</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Most climate tools treat economy, energy and land as separate silos. GEM-India is different — it captures the feedback loops between them. Higher carbon prices raise government revenues, which fund health and education, which raise worker productivity, which raises GDP. That virtuous cycle is invisible to siloed models.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Air pollution from fossil fuels reduces labour productivity. Land restoration creates carbon sinks <em>and</em> raises agricultural income. These non-linearities are why the right policy package matters — and why this tool exists.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { tag: 'R1–R3', label: 'Growth engines', desc: 'Investment → Capital → Employment → GDP', color: 'bg-blue-50 border-blue-100 text-blue-700' },
                { tag: 'R4', label: 'Govt. multiplier', desc: 'Revenue → Health & Education → Productivity', color: 'bg-green-50 border-green-100 text-green-700' },
                { tag: 'B1', label: 'Tax drag', desc: 'Taxation reduces household consumption', color: 'bg-amber-50 border-amber-100 text-amber-700' },
                { tag: 'B2–B3', label: 'Climate penalty', desc: 'Emissions → PM2.5 → Lower TFP & health', color: 'bg-red-50 border-red-100 text-red-700' },
              ].map(l => (
                <div key={l.tag} className={`rounded-xl border p-3 ${l.color}`}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-black font-mono">{l.tag}</span>
                    <span className="text-xs font-bold">{l.label}</span>
                  </div>
                  <p className="text-xs opacity-75 leading-snug">{l.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Source:{' '}
              <a href="https://wri-india.org/perspectives/systems-thinking-people-centered-transition-low-carbon-economy"
                target="_blank" rel="noopener noreferrer"
                className="underline hover:text-brand-500 transition-colors">
                "Systems Thinking for a People-Centred Transition to a Low-Carbon Economy"
              </a>
              {' '}· WRI India · Golechha & Grover
            </p>
          </div>
          </div>{/* end text row */}

          {/* Full-width GIF */}
          <div className="w-full">
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md">
              <img src="/systems-thinking.gif" alt="Causal loop diagram of India's economy — GEM-India"
                className="w-full h-auto" loading="lazy" />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center leading-relaxed">
              The economy represented as a causal loop diagram.<br />
              <em>Infographic by Arpan Golechha & Apoorva Grover / WRI India</em>
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="bg-brand-700 text-white px-6 py-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <IndiaFlag size={36} />
              <p className="font-black text-base">India Green Economy Model</p>
            </div>
            <p className="text-xs text-blue-300 max-w-sm leading-relaxed mb-2">
              Developed by WRI India and KnowlEdge Srl. Based on Bassi (2015). Technical Note v2.0, October 2024.
            </p>
            <p className="text-xs text-blue-400">
              Golechha, Raman, Srivastava, Bassi, Pallaske, Cholayil & Dayal · doi.org/10.46830/writn.21.00033.v2
            </p>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button onClick={() => navigate('/projections')}
              className="flex items-center gap-2 bg-white text-brand-700 font-bold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition text-sm">
              <BarChart2 className="w-4 h-4" /> Explore projections
            </button>
            <button onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/20 transition text-sm">
              <SlidersHorizontal className="w-4 h-4" /> Build your scenario
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
