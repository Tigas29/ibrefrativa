import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Atleta = lazy(() => import('./pages/Atleta'))
const Profissional = lazy(() => import('./pages/Profissional'))
const Saturado = lazy(() => import('./pages/Saturado'))
const Estetico = lazy(() => import('./pages/Estetico'))
const Metodo = lazy(() => import('./pages/Metodo'))
// Cada página carrega à parte: a LP de Google Ads não paga o peso (framer-motion etc.) do site institucional.
const CirurgiaRefrativa = lazy(() => import('./pages/CirurgiaRefrativa'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atleta" element={<Atleta />} />
        <Route path="/profissional-de-tela" element={<Profissional />} />
        <Route path="/saturado" element={<Saturado />} />
        <Route path="/estetico" element={<Estetico />} />
        <Route path="/metodo" element={<Metodo />} />
        <Route
          path="/cirurgia-refrativa"
          element={<CirurgiaRefrativa />}
        />
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
