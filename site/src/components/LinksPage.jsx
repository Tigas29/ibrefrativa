import styled, { createGlobalStyle } from 'styled-components'
import ArticleCard from './ArticleCard'
import LinkButton from './LinkButton'

const GlobalReset = createGlobalStyle`
  html, body {
    overflow: auto;
  }
`

const Page = styled.div`
  min-height: 100vh;
  background: #1C2632;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 20px 64px;
`

const Inner = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
`

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`

const LogoImg = styled.img`
  height: 48px;
  display: block;
  margin-bottom: 12px;
`

const Tagline = styled.p`
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(201, 194, 178, 0.55);
  text-align: center;
  margin: 0;
`

const Section = styled.div`
  width: 100%;
  margin-bottom: 28px;
`

const SectionLabel = styled.p`
  font-family: var(--font-ui);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(201, 194, 178, 0.40);
  margin-bottom: 10px;
`

const LinksStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

const Divider = styled.div`
  width: 32px;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 4px auto 28px;
`

export default function LinksPage() {
  return (
    <>
      <GlobalReset />
      <Page>
        <Inner>
          <LogoWrapper>
            <LogoImg src="/logos/02.png" alt="Instituto Brasileiro de Refrativa" />
            <Tagline>Instituto Brasileiro de Refrativa</Tagline>
          </LogoWrapper>

          <Section>
            <SectionLabel>Destaque</SectionLabel>
            <ArticleCard
              href="https://virgula.me/saude/dr-luis-felipe-bortolan-explica-por-que-ed-sheeran-ainda-usa-oculos-mesmo-apos-cirurgia-refrativa/"
              image="https://images.virgula.me/2026/05/dr-bortolan-1.webp"
              label="Virgula.me • Destaque"
              title="Dr. Luís Felipe Bortolan explica por que Ed Sheeran ainda usa óculos mesmo após cirurgia refrativa"
              description="O cantor e compositor britânico Ed Sheeran surpreendeu os fãs ao revelar que, mesmo após realizar uma cirurgia refrativa a laser para corrigir a visão, continua usando óculos em diversas ocasiões..."
            />
          </Section>

          <Divider />

          <Section>
            <SectionLabel>Links</SectionLabel>
            <LinksStack>
              <LinkButton
                href="https://wa.me/5511911341997"
                icon="📞"
                label="WhatsApp"
              />
              <LinkButton
                href="https://ibrefrativa.com.br"
                icon="🌐"
                label="Site"
              />
            </LinksStack>
          </Section>
        </Inner>
      </Page>
    </>
  )
}
