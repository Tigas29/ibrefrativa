import styled from 'styled-components'
import Logo from '../components/Logo.jsx'
import { AccentLine, Eyebrow, H2, Col2, Steps, Step, StepNum, StepTitle, StepDesc, GapNum, NoteBox } from './shared.js'

const GapsCard = styled.div`
  padding: 32px;
  background: var(--navy-deep);
  border-radius: 4px;
  margin-bottom: 16px;
`

const GapsLabel = styled.p`
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 16px;
`

const GapsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const GapItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const GapText = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--creme);
`

const SourceBox = styled.div`
  padding: 20px 24px;
  background: rgba(163, 81, 57, 0.1);
  border-left: 3px solid var(--terra);
  border-radius: 0 4px 4px 0;
`

const SourceText = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--navy-deep);
  line-height: 1.6;
`

const steps = [
  { num: '01', title: 'Definir nicho de entrada', desc: 'Escolher qual público atacar primeiro nos ads. Lutador, corredor ou profissional de tela?' },
  { num: '02', title: 'Persona detalhada', desc: 'Rotina, dores, gatilhos, canais e mensagem. Uma persona real, não um template.' },
  { num: '03', title: 'Estruturar o funil', desc: 'Topo: conteúdo educativo. Meio: avaliação gratuita. Fundo: cirurgia agendada.' },
  { num: '04', title: 'Testar criativos Meta Ads', desc: 'Mínimo 3 ângulos por nicho. ROI financeiro, depoimento espelhado, pós-op real.' },
  { num: '05', title: 'Iniciar canal YouTube', desc: '20 vídeos nos primeiros 6 meses. SEO + reaproveitamento como Reels.' },
]

const gaps = [
  { bg: 'var(--amber)', color: 'var(--navy-deep)', n: '1', label: 'ROI financeiro — reel + calculadora' },
  { bg: 'var(--terra)', color: 'white', n: '2', label: 'Série documental pós-op em vídeo' },
  { bg: 'var(--navy)', border: '1px solid var(--amber)', color: 'var(--amber)', n: '3', label: 'YouTube como motor de SEO' },
  { bg: 'var(--navy-deep)', border: '1px solid var(--bege)', color: 'var(--bege)', n: '4', label: 'Campanhas por nicho/profissão' },
]

export default function S13() {
  return (
    <>
      <Logo variant="light" />
      <AccentLine $color="var(--terra)" />
      <Col2 $gap="64px">
        <div>
          <Eyebrow $theme="light">Próximos Passos</Eyebrow>
          <H2 $theme="light">O que fazer agora</H2>
          <Steps>
            {steps.map(s => (
              <Step key={s.num}>
                <StepNum>{s.num}</StepNum>
                <div>
                  <StepTitle>{s.title}</StepTitle>
                  <StepDesc>{s.desc}</StepDesc>
                </div>
              </Step>
            ))}
          </Steps>
        </div>
        <div>
          <Eyebrow $invisible>x</Eyebrow>
          <GapsCard>
            <GapsLabel>Gaps prioritários</GapsLabel>
            <GapsList>
              {gaps.map(g => (
                <GapItem key={g.n}>
                  <GapNum $bg={g.bg} $border={g.border} $color={g.color}>{g.n}</GapNum>
                  <GapText>{g.label}</GapText>
                </GapItem>
              ))}
            </GapsList>
          </GapsCard>
          <SourceBox>
            <SourceText>
              <strong>Toka Company · Maio 2026</strong><br />
              Fontes: IBGE PNS 2019 · SBO · Scielo · Clínica Vizon · SEGS
            </SourceText>
          </SourceBox>
        </div>
      </Col2>
    </>
  )
}
