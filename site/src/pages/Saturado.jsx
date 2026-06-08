/**
 * IBR — Funil Saturado da Dependência
 * Página 4 · Big Idea "A cirurgia que você já pagou"
 * SEO: cirurgia refrativa São Paulo · quanto custa cirurgia refrativa
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
  FaqSection, CtaFinal, MetodoPilulaSection, PageMeta, breathe,
} from '../components/shared'

const WA_LINK = 'https://wa.me/551150284894'

/* ── Banda hero lifestyle full-bleed (lifestyle-liberdade.png) ── */
const HeroWrapSaturado = styled.section`
  background: var(--navy-deep);
  padding-top: 148px;
  padding-bottom: var(--section-gap);
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  position: relative;
  overflow: hidden;
  min-height: 80vh;
  display: flex;
  align-items: center;
`
const HeroLifestyleBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: 70% center;
    display: block;
    filter: saturate(0.5) brightness(0.38);
  }
  &::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(
      to right,
      rgba(28,38,50,0.97) 0%,
      rgba(28,38,50,0.82) 40%,
      rgba(28,38,50,0.45) 75%,
      rgba(28,38,50,0.22) 100%
    );
  }
`
/* grain + halos idênticos ao hero padrão */
const HeroBgLayer = styled.div`
  position: absolute; inset: 0; pointer-events: none; z-index: 1;
  &::before {
    content: '';
    position: absolute; top: -30%; right: -8%; width: 70%; height: 130%;
    background: radial-gradient(ellipse at 60% 40%, rgba(254,177,97,0.06) 0%, transparent 68%);
    animation: ${breathe} 9s ease-in-out infinite;
    will-change: opacity, transform;
  }
  @media (prefers-reduced-motion: reduce) { &::before { animation: none; } }
`
const HeroContentSat = styled.div`
  max-width: var(--max-width); margin: 0 auto;
  position: relative; z-index: 2;
  max-width: 680px;
`
const HeroH1Sat = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(38px, 5vw, 72px);
  font-weight: 400; color: var(--creme);
  line-height: 1.05; letter-spacing: -2px;
  margin-bottom: 28px;
`

/* ── Bloco ROI / cálculo ── */
const RoiWrap = styled(SectionDark)`background: var(--navy);`
const RoiNumbers = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 48px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`
const RoiCell = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 4px;
  padding: 32px 28px;
`
const RoiValue = styled.p`
  font-family: var(--font-serif);
  font-size: clamp(28px, 3.5vw, 44px);
  color: var(--amber); line-height: 1;
  margin-bottom: 10px; letter-spacing: -0.5px;
`
const RoiDesc = styled.p`
  font-family: var(--font-ui); font-size: 14px;
  color: var(--bege); line-height: 1.6;
`

const SAT_FAQ = [
  {
    q: 'É caro.',
    a: 'Em relação a quê? Em relação a um par de óculos, sim. Em relação à soma de todos os óculos, lentes, soluções e colírios pelos próximos 10, 15, 20 anos, a conta muda. O custo da cirurgia no IBR é personalizado e definido na consulta, após os exames. O IBR parcela em até 10 vezes. A comparação certa não é cirurgia vs. um par de óculos. É cirurgia vs. dependência para o resto da vida.',
  },
  {
    q: 'E se o grau voltar?',
    a: 'Um dos critérios de seleção do IBR é a estabilidade do grau. Operar com grau instável aumenta a probabilidade de regressão. Por isso, candidatos com grau que mudou recentemente precisam aguardar estabilização antes da indicação. Para candidatos com grau estável há pelo menos 1 a 2 anos, a durabilidade do resultado é significativamente melhor.',
  },
  {
    q: 'Dói? Vou estar acordado?',
    a: 'Você estará acordado. A anestesia é feita com colírio. Não há agulha, não há sedação geral. O procedimento dura alguns minutos. A sensação durante é de pressão e luz intensa, não de dor. O desconforto pós-operatório varia por técnica e por paciente. Seu caso será explicado em detalhe pelo Dr. Luis antes da cirurgia.',
  },
  {
    q: 'Meu grau é alto. Consigo operar?',
    a: 'Grau alto não é automaticamente um impedimento. Existem técnicas diferentes para diferentes perfis: LASIK, PRK, lente fácica. A indicação depende da espessura da córnea, do grau e de outros parâmetros que só os exames revelam.',
  },
  {
    q: 'Tenho medo de dar errado.',
    a: 'É um medo legítimo. A cirurgia no olho é um ato sério e precisa ser tratada como tal. Para bom candidato, selecionado com critério, o risco de perda de acuidade visual é baixo. O que protege o paciente não é uma promessa, é a qualidade da avaliação pré-operatória. É por isso que o IBR não vende cirurgia para todo mundo: primeiro avalia se você pode operar.',
  },
]

