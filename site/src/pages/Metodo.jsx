/**
 * IBR — Página do Método Correção Definitiva
 * Página 6 · SEO: como funciona cirurgia refrativa · sou candidato cirurgia refrativa
 */

import { useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  ReducedMotion, Reveal, fadeUp, fadeIn, staggerContainer,
  Section, Container, Eyebrow, Divider, CtaPrimary, MicroCopy,
  HeroWrap, HeroBg, HeroGrain, LensArc, HeroInner, HeroH1, HeroSub, HeroVisual,
  H2Light, H2Dark, BodyText, SectionLight, SectionDark,
  DrAutoridade, TestimonialCards, TestimonialDisclaimer,
  FaqSection, CtaFinal, PageMeta, breathe,
} from '../components/shared'

const WA_LINK = 'https://wa.me/551150284894'

/* ── Jornada 5 etapas — layout vertical expandido ── */
const JornadaWrap = styled(SectionLight)`background: var(--creme);`
const EtapasList = styled.div`
  display: flex; flex-direction: column; gap: 3px;
  max-width: 820px;
`
const EtapaItem = styled.div`
  background: var(--white);
  border: 1px solid rgba(44,59,77,0.1);
  border-radius: 5px;
  padding: 36px 40px;
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 24px;
  align-items: start;
  transition: box-shadow 0.25s ease;
  &:hover { box-shadow: 0 8px 28px rgba(44,59,77,0.08); }
  @media (max-width: 640px) { grid-template-columns: 1fr; gap: 12px; padding: 28px 24px; }
`
const EtapaNum = styled.span`
  font-family: var(--font-serif); font-style: italic;
  font-size: 48px; color: rgba(163,81,57,0.2);
  line-height: 1;
`
const EtapaBody = styled.div``
const EtapaTitle = styled.h3`
  font-family: var(--font-ui); font-size: 13px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  color: var(--terra); margin-bottom: 10px;
`
const EtapaText = styled.p`
  font-family: var(--font-ui); font-size: clamp(14px,1.3vw,16px);
  color: var(--navy); line-height: 1.75;
`

/* ── Técnicas — 3 cards ── */
const TecnicasWrap = styled(SectionDark)`background: var(--navy-deep);`
const TecnicasGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 48px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`
const TecnicaCard = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 4px;
  padding: 36px 32px;
  transition: background 0.25s ease, border-color 0.25s ease;
  &:hover { background: rgba(255,255,255,0.055); border-color: rgba(254,177,97,0.18); }
`
const TecnicaLabel = styled.p`
  font-family: var(--font-ui); font-size: 11px; font-weight: 700;
  letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--amber); margin-bottom: 14px;
`
const TecnicaTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: clamp(20px, 2vw, 26px);
  font-weight: 400; color: var(--creme);
  line-height: 1.25; margin-bottom: 14px;
`
const TecnicaBody = styled.p`
  font-family: var(--font-ui); font-size: clamp(14px,1.3vw,16px);
  color: var(--bege); line-height: 1.7;
`
const tecnicaVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22,1,0.36,1] } },
}

/* ── Segurança por critério — seção creme com destaque ── */
const SegurancaWrap = styled(SectionLight)`background: var(--white);`
const SegurancaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
`
const SegurancaImg = styled.div`
  aspect-ratio: 4/3;
  border-radius: 6px; overflow: hidden;
  border: 1px solid rgba(44,59,77,0.08);
  img { width:100%; height:100%; object-fit:cover; display:block; filter:saturate(0.88); }
`

/* ── Acompanhamento faixa navy ── */
const AcompWrap = styled(SectionDark)`background: var(--navy);`
const AcompInner = styled.div`
  max-width: 760px;
`

