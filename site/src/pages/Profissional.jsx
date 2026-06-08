/**
 * IBR — Funil Profissional de Tela Pesada
 * Página 3 · SEO: cirurgia refrativa São Paulo profissional TI
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

/* ── Grid identificação ── */
const IdentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
`
const ProfissaoCard = styled.div`
  background: var(--white);
  border: 1px solid rgba(44,59,77,0.1);
  border-radius: 5px;
  padding: 28px 32px;
  margin-bottom: 16px;
  transition: box-shadow 0.25s ease;
  &:hover { box-shadow: 0 8px 24px rgba(44,59,77,0.08); }
  &:last-child { margin-bottom: 0; }
`
const ProfissaoLabel = styled.p`
  font-family: var(--font-ui); font-size: 11px; font-weight: 700;
  letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--terra); margin-bottom: 10px;
`
const ProfissaoBody = styled.p`
  font-family: var(--font-ui); font-size: clamp(14px,1.3vw,16px);
  color: var(--navy); line-height: 1.7;
`

/* ── ROI duplo ── */
const RoiGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 40px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`
const RoiCard = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 5px;
  padding: 32px 28px;
`
const RoiTitle = styled.h3`
  font-family: var(--font-ui); font-size: 12px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  color: var(--amber); margin-bottom: 16px;
`
const RoiBody = styled.p`
  font-family: var(--font-ui); font-size: clamp(14px,1.3vw,16px);
  color: var(--bege); line-height: 1.75;
