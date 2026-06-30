import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Share2, Download, BookOpen, HelpCircle, LogIn, LogOut, User } from 'lucide-react'
import { useSliderStore } from '../../store/sliderStore'
import { serializeState } from '../../utils/shareScenario'
import Toast from '../shared/Toast'
import IndiaFlag from '../shared/IndiaFlag'
import LoginModal from '../shared/LoginModal'

export default function TopNav() {
  const location = useLocation()
  const { values } = useSliderStore()
  const [toast, setToast] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState(null)

  const navLinks = [
    { to: '/dashboard',    label: 'Dashboard' },
    { to: '/projections',  label: 'Projections' },
    { to: '/scenarios',    label: 'Scenarios' },
  ]

  function handleShare() {
    const url = serializeState(values)
    navigator.clipboard.writeText(url).then(() => {
      setToast(true)
      setTimeout(() => setToast(false), 2000)
    })
  }

  function handleLogin(userData) {
    setUser(userData)
    setShowLogin(false)
  }

  function restartTour() {
    localStorage.removeItem('onboarding-v3')
    window.location.reload()
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 h-14 gap-2">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="hidden sm:block">
              <p className="font-bold text-sm text-green-700 leading-tight group-hover:text-green-800 transition-colors">
                India Green Economy Model
              </p>
              <p className="text-xs text-gray-500 leading-tight">Climate Policy Analysis Dashboard</p>
            </div>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-0.5">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  location.pathname === to
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link to="/methodology"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                location.pathname === '/methodology'
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Methodology
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button onClick={restartTour}
              aria-label="Restart guided tour"
              title="User Guide"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-colors border border-gray-200"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <button onClick={handleShare}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium whitespace-nowrap">
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share your Scenario</span>
            </button>

            {user ? (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-brand-50 rounded-lg">
                  <User className="w-3.5 h-3.5 text-brand-600" />
                  <span className="text-xs font-medium text-brand-700 hidden md:inline truncate max-w-24">{user.email}</span>
                </div>
                <button onClick={() => setUser(null)}
                  title="Sign out"
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border border-gray-200">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowLogin(true)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-brand-500 text-brand-600 hover:bg-brand-50 transition-colors font-medium whitespace-nowrap">
                <LogIn className="w-3.5 h-3.5" />
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}

      {toast && <Toast message="Link copied!" />}
    </>
  )
}