const SAT_TESTIMONIALS = [
  {
    quote: 'Depois de 29 anos dependendo de óculos e lentes, finalmente fiquei livre dos meus +7 graus de miopia. O único arrependimento foi não ter feito antes.',
    meta: 'Paciente do IBR',
  },
  {
    quote: 'Me sinto livre, com melhor qualidade de vida e muito mais bonita.',
    meta: 'Paciente do IBR — -8 graus de miopia + astigmatismo',
  },
]

export default function Saturado() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <>
      <ReducedMotion />
      <PageMeta
        title="A Cirurgia que Você Já Pagou | Cirurgia Refrativa São Paulo | IBR"
        description="Quanto custa cirurgia refrativa em São Paulo? Em anos de óculos e lentes, você pode já ter pago. Avaliação gratuita online — IBR, Dr. Luis Felipe Bortolan."
      />
      <Header />

      <main>
        {/* ── HERO LIFESTYLE ── */}
        <HeroWrapSaturado ref={heroRef}>
          <motion.div style={{ y: heroBgY, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <HeroLifestyleBg aria-hidden="true">
              <img src="/fotos/lifestyle-liberdade.png"
                alt="" loading="eager" />
            </HeroLifestyleBg>
            <HeroBgLayer />
          </motion.div>

          <HeroContentSat>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <Eyebrow $dark>Para quem usa óculos ou lente há anos e está cansado disso</Eyebrow>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.12}>
              <HeroH1Sat>A cirurgia que você já pagou, e ainda usa óculos.</HeroH1Sat>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.24}>
              <HeroSub style={{ maxWidth: '580px' }}>
                Em 10, 15, 20 anos de óculos e lentes, a conta sobe. Armações, lentes de grau,
                lentes de contato descartáveis, soluções, colírios, consultas de adaptação.
                Somados, na maioria dos casos, você já gastou o valor de uma cirurgia refrativa,
                ou está perto disso. A diferença: óculos é custo eterno. A cirurgia é investimento
                único, se você for candidato.
              </HeroSub>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.36}>
              <CtaPrimary href={WA_LINK} target="_blank" rel="noopener noreferrer"
                aria-label="Fazer avaliação gratuita online pelo WhatsApp">
                Faça sua avaliação gratuita online
                <ArrowRight size={18} aria-hidden="true" />
              </CtaPrimary>
              <MicroCopy $dark>
                Grátis e online. Descubra, sem compromisso, se você é candidato à correção que você já pagou.
              </MicroCopy>
            </motion.div>
          </HeroContentSat>
        </HeroWrapSaturado>

        {/* ── IDENTIFICAÇÃO ── */}
        <SectionLight $bg="var(--creme)">
          <Container>
            <Reveal>
              <Eyebrow>Identificação</Eyebrow>
              <Divider />
              <H2Light $mb="28px">Há quantos anos você depende de óculos ou lente?</H2Light>
            </Reveal>
            <Reveal delay={0.08}>
              <BodyText style={{ maxWidth: '680px' }}>
                <p>O óculos que quebra na semana mais importante do mês.</p>
                <p>A lente que some no fundo da bolsa.</p>
                <p>O estojo de lente que nunca falta na mala de viagem.</p>
                <p>O ressecamento no fim de um dia longo.</p>
                <p>A consulta de adaptação porque "o grau mudou um pouco".</p>
                <p>A armação nova que você precisou porque a anterior ficou velha.</p>
              </BodyText>
            </Reveal>
            <Reveal delay={0.14}>
              <BodyText style={{ maxWidth: '680px', marginTop: '24px' }}>
                <p>
                  Nada disso é caro isolado. Somado, durante décadas, é outra conversa. E além do
                  dinheiro, tem o peso de acordar todo dia e a primeira coisa que você precisa fazer
                  é buscar o óculos na mesa de cabeceira.
                </p>
                <p>
                  Você está cansado disso. Não é a primeira vez que pensa em cirurgia. Mas tem uma
                  dúvida, um medo, uma razão para adiar.
                </p>
              </BodyText>
            </Reveal>
          </Container>
        </SectionLight>

        {/* ── ROI — O CORAÇÃO DA PÁGINA ── */}
        <RoiWrap>
          <Container>
            <Reveal>
              <Eyebrow $dark>O cálculo que a maioria nunca fez</Eyebrow>
              <H2Dark $mb="28px">O cálculo que a maioria das pessoas nunca calcula direito.</H2Dark>
            </Reveal>
            <Reveal delay={0.08}>
              <BodyText $dark style={{ maxWidth: '680px' }}>
                <p>
                  Considere o custo médio de um par de óculos com armação e lentes de qualidade:
                  em torno de R$ 400 a R$ 800. Troca a cada 1 a 2 anos. Considere um kit mensal
                  de lentes descartáveis: entre R$ 60 e R$ 150 por mês. Acrescente colírios
                  lubrificantes, soluções multiuso, consultas periódicas de adaptação.
                </p>
                <p>
                  A cirurgia refrativa no IBR tem custo personalizado, definido após os exames.
                  Mas a lógica do investimento único versus custo recorrente é simples: quem faz
                  a cirurgia no momento certo, para de pagar indefinidamente. O IBR parcela em
                  até 10 vezes.
                </p>
              </BodyText>
            </Reveal>
            <RoiNumbers>
              {[
                { value: 'R$ 400–800', desc: 'par de óculos com lentes de qualidade, trocado a cada 1–2 anos' },
                { value: 'R$ 60–150', desc: 'kit mensal de lentes descartáveis + soluções e colírios' },
                { value: '+ de R$ 10k', desc: 'custo acumulado em 10 anos de dependência na maioria dos casos' },
              ].map(({ value, desc }, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <RoiCell>
                    <RoiValue>{value}</RoiValue>
                    <RoiDesc>{desc}</RoiDesc>
                  </RoiCell>
                </Reveal>
              ))}
            </RoiNumbers>
          </Container>
        </RoiWrap>

        {/* ── AUTORIDADE ── */}
        <DrAutoridade variant="default"
          note="O Dr. Luis é o responsável técnico do IBR. A avaliação vem antes de qualquer indicação cirúrgica — é o que protege o paciente e é o que fundamenta a decisão." />

        {/* ── PROVA SOCIAL — as mais fortes aqui ── */}
        <SectionLight $bg="var(--white)">
          <Container>
            <Reveal>
              <Eyebrow>Quem adiou e depois operou, conta o que sentiu.</Eyebrow>
              <H2Light $mb="48px">O que pacientes dizem sobre o IBR.</H2Light>
            </Reveal>
            <TestimonialCards testimonials={SAT_TESTIMONIALS} />

            <Reveal delay={0.2}>
              <TestimonialDisclaimer>
                Relatos de pacientes do IBR, utilizados com consentimento.
                Resultados variam conforme avaliação individual.
              </TestimonialDisclaimer>
            </Reveal>
          </Container>
        </SectionLight>

        {/* ── FAQ ── */}
        <FaqSection
          title="As dúvidas que fazem as pessoas adiarem por anos."
          items={SAT_FAQ}
        />

        {/* ── MÉTODO ── */}
        <MetodoPilulaSection />

        {/* ── CTA FINAL ── */}
        <CtaFinal
          ctaLabel="Faça sua avaliação gratuita online"
          microcopy="Grátis e online. Descubra, sem compromisso, se você é candidato à correção que você já pagou."
        />
      </main>

      <Footer />
    </>
  )
}
