/**
 * IBR — Componentes compartilhados entre todas as páginas
 * Exporta: Reveal, Counter, TestimonialCards, DrAutoridade,
 *          primitivas de layout (Section, Container, Eyebrow, Divider,
 *          CtaPrimary, MicroCopy), FAQ, VideoSlot, JornadaSteps
 */

import { useRef, useEffect, useState } from 'react'
import styled, { keyframes, createGlobalStyle } from 'styled-components'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

/* ─────────────────────────────────────────
   REDUCED MOTION  (importar em cada página)
   ───────────────────────────────────────── */
export const ReducedMotion = createGlobalStyle`
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────── */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.55, ease: 'easeOut', delay },
  }),
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

/* ─────────────────────────────────────────
   REVEAL WRAPPER
   ───────────────────────────────────────── */
export function Reveal({ children, delay = 0, variant = 'fadeUp', className, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const variants = variant === 'fadeIn' ? fadeIn : fadeUp
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
   ───────────────────────────────────────── */
export function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  useEffect(() => {
    if (!inView) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setCount(target); return }
    const duration = 1400
    const start = performance.now()
    const step = (ts) => {
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [inView, target])
  return <span ref={ref}>{count.toLocaleString('pt-BR')}{suffix}</span>
}

/* ─────────────────────────────────────────
   LAYOUT PRIMITIVES
   ───────────────────────────────────────── */
export const Section = styled.section`
  padding: var(--section-gap) var(--gutter);
`
export const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`
export const Eyebrow = styled.span`
  display: block;
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 20px;
  color: ${({ $dark }) => ($dark ? 'var(--amber)' : 'var(--terra)')};
`
export const Divider = styled.div`
  width: 48px;
  height: 2px;
  background: ${({ $dark }) => ($dark ? 'var(--amber)' : 'var(--terra)')};
  margin-bottom: 28px;
`
export const CtaPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--amber);
  color: var(--navy-deep);
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 700;
  padding: 16px 28px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
  letter-spacing: 0.2px;
  &:hover {
    background: #ffc47a;
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(254, 177, 97, 0.38);
  }
  &:active { transform: translateY(0); }
  &:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; }
  svg { transition: transform 0.2s; }
  &:hover svg { transform: translateX(4px); }
`
export const MicroCopy = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  color: ${({ $dark }) => ($dark ? 'rgba(201,194,178,0.6)' : 'rgba(44,59,77,0.55)')};
  margin-top: 14px;
`

/* ─────────────────────────────────────────
   HERO SHARED STYLES
   ───────────────────────────────────────── */
export const breathe = keyframes`
  0%   { opacity: 0.55; transform: scale(1); }
  50%  { opacity: 0.75; transform: scale(1.06); }
  100% { opacity: 0.55; transform: scale(1); }
`
export const grainNoise = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10%       { transform: translate(-2%, -1%); }
  30%       { transform: translate(1%, 2%); }
  50%       { transform: translate(-1%, 1%); }
  70%       { transform: translate(2%, -2%); }
  90%       { transform: translate(-1%, 0%); }
`

export const HeroWrap = styled.section`
  background: var(--navy-deep);
  padding-top: 148px;
  padding-bottom: var(--section-gap);
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  position: relative;
  overflow: hidden;
