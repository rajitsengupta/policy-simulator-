import { useState, useEffect } from 'react'
import { X, ChevronRight, SlidersHorizontal, BarChart2, Share2, Layers } from 'lucide-react'

const STEPS = [
  {
    icon: Layers,
    title: 'Choose a baseline scenario',
    body: 'Start with Business as Usual, Managing Natural Resources, or Net Zero 2070 as your starting point. The Scenario Panel is on the right side of the dashboard.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: SlidersHorizontal,
    title: 'Tune the policy levers',
    body: 'Click "Create Your Scenario" on the left panel to open 46 policy levers across Agriculture, Power, Transport and more. Changes apply instantly to every graph.',
    color: 'text-green-600 bg-green-50',
  },
  {
    icon: BarChart2,
    title: 'Watch the graphs update',
    body: 'The headline KPI shows your CO₂ gap to the NDC target. Switch categories — Environmental, Economic, Social, Energy — using the bar just below the KPI.',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    icon: Share2,
    title: 'Share your scenario',
    body: 'Use "Share your Scenario" in the top nav to copy a URL that encodes all your settings. Anyone with the link sees exactly your configuration.',
    color: 'text-purple-600 bg-purple-50',
  },
]

export default function OnboardingOverlay() {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('onboarding-v2')) setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem('onboarding-v2', '1')
    setVisible(false)
  }

  if (!visible) return null

  const s = STEPS[step]
  const Icon = s.icon
  const isLast = step === STEPS.length - 1

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative overflow-hidden">

        {/* Progress bar */}
        <div className="flex h-1">
          {STEPS.map((_, i) => (
            <div key={i} className={`flex-1 transition-colors duration-300 ${i <= step ? 'bg-brand-500' : 'bg-gray-100'}`} />
          ))}
        </div>

        <div className="p-6">
          {/* Step counter + skip */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider">
              Step {step + 1} of {STEPS.length}
            </span>
            <button onClick={dismiss}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
              Skip tour <X className="w-3 h-3" />
            </button>
          </div>

          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
            <Icon className="w-5 h-5" />
          </div>

          <h3 className="text-base font-bold text-gray-900 mb-2">{s.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">{s.body}</p>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => step > 0 && setStep(step - 1)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                step > 0
                  ? 'text-gray-500 hover:bg-gray-100'
                  : 'text-gray-200 cursor-default'
              }`}
            >
              ← Back
            </button>

            {isLast ? (
              <button onClick={dismiss}
                className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
                Let's go!
              </button>
            ) : (
              <button onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