const METODO_ETAPAS = [
  {
    num: '1',
    title: 'Avaliação gratuita e online',
    text: 'Você entra em contato com o IBR e descreve seu caso: grau aproximado, rotina, dúvidas, medos. A equipe analisa e dá um retorno inicial sobre o que faz sentido para o seu perfil. É gratuita, online, sem deslocamento e sem compromisso com a cirurgia.',
  },
  {
    num: '2',
    title: 'Consulta com exames',
    text: 'Esta é a etapa diagnóstica. Presencial no IBR, inclui exames de mapeamento de córnea (topografia, paquimetria), avaliação da visão e do olho seco, e outros parâmetros que determinam se a cirurgia é possível e qual técnica é a indicada. É aqui que a indicação é construída. A consulta com exames tem custo separado, definido no primeiro contato.',
  },
  {
    num: '3',
    title: 'Plano com o Dr. Luis',
    text: 'Com os exames em mãos, o Dr. Luis apresenta o plano: técnica indicada (LASIK, PRK, lente fácica), data da cirurgia, o que esperar em cada fase, valor total e formas de pagamento. Tudo transparente, antes de qualquer decisão.',
  },
  {
    num: '4',
    title: 'A cirurgia',
    text: 'O procedimento em si, com a técnica definida no plano. Conduzido pelo Dr. Luis Felipe Bortolan, que avaliou, indicou e acompanhará o pós-operatório.',
  },
  {
    num: '5',
    title: 'Pós-operatório acompanhado',
    text: 'Retornos programados com a equipe do IBR até o resultado estabilizar. O acompanhamento não termina na sala de cirurgia.',
  },
]

const METODO_FAQ = [
  {
    q: 'Como sei se sou candidato?',
    a: 'Você não sabe antes dos exames. E é por isso que a avaliação inicial existe: para dar um primeiro sinal sobre o que faz sentido para o seu perfil, antes de qualquer comprometimento. A candidatura definitiva é confirmada na consulta com exames, na etapa 2.',
  },
  {
    q: 'Quanto tempo leva o processo do início ao fim?',
    a: 'Da avaliação inicial até a cirurgia, o processo costuma levar algumas semanas, dependendo da disponibilidade de agenda para os exames e para a cirurgia. A avaliação online pode ser feita hoje.',
  },
  {
    q: 'A avaliação online é confiável para definir se sou candidato?',
    a: 'A avaliação online (etapa 1) é uma triagem inicial. Ela não substitui os exames presenciais. O que ela faz é identificar, com base no que você descreve, se o seu caso tem características que justificam a consulta com exames. Não tomamos nenhuma decisão cirúrgica com base apenas na avaliação online.',
  },
  {
    q: 'Por que a consulta de exames é separada da avaliação inicial?',
    a: 'Porque são coisas diferentes. A avaliação inicial é uma conversa sobre o seu caso: grau, rotina, dúvidas, histórico. A consulta com exames é um procedimento diagnóstico real: topografia de córnea, paquimetria, avaliação de seco, entre outros. Separá-los permite que você entenda o processo antes de investir na etapa diagnóstica.',
  },
  {
    q: 'E se os exames mostrarem que não sou candidato?',
    a: 'Você terá um diagnóstico preciso do seu olho e uma explicação do Dr. Luis sobre o que foi encontrado e quais são as alternativas. Em alguns casos, a contraindicação é temporária (grau instável, por exemplo): quando o grau estabilizar, a indicação pode mudar. Em outros, a contraindicação é permanente para laser, mas a lente fácica pode ser uma opção.',
  },
]

const METODO_TESTIMONIALS = [
  {
    quote: 'Visão límpida e cores vibrantes... no hospital escola que é a FMUSP...',
    meta: 'Paciente do IBR',
  },
  {
    quote: 'Minha recuperação tem sido ótima... não tive problema com olho seco, nem nada do tipo.',
    meta: 'Paciente do IBR',
  },
  {
    quote: 'Um dia pós-cirurgia já consigo ler todas as placas e faixas.',
    meta: 'Paciente do IBR',
  },
]