`
export const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  &::before {
    content: '';
    position: absolute;
    top: -30%;
    right: -8%;
    width: 70%;
    height: 130%;
    background: radial-gradient(
      ellipse at 60% 40%,
      rgba(254, 177, 97, 0.07) 0%,
      rgba(163, 81, 57, 0.06) 30%,
      transparent 68%
    );
    animation: ${breathe} 9s ease-in-out infinite;
    will-change: opacity, transform;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    left: -5%;
    width: 55%;
    height: 80%;
    background: radial-gradient(
      ellipse at 30% 70%,
      rgba(44, 59, 77, 0.45) 0%,
      transparent 60%
    );
    animation: ${breathe} 12s ease-in-out infinite reverse;
    will-change: opacity, transform;
  }
`
export const HeroGrain = styled.div`
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.028;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  animation: ${grainNoise} 0.4s steps(1) infinite;
  will-change: transform;
  @media (prefers-reduced-motion: reduce) { animation: none; }
`
export const LensArc = styled.div`
  position: absolute;
  top: 50%;
  right: 8%;
  transform: translateY(-50%);
  width: min(380px, 38vw);
  height: min(380px, 38vw);
  border-radius: 50%;
  border: 1px solid rgba(254, 177, 97, 0.08);
  pointer-events: none;
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    inset: 18%;
    border-radius: 50%;
    border: 1px solid rgba(254, 177, 97, 0.05);
  }
  &::after {
    content: '';
    position: absolute;
    inset: 36%;
    border-radius: 50%;
    border: 1px solid rgba(254, 177, 97, 0.03);
  }
  @media (max-width: 900px) { display: none; }
`
export const HeroInner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  z-index: 2;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`
export const HeroH1 = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(38px, 4.6vw, 66px);
  font-weight: 400;
  color: var(--creme);
  line-height: 1.07;
  letter-spacing: -1.5px;
  margin-bottom: 28px;
`
export const HeroSub = styled.p`
  font-family: var(--font-ui);
  font-size: clamp(15px, 1.5vw, 18px);
  color: var(--bege);
  line-height: 1.75;
  max-width: 540px;
  margin-bottom: 38px;
`
/* HeroVisual — aceita prop $hasImage: com foto usa bordas finas; sem foto mostra gradiente */
export const HeroVisual = styled.div`
  aspect-ratio: 4 / 5;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(254, 177, 97, ${({ $hasImage }) => $hasImage ? '0.15' : '0.1'});
  background: ${({ $hasImage }) => $hasImage ? 'transparent' : 'rgba(255,255,255,0.03)'};

  /* Overlay sutil por cima da foto — casa com a paleta */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $hasImage }) => $hasImage
      ? 'linear-gradient(160deg, rgba(28,38,50,0.18) 0%, rgba(28,38,50,0.08) 40%, rgba(163,81,57,0.06) 100%)'
      : 'none'};
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 900px) {
    aspect-ratio: 3 / 2;
    max-height: 320px;
  }
`

/* ─────────────────────────────────────────
   SECTION HEADINGS (reutilizáveis)
   ───────────────────────────────────────── */
export const H2Dark = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(28px, 3vw, 44px);
  font-weight: 400;
  color: var(--creme);
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: ${({ $mb }) => $mb || '28px'};
`
export const H2Light = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(28px, 3vw, 44px);
  font-weight: 400;
  color: var(--navy-deep);
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: ${({ $mb }) => $mb || '28px'};
`
export const BodyText = styled.div`
  p {
    font-family: var(--font-ui);
    font-size: clamp(15px, 1.5vw, 17px);
    color: ${({ $dark }) => ($dark ? 'var(--bege)' : 'var(--navy)')};
    line-height: 1.75;
    margin-bottom: 18px;
    &:last-child { margin-bottom: 0; }
  }
  strong {
    font-weight: 700;
    color: ${({ $dark }) => ($dark ? 'var(--creme)' : 'var(--navy-deep)')};
  }
`

/* ─────────────────────────────────────────
   SEÇÃO CLARA (creme/white) E ESCURA (navy/navy-deep)
   ───────────────────────────────────────── */
export const SectionLight = styled(Section)`
  background: ${({ $bg }) => $bg || 'var(--creme)'};
`
export const SectionDark = styled(Section)`
  background: ${({ $bg }) => $bg || 'var(--navy)'};
  position: relative;
  overflow: hidden;
`

/* ─────────────────────────────────────────
   DR. AUTORIDADE — componente padronizado
   (headshot placeholder + clinica-5 de fundo + bio)
   ───────────────────────────────────────── */

const AutoridadeWrap = styled(SectionDark)`
  background: var(--navy);
`
const AutoridadeBgImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 42%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: right center;
    filter: saturate(0.7) brightness(0.55);
    display: block;
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      var(--navy) 0%,
      rgba(44,59,77,0.92) 25%,
      rgba(44,59,77,0.55) 60%,
      rgba(44,59,77,0.3) 100%
    );
  }
  @media (max-width: 900px) { display: none; }
`
const AutoridadeInner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 64px;
  align-items: start;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`
