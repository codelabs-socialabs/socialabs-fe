import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import LandingPage from './pages/LandingPage'
import "@fontsource/geist/400.css"
import "@fontsource/geist/500.css"
import "@fontsource/geist/600.css"
import "@fontsource/geist/700.css"
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'
import FeaturePage from './pages/FeaturePage'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/pricing' element={<PricingPage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/feature' element={<FeaturePage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
