import styled from 'styled-components'
import Logo from '../components/Logo.jsx'
import { AccentLine, Eyebrow, H2, StatRow, StatBox, StatNum, StatLabel } from './shared.js'

const HighlightBox = styled.div`
  margin-top: 28px;
  padding: 20px 28px;
  background: var(--navy-deep);
  border-radius: 4px;
  display: inline-block;
`

const HighlightText = styled.p`
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 700;
  color: var(--amber);
`

const HighlightSub = styled.span`
  color: var(--bege);
  font-weight: 400;
`

export default function S02() {
  return (
    <>
      <Logo variant="light" />
      <AccentLine $color="var(--terra)" />
      <div style={{ width: '100%' }}>
        <Eyebrow $theme="light">Tamanho de Mercado</Eyebrow>
        <H2 $theme="light">Um mercado enorme.<br />Quase intacto.</H2>
        <StatRow>
          <StatBox>
            <StatNum $theme="light">85M</StatNum>
            <StatLabel $theme="light">brasileiros usam<br />óculos ou lentes</StatLabel>
          </StatBox>
          <StatBox>
            <StatNum $theme="light">18–19M</StatNum>
            <StatLabel $theme="light">só no estado<br />de São Paulo</StatLabel>
          </StatBox>
          <StatBox $custom="var(--terra)">
            <StatNum $color="var(--amber)">~170k</StatNum>
            <StatLabel $color="rgba(255,255,255,.8)">cirurgias refrativas<br />realizadas por ano no Brasil</StatLabel>
          </StatBox>
        </StatRow>
        <HighlightBox>
          <HighlightText>
            Menos de 0,2% do público potencial é operado por ano.
            <HighlightSub> Os EUA realizam 3× mais cirurgias refrativas per capita.</HighlightSub>
          </HighlightText>
        </HighlightBox>
      </div>
    </>
  )
}