/*
  HEADSHOT SLOT — substituir conteúdo interno quando foto chegar:
  <img src="/fotos/dr-luis-bortolan.jpg"
       alt="Dr. Luis Felipe Bortolan — Cirurgião refrativo IBR"
       style={{ width:'100%', height:'100%', objectFit:'cover',
                objectPosition:'center top', borderRadius:'5px' }} />
  Remover ícone + CounterBlock abaixo.
*/
const DrPhotoWrap = styled.div`
  width: 220px;
  height: 274px;
  border-radius: 5px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(254,177,97,0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-shrink: 0;
  overflow: hidden;
  @media (max-width: 768px) { width: 160px; height: 200px; }
`
const CounterBlock = styled.div`text-align: center;`
const CounterNum = styled.p`
  font-family: var(--font-serif);
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 400;
  color: var(--amber);
  line-height: 1;
  letter-spacing: -1px;
`
const CounterLabel = styled.p`
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(201,194,178,0.45);
  margin-top: 8px;
`
const AutoridadeH2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(22px, 2.4vw, 36px);
  font-weight: 400;
  color: var(--creme);
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: 24px;
`
const BioList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`
const BioItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-family: var(--font-ui);
  font-size: clamp(14px, 1.3vw, 16px);
  color: var(--bege);
  line-height: 1.6;
  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--amber);
    flex-shrink: 0;
    margin-top: 7px;
  }
`
const DrNote = styled.p`
  font-family: var(--font-ui);
  font-size: clamp(14px, 1.3vw, 16px);
  color: var(--bege);
  line-height: 1.75;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 20px;
  margin-top: 8px;
`

/** Bloco de autoridade padronizado.
 * @param {{ variant?: 'default'|'atleta'|'estetico'|'metodo', note?: string }} props
 */
export function DrAutoridade({ variant = 'default', note }) {
  const bioExtra = {
    atleta: 'Opera atletas de jiu-jitsu, MMA e boxe com indicação PRK.',
    estetico: 'Fellowship em Plástica Ocular pelo Instituto Pedro Ruiz.',
    metodo: 'Médico formado pela FAMINAS.',
  }
  const noteText = note || 'O Dr. Luis é o responsável técnico do IBR e o especialista que avalia, planeja e acompanha cada caso pessoalmente.'

  return (
    <AutoridadeWrap>
      <AutoridadeBgImage aria-hidden="true">
        <img src="/fotos/clinica-5.jpg" alt="" loading="lazy" />
      </AutoridadeBgImage>
      <Container>
        <Reveal>
          <Eyebrow $dark>Quem lidera o IBR</Eyebrow>
        </Reveal>
        <AutoridadeInner>
          <Reveal>
            <DrPhotoWrap>
              <img src="/logos/icone-branco.png" alt="" aria-hidden="true"
                style={{ width: '56px', opacity: 0.18 }} />
              <CounterBlock>
                <CounterNum aria-label="Mais de 2.000 cirurgias realizadas">
                  <Counter target={2000} suffix="+" />
                </CounterNum>
                <CounterLabel>cirurgias realizadas</CounterLabel>
              </CounterBlock>
            </DrPhotoWrap>
          </Reveal>
          <Reveal delay={0.12}>
            <AutoridadeH2>
              Dr. Luis Felipe Bortolan · CRM 205675 (SP) · RQE 148991
            </AutoridadeH2>
            <BioList>
              {variant === 'metodo' && <BioItem>Médico formado pela FAMINAS.</BioItem>}
              <BioItem>Fellowship em Catarata e Cirurgia Refrativa pelo Hospital das Clínicas da USP.</BioItem>
              <BioItem>Residência em Oftalmologia pelo Instituto Suel Abujamra.</BioItem>
              {(variant === 'estetico' || variant === 'metodo') && (
                <BioItem>Fellowship em Plástica Ocular pelo Instituto Pedro Ruiz.</BioItem>
              )}
              <BioItem>Mais de 2.000 cirurgias refrativas realizadas.</BioItem>
              {(variant === 'atleta' || variant === 'metodo') && (
                <BioItem>Opera atletas de jiu-jitsu, MMA e boxe com indicação PRK.</BioItem>
              )}
            </BioList>
            <DrNote>{noteText}</DrNote>
          </Reveal>
        </AutoridadeInner>
      </Container>
    </AutoridadeWrap>
  )
}

/* ─────────────────────────────────────────
   TESTIMONIAL CARDS  (reutilizável)
   ───────────────────────────────────────── */
const TestimoniaisGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ $cols }) => $cols === 3 ? 'repeat(3,1fr)' : '1fr 1fr'};
  gap: 24px;
  @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`
