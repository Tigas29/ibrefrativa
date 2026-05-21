import styled from 'styled-components'
import Logo from '../components/Logo.jsx'
import { Eyebrow, H2, PersonaGrid, PersonaCard, PersonaIcon } from './shared.js'

const Subtitle = styled.p`
  font-family: var(--font-ui);
  font-size: 14px;
  line-height: 1.65;
  color: var(--bege);
  margin-bottom: 28px;
  opacity: 0.6;
`

const PersonaName = styled.p`
  font-family: var(--font-ui);
  font-weight: 700;
  color: var(--amber);
  font-size: 14px;
  margin-bottom: 4px;
`

const PersonaDesc = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  line-height: 1.65;
  color: var(--bege);
  opacity: 0.75;
`

const personas = [
  { icon: '💻', name: 'Profissional de tela pesada', desc: 'TI, finanças, jurídico, marketing. 10h/dia na tela. Lente resseca às 23h. Cansado.' },
  { icon: '🏃', name: 'Esportista urbano', desc: 'Corrida, crossfit, artes marciais, ciclismo. Óculos atrapalha a performance e segurança.' },
  { icon: '😤', name: 'Saturado da dependência', desc: 'Usando óculos desde a adolescência. Quer liberdade. Renda para investir. Só faltava confiança.' },
  { icon: '📸', name: 'Estético-consciente', desc: 'Imagem importa. Odeia aparecer em foto com óculos. Mas sem eles não enxerga nada.' },
]

export default function S04() {
  return (
    <>
      <Logo variant="dark" />
      <div style={{ width: '100%' }}>
        <Eyebrow $theme="dark">Público-Alvo</Eyebrow>
        <H2 $theme="dark" style={{ marginBottom: '8px' }}>Quem está pronto<br />para operar</H2>
        <Subtitle>25–40 anos · Superior completo · Classe média-alta · SP</Subtitle>
        <PersonaGrid>
          {personas.map((p) => (
            <PersonaCard key={p.name}>
              <PersonaIcon>{p.icon}</PersonaIcon>
              <div>
                <PersonaName>{p.name}</PersonaName>
                <PersonaDesc>{p.desc}</PersonaDesc>
              </div>
            </PersonaCard>
          ))}
        </PersonaGrid>
      </div>
    </>
  )
}
