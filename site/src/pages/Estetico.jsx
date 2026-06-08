/**
 * IBR — Funil Estético-Consciente
 * Página 5 · SEO: parar de usar óculos · cirurgia refrativa São Paulo imagem
 */

import { useRef } from 'react'
import styled from 'styled-components'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  ReducedMotion, Reveal, fadeUp, fadeIn,
  Section, Container, Eyebrow, Divider, CtaPrimary, MicroCopy,
  HeroWrap, HeroBg, HeroGrain, LensArc, HeroInner, HeroH1, HeroSub, HeroVisual,
  H2Light, H2Dark, BodyText, SectionLight, SectionDark,
  DrAutoridade, TestimonialCards, TestimonialDisclaimer,
  FaqSection, CtaFinal, MetodoPilulaSection, PageMeta,
} from '../components/shared'

const WA_LINK = 'https://wa.me/551150284894'

/* ── Reframe — fundo creme com destaque textual ── */
const ReframeWrap = styled(SectionLight)`background: var(--white);`
const ReframeInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
`
const ReframeImg = styled.div`
  aspect-ratio: 3/4;
  border-radius: 6px; overflow: hidden;
  border: 1px solid rgba(44,59,77,0.08);
  img { width:100%; height:100%; object-fit:cover; display:block; filter: saturate(0.88); }
  @media (max-width: 900px) { aspect-ratio: 4/3; max-height: 320px; }
`

/* ── Identificação — bullets de cenas ── */
const CenaList = styled.ul`
  display: flex; flex-direction: column; gap: 14px;
  max-width: 640px;
`
const CenaItem = styled.li`
  display: flex; align-items: flex-start; gap: 16px;
  font-family: var(--font-ui);
  font-size: clamp(15px,1.4vw,17px);
  color: var(--navy); line-height: 1.65;
  &::before {
    content: ''; width: 6px; height: 6px;
    border-radius: 50%; background: var(--terra);
    flex-shrink: 0; margin-top: 8px;
  }