`

const PROF_FAQ = [
  {
    q: 'Quanto tempo fico fora do trabalho depois da cirurgia?',
    a: 'Depende da técnica e do seu caso. Com LASIK, muitos pacientes retornam às atividades normais em 1 a 3 dias. Com PRK, a recuperação visual é mais gradual. Para trabalho em tela, a principal orientação é reduzir a carga nos primeiros dias e usar os colírios prescritos. Seu plano de recuperação será detalhado pelo Dr. Luis antes da cirurgia.',
  },
  {
    q: 'Vou enxergar bem de perto depois? E em tela?',
    a: 'A cirurgia refrativa laser corrige a visão de longe. A visão de perto para trabalho em tela (distância intermediária) costuma ser preservada em adultos jovens e de meia-idade. A partir dos 40 anos, a presbiopia pode coexistir com a cirurgia. Isso é avaliado individualmente na consulta.',
  },
  {
    q: 'Meu olho já resseca com a lente. Após a cirurgia fica pior?',
    a: 'O olho seco é uma das avaliações centrais no protocolo do IBR para candidatos de tela pesada. Grau leve a moderado não descarta a cirurgia, mas influencia a técnica indicada e o manejo pós-operatório. Casos severos precisam de avaliação e tratamento prévio. O mapeamento disso faz parte dos exames.',
  },
  {
    q: 'Vale a pena financeiramente?',
    a: 'A resposta depende do quanto você gasta hoje com óculos, lentes e colírios por ano, e de quanto tempo você pretende continuar usando. Para a maioria dos candidatos em longa dependência, o cálculo favorece a cirurgia em 5 a 10 anos. O IBR não coloca preço fixo no site porque o valor é personalizado após os exames.',
  },
  {
    q: 'Sou candidato mesmo com grau alto?',
    a: 'Grau alto não descarta automaticamente a cirurgia. Existem técnicas diferentes (LASIK, PRK, lente fácica) para diferentes perfis de grau e córnea. A indicação exata depende dos exames. É para isso que a avaliação existe.',
  },
]

const PROF_TESTIMONIALS = [
  {
    quote: 'Visão límpida e cores vibrantes... no hospital escola que é a FMUSP...',
    meta: 'Paciente do IBR',
  },
  {
    quote: 'Um dia pós-cirurgia já consigo ler todas as placas e faixas.',
    meta: 'Paciente do IBR',
  },
  {
    quote: 'Minha recuperação tem sido ótima... não tive problema com olho seco, nem nada do tipo.',
    meta: 'Paciente do IBR',
  },
]

export default function Profissional() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <>
      <ReducedMotion />
      <PageMeta
        title="Cirurgia Refrativa São Paulo para Profissionais de Tela | IBR"
        description="Cirurgia refrativa em São Paulo para quem passa 8–12h em frente a telas. Avaliação gratuita online — IBR, Dr. Luis Felipe Bortolan, CRM 205675 (SP)."
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
                <Eyebrow $dark>Para quem a visão é ferramenta de trabalho</Eyebrow>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
                <HeroH1>Cirurgia refrativa em São Paulo para quem passa o dia na frente de telas.</HeroH1>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.22}>
                <HeroSub>
                  Você não tem 8 horas por dia de tela. Você tem 10, 12, às vezes mais. No fim do dia,
                  os olhos ardem, a lente resseca, o óculos marca o nariz. Sua visão é a principal
                  ferramenta do seu trabalho, e ela está carregando um peso desnecessário. Se você for
                  candidato, existe uma correção para isso.
                </HeroSub>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.34}>
                <CtaPrimary href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  aria-label="Fazer avaliação gratuita online pelo WhatsApp">
                  Faça sua avaliação gratuita online
                  <ArrowRight size={18} aria-hidden="true" />
                </CtaPrimary>
                <MicroCopy $dark>Online e sem sair do trabalho. O primeiro passo é saber se você é candidato.</MicroCopy>
              </motion.div>
            </div>
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0.45}
              style={{ position: 'relative', zIndex: 2 }}>
              <HeroVisual $hasImage>
                <img src="/fotos/profissional.png"
                  alt="Profissional em frente a telas — visão como ferramenta de trabalho"
                  loading="eager"
                  onError={e => { e.target.style.display = 'none' }}
                  style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block' }} />
              </HeroVisual>
            </motion.div>
          </HeroInner>
        </HeroWrap>

        {/* ── IDENTIFICAÇÃO POR PROFISSÃO ── */}
        <SectionLight $bg="var(--creme)">
          <Container>
            <Reveal>
              <Eyebrow>Isso soa familiar?</Eyebrow>
              <H2Light $mb="40px">Você se reconhece em alguma dessas situações?</H2Light>
            </Reveal>
            <IdentGrid>
              <Reveal delay={0.05}>
                <div>
                  {[
                    {
                      label: 'Desenvolvedor / TI',
                      body: 'Três monitores na frente, código o dia inteiro. O óculos marca o nariz depois das 14h, a lente começa a incomodar perto das 17h.',
                    },
                    {
                      label: 'Advogado / Finanças',
                      body: '12 horas lendo contrato ou planilha. A lente que resseca na última hora antes da audiência. O óculos que embaça quando você põe a máscara para entrar na sala.',
                    },
                    {
                      label: 'Médico / Dentista',
                      body: 'Óculos sob a máscara no centro cirúrgico, a lente que te deixa ansioso durante um procedimento longo, o ritual diário de colírio lubrificante.',
                    },
                  ].map((c, i) => (
                    <ProfissaoCard key={i}>
                      <ProfissaoLabel>{c.label}</ProfissaoLabel>
                      <ProfissaoBody>{c.body}</ProfissaoBody>
                    </ProfissaoCard>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ aspectRatio: '3/2', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(44,59,77,0.08)' }}>
                    <img src="/fotos/clinica-8.jpg" alt="IBR — Instituto Brasileiro de Refrativa"
                      loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block', filter:'saturate(0.9)' }} />
                  </div>
                  <BodyText>
                    <p>
                      Cada uma dessas situações tem uma solução no papel. Nenhuma delas é "tomar mais colírio".
                    </p>
                  </BodyText>
                </div>
              </Reveal>
            </IdentGrid>
          </Container>
        </SectionLight>

        {/* ── ROI DUPLO ── */}
        <SectionDark $bg="var(--navy-deep)">
          <Container>
            <Reveal>
              <Eyebrow $dark>O argumento que a maioria nunca calcula</Eyebrow>
              <H2Dark $mb="16px">Dois argumentos que a maioria das pessoas nunca calcula direito.</H2Dark>
            </Reveal>
            <RoiGrid>
              <Reveal delay={0.08}>
                <RoiCard>
                  <RoiTitle>O argumento financeiro</RoiTitle>
                  <RoiBody>
                    Somar o custo de óculos graduados, lentes descartáveis mensais, soluções, colírios e
                    consultas de adaptação ao longo de 10 ou 15 anos resulta, na maioria dos casos, em um
                    valor que se aproxima ou supera o custo de uma cirurgia refrativa. A diferença: óculos
                    e lente são custo recorrente, todo mês, todo ano, para o resto da vida. A cirurgia é
                    investimento único, se a indicação for correta.
                  </RoiBody>
                </RoiCard>
              </Reveal>
              <Reveal delay={0.16}>
                <RoiCard style={{ borderColor: 'rgba(254,177,97,0.18)' }}>
                  <RoiTitle>O argumento de produtividade</RoiTitle>
                  <RoiBody>
                    Olho seco no fim do dia não é só desconforto. É perda de foco. É a sensação de que você
                    está forçando para terminar algo que deveria ser fácil. É chegar em casa com os olhos
                    vermelhos e cansados quando ainda tinha trabalho a fazer. Profissionais que operam com
                    o candidato certo relatam uma diferença de conforto no trabalho que não é pequena.
                  </RoiBody>
                </RoiCard>
              </Reveal>
            </RoiGrid>
          </Container>
        </SectionDark>

        {/* ── AUTORIDADE ── */}
        <DrAutoridade variant="default"
          note="O Dr. Luis avalia, opera e acompanha. Para profissionais de tela pesada, a avaliação de olho seco pré-existente é parte central do protocolo." />

        {/* ── PROVA SOCIAL ── */}
        <SectionLight $bg="var(--white)">
          <Container>
            <Reveal>
              <Eyebrow>Depoimentos</Eyebrow>
              <H2Light $mb="48px">O que pacientes dizem.</H2Light>
            </Reveal>
            <TestimonialCards testimonials={PROF_TESTIMONIALS} cols={3} />
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
          title="As perguntas que todo profissional de tela faz."
          items={PROF_FAQ}
        />

        {/* ── MÉTODO ── */}
        <MetodoPilulaSection />

        {/* ── CTA FINAL ── */}
        <CtaFinal
          ctaLabel="Faça sua avaliação gratuita online"
          microcopy="Online e sem sair do trabalho. O primeiro passo é saber se você é candidato."
        />
      </main>

      <Footer />
    </>
  )
}
