import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import TopNav from './components/layout/TopNav'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import ProjectionsPage from './pages/ProjectionsPage'
import ScenariosPage from './pages/ScenariosPage'
import MethodologyPage from './pages/MethodologyPage'
import { useSliderStore } from './store/sliderStore'
import { loadStateFromURL } from './utils/shareScenario'

function URLLoader() {
  const { setValue } = useSliderStore()
  useEffect(() => {
    const loaded = loadStateFromURL()
    if (loaded) Object.entries(loaded).forEach(([k, v]) => setValue(k, v))
  }, [])
  return null
}

function AppShell() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className="flex flex-col h-screen bg-surface">
      {!isLanding && <TopNav />}
      <URLLoader />
      {/* pt-14 offsets the fixed TopNav; flex-col + flex-1 + overflow-hidden contain the page */}
      <div className={`flex flex-col flex-1 min-h-0 ${isLanding ? '' : 'pt-14'}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projections" element={<ProjectionsPage />} />
          <Route path="/scenarios" element={<ScenariosPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