const TestimonialCard = styled.blockquote`
  background: var(--creme);
  border-radius: 5px;
  padding: 44px 40px 36px;
  position: relative;
  border-bottom: 3px solid var(--terra);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(44,59,77,0.1);
  }
`
const QuoteMark = styled.span`
  font-family: var(--font-serif);
  font-size: 80px;
  line-height: 0.6;
  color: var(--terra);
  opacity: 0.18;
  display: block;
  margin-bottom: 16px;
  user-select: none;
`
const TestimonialQuote = styled.p`
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(16px, 1.6vw, 20px);
  color: var(--navy-deep);
  line-height: 1.55;
  margin-bottom: 22px;
`
const TestimonialMeta = styled.p`
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(44,59,77,0.4);
`
export const TestimonialDisclaimer = styled.p`
  font-family: var(--font-ui);
  font-size: 12px;
  font-style: italic;
  color: rgba(44,59,77,0.38);
  margin-top: 28px;
`

/** @param {{ testimonials: Array<{quote:string,meta?:string}>, cols?: 2|3 }} */
export function TestimonialCards({ testimonials, cols = 2 }) {
  return (
    <TestimoniaisGrid $cols={cols}>
      {testimonials.map(({ quote, meta }, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <TestimonialCard>
            <QuoteMark aria-hidden="true">"</QuoteMark>
            <TestimonialQuote>{quote}"</TestimonialQuote>
            <TestimonialMeta>{meta || 'Paciente do IBR'}</TestimonialMeta>
          </TestimonialCard>
        </Reveal>
      ))}
    </TestimoniaisGrid>
  )
}

/* ─────────────────────────────────────────
   VIDEO SLOT placeholder  (Saturado)
   ───────────────────────────────────────── */
const VideoSlotWrap = styled.div`
  aspect-ratio: 16 / 9;
  background: rgba(28,38,50,0.06);
  border: 1px solid rgba(44,59,77,0.12);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  overflow: hidden;

  /* ícone play */
  &::before {
    content: '';
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: rgba(254,177,97,0.12);
    border: 1px solid rgba(254,177,97,0.25);
    position: absolute;
  }
`
const VideoSlotLabel = styled.p`
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(44,59,77,0.3);
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  text-align: center;
`
const PlayIcon = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 0 10px 18px;
  border-color: transparent transparent transparent rgba(254,177,97,0.5);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-44%, -50%);
`

/** Placeholder de vídeo-depoimento — substituir pelo embed real */
export function VideoSlot({ label = 'Depoimento em vídeo — inserir embed' }) {
  return (
    <VideoSlotWrap role="img" aria-label={label}>
      <PlayIcon aria-hidden="true" />
      <VideoSlotLabel>{label}</VideoSlotLabel>
      {/* SUBSTITUIR por: <iframe src="..." allow="autoplay; fullscreen" ... />
          ou <video src="/videos/depoimento-1.mp4" controls poster="..." />
          Manter proporção 16/9 com aspect-ratio no wrapper */}
    </VideoSlotWrap>
  )
}

/* ─────────────────────────────────────────
   JORNADA STEPS  (CTA final de todas as páginas)
   ───────────────────────────────────────── */
const JornadaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  margin-bottom: 60px;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 0; }
`
const JornadaStep = styled.div`
  padding: 28px 24px;
  border-right: 1px solid rgba(255,255,255,0.07);
  &:last-child { border-right: none; }
  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding: 24px 0;
    &:last-child { border-bottom: none; }
  }
`
const JornadaNum = styled.span`
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 36px;
  color: rgba(254,177,97,0.2);
  display: block;
  margin-bottom: 12px;
  line-height: 1;
`
const JornadaTitle = styled.p`
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 10px;
`
const JornadaBody = styled.p`
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--bege);
  line-height: 1.65;
`
const JORNADA_STEPS = [
  { title: 'Avaliação online', body: 'Grátis, online e sem compromisso. Você conta o seu caso, a equipe do IBR analisa.' },
  { title: 'Consulta com exames', body: 'Mapeamento de córnea e visão para ver se a cirurgia é possível.' },
  { title: 'Plano com o Dr. Luis', body: 'Técnica, data, forma de pagamento. Tudo definido junto.' },
  { title: 'A cirurgia', body: 'Conduzida pelo Dr. Luis Felipe Bortolan, que avaliou e acompanhará o pós-op.' },
  { title: 'Pós-operatório', body: 'Retornos e suporte até o resultado estabilizar.' },
]

