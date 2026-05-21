import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const HeroLogo = styled.img`
  height: 52px;
  margin-bottom: 64px;
  opacity: 0.95;
`

const Eyebrow = styled.span`
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: block;
  color: var(--amber);
`

const H1 = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -1px;
  max-width: 700px;
  margin-bottom: 20px;
  color: var(--creme);
`

const Highlight = styled.span`
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--amber);
`

const Divider = styled.div`
  width: 48px;
  height: 2px;
  margin-bottom: 28px;
  background: var(--amber);
`

const Intro = styled.p`
  font-family: var(--font-ui);
  font-size: clamp(14px, 1.5vw, 17px);
  line-height: 1.65;
  color: var(--bege);
  max-width: 480px;
  opacity: 0.7;
`

const Watermark = styled.img`
  position: absolute;
  right: -60px;
  bottom: -60px;
  width: 320px;
  opacity: 0.04;
  pointer-events: none;
`

export default function S01() {
  return (
    <Wrapper>
      <HeroLogo src="/logos/02.png" alt="IBR" />
      <Eyebrow>Toka Company · Maio 2026</Eyebrow>
      <H1>
        Estudo de Mercado<br />
        <Highlight>Cirurgia Refrativa</Highlight>
      </H1>
      <Divider />
      <Intro>
        Análise de mercado, público-alvo, concorrentes e oportunidades estratégicas para o IBR — Instituto Brasileiro de Refrativa.
      </Intro>
      <Watermark src="/logos/02.png" alt="" />
    </Wrapper>
  )
}
