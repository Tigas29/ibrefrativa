import styled from 'styled-components'
import Logo from '../components/Logo.jsx'
import { AccentLine, Col2, GapBadge, GapNum, H2, Sep } from './shared.js'

const Body = styled.p`
  font-family: var(--font-ui);
  font-size: clamp(14px, 1.5vw, 17px);
  line-height: 1.65;
  color: var(--navy);
  margin-top: 16px;
`

const SeriesBox = styled.div`
  margin-top: 24px;
  padding: 20px 24px;
  background: rgba(163, 81, 57, 0.08);
  border-radius: 4px;
`

const SeriesLabel = styled.p`
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--terra);
  margin-bottom: 12px;
`

const SeriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const SeriesItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const SeriesNum = styled.span`
  background: var(--terra);
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
  font-family: var(--font-ui);
`

const SeriesText = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--navy);
`

const RightCard = styled.div`
  padding: 32px;
  background: var(--navy-deep);
  border-radius: 4px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const RightLabel = styled.p`
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 20px;
`

const RightQuote = styled.p`
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 20px;
  line-height: 1.4;
  color: var(--creme);
`

const RightBody = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--bege);
  margin-top: 16px;
  opacity: 0.8;
`

const RightNote = styled.p`
  font-family: var(--font-ui);
  font-size: 12px;
  color: var(--bege);
  opacity: 0.6;
`

const series = [
  'Antes — decisão, medo, expectativa',
  'Dia da cirurgia — bastidor real',
  'Semana 1 — como está a visão?',
  'Mês 1 — resultado final, sem óculos',
]

export default function S09() {
  return (
    <>
      <Logo variant="light" />
      <AccentLine $color="var(--terra)" />
      <Col2>
        <div>
          <GapBadge>
            <GapNum $bg="var(--terra)" $color="var(--white)">2</GapNum>
            <span style={{ color: 'var(--terra)' }}>Série documental</span>
          </GapBadge>
          <H2 $theme="light">O pós-operatório não existe como conteúdo em SP.</H2>
          <Body>
            Todos os concorrentes vivem no pré-op. O pós — onde mora a maior ansiedade do candidato — não existe como conteúdo seriado em nenhum player de SP.
          </Body>
          <SeriesBox>
            <SeriesLabel>Estrutura da série</SeriesLabel>
            <SeriesList>
              {series.map((txt, i) => (
                <SeriesItem key={i}>
                  <SeriesNum>{i + 1}</SeriesNum>
                  <SeriesText>{txt}</SeriesText>
                </SeriesItem>
              ))}
            </SeriesList>
          </SeriesBox>
        </div>
        <RightCard>
          <RightLabel>Por que isso converte</RightLabel>
          <RightQuote>"E se não funcionar?"</RightQuote>
          <RightBody>
            Essa é a objeção #1. O pós-operatório documentado em vídeo real destrói esse medo melhor do que qualquer copy.
          </RightBody>
          <Sep $m="24px 0" />
          <RightNote>
            <strong style={{ color: 'var(--amber)' }}>Reaproveitamento:</strong> cada série de 4 vídeos vira Reels, YouTube, anúncio de remarketing e prova social no WhatsApp.
          </RightNote>
        </RightCard>
      </Col2>
    </>
  )
}