const CtaFinalWrap = styled(Section)`
  background: var(--navy-deep);
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(ellipse, rgba(254,177,97,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`
const CtaFinalH2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(28px, 3vw, 44px);
  font-weight: 400;
  color: var(--creme);
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: 52px;
`
const CtaFinalCenter = styled.div`text-align: center;`

const WA_LINK = 'https://wa.me/551150284894'

/** Bloco CTA final padronizado com jornada 5 passos */
export function CtaFinal({ ctaLabel = 'Faça sua avaliação gratuita online', microcopy = 'Grátis, online e sem compromisso. O primeiro passo é entender se você é candidato.' }) {
  return (
    <CtaFinalWrap>
      <Container>
        <Reveal>
          <Eyebrow $dark>Próximos passos</Eyebrow>
          <CtaFinalH2>Como funciona o caminho até a visão livre.</CtaFinalH2>
        </Reveal>
        <JornadaGrid>
          {JORNADA_STEPS.map(({ title, body }, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <JornadaStep>
                <JornadaNum>{i + 1}</JornadaNum>
                <JornadaTitle>{title}</JornadaTitle>
                <JornadaBody>{body}</JornadaBody>
              </JornadaStep>
            </Reveal>
          ))}
        </JornadaGrid>
        <Reveal delay={0.15}>
          <CtaFinalCenter>
            <CtaPrimary
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fazer avaliação gratuita online pelo WhatsApp"
            >
              {ctaLabel}
              <ArrowRight size={18} aria-hidden="true" />
            </CtaPrimary>
            <MicroCopy $dark style={{ textAlign: 'center', marginTop: '16px' }}>
              {microcopy}
            </MicroCopy>
          </CtaFinalCenter>
        </Reveal>
      </Container>
    </CtaFinalWrap>
  )
}

/* ─────────────────────────────────────────
   FAQ ACCORDION
   ───────────────────────────────────────── */
const FaqWrap = styled(SectionLight)`
  background: var(--white);
`
const FaqList = styled.div`
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`
const FaqItem = styled.div`
  border: 1px solid rgba(44,59,77,0.1);
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.2s;
  &:hover { border-color: rgba(44,59,77,0.2); }
`
const FaqQ = styled.button`
  width: 100%;
  text-align: left;
  padding: 20px 24px;
  font-family: var(--font-ui);
  font-size: clamp(14px, 1.3vw, 16px);
  font-weight: 700;
  color: var(--navy-deep);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  transition: color 0.2s;
  &:hover { color: var(--terra); }
  svg {
    flex-shrink: 0;
    transition: transform 0.25s ease;
    opacity: 0.5;
  }
  &[aria-expanded='true'] svg { transform: rotate(180deg); opacity: 0.8; }
`
const FaqA = styled.div`
  overflow: hidden;
  max-height: ${({ $open }) => $open ? '600px' : '0'};
  transition: max-height 0.35s cubic-bezier(0.22,1,0.36,1);
`
const FaqAInner = styled.div`
  padding: 0 24px 20px;
  font-family: var(--font-ui);
  font-size: clamp(14px, 1.3vw, 16px);
  color: var(--navy);
  line-height: 1.75;
  border-top: 1px solid rgba(44,59,77,0.06);
  padding-top: 16px;
`

function FaqItemComponent({ q, a }) {
  const [open, setOpen] = useState(false)
  const id = q.slice(0, 20).replace(/\s/g, '-').toLowerCase()
  return (
    <FaqItem>
      <FaqQ
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={`faq-${id}`}
      >
        {q}
        <ChevronDown size={18} aria-hidden="true" />
      </FaqQ>
      <FaqA $open={open} id={`faq-${id}`} role="region">
        <FaqAInner>{a}</FaqAInner>
      </FaqA>
    </FaqItem>
  )
}

/** @param {{ items: Array<{q:string, a:string}>, title?: string, $dark?: boolean }} */
export function FaqSection({ items, title = 'Perguntas frequentes' }) {
  return (
    <FaqWrap>
      <Container>
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <H2Light $mb="40px">{title}</H2Light>
        </Reveal>
        <FaqList>
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <FaqItemComponent {...item} />
            </Reveal>
          ))}
        </FaqList>
      </Container>
    </FaqWrap>
  )
}

/* ─────────────────────────────────────────
   MÉTODO PÍLULA (link para /metodo)
   ───────────────────────────────────────── */
import { Link } from 'react-router-dom'

const MetodoPilula = styled(SectionLight)`
  padding-top: 64px;
  padding-bottom: 64px;