`

const EST_CENAS = [
  'A foto de grupo onde você é o único de óculos e preferia não ser.',
  'A situação de tirar o óculos para a foto e ficar sem enxergar o enquadramento.',
  'A lente que resseca na hora mais importante do dia e deixa o olho vermelho nas fotos da tarde.',
  'A sensação de que o óculos é parte de você agora, mas não é a parte que você escolheu.',
  'O momento de se olhar no espelho e pensar: "não é bem essa a minha cara".',
]

const EST_FAQ = [
  {
    q: 'O olho fica vermelho depois da cirurgia? Por quanto tempo?',
    a: 'É comum haver vermelhidão nas primeiras horas e dias após a cirurgia. O tempo e a intensidade variam por técnica e por pessoa. Com LASIK, a recuperação visual é mais rápida e a aparência do olho costuma normalizar em poucos dias. Com PRK, pode levar um pouco mais. Seu médico explicará o que esperar no seu caso específico.',
  },
  {
    q: 'Dói?',
    a: 'Durante a cirurgia, a anestesia é feita com colírio. Você estará acordado, mas sem dor. O desconforto pós-operatório existe e varia por técnica: com PRK, as primeiras 24 a 48 horas costumam ser as mais desconfortáveis. Com LASIK, o desconforto é menor e mais rápido. Isso será detalhado para o seu caso na consulta.',
  },
  {
    q: 'E o olho seco depois? Isso deixa o olho vermelho?',
    a: 'O olho seco temporário após a cirurgia é o efeito colateral mais comum. Na maioria dos casos, é manejado com colírios lubrificantes e melhora nos primeiros meses. Para candidatos com olho seco pré-existente, isso é avaliado antes da indicação. O protocolo do IBR inclui essa avaliação.',
  },
  {
    q: 'Sou candidata mesmo sem ter um grau muito alto?',
    a: 'Sim. A candidatura não depende de ter grau alto. Candidatos com graus baixos a moderados têm, em geral, condições favoráveis para a cirurgia. A avaliação confirma.',
  },
]

const EST_TESTIMONIALS = [
  {
    quote: 'Me sinto livre, com melhor qualidade de vida e muito mais bonita.',
    meta: 'Paciente do IBR — -8 graus de miopia + astigmatismo',
  },
  {
    quote: 'Melhorou minha autoestima e qualidade de vida.',
    meta: 'Paciente do IBR',
  },
]

export default function Estetico() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <>
      <ReducedMotion />
      <PageMeta
        title="Parar de Usar Óculos em São Paulo | Cirurgia Refrativa Estética | IBR"
        description="Cirurgia refrativa para quem quer se reconhecer no espelho e nas fotos, sem óculos ou lente. Avaliação gratuita online — IBR, Dr. Luis Felipe Bortolan."
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <HeroWrap ref={heroRef}>
          <motion.div style={{ y: heroBgY, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <HeroBg /><HeroGrain aria-hidden="true" /><LensArc aria-hidden="true" />
          </motion.div>
          <HeroInner>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Eyebrow $dark>Para quem quer se reconhecer no espelho e nas fotos</Eyebrow>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
                <HeroH1>Seu rosto, sem nada na frente. Se você for candidato, existe um caminho até lá.</HeroH1>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.22}>
                <HeroSub>
                  Você não gosta de aparecer de óculos em foto. Tira o óculos para posar e fica sem
                  enxergar nada. A lente deixa o olho vermelho no fim do dia, justamente quando você
                  mais quer aparecer bem. Não é frescura: enxergar bem e gostar da própria imagem são
                  qualidade de vida. Se você for candidato à cirurgia refrativa, pode haver um caminho
                  para o rosto livre.
                </HeroSub>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.34}>
                <CtaPrimary href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  aria-label="Fazer avaliação gratuita online pelo WhatsApp">
                  Faça sua avaliação gratuita online
                  <ArrowRight size={18} aria-hidden="true" />
                </CtaPrimary>
                <MicroCopy $dark>Grátis e online. O primeiro passo é ver, com critério, se você é candidato.</MicroCopy>
              </motion.div>
            </div>
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0.45}
              style={{ position: 'relative', zIndex: 2 }}>
              <HeroVisual $hasImage>
                <img src="/fotos/estetico.png"
                  alt="Pessoa sem óculos — autoestima e qualidade de vida"
                  loading="eager"
                  onError={e => { e.target.style.display = 'none' }}
                  style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block' }} />
              </HeroVisual>
            </motion.div>
          </HeroInner>
        </HeroWrap>

        {/* ── IDENTIFICAÇÃO — cenas ── */}
        <SectionLight $bg="var(--creme)">
          <Container>
            <Reveal>
              <Eyebrow>Você se reconhece?</Eyebrow>
              <Divider />
              <H2Light $mb="32px">Você se reconhece em alguma dessas situações?</H2Light>
            </Reveal>
            <Reveal delay={0.08}>
              <CenaList>
                {EST_CENAS.map((c, i) => <CenaItem key={i}>{c}</CenaItem>)}
              </CenaList>
            </Reveal>
            <Reveal delay={0.16}>
              <BodyText style={{ maxWidth: '640px', marginTop: '28px' }}>
                <p>Isso não é superficialidade. É a diferença entre se ver e se reconhecer.</p>
              </BodyText>
            </Reveal>
          </Container>
        </SectionLight>

        {/* ── REFRAME ── */}
        <ReframeWrap>
          <Container>
            <ReframeInner>
              <Reveal>
                <ReframeImg>
                  <img src="/fotos/clinica-3.jpg"
                    alt="Recepção IBR — ambiente acolhedor"
                    loading="lazy" />
                </ReframeImg>
              </Reveal>
              <Reveal delay={0.1}>
                <Eyebrow>Reframe</Eyebrow>
                <Divider />
                <H2Light $mb="24px">Querer enxergar bem e gostar do próprio rosto não são coisas separadas.</H2Light>
                <BodyText>
                  <p>
                    Há uma ideia que circula, não muito dita em voz alta, de que se preocupar com a própria
                    aparência é fútil. Que o motivo "certo" para fazer cirurgia refrativa é a produtividade,
                    o esporte, a praticidade.
                  </p>
                  <p>
                    Mas enxergar bem e se sentir bem com a própria imagem são qualidade de vida. Os dois.
                    Quem opera com a motivação de se sentir mais livre no próprio rosto não está sendo
                    superficial. Está tomando uma decisão sobre como quer viver.
                  </p>
                  <p>
                    E como todo investimento de longo prazo, tem um cálculo por baixo: anos de lente
                    descartável, colírio, óculos novo toda vez que o grau muda. Quando somado, o número
                    não é pequeno.
                  </p>
                </BodyText>
              </Reveal>
            </ReframeInner>
          </Container>
        </ReframeWrap>

        {/* ── AUTORIDADE — Plástica Ocular em destaque ── */}
        <DrAutoridade variant="estetico"
          note="A formação em Plástica Ocular pelo Instituto Pedro Ruiz é relevante para pacientes com atenção à região dos olhos: o Dr. Luis tem familiaridade com a anatomia e a estética dessa área que vai além da córnea." />

        {/* ── PROVA SOCIAL ── */}
        <SectionLight $bg="var(--white)">
          <Container>
            <Reveal>
              <Eyebrow>Depoimentos</Eyebrow>
              <H2Light $mb="48px">O que pacientes relatam sobre a experiência.</H2Light>
            </Reveal>
            <TestimonialCards testimonials={EST_TESTIMONIALS} />
            <Reveal delay={0.2}>
              <TestimonialDisclaimer>
                Relatos de sentimento de pacientes do IBR, com consentimento de uso. Não representam
                promessa de resultado estético. Resultados variam conforme avaliação individual.
              </TestimonialDisclaimer>
            </Reveal>
          </Container>
        </SectionLight>

        {/* ── FAQ ── */}
        <FaqSection
          title="O que as pessoas com essa preocupação mais perguntam."
          items={EST_FAQ}
        />

        {/* ── MÉTODO ── */}
        <MetodoPilulaSection />

        {/* ── CTA FINAL ── */}
        <CtaFinal
          ctaLabel="Faça sua avaliação gratuita online"
          microcopy="Grátis e online. O primeiro passo é ver, com critério, se você é candidato."
        />
      </main>

      <Footer />
    </>
  )
}
