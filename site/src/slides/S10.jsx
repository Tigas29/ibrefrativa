import styled from 'styled-components'
import Logo from '../components/Logo.jsx'
import { GapBadge, GapNum, H2, Col2, BigNumber, Tag, Sep } from './shared.js'

const TermsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const TermsLabel = styled.p`
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 16px;
`

const TermRow = styled.div`
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TermText = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--creme);
`

const RightCard = styled.div`
  padding: 32px;
  background: var(--terra);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const RightLabel = styled.p`
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
`

const RightMeta = styled.p`
  font-family: var(--font-ui);
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 8px;
`

const RightNote = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
`

const terms = [
  '"sou candidato à cirurgia refrativa"',
  '"LASIK vs PRK qual o melhor"',
  '"pós-operatório LASIK dia a dia"',
  '"cirurgia refrativa vale a pena"',
]

export default function S10() {
  return (
    <>
      <Logo variant="dark" />
      <div style={{ width: '100%' }}>
        <GapBadge>
          <GapNum $bg="var(--navy)" $border="1px solid var(--amber)" $color="var(--amber)">3</GapNum>
          <span style={{ color: 'var(--amber)' }}>YouTube + SEO</span>
        </GapBadge>
        <H2 $theme="dark">Nenhum especialista de SP<br />tem YouTube relevante em refrativa.</H2>
        <Col2 style={{ marginTop: '28px', gap: '24px' }}>
          <div>
            <TermsLabel>Termos com volume alto e zero conteúdo de qualidade</TermsLabel>
            <TermsList>
              {terms.map((term, i) => (
                <TermRow key={i}>
                  <TermText>{term}</TermText>
                  <Tag $v="amber" style={{ fontSize: '10px' }}>Alto volume</Tag>
                </TermRow>
              ))}
            </TermsList>
          </div>
          <RightCard>
            <div>
              <RightLabel>Meta realista</RightLabel>
              <BigNumber $size="56px" $color="var(--amber)">20</BigNumber>
              <RightMeta>vídeos nos primeiros 6 meses</RightMeta>
            </div>
            <Sep $color="rgba(255,255,255,.2)" $m="20px 0" />
            <RightNote>
              Cada vídeo → 3 Reels + SEO no Google. Concorrente do Rio (Dr. Gustavo Bonfadini) já ranqueia nos termos de SP. O campo está aberto.
            </RightNote>
          </RightCard>
        </Col2>
      </div>
    </>
  )
}