`
const PilulaInner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: center;
  border: 1px solid rgba(44,59,77,0.1);
  border-radius: 6px;
  padding: 44px 52px;
  background: var(--white);
  transition: box-shadow 0.3s ease;
  &:hover { box-shadow: 0 8px 32px rgba(44,59,77,0.08); }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 32px 28px;
  }
`
const PilulaH2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(20px, 2.2vw, 30px);
  font-weight: 400;
  color: var(--navy-deep);
  line-height: 1.2;
  letter-spacing: -0.3px;
  margin-bottom: 12px;
`
const PilulaP = styled.p`
  font-family: var(--font-ui);
  font-size: clamp(14px, 1.3vw, 16px);
  color: var(--navy);
  line-height: 1.75;
  max-width: 540px;
`
const PilulaLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 700;
  color: var(--terra);
  border: 2px solid var(--terra);
  padding: 13px 24px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.22s, color 0.22s, transform 0.18s;
  white-space: nowrap;
  flex-shrink: 0;
  &:hover { background: var(--terra); color: var(--white); transform: translateY(-2px); }
  &:focus-visible { outline: 2px solid var(--terra); outline-offset: 3px; }
  svg { transition: transform 0.2s; }
  &:hover svg { transform: translateX(3px); }
`

export function MetodoPilulaSection() {
  return (
    <MetodoPilula>
      <Container>
        <Reveal>
          <PilulaInner>
            <div>
              <Eyebrow style={{ marginBottom: '12px' }}>O Método</Eyebrow>
              <PilulaH2>Método Correção Definitiva: a avaliação vem antes da cirurgia.</PilulaH2>
              <PilulaP>
                No IBR, a gente não começa com uma data no calendário. Começa
                com uma pergunta: você é candidato? A cirurgia é o último
                passo, não o primeiro.
              </PilulaP>
            </div>
            <PilulaLink to="/metodo" aria-label="Entender como funciona o Método Correção Definitiva">
              Entender o Método
              <ArrowRight size={16} aria-hidden="true" />
            </PilulaLink>
          </PilulaInner>
        </Reveal>
      </Container>
    </MetodoPilula>
  )
}

/* ─────────────────────────────────────────
   IDENTIFICAÇÃO / DORES — lista de bullets em fundo claro
   ───────────────────────────────────────── */
const DorList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 680px;
`
const DorItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  font-family: var(--font-ui);
  font-size: clamp(15px, 1.4vw, 17px);
  color: var(--navy);
  line-height: 1.65;
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--terra);
    flex-shrink: 0;
    margin-top: 8px;
  }
`

export function DorSection({ eyebrow, title, items, body }) {
  return (
    <SectionLight $bg="var(--creme)">
      <Container>
        <Reveal>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <H2Light $mb="32px">{title}</H2Light>
        </Reveal>
        {body && (
          <Reveal delay={0.08}>
            <BodyText><p>{body}</p></BodyText>
          </Reveal>
        )}
        {items && (
          <Reveal delay={0.1}>
            <DorList>
              {items.map((item, i) => <DorItem key={i}>{item}</DorItem>)}
            </DorList>
          </Reveal>
        )}
      </Container>
    </SectionLight>
  )
}

/* ─────────────────────────────────────────
   MECANISMO / VIRAMENTO — seção escura com texto rico
   ───────────────────────────────────────── */
const MecanismoH2 = styled(H2Dark)`margin-bottom: 28px;`

export function MecanismoSection({ eyebrow, title, children, $bg }) {
  return (
    <SectionDark $bg={$bg || 'var(--navy-deep)'}>
      <Container>
        <Reveal>
          {eyebrow && <Eyebrow $dark>{eyebrow}</Eyebrow>}
          <MecanismoH2>{title}</MecanismoH2>
        </Reveal>
        <Reveal delay={0.08}>
          <BodyText $dark style={{ maxWidth: '760px' }}>
            {children}
          </BodyText>
        </Reveal>
      </Container>
    </SectionDark>
  )
}

/* ─────────────────────────────────────────
   PAGE META HELPER  (title + description via document)
   ───────────────────────────────────────── */
export function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [title, description])
  return null
}