export default function Metodo() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <>
      <ReducedMotion />
      <PageMeta
        title="Método Correção Definitiva | Como Funciona a Cirurgia Refrativa | IBR São Paulo"
        description="Entenda o Método Correção Definitiva do IBR: avaliação, exames, indicação personalizada e acompanhamento. Cirurgia refrativa em São Paulo com Dr. Luis Felipe Bortolan."
      />
      <Header />

      <main>
        {/* ── HERO — hero-olho.png ── */}
        <HeroWrap ref={heroRef}>
          <motion.div style={{ y: heroBgY, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <HeroBg /><HeroGrain aria-hidden="true" /><LensArc aria-hidden="true" />
          </motion.div>
          <HeroInner>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Eyebrow $dark>Como o IBR decide se você pode operar</Eyebrow>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
                <HeroH1>Método Correção Definitiva: a cirurgia é o último passo, não o primeiro.</HeroH1>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.22}>
                <HeroSub>
                  Muitas clínicas de cirurgia refrativa começam com uma data no calendário. No IBR,
                  começamos com uma pergunta: você é candidato? O Método Correção Definitiva é a
                  jornada diagnóstica que responde essa pergunta antes de qualquer decisão.
                </HeroSub>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.34}>
                <CtaPrimary href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  aria-label="Começar pela avaliação gratuita online pelo WhatsApp">
                  Comece pela avaliação gratuita online
                  <ArrowRight size={18} aria-hidden="true" />
                </CtaPrimary>
                <MicroCopy $dark>
                  O método começa com uma avaliação grátis e online — sem compromisso, só pra entender seu caso.
                </MicroCopy>
              </motion.div>
            </div>
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0.45}
              style={{ position: 'relative', zIndex: 2 }}>
              <HeroVisual $hasImage>
                <img src="/fotos/hero-olho.png"
                  alt="Íris humana em detalhe — a visão que o IBR cuida"
                  loading="eager"
                  style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block' }} />
              </HeroVisual>
            </motion.div>
          </HeroInner>
        </HeroWrap>

        {/* ── POR QUE UM MÉTODO ── */}
        <SectionLight $bg="var(--white)">
          <Container>
            <Reveal>
              <Eyebrow>O problema do mercado</Eyebrow>
              <Divider />
              <H2Light $mb="28px">O problema do mercado: muitas clínicas vendem cirurgia antes de avaliar se você deve operar.</H2Light>
            </Reveal>
            <Reveal delay={0.08}>
              <BodyText style={{ maxWidth: '720px' }}>
                <p>
                  A cirurgia refrativa se tornou um procedimento comum. Isso é bom, porque ela ficou mais
                  acessível e mais segura para os bons candidatos. Mas também criou um problema: a facilidade
                  de acesso levou algumas clínicas a tratar a indicação como formalidade, e a cirurgia como
                  produto de prateleira.
                </p>
                <p>
                  O resultado disso são pacientes operados sem a avaliação adequada, com grau instável, com
                  córnea fina, com olho seco mal manejado. E aí o resultado não é o esperado.
                </p>
                <p>
                  No IBR, a avaliação não é burocracia. É a parte mais importante do processo. Preferimos
                  dizer "você não é candidato hoje" a operar por operar.
                </p>
              </BodyText>
            </Reveal>
          </Container>
        </SectionLight>

        {/* ── JORNADA 5 ETAPAS ── */}
        <JornadaWrap>
          <Container>
            <Reveal>
              <Eyebrow>A jornada</Eyebrow>
              <H2Light $mb="48px">As 5 etapas do Método Correção Definitiva.</H2Light>
            </Reveal>
            <EtapasList>
              {METODO_ETAPAS.map(({ num, title, text }, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <EtapaItem>
                    <EtapaNum>{num}</EtapaNum>
                    <EtapaBody>
                      <EtapaTitle>{title}</EtapaTitle>
                      <EtapaText>{text}</EtapaText>
                    </EtapaBody>
                  </EtapaItem>
                </Reveal>
              ))}
            </EtapasList>
          </Container>
        </JornadaWrap>

        {/* ── TÉCNICAS — indicação personalizada ── */}
        <TecnicasWrap>
          <Container>
            <Reveal>
              <Eyebrow $dark>Indicação personalizada</Eyebrow>
              <H2Dark $mb="16px">Não existe técnica única. Existe a técnica certa para o seu caso.</H2Dark>
            </Reveal>
            <Reveal delay={0.08}>
              <BodyText $dark style={{ maxWidth: '640px' }}>
                <p>LASIK, PRK, lente fácica. Cada técnica tem indicações específicas. A escolha entre essas técnicas não é preferência do paciente nem protocolo fixo da clínica. É a conclusão dos exames aplicada ao seu caso.</p>
              </BodyText>
            </Reveal>
            <TecnicasGrid
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {[
                {
                  label: 'LASIK',
                  title: 'O mais comum — recuperação rápida',
                  body: 'Indicado para a maioria dos candidatos com córnea de espessura adequada e grau dentro dos parâmetros. Recuperação visual em 1–3 dias.',
                },
                {
                  label: 'PRK · Indicação para atletas e córneas finas',
                  title: 'Sem flap — córnea intacta',
                  body: 'Recuperação mais gradual (30–60 dias), mas indicação preferencial para quem tem córnea com espessura mais limitada ou pratica esportes de contato.',
                },
                {
                  label: 'Lente fácica · Graus muito altos',
                  title: 'Implante sem remover tecido da córnea',
                  body: 'Indicada para graus muito altos ou córneas com espessura insuficiente para o laser. É uma opção diferente, não uma segunda opção ruim.',
                },
              ].map(({ label, title, body }, i) => (
                <TecnicaCard key={i} variants={tecnicaVariants}>
                  <TecnicaLabel>{label}</TecnicaLabel>
                  <TecnicaTitle>{title}</TecnicaTitle>
                  <TecnicaBody>{body}</TecnicaBody>
                </TecnicaCard>
              ))}
            </TecnicasGrid>
          </Container>
        </TecnicasWrap>

        {/* ── SEGURANÇA POR CRITÉRIO ── */}
        <SegurancaWrap>
          <Container>
            <SegurancaGrid>
              <Reveal>
                <SegurancaImg>
                  <img src="/fotos/clinica-4.jpg"
                    alt="Sala de exame IBR — equipamento de mapeamento de córnea"
                    loading="lazy" />
                </SegurancaImg>
              </Reveal>
              <Reveal delay={0.1}>
                <Eyebrow>Segurança por critério</Eyebrow>
                <Divider />
                <H2Light $mb="24px">O que protege o paciente não é uma garantia. É a qualidade da avaliação.</H2Light>
                <BodyText>
                  <p>
                    A cirurgia refrativa, para bom candidato selecionado com critério, tem excelente perfil
                    de segurança. Os estudos publicados na literatura oftalmológica mostram taxas de
                    complicação significativas abaixo de 1% para os principais procedimentos em pacientes
                    bem selecionados.
                  </p>
                  <p>
                    Grau instável, córnea fina, ceratocone, olho seco severo: esses são os fatores que, quando
                    não mapeados, aumentam o risco. Quando mapeados, guiam a indicação certa ou a decisão de
                    não operar. O IBR não tem garantia pós-operatória de resultado porque nenhum resultado
                    cirúrgico honesto pode ser prometido de forma absoluta.
                  </p>
                </BodyText>
              </Reveal>
            </SegurancaGrid>
          </Container>
        </SegurancaWrap>

        {/* ── ACOMPANHAMENTO ── */}
        <AcompWrap>
          <Container>
            <AcompInner>
              <Reveal>
                <Eyebrow $dark>Acompanhamento</Eyebrow>
                <Divider $dark />
                <H2Dark $mb="24px">A relação com o IBR não termina na sala de cirurgia.</H2Dark>
              </Reveal>
              <Reveal delay={0.08}>
                <BodyText $dark>
                  <p>
                    Avaliação inicial, exames, plano, cirurgia, pós-operatório: cada etapa é conduzida pelo
                    mesmo médico que viu o seu caso do começo. Não há transferência para outro profissional
                    no meio do processo.
                  </p>
                  <p>
                    O pós-operatório acompanhado inclui retornos programados com o Dr. Luis para monitorar
                    a cicatrização, ajustar o manejo de olho seco se necessário, e verificar que o resultado
                    está se consolidando conforme o esperado.
                  </p>
                </BodyText>
              </Reveal>
            </AcompInner>
          </Container>
        </AcompWrap>

        {/* ── AUTORIDADE — bio completa ── */}
        <DrAutoridade variant="metodo"
          note="O Dr. Luis construiu sua formação inteiramente em instituições de referência em São Paulo. O HC/USP, onde fez o fellowship em Catarata e Refrativa, é o maior hospital universitário da América Latina e um dos centros de formação de especialistas mais exigentes do país." />

        {/* ── PROVA SOCIAL ── */}
        <SectionLight $bg="var(--white)">
          <Container>
            <Reveal>
              <Eyebrow>Depoimentos</Eyebrow>
              <H2Light $mb="48px">O que pacientes dizem sobre o processo.</H2Light>
            </Reveal>
            <TestimonialCards testimonials={METODO_TESTIMONIALS} cols={3} />
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
          title="Perguntas sobre o processo antes de começar."
          items={METODO_FAQ}
        />

        {/* ── CTA FINAL ── */}
        <CtaFinal
          ctaLabel="Comece pela avaliação gratuita online"
          microcopy="O método começa com uma avaliação grátis e online — sem compromisso, só pra entender seu caso."
        />
      </main>

      <Footer />
    </>
  )
}
