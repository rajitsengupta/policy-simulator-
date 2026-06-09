import { useState } from 'react'
import { X, LogIn, Eye, EyeOff } from 'lucide-react'
import IndiaFlag from './IndiaFlag'

export default function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    // UI-only: accept any credentials
    onLogin({ email })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative">
        <button onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-4 h-4" />
        </button>

        <div className="p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <IndiaFlag size={36} />
            <div>
              <p className="text-sm font-bold text-brand-700 leading-tight">India Green Economy Model</p>
              <p className="text-xs text-gray-400">GEM-India Dashboard</p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-1">Sign in</h2>
          <p className="text-xs text-gray-500 mb-6">Access your saved scenarios and settings</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="you@organisation.org"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 pr-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-200"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button type="submit"
              className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors">
              <LogIn className="w-4 h-4" /> Sign in
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            Don't have an account?{' '}
            <a href="mailto:gemindiadashboard@wri.org" className="text-brand-500 hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
