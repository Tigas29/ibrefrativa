import styled from 'styled-components'
import Logo from '../components/Logo.jsx'
import { Eyebrow, Divider, Sep, Tag } from './shared.js'

const Wrapper = styled.div`
  width: 100%;
  max-width: 860px;
`

const QuoteBlock = styled.p`
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(28px, 3.5vw, 44px);
  line-height: 1.4;
  letter-spacing: -0.3px;
  color: var(--creme);
`

const Highlight = styled.span`
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--amber);
`

const PositionStatement = styled.p`
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(22px, 2.8vw, 36px);
  line-height: 1.4;
  letter-spacing: -0.3px;
  color: var(--creme);
`

const PositionClaim = styled.span`
  color: var(--amber);
  font-style: normal;
  font-family: var(--font-sans);
  font-size: 80%;
  font-weight: 700;
  display: block;
  margin-top: 12px;
  letter-spacing: 0.5px;
`

export default function S12() {
  return (
    <>
      <Logo variant="dark" />
      <Wrapper>
        <Eyebrow $theme="dark">Posicionamento</Eyebrow>
        <Divider $theme="dark" />
        <QuoteBlock>
          Os hospitais comunicam
          <Highlight> institucional.</Highlight><br />
          O Dr. Gabriel Castro comunica
          <Highlight> entretenimento.</Highlight><br />
          A Opty comunica
          <Highlight> volume.</Highlight>
        </QuoteBlock>
        <Sep $color="rgba(255,255,255,.15)" $m="40px 0" />
        <PositionStatement>
          O espaço livre:
          <PositionClaim>
            especialista técnico de alto padrão<br />
            que fala com o paciente como gente<br />
            e mostra o resultado real de perto.
          </PositionClaim>
        </PositionStatement>
        <div style={{ marginTop: '32px' }}>
          <Tag $v="amber">Esse é o IBR</Tag>
        </div>
      </Wrapper>
    </>
  )
}
