import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Atleta from './pages/Atleta'
import Profissional from './pages/Profissional'
import Saturado from './pages/Saturado'
import Estetico from './pages/Estetico'
import Metodo from './pages/Metodo'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atleta" element={<Atleta />} />
        <Route path="/profissional-de-tela" element={<Profissional />} />
        <Route path="/saturado" element={<Saturado />} />
        <Route path="/estetico" element={<Estetico />} />
        <Route path="/metodo" element={<Metodo />} />
      </Routes>
    </BrowserRouter>
  )
}
