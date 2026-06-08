/**
 * IBR — Home v3 (redesign visual)
 * Feedback do cliente aplicado:
 *   1. Hero: Dr. + olho + SP composto (dr-hero.jpg focal, sp-skyline duotone, olho acento)
 *   2. Sobre: imagem 100% largura + galeria 4 fotos clinica
 *   3. Autoridade: eyebrow "Quem vai te operar" + dr-headshot.jpg + Instagram + imprensa
 *   4. Soluções: faixa tecnologia + 4 cards com imagem no topo
 *   5. Método: banner forte em destaque (navy-deep + amber)
 *   6. Sem Propósito → FAQ + Localização com mapa embed
 *   7. Depoimentos: cards estilo review com 5 estrelas
 *   8. Jornada: stepper animado com linha de progresso
 * Header/Footer: global, aplicado em todos os pages
 */

import { useRef, useEffect, useState } from 'react'
import styled, { keyframes, createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, ChevronDown, Star, ExternalLink } from 'lucide-react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

const WA_LINK = 'https://wa.me/551150284894'
const IG_DR   = 'https://www.instagram.com/drluisfelipebortolan'
const VIRGULA_LINK = 'https://virgula.me/saude/dr-luis-felipe-bortolan-explica-por-que-ed-sheeran-ainda-usa-oculos-mesmo-apos-cirurgia-refrativa/'

/* ============================================================
   REDUCED MOTION
   ============================================================ */
const ReducedMotion = createGlobalStyle`
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`

/* ============================================================
   ANIMATION VARIANTS
   ============================================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.52, ease: 'easeOut', delay },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/* ============================================================
   SCROLL REVEAL — opacity nunca vai a 0 total no DOM;
   inicia em 0.12 para que o conteúdo seja leve mas presente.
   ============================================================ */
function Reveal({ children, delay = 0, className, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
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

/* ============================================================
   ANIMATED COUNTER
   ============================================================ */
function Counter({ target, suffix = '' }) {
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

/* Ícone externo inline para o card de imprensa */
const ExternalLinkIcon = (props) => (
  <ExternalLink size={13} strokeWidth={2.5} {...props} />
)

/* ============================================================
   KEYFRAMES
   ============================================================ */
const breathe = keyframes`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50%        { opacity: 0.75; transform: scale(1.06); }
`
const grainNoise = keyframes`
  0%, 100% { transform: translate(0,0); }
  10%       { transform: translate(-2%,-1%); }
  30%       { transform: translate(1%,2%); }
  50%       { transform: translate(-1%,1%); }
  70%       { transform: translate(2%,-2%); }
  90%       { transform: translate(-1%,0%); }
`
const stepProgress = keyframes`
  from { width: 0; }
  to   { width: 100%; }
`

/* ============================================================
   PRIMITIVES
   ============================================================ */
const Section = styled.section`
  padding: var(--section-gap) var(--gutter);
`
const Container = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`
const Eyebrow = styled.span`
  display: block;
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 20px;
  color: ${({ $dark }) => ($dark ? 'var(--amber)' : 'var(--terra)')};
`
const Divider = styled.div`
  width: 48px; height: 2px;
  background: ${({ $dark }) => ($dark ? 'var(--amber)' : 'var(--terra)')};
  margin-bottom: 28px;
`
const CtaPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--amber);
  color: var(--navy-deep);
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 800;
  padding: 17px 32px;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
  letter-spacing: 0.2px;

  &:hover {
    background: #ffca80;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(254, 177, 97, 0.42);
  }
  &:active { transform: translateY(0); }
  &:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; }
  svg { transition: transform 0.2s; }
  &:hover svg { transform: translateX(4px); }
`
const MicroCopy = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  color: ${({ $dark }) => ($dark ? 'rgba(201,194,178,0.55)' : 'rgba(44,59,77,0.5)')};
  margin-top: 14px;
`

/* ============================================================
   ─── 1. HERO ─────────────────────────────────────────────
   Composição: sp-skyline.jpg bg (duotone navy) + dr-hero.jpg
   focal direita + hero-olho.png overlay acento canto superior.
   ============================================================ */
const HeroWrap = styled.section`
  background: var(--navy-deep);
  padding-top: 152px;
  padding-bottom: var(--section-gap);
  padding-left: var(--gutter);
  padding-right: var(--gutter);
  position: relative;
  overflow: hidden;
  min-height: 92vh;
  display: flex;
  align-items: center;
`
/* Skyline de São Paulo como fundo — duotone navy tratado via filter */
const HeroSkylineBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 60%;
    display: block;
    filter: saturate(0.15) brightness(0.38) sepia(0.25);
  }

  /* Gradiente sobre a skyline — faz o merge com o resto */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(28,38,50,0.92) 0%,
      rgba(28,38,50,0.75) 50%,
      rgba(28,38,50,0.55) 100%
    );
  }
`
/* Halos de lente — mantidos como camada de profundidade */
const HeroBg = styled.div`
  position: absolute; inset: 0; pointer-events: none; z-index: 1;
  &::before {
    content: ''; position: absolute;
    top: -30%; right: -8%; width: 70%; height: 130%;
    background: radial-gradient(ellipse at 60% 40%,
      rgba(254,177,97,0.06) 0%, rgba(163,81,57,0.05) 30%, transparent 68%);
    animation: ${breathe} 9s ease-in-out infinite;
    will-change: opacity,transform;
  }
  &::after {
    content: ''; position: absolute;
    bottom: -10%; left: -5%; width: 55%; height: 80%;
    background: radial-gradient(ellipse at 30% 70%,
      rgba(44,59,77,0.5) 0%, transparent 60%);
    animation: ${breathe} 12s ease-in-out infinite reverse;
    will-change: opacity,transform;
  }
`
const HeroGrain = styled.div`
  position: absolute; inset: -50%;
  width: 200%; height: 200%;
  pointer-events: none; z-index: 2;
  opacity: 0.022;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  animation: ${grainNoise} 0.4s steps(1) infinite;
  will-change: transform;
  @media (prefers-reduced-motion: reduce) { animation: none; }
`
/* Arco de lente — detalhe geométrico */
const LensArc = styled.div`
  position: absolute; top: 50%; right: 7%;
  transform: translateY(-50%);
  width: min(340px,34vw); height: min(340px,34vw);
  border-radius: 50%;
  border: 1px solid rgba(254,177,97,0.07);
  pointer-events: none; z-index: 3;
  &::before {
    content: ''; position: absolute; inset: 18%; border-radius: 50%;
    border: 1px solid rgba(254,177,97,0.04);
  }
  &::after {
    content: ''; position: absolute; inset: 36%; border-radius: 50%;
    border: 1px solid rgba(254,177,97,0.025);
  }
  @media (max-width: 900px) { display: none; }
`
const HeroInner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  position: relative;
  z-index: 4;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 44px;
  }
`
const HeroH1 = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(38px,4.4vw,64px);
  font-weight: 400;
  color: var(--creme);
  line-height: 1.07;
  letter-spacing: -1.5px;
  margin-bottom: 28px;
`
const HeroSub = styled.p`
  font-family: var(--font-ui);
  font-size: clamp(15px,1.5vw,18px);
  color: var(--bege);
  line-height: 1.78;
  max-width: 540px;
  margin-bottom: 40px;
`
/* Coluna visual direita do Hero — composição Dr. + olho acento */
const HeroVisualCol = styled.div`
  position: relative;
`
/* Foto principal do Dr. */
const HeroDrFrame = styled.div`
  aspect-ratio: 3/4;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(254,177,97,0.14);
  box-shadow: 0 32px 80px rgba(0,0,0,0.45);

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    filter: brightness(0.94);
  }

  /* Overlay sutil inferior — merge com fundo */
  &::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 40%;
    background: linear-gradient(to top, rgba(28,38,50,0.55) 0%, transparent 100%);
    pointer-events: none; z-index: 1;
  }

  @media (max-width: 900px) {
    aspect-ratio: 3/2;
    max-height: 360px;
  }
`
/* Acento: hero-olho.png no canto superior direito como elemento flutuante */
const HeroOlhoAccent = styled.div`
  position: absolute;
  top: -22px;
  right: -22px;
  width: min(140px,14vw);
  height: min(140px,14vw);
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(254,177,97,0.22);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  z-index: 10;

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    filter: saturate(0.8) brightness(0.9);
  }

  @media (max-width: 1100px) {
    width: 100px; height: 100px;
    top: -12px; right: -12px;
  }
  @media (max-width: 900px) { display: none; }
`
/* Badget flutuante no Dr.: "São Paulo" localização */
const HeroDrBadge = styled.div`
  position: absolute;
  bottom: 20px;
  left: 16px;
  z-index: 10;
  background: rgba(28,38,50,0.88);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(254,177,97,0.18);
  border-radius: 4px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`
const BadgeText = styled.span`
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--amber);
`

/* ============================================================
   ─── 2. SOBRE / O IBR ─────────────────────────────────────
   Layout respeitando formato portrait das fotos.
   Estrutura:
     Row 1: 3 fotos portrait lado a lado (clinica-7, clinica-1, clinica-8)
             aspect-ratio 3/4 → mostra o ambiente quase inteiro.
     Row 2: grid texto + galeria 2 fotos portrait (clinica-3, clinica-4)
   ============================================================ */
const SobreWrap = styled.section`
  background: var(--creme);
  padding: var(--section-gap) var(--gutter);
`

/* Trio de fotos portrait no topo — 3 colunas iguais */
const SobrePortraitRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  border-radius: 7px;
  overflow: hidden;
  margin-bottom: 64px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    /* No mobile mostra só 2 fotos — a terceira some */
    > *:last-child { display: none; }
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    > *:last-child { display: block; }
  }
`
/* Célula portrait: aspect 3/4 → corta pouco de fotos 1200x1600 */
const PortraitCell = styled.div`
  aspect-ratio: 3/4;
  overflow: hidden;
  position: relative;

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    filter: saturate(0.9);
    transition: transform 0.55s cubic-bezier(0.22,1,0.36,1),
                filter 0.35s ease;
  }

  &:hover img {
    transform: scale(1.03);
    filter: saturate(1);
  }

  /* Label no hover */
  &::after {
    content: attr(data-label);
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 32px 16px 14px;
    background: linear-gradient(to top, rgba(28,38,50,0.65) 0%, transparent 100%);
    font-family: var(--font-ui); font-size: 10px; font-weight: 700;
    letter-spacing: 2px; text-transform: uppercase;
    color: rgba(237,233,222,0.7);
    opacity: 0; transition: opacity 0.25s ease;
  }
  &:hover::after { opacity: 1; }
`

/* Grid: texto esquerda + 2 fotos portrait direita */
const SobreGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 44px;
  }
`
const SobreH2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(28px,3vw,44px);
  font-weight: 400;
  color: var(--navy-deep);
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin-bottom: 28px;
`
const SobreBody = styled.div`
  p {
    font-family: var(--font-ui);
    font-size: clamp(15px,1.4vw,17px);
    color: var(--navy);
    line-height: 1.78;
    margin-bottom: 20px;
    &:last-child { margin-bottom: 0; }
  }
`
/* Duas fotos portrait lado a lado — complementam o texto */
const SobreDuoFotos = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  border-radius: 6px;
  overflow: hidden;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`
/* Reutiliza PortraitCell para as fotos do duo, mesma lógica */
const GaleriaCell = PortraitCell

/* ============================================================
   ─── 3. AUTORIDADE ────────────────────────────────────────
   Layout expandido:
   - Coluna esquerda: foto grande dr-headshot.jpg + dr-editorial.jpg
     compondo verticalmente, largura generosa
   - Coluna direita: nome/credenciais/bio/links em destaque
   - Fundo: clinica-5 bg direito (diplomas) + padding vertical extra
   ============================================================ */
const AutoridadeWrap = styled.section`
  background: var(--navy);
  /* Padding extra: seção mais alta e com mais respiro */
  padding: calc(var(--section-gap) * 1.4) var(--gutter);
  position: relative;
  overflow: hidden;
`
/* clinica-5 no bg direito — portrait 1200x1600.
   object-position center top mostra mesa + diplomas na parede (parte superior da foto). */
const AutoridadeBgImg = styled.div`
  position: absolute;
  top: 0; right: 0;
  width: 45%; height: 100%;
  pointer-events: none; z-index: 0;

  img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center top;
    filter: saturate(0.45) brightness(0.35);
    display: block;
  }

  &::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(to right,
      var(--navy) 0%, rgba(44,59,77,0.92) 28%,
      rgba(44,59,77,0.6) 58%, rgba(44,59,77,0.18) 100%
    );
  }

  @media (max-width: 900px) { display: none; }
`

/* Layout: 2 colunas — fotos à esquerda, bio à direita */
const AutoridadeInner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 72px;
  align-items: start;
  position: relative; z-index: 1;

  @media (max-width: 1100px) {
    grid-template-columns: 300px 1fr;
    gap: 52px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

/* Coluna esquerda: foto principal grande + foto editorial de apoio */
const DrPhotoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
`
/* dr-headshot.jpg — retrato grande, ocupa a maior parte da coluna */
const DrPhotoMain = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(254,177,97,0.18);
  box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3);
  position: relative;

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  /* Vinheta inferior para merge suave com o fundo navy */
  &::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 35%;
    background: linear-gradient(to top, rgba(44,59,77,0.6) 0%, transparent 100%);
    pointer-events: none; z-index: 1;
  }

  @media (max-width: 768px) {
    max-width: 320px;
    margin: 0 auto;
  }
`
/* dr-editorial.jpg — foto de apoio menor abaixo (só desktop) */
const DrPhotoEditorial = styled.div`
  width: 100%;
  aspect-ratio: 3/2;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.07);
  box-shadow: 0 8px 24px rgba(0,0,0,0.35);

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    filter: saturate(0.88) brightness(0.92);
  }

  @media (max-width: 768px) { display: none; }
`

/* Contador sobreposto sobre a foto editorial — ou standalone se não houver foto */
const CounterOverlay = styled.div`
  background: rgba(254,177,97,0.1);
  border: 1px solid rgba(254,177,97,0.22);
  border-radius: 4px;
  padding: 18px 24px;
  text-align: center;
`
const CounterNum = styled.p`
  font-family: var(--font-serif);
  font-size: clamp(40px,4vw,58px);
  font-weight: 400;
  color: var(--amber);
  line-height: 1;
  letter-spacing: -1.5px;
`
const CounterLabel = styled.p`
  font-family: var(--font-ui);
  font-size: 10px; font-weight: 700;
  letter-spacing: 2.5px; text-transform: uppercase;
  color: rgba(201,194,178,0.5);
  margin-top: 8px;
`

/* Coluna de bio: nome maior, credenciais, lista, links */
const DrBioCol = styled.div``

/* Eyebrow já existe como Eyebrow — nome do Dr. com tipografia expandida */
const AutoridadeH2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(28px,3vw,46px);
  font-weight: 400; color: var(--creme);
  line-height: 1.1; letter-spacing: -0.8px;
  margin-bottom: 8px;
`
const CrmBadge = styled.p`
  font-family: var(--font-ui);
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.5px;
  color: rgba(201,194,178,0.55);
  margin-bottom: 32px;
`
const BioList = styled.ul`
  display: flex; flex-direction: column; gap: 14px;
  margin-bottom: 24px;
`
const BioItem = styled.li`
  display: flex; align-items: flex-start; gap: 14px;
  font-family: var(--font-ui);
  font-size: clamp(14px,1.35vw,17px);
  color: var(--bege); line-height: 1.65;

  &::before {
    content: '';
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--amber); flex-shrink: 0; margin-top: 8px;
  }
`
const DrNote = styled.p`
  font-family: var(--font-ui);
  font-size: clamp(14px,1.35vw,17px);
  color: rgba(201,194,178,0.75); line-height: 1.8;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 22px; margin-top: 4px;
  max-width: 540px;
`
/* Links externos: Instagram */
const ExternalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
`
const ExtLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-ui);
  font-size: 13px; font-weight: 700;
  color: rgba(237,233,222,0.75);
  border: 1px solid rgba(255,255,255,0.13);
  padding: 12px 20px;
  border-radius: 3px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;

  &:hover {
    color: var(--creme);
    border-color: rgba(254,177,97,0.35);
    background: rgba(254,177,97,0.07);
  }

  svg { opacity: 0.6; transition: opacity 0.2s; }
  &:hover svg { opacity: 1; }
`
/* ── Imprensa: card de link preview clicável ── */
const ImpressaWrap = styled.div`
  margin-top: 32px;
  max-width: 580px;
`
const ImpressaLabel = styled.p`
  font-family: var(--font-ui);
  font-size: 10px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  color: var(--amber); margin-bottom: 10px;
`
/* O card inteiro é um <a> — cursor pointer, hover realça borda amber */
const ImpressaCard = styled.a`
  display: flex;
  align-items: stretch;
  gap: 0;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  transition: border-color 0.22s ease,
              background 0.22s ease,
              transform 0.22s cubic-bezier(0.22,1,0.36,1),
              box-shadow 0.22s ease;

  &:hover {
    border-color: rgba(254,177,97,0.45);
    background: rgba(255,255,255,0.07);
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.28);
  }

  &:focus-visible {
    outline: 2px solid var(--amber);
    outline-offset: 3px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`
const ImpressaThumb = styled.div`
  width: 180px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    filter: saturate(0.85);
    transition: transform 0.4s ease;
  }

  ${ImpressaCard}:hover & img {
    transform: scale(1.04);
  }

  @media (max-width: 640px) {
    width: 100%;
    aspect-ratio: 16/7;
  }
`
const ImpressaBody = styled.div`
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  flex: 1;
`
const ImpressaSource = styled.p`
  font-family: var(--font-ui);
  font-size: 10px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  color: rgba(201,194,178,0.45);
`
const ImpressaTitle = styled.p`
  font-family: var(--font-ui);
  font-size: 13px; font-weight: 600;
  color: var(--creme);
  line-height: 1.55;
  flex: 1;
`
const ImpressaCta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-ui);
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.3px;
  color: var(--amber);
  transition: gap 0.2s ease;

  ${ImpressaCard}:hover & { gap: 9px; }
`

/* ============================================================
   ─── 4. SOLUÇÕES ──────────────────────────────────────────
   Faixa tecnologia + 4 cards com imagem no topo
   ============================================================ */
const SolucoesWrap = styled.section`
  background: var(--white);
  padding: var(--section-gap) var(--gutter);
  scroll-margin-top: 80px;
`
const SolucoesHeader = styled.div`
  margin-bottom: 52px;
  h2 {
    font-family: var(--font-serif);
    font-size: clamp(28px,3vw,44px);
    font-weight: 400; color: var(--navy-deep);
    line-height: 1.15; letter-spacing: -0.5px;
    margin-bottom: 12px;
  }
  p {
    font-family: var(--font-ui);
    font-size: clamp(15px,1.4vw,17px);
    color: rgba(44,59,77,0.6);
    max-width: 520px; line-height: 1.65;
  }
`
/* Faixa tecnologia.
   clinica-4 é portrait 1200x1600 → coluna da foto tem aspect-ratio 3/4
   para mostrar o equipamento sem cortar. Coluna de texto alinha ao centro. */
const TechBand = styled.div`
  background: var(--navy-deep);
  border-radius: 5px;
  overflow: hidden;
  display: grid;
  /* Foto ocupa coluna menor (40%) mas mais alta — texto ocupa 60% */
  grid-template-columns: 2fr 3fr;
  margin-bottom: 52px;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
/* Container da foto com aspect 3/4 para respeitar o portrait */
const TechImg = styled.div`
  overflow: hidden;
  /* aspect-ratio na div, não no img, para que o img preencha naturalmente */
  aspect-ratio: 3/4;

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    /* center 20% mostra o topo do aparelho (ponto focal no início da foto) */
    object-position: center 20%;
    display: block;
    filter: saturate(0.65) brightness(0.72);
    transition: transform 0.5s ease;
  }

  &:hover img { transform: scale(1.03); }

  @media (max-width: 768px) {
    aspect-ratio: 4/3;
  }
`
const TechContent = styled.div`
  padding: 40px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) { padding: 32px 28px; }
`
const TechEyebrow = styled.p`
  font-family: var(--font-ui);
  font-size: 10px; font-weight: 700;
  letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--amber); margin-bottom: 14px;
`
const TechTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: clamp(20px,2vw,28px);
  font-weight: 400; color: var(--creme);
  line-height: 1.2; margin-bottom: 14px;
`
const TechBody = styled.p`
  font-family: var(--font-ui);
  font-size: clamp(13px,1.2vw,15px);
  color: var(--bege); line-height: 1.7;
`
/* Cards de público — com imagem no topo */
const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 16px;

  @media (max-width: 1024px) { grid-template-columns: repeat(2,1fr); }
  @media (max-width: 480px)  { grid-template-columns: 1fr; }
`
const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  background: var(--navy-deep);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
  transition: transform 0.28s cubic-bezier(0.22,1,0.36,1),
              box-shadow 0.28s ease, border-color 0.22s;
  will-change: transform;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(28,38,50,0.38);
    border-color: rgba(254,177,97,0.22);
  }
  &:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px; }
`
/* Imagem no topo do card */
const CardImageSlot = styled.div`
  aspect-ratio: 16/9;
  overflow: hidden;
  position: relative;
  background: rgba(255,255,255,0.03);

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: ${({ $pos }) => $pos || 'center'};
    display: block;
    filter: saturate(0.7) brightness(0.75);
    transition: transform 0.5s ease, filter 0.3s ease;
  }

  ${CardLink}:hover & img {
    transform: scale(1.05);
    filter: saturate(0.85) brightness(0.8);
  }

  /* fallback se imagem não existir */
  &::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to bottom,
      transparent 50%, rgba(28,38,50,0.6) 100%
    );
    pointer-events: none;
  }
`
const CardBody = styled.div`
  padding: 24px 24px 28px;
  flex: 1;
  display: flex;
  flex-direction: column;
`
const CardNum = styled.span`
  font-family: var(--font-serif); font-style: italic;
  font-size: 12px; color: var(--amber);
  margin-bottom: 10px; display: block;
`
const CardTitle = styled.h3`
  font-family: var(--font-serif);
  font-size: clamp(17px,1.7vw,21px);
  font-weight: 400; color: var(--creme);
  line-height: 1.3; margin-bottom: 10px;
`
const CardText = styled.p`
  font-family: var(--font-ui);
  font-size: 13px; color: var(--bege);
  line-height: 1.65; flex: 1; margin-bottom: 20px;
`
const CardCta = styled.span`
  display: flex; align-items: center; gap: 6px;
  font-family: var(--font-ui); font-size: 12px; font-weight: 700;
  letter-spacing: 0.5px; color: var(--amber);
  margin-top: auto;
  transition: gap 0.22s ease;
  ${CardLink}:hover & { gap: 10px; }
`
const CardItem = motion(CardLink)
const cardItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22,1,0.36,1] } },
}

/* ============================================================
   ─── 5. MÉTODO — BANNER FORTE ─────────────────────────────
   ============================================================ */
const MetodoBanner = styled.section`
  background: var(--navy-deep);
  padding: 0 var(--gutter);
  position: relative;
  overflow: hidden;
`
const MetodoBannerInner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  background: linear-gradient(135deg, var(--amber) 0%, #f5952e 100%);
  border-radius: 8px;
  padding: 56px 64px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: center;
  position: relative;
  overflow: hidden;

  /* Acento geométrico fundo */
  &::before {
    content: ''; position: absolute;
    top: -40%; right: -10%;
    width: 60%; height: 200%;
    background: radial-gradient(ellipse at 60% 40%,
      rgba(255,255,255,0.12) 0%, transparent 60%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 40px 32px;
    gap: 28px;
  }
`
const MetodoBannerContent = styled.div`
  position: relative; z-index: 1;
`
const MetodoEyebrow = styled.p`
  font-family: var(--font-ui);
  font-size: 10px; font-weight: 700;
  letter-spacing: 3px; text-transform: uppercase;
  color: rgba(28,38,50,0.6); margin-bottom: 12px;
`
const MetodoH2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(26px,2.8vw,40px);
  font-weight: 400; color: var(--navy-deep);
  line-height: 1.1; letter-spacing: -0.5px;
  margin-bottom: 16px;
`
const MetodoP = styled.p`
  font-family: var(--font-ui);
  font-size: clamp(14px,1.3vw,16px);
  color: rgba(28,38,50,0.72);
  line-height: 1.7; max-width: 520px;
`
const MetodoCtaBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--navy-deep);
  color: var(--amber);
  font-family: var(--font-ui);
  font-size: 14px; font-weight: 800;
  padding: 17px 28px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background 0.22s, transform 0.18s, box-shadow 0.2s;
  position: relative; z-index: 1;

  &:hover {
    background: #121d28;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(28,38,50,0.35);
  }

  svg { transition: transform 0.2s; }
  &:hover svg { transform: translateX(4px); }
`
/* Espaçador para afastar do anterior e proximas secoes */
const BannerPad = styled.div`
  padding-top: var(--section-gap);
  padding-bottom: var(--section-gap);
  background: var(--navy-deep);
`

/* ============================================================
   ─── 6A. FAQ ─────────────────────────────────────────────
   ============================================================ */
const FaqWrap = styled.section`
  background: var(--white);
  padding: var(--section-gap) var(--gutter);
`
const FaqH2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(26px,2.8vw,40px);
  font-weight: 400; color: var(--navy-deep);
  line-height: 1.15; letter-spacing: -0.5px;
  margin-bottom: 44px;
`
const FaqList = styled.div`
  display: flex; flex-direction: column;
  border-top: 1px solid rgba(44,59,77,0.1);
  max-width: 840px;
`
const FaqItem = styled.div`
  border-bottom: 1px solid rgba(44,59,77,0.1);
`
const FaqBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 0;
  background: none; border: none; cursor: pointer;
  text-align: left;

  &:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
`
const FaqQ = styled.span`
  font-family: var(--font-ui);
  font-size: clamp(15px,1.4vw,17px);
  font-weight: 700;
  color: var(--navy-deep);
  line-height: 1.45;
`
const FaqChev = styled(ChevronDown)`
  flex-shrink: 0; margin-top: 2px; color: var(--terra);
  transition: transform 0.28s ease;
  transform: ${({ $open }) => $open ? 'rotate(-180deg)' : 'rotate(0deg)'};
`
const FaqA = styled.div`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? '400px' : '0')};
  transition: max-height 0.35s cubic-bezier(0.22,1,0.36,1);

  p {
    font-family: var(--font-ui);
    font-size: clamp(14px,1.3vw,16px);
    color: rgba(44,59,77,0.75);
    line-height: 1.75;
    padding-bottom: 24px;
  }
`

function FaqSection({ items }) {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <FaqList role="list">
      {items.map(({ q, a }, i) => (
        <FaqItem key={i} role="listitem">
          <FaqBtn
            onClick={() => toggle(i)}
            aria-expanded={open === i}
            aria-controls={`faq-a-${i}`}
          >
            <FaqQ>{q}</FaqQ>
            <FaqChev size={18} $open={open === i} aria-hidden="true" />
          </FaqBtn>
          <FaqA $open={open === i} id={`faq-a-${i}`} aria-hidden={open !== i}>
            <p>{a}</p>
          </FaqA>
        </FaqItem>
      ))}
    </FaqList>
  )
}

/* ============================================================
   ─── 6B. LOCALIZAÇÃO ─────────────────────────────────────
   ============================================================ */
const LocalWrap = styled.section`
  background: var(--creme);
  padding: var(--section-gap) var(--gutter);
`
const LocalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 56px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`
const LocalH2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(26px,2.8vw,40px);
  font-weight: 400; color: var(--navy-deep);
  line-height: 1.15; letter-spacing: -0.5px;
  margin-bottom: 24px;
`
const LocalInfo = styled.div`
  p {
    font-family: var(--font-ui);
    font-size: clamp(14px,1.3vw,16px);
    color: var(--navy); line-height: 1.75;
    margin-bottom: 16px;
    &:last-child { margin-bottom: 0; }
  }
  strong { color: var(--navy-deep); }
`
const MapFrame = styled.div`
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(44,59,77,0.1);
  box-shadow: 0 8px 32px rgba(44,59,77,0.1);
  background: rgba(44,59,77,0.05);

  iframe {
    width: 100%;
    height: 380px;
    display: block;
    border: none;
  }

  @media (max-width: 768px) {
    iframe { height: 280px; }
  }
`

/* ============================================================
   ─── 7. DEPOIMENTOS — review style ───────────────────────
   ============================================================ */
const ProvaWrap = styled.section`
  background: var(--navy-deep);
  padding: var(--section-gap) var(--gutter);
`
const ProvaH2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(26px,2.8vw,40px);
  font-weight: 400; color: var(--creme);
  line-height: 1.15; letter-spacing: -0.5px;
  margin-bottom: 52px;
`
const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 20px;

  @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`
const ReviewCard = styled.blockquote`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 6px;
  padding: 32px 28px;
  display: flex; flex-direction: column; gap: 16px;
  transition: background 0.25s ease, border-color 0.25s ease,
              transform 0.28s cubic-bezier(0.22,1,0.36,1);

  &:hover {
    background: rgba(255,255,255,0.065);
    border-color: rgba(254,177,97,0.15);
    transform: translateY(-4px);
  }
`
const StarRow = styled.div`
  display: flex; gap: 3px;
`
const ReviewQuote = styled.p`
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(15px,1.5vw,18px);
  color: var(--creme); line-height: 1.6; flex: 1;
`
const ReviewMeta = styled.footer`
  font-family: var(--font-ui);
  font-size: 11px; font-weight: 700;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: rgba(201,194,178,0.45);
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.06);
`
const ReviewDisclaimer = styled.p`
  font-family: var(--font-ui);
  font-size: 12px; font-style: italic;
  color: rgba(201,194,178,0.3);
  margin-top: 28px;
`

function ReviewCardComp({ quote, meta }) {
  return (
    <ReviewCard>
      <StarRow aria-label="5 estrelas">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="#FEB161" color="#FEB161" aria-hidden="true" />
        ))}
      </StarRow>
      <ReviewQuote>"{quote}"</ReviewQuote>
      <ReviewMeta>{meta}</ReviewMeta>
    </ReviewCard>
  )
}

/* ============================================================
   ─── 8. JORNADA STEPPER ANIMADO ──────────────────────────
   ============================================================ */
const JornadaWrap = styled.section`
  background: var(--navy-deep);
  padding: 0 var(--gutter) var(--section-gap);
  position: relative;
`
const JornadaH2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(26px,2.8vw,40px);
  font-weight: 400; color: var(--creme);
  line-height: 1.15; letter-spacing: -0.5px;
  margin-bottom: 56px;
  padding-top: var(--section-gap);
`
const StepperTrack = styled.div`
  display: grid;
  grid-template-columns: repeat(5,1fr);
  gap: 0;
  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`
/* Linha de progresso — horizontal desktop, vertical mobile */
const StepperLine = styled.div`
  position: absolute;
  top: 24px;
  left: 10%;
  right: 10%;
  height: 1px;
  background: rgba(255,255,255,0.08);
  z-index: 0;

  /* Linha animada de progresso (entra quando inView) */
  &::after {
    content: '';
    position: absolute; top: 0; left: 0; bottom: 0;
    background: linear-gradient(to right, var(--amber) 0%, rgba(254,177,97,0.3) 100%);
    animation: ${({ $animate }) => $animate ? css`${stepProgress} 1.2s ease forwards 0.3s` : 'none'};
    width: ${({ $animate }) => $animate ? undefined : '0'};
  }

  @media (max-width: 900px) { display: none; }
`
const StepItem = styled(motion.div)`
  display: flex; flex-direction: column; align-items: center;
  text-align: center;
  padding: 0 12px;
  position: relative; z-index: 1;

  @media (max-width: 900px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    padding: 20px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    &:last-child { border-bottom: none; }
    gap: 20px;
  }
`
const StepCircle = styled.div`
  width: 48px; height: 48px;
  border-radius: 50%;
  background: ${({ $active }) => $active ? 'var(--amber)' : 'rgba(255,255,255,0.05)'};
  border: 1px solid ${({ $active }) => $active ? 'var(--amber)' : 'rgba(255,255,255,0.12)'};
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  margin-bottom: 20px;
  transition: background 0.4s ease, border-color 0.4s ease;

  @media (max-width: 900px) { margin-bottom: 0; }
`
const StepNum = styled.span`
  font-family: var(--font-serif); font-style: italic;
  font-size: 20px;
  color: ${({ $active }) => $active ? 'var(--navy-deep)' : 'rgba(254,177,97,0.5)'};
  line-height: 1;
  transition: color 0.4s ease;
`
const StepContent = styled.div``
const StepTitle = styled.p`
  font-family: var(--font-ui);
  font-size: 11px; font-weight: 700;
  letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--amber); margin-bottom: 8px;
`
const StepBody = styled.p`
  font-family: var(--font-ui);
  font-size: 13px; color: var(--bege);
  line-height: 1.65;
`
const stepItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22,1,0.36,1], delay: i * 0.1 },
  }),
}

/* StepperLine precisa do keyframe — importar css do styled-components */
import { css } from 'styled-components'

/* ============================================================
   ─── DIFERENCIAIS 2x2 ────────────────────────────────────
   ============================================================ */
const DiferenciaisWrap = styled.section`
  background: var(--navy-deep);
  padding: var(--section-gap) var(--gutter);
  position: relative; overflow: hidden;
  &::before {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 1px; background: rgba(255,255,255,0.04);
  }
`
const DiferenciaisH2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(26px,2.8vw,40px);
  font-weight: 400; color: var(--creme);
  line-height: 1.15; letter-spacing: -0.5px;
  margin-bottom: 52px;
`
const DiferenciaisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 2px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`
const DiferencialItem = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 40px 44px;
  transition: background 0.25s ease;
  &:hover { background: rgba(255,255,255,0.052); }
  &:nth-child(1) { border-radius: 5px 0 0 0; }
  &:nth-child(2) { border-radius: 0 5px 0 0; }
  &:nth-child(3) { border-radius: 0 0 0 5px; }
  &:nth-child(4) { border-radius: 0 0 5px 0; }
  @media (max-width: 640px) {
    border-radius: 0 !important;
    &:first-child  { border-radius: 5px 5px 0 0 !important; }
    &:last-child   { border-radius: 0 0 5px 5px !important; }
  }
`
const DiferencialNum = styled.span`
  font-family: var(--font-serif); font-style: italic;
  font-size: 13px; color: var(--amber); display: block; margin-bottom: 12px;
`
const DiferencialTitle = styled.h3`
  font-family: var(--font-ui); font-size: 13px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase;
  color: var(--creme); margin-bottom: 14px;
`
const DiferencialBody = styled.p`
  font-family: var(--font-ui);
  font-size: clamp(14px,1.3vw,16px);
  color: var(--bege); line-height: 1.7;
`

/* ============================================================
   ─── CTA FINAL ───────────────────────────────────────────
   ============================================================ */
const CtaFinalWrap = styled.section`
  background: var(--navy-deep);
  padding: var(--section-gap) var(--gutter);
  position: relative; overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.04);
  &::after {
    content: ''; position: absolute; top: 0; right: 0;
    width: 320px; height: 320px;
    background: radial-gradient(ellipse, rgba(254,177,97,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
`
const CtaFinalCenter = styled.div`
  text-align: center;
  position: relative; z-index: 1;
`
const CtaFinalH2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(26px,2.8vw,42px);
  font-weight: 400; color: var(--creme);
  line-height: 1.15; letter-spacing: -0.5px;
  margin-bottom: 12px;
`
const CtaFinalSub = styled.p`
  font-family: var(--font-ui);
  font-size: clamp(14px,1.3vw,16px);
  color: var(--bege); line-height: 1.7;
  max-width: 520px; margin: 0 auto 36px;
`

/* ============================================================
   DATA
   ============================================================ */
const SOLUTIONS = [
  {
    num: '01', slug: '/atleta',
    title: 'Atleta de Contato',
    body: 'PRK: técnica sem flap para quem leva impacto no esporte.',
    cta: 'Quero saber sobre PRK para atletas',
    img: '/fotos/atleta.png', imgPos: 'center',
  },
  {
    num: '02', slug: '/profissional-de-tela',
    title: 'Profissional de Tela',
    body: 'Visão que é ferramenta de trabalho — sem ressecamento no fim do dia.',
    cta: 'Quero saber sobre cirurgia para profissionais',
    img: '/fotos/profissional.png', imgPos: 'center top',
  },
  {
    num: '03', slug: '/saturado',
    title: 'Saturado da Dependência',
    body: 'Já pagou mais do que a cirurgia custa — sem saber.',
    cta: 'Quero ver o cálculo que muda tudo',
    img: '/fotos/lifestyle-liberdade.png', imgPos: '70% center',
  },
  {
    num: '04', slug: '/estetico',
    title: 'Estético-Consciente',
    body: 'O rosto livre, se você for candidato.',
    cta: 'Quero entender se tenho esse caminho',
    img: '/fotos/estetico.png', imgPos: 'center top',
  },
]

const DIFERENCIAIS = [
  {
    title: 'Especialização total',
    body: 'Um instituto que faz só uma coisa, faz melhor. Toda nossa estrutura, tecnologia e rotina de exames existe para a cirurgia refrativa.',
  },
  {
    title: 'Método próprio de indicação',
    body: 'Não existe protocolo único aqui. A técnica é escolhida para o seu caso: PRK, LASIK, lente fácica. Cada indicação parte dos seus exames.',
  },
  {
    title: 'Acompanhamento do começo ao fim',
    body: 'Da avaliação inicial ao retorno pós-operatório, você tem contato com a mesma equipe que planejou o seu caso.',
  },
  {
    title: 'Autoridade que assina',
    body: 'O Dr. Luis Felipe Bortolan avalia, opera e acompanha. CRM 205675 (SP) · RQE 148991. Fellowship HC/USP.',
  },
]

const JORNADA = [
  { title: 'Avaliação online', body: 'Você conta o seu caso, a equipe analisa. Grátis, online, sem compromisso.' },
  { title: 'Consulta com exames', body: 'Mapeamento de córnea e visão para ver se a cirurgia é possível.' },
  { title: 'Plano com o Dr. Luis', body: 'Técnica, data e forma de pagamento. Tudo definido junto.' },
  { title: 'A cirurgia', body: 'Conduzida pelo Dr. Luis Felipe Bortolan, que avaliou o seu caso.' },
  { title: 'Pós-operatório', body: 'Retornos e suporte até o resultado estabilizar.' },
]

const HOME_TESTIMONIALS = [
  {
    quote: 'Visão límpida e cores vibrantes — na FMUSP, um dos melhores hospitais do mundo.',
    meta: 'Paciente do IBR',
  },
  {
    quote: 'Depois de 29 anos dependendo de óculos e lentes, finalmente fiquei livre dos meus +7 graus de miopia. O único arrependimento foi não ter feito antes.',
    meta: 'Paciente do IBR',
  },
  {
    quote: 'Um dia pós-cirurgia já consigo ler todas as placas e faixas. Resultado acima do que esperava.',
    meta: 'Paciente do IBR',
  },
]

const HUB_FAQ = [
  {
    q: 'Como sei se sou candidato à cirurgia refrativa?',
    a: 'Você não sabe antes dos exames — e é por isso que a avaliação existe. A candidatura é confirmada (ou descartada) na consulta com exames de mapeamento de córnea, paquimetria e avaliação de olho seco. O que a avaliação online faz é dar um primeiro sinal antes desse investimento.',
  },
  {
    q: 'A cirurgia refrativa é segura?',
    a: 'Para bom candidato selecionado com critério, os estudos publicados mostram taxas de complicação significativas abaixo de 1% para LASIK e PRK. O risco aumenta quando a avaliação pré-operatória é negligenciada — grau instável, córnea fina, ceratocone não diagnosticado. O protocolo do IBR existe para mapear esses fatores.',
  },
  {
    q: 'Qual a diferença entre LASIK e PRK?',
    a: 'LASIK envolve a criação de um flap na córnea — recuperação visual rápida (1–3 dias), indicado para a maioria dos candidatos com córnea de espessura adequada. PRK não cria flap — recuperação mais gradual (30–60 dias), preferencial para atletas de contato e córneas com espessura mais limitada. A escolha entre os dois é feita pelos seus exames, não por preferência.',
  },
  {
    q: 'Qual o custo da cirurgia?',
    a: 'O valor é discutido após a consulta com exames, quando a indicação e a técnica estão definidas. Antes disso, qualquer número seria estimativa sem base no seu caso real. O que sabemos é que o custo comparado com décadas de óculos e lentes é, na maioria dos casos, favorável à cirurgia.',
  },
  {
    q: 'E se os exames mostrarem que não sou candidato?',
    a: 'Você terá um diagnóstico preciso e a explicação do Dr. Luis sobre o que foi encontrado. Em alguns casos a contraindicação é temporária (grau instável). Em outros é permanente para laser, mas a lente fácica pode ser opção. Em outros ainda, a cirurgia realmente não é indicada.',
  },
]

/* ============================================================
   PAGE COMPONENT
   ============================================================ */
export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  /* Stepper: anima linha de progresso quando entra na viewport */
  const stepperRef = useRef(null)
  const stepperInView = useInView(stepperRef, { once: true, margin: '-80px' })

  return (
    <>
      <ReducedMotion />
      <Header />

      <main>
        {/* ── 1. HERO ── */}
        <HeroWrap ref={heroRef}>
          {/* SP Skyline bg (fallback: se imagem não existir, o gradient navy basta) */}
          <HeroSkylineBg aria-hidden="true">
            <img
              src="/fotos/sp-skyline.jpg"
              alt=""
              loading="eager"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </HeroSkylineBg>

          {/* Parallax layer: halos + grain */}
          <motion.div style={{ y: heroBgY, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
            <HeroBg />
            <HeroGrain aria-hidden="true" />
            <LensArc aria-hidden="true" />
          </motion.div>

          <HeroInner>
            {/* Texto esquerda */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Eyebrow $dark>Instituto Brasileiro de Refrativa · São Paulo</Eyebrow>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
                <HeroH1>
                  Cirurgia refrativa em São Paulo com indicação personalizada
                  e acompanhamento do começo ao fim.
                </HeroH1>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.22}>
                <HeroSub>
                  O IBR é um instituto dedicado exclusivamente à cirurgia refrativa.
                  Não somos um hospital de massa. Aqui, cada paciente passa por
                  avaliação criteriosa para descobrir se a cirurgia é possível,
                  qual técnica é a certa para o seu caso, e o que esperar em cada etapa.
                  <br /><br />
                  Se você for candidato, existe um caminho para a visão livre.
                </HeroSub>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.34}>
                <CtaPrimary
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fazer avaliação gratuita online pelo WhatsApp"
                >
                  Faça sua avaliação gratuita online
                  <ArrowRight size={18} aria-hidden="true" />
                </CtaPrimary>
                <MicroCopy $dark>
                  Grátis, online e sem compromisso. O primeiro passo é entender se você é candidato.
                </MicroCopy>
              </motion.div>
            </div>

            {/* Visual direita: Dr. + olho acento */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.42}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <HeroVisualCol>
                <HeroDrFrame>
                  <img
                    src="/fotos/dr-hero.jpg"
                    alt="Dr. Luis Felipe Bortolan — cirurgião refrativo do IBR, São Paulo"
                    loading="eager"
                  />
                </HeroDrFrame>
                {/* Olho macro: acento circular canto superior direito */}
                <HeroOlhoAccent>
                  <img
                    src="/fotos/hero-olho.png"
                    alt="Íris humana em detalhe"
                    loading="eager"
                  />
                </HeroOlhoAccent>
                {/* Badge localização */}
                <HeroDrBadge aria-label="Localização São Paulo">
                  <BadgeText>São Paulo · SP</BadgeText>
                </HeroDrBadge>
              </HeroVisualCol>
            </motion.div>
          </HeroInner>
        </HeroWrap>

        {/* ── 2. SOBRE / IBR ── */}
        <SobreWrap>
          <Container>
            {/*
              Row 1: 3 fotos portrait (3/4) lado a lado.
              Fotos são 1200x1600 → aspect 3/4 mostra ~93% da altura,
              cortando apenas uma faixa mínima topo/base.
              clinica-7 = recepção c/ logo · clinica-1 = sala · clinica-8 = ambiente
            */}
            <Reveal>
              <SobrePortraitRow aria-label="Estrutura do IBR">
                <PortraitCell data-label="Recepção">
                  <img
                    src="/fotos/clinica-7.jpg"
                    alt="Recepção do IBR — Instituto Brasileiro de Refrativa, São Paulo"
                    loading="lazy"
                  />
                </PortraitCell>
                <PortraitCell data-label="Sala de consulta">
                  <img
                    src="/fotos/clinica-1.jpg"
                    alt="Sala de consulta — IBR"
                    loading="lazy"
                  />
                </PortraitCell>
                <PortraitCell data-label="Ambiente clínico">
                  <img
                    src="/fotos/clinica-8.jpg"
                    alt="Ambiente clínico — IBR São Paulo"
                    loading="lazy"
                  />
                </PortraitCell>
              </SobrePortraitRow>
            </Reveal>

            {/* Row 2: texto + 2 fotos portrait */}
            <SobreGrid>
              {/* Texto */}
              <Reveal>
                <Eyebrow>Sobre o IBR</Eyebrow>
                <Divider />
                <SobreH2>
                  Um instituto focado só em uma coisa: cirurgia refrativa.
                </SobreH2>
                <SobreBody>
                  <p>
                    A maioria dos consultórios de oftalmologia faz de tudo.
                    Catarata, glaucoma, retina, estrabismo, pronto-socorro.
                    A cirurgia refrativa entra no cardápio como mais um item.
                  </p>
                  <p>
                    No IBR, é diferente. A nossa atenção está inteira aqui: nos
                    exames de mapeamento de córnea, na escolha da técnica certa
                    para cada grau e cada rotina, no acompanhamento pós-operatório.
                    Nada além disso.
                  </p>
                  <p>
                    Especialização não é slogan. É o motivo pelo qual cada paciente
                    que entra aqui recebe uma avaliação de verdade, não uma consulta
                    rápida seguida de uma data de cirurgia.
                  </p>
                </SobreBody>
              </Reveal>

              {/*
                2 fotos portrait: clinica-3 (sala de exames) + clinica-4 (equipamento).
                aspect 3/4 → mostra ambiente quase inteiro sem corte agressivo.
              */}
              <Reveal delay={0.1}>
                <SobreDuoFotos aria-label="Equipamentos e salas do IBR">
                  <GaleriaCell data-label="Sala de exames">
                    <img
                      src="/fotos/clinica-3.jpg"
                      alt="Sala de exames do IBR"
                      loading="lazy"
                    />
                  </GaleriaCell>
                  <GaleriaCell data-label="Equipamentos">
                    <img
                      src="/fotos/clinica-4.jpg"
                      alt="Equipamentos de mapeamento de córnea — IBR"
                      loading="lazy"
                    />
                  </GaleriaCell>
                </SobreDuoFotos>
              </Reveal>
            </SobreGrid>
          </Container>
        </SobreWrap>

        {/* ── 3. AUTORIDADE — Dr. Luis ── */}
        <AutoridadeWrap>
          {/* clinica-5: diplomas na parede — fundo tratado, bg decorativo */}
          <AutoridadeBgImg aria-hidden="true">
            <img src="/fotos/clinica-5.jpg" alt="" loading="lazy" />
          </AutoridadeBgImg>

          <Container>
            <Reveal>
              <Eyebrow $dark style={{ marginBottom: '40px' }}>Quem vai te operar</Eyebrow>
            </Reveal>
            <AutoridadeInner>

              {/* ── Coluna esquerda: foto grande + editorial + contador ── */}
              <Reveal>
                <DrPhotoCol>
                  {/* Retrato principal — dr-headshot.jpg, grande */}
                  <DrPhotoMain>
                    <img
                      src="/fotos/dr-headshot.jpg"
                      alt="Dr. Luis Felipe Bortolan — cirurgião refrativo IBR São Paulo"
                      loading="lazy"
                    />
                  </DrPhotoMain>

                  {/* Foto editorial de apoio — dr-editorial.jpg (só desktop) */}
                  <DrPhotoEditorial>
                    <img
                      src="/fotos/dr-editorial.jpg"
                      alt="Dr. Luis Felipe Bortolan — IBR São Paulo"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.closest('div').style.display = 'none' }}
                    />
                  </DrPhotoEditorial>

                  {/* Contador cirurgias */}
                  <CounterOverlay>
                    <CounterNum aria-label="Mais de 2.000 cirurgias">
                      <Counter target={2000} suffix="+" />
                    </CounterNum>
                    <CounterLabel>cirurgias realizadas</CounterLabel>
                  </CounterOverlay>
                </DrPhotoCol>
              </Reveal>

              {/* ── Coluna direita: bio, credenciais, links ── */}
              <Reveal delay={0.12}>
                <DrBioCol>
                  <AutoridadeH2>Dr. Luis Felipe Bortolan</AutoridadeH2>
                  <CrmBadge>CRM 205675 (SP) · RQE 148991</CrmBadge>

                  <BioList>
                    <BioItem>Fellowship em Catarata e Cirurgia Refrativa — Hospital das Clínicas da USP (FMUSP).</BioItem>
                    <BioItem>Residência em Oftalmologia — Instituto Suel Abujamra.</BioItem>
                    <BioItem>Fellowship em Plástica Ocular — Instituto Pedro Ruiz.</BioItem>
                    <BioItem>Mais de 2.000 cirurgias refrativas realizadas.</BioItem>
                    <BioItem>Opera atletas de jiu-jitsu, MMA e boxe com indicação PRK.</BioItem>
                  </BioList>

                  <DrNote>
                    O Dr. Luis é o responsável técnico do IBR e o especialista que
                    avalia, planeja e acompanha cada caso pessoalmente. Da consulta
                    com exames ao pós-operatório, você tem contato com o mesmo médico
                    que planejou o seu caso.
                  </DrNote>

                  {/* Instagram */}
                  <ExternalLinks>
                    <ExtLink
                      href={IG_DR}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Perfil Instagram do Dr. Luis Felipe Bortolan"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                      @drluisfelipebortolan
                    </ExtLink>
                  </ExternalLinks>

                  {/* Imprensa — card de link preview clicável */}
                  <ImpressaWrap>
                    <ImpressaLabel>Na imprensa</ImpressaLabel>
                    <ImpressaCard
                      href={VIRGULA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ler matéria: Dr. Luis Felipe Bortolan explica por que Ed Sheeran ainda usa óculos mesmo após cirurgia refrativa — Vírgula"
                    >
                      <ImpressaThumb>
                        <img
                          src="/fotos/imprensa-virgula.webp"
                          alt="Thumbnail da matéria no Vírgula sobre Ed Sheeran e cirurgia refrativa"
                          loading="lazy"
                        />
                      </ImpressaThumb>
                      <ImpressaBody>
                        <ImpressaSource>Vírgula · 21/05/2026</ImpressaSource>
                        <ImpressaTitle>
                          Dr. Luis Felipe Bortolan explica por que Ed Sheeran ainda usa óculos mesmo após cirurgia refrativa
                        </ImpressaTitle>
                        <ImpressaCta>
                          Ler matéria
                          <ExternalLinkIcon aria-hidden="true" />
                        </ImpressaCta>
                      </ImpressaBody>
                    </ImpressaCard>
                  </ImpressaWrap>
                </DrBioCol>
              </Reveal>
            </AutoridadeInner>
          </Container>
        </AutoridadeWrap>

        {/* ── 4. SOLUÇÕES ── */}
        <SolucoesWrap id="solucoes">
          <Container>
            <Reveal>
              <SolucoesHeader>
                <Eyebrow>Soluções</Eyebrow>
                <h2>Pra quem é o IBR?</h2>
                <p>
                  Cada caso é diferente. Cada público tem sua dor, sua dúvida, sua
                  rotina. Clique no perfil que mais se parece com o seu.
                </p>
              </SolucoesHeader>
            </Reveal>

            {/* Faixa tecnologia */}
            <Reveal>
              <TechBand>
                <TechImg>
                  <img
                    src="/fotos/clinica-4.jpg"
                    alt="Equipamento de mapeamento de córnea IBR"
                    loading="lazy"
                  />
                </TechImg>
                <TechContent>
                  <TechEyebrow>Tecnologia e estrutura</TechEyebrow>
                  <TechTitle>
                    Equipamentos de ponta para a indicação mais precisa.
                  </TechTitle>
                  <TechBody>
                    Topografia, paquimetria, aberrômetria e avaliação de olho seco
                    com tecnologia de referência. A indicação cirúrgica começa nos
                    exames — não no consultório.
                  </TechBody>
                </TechContent>
              </TechBand>
            </Reveal>

            {/* Cards de público com imagem no topo */}
            <CardsGrid
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {SOLUTIONS.map(({ num, slug, title, body, cta, img, imgPos }) => (
                <CardItem key={slug} to={slug} variants={cardItemVariants}>
                  <CardImageSlot $pos={imgPos}>
                    <img
                      src={img}
                      alt={title}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.opacity = '0' }}
                    />
                  </CardImageSlot>
                  <CardBody>
                    <CardNum>{num}</CardNum>
                    <CardTitle>{title}</CardTitle>
                    <CardText>{body}</CardText>
                    <CardCta>
                      {cta}
                      <ChevronRight size={13} aria-hidden="true" />
                    </CardCta>
                  </CardBody>
                </CardItem>
              ))}
            </CardsGrid>
          </Container>
        </SolucoesWrap>

        {/* ── 5. MÉTODO — BANNER FORTE ── */}
        <BannerPad>
          <Container>
            <Reveal>
              <MetodoBannerInner>
                <MetodoBannerContent>
                  <MetodoEyebrow>O Método</MetodoEyebrow>
                  <MetodoH2>
                    Método Correção Definitiva: a avaliação vem antes da cirurgia.
                  </MetodoH2>
                  <MetodoP>
                    No IBR, a gente não começa com uma data no calendário.
                    Começa com uma pergunta: você é candidato? A cirurgia é o
                    último passo, não o primeiro.
                  </MetodoP>
                </MetodoBannerContent>
                <MetodoCtaBtn
                  to="/metodo"
                  aria-label="Entender como funciona o Método Correção Definitiva"
                >
                  Entender o Método
                  <ArrowRight size={17} aria-hidden="true" />
                </MetodoCtaBtn>
              </MetodoBannerInner>
            </Reveal>
          </Container>
        </BannerPad>

        {/* ── DIFERENCIAIS ── */}
        <DiferenciaisWrap>
          <Container>
            <Reveal>
              <Eyebrow $dark>Por que o IBR</Eyebrow>
              <DiferenciaisH2>Quatro razões para o IBR ser diferente.</DiferenciaisH2>
            </Reveal>
            <DiferenciaisGrid>
              {DIFERENCIAIS.map(({ title, body }, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <DiferencialItem>
                    <DiferencialNum>0{i + 1}</DiferencialNum>
                    <DiferencialTitle>{title}</DiferencialTitle>
                    <DiferencialBody>{body}</DiferencialBody>
                  </DiferencialItem>
                </Reveal>
              ))}
            </DiferenciaisGrid>
          </Container>
        </DiferenciaisWrap>

        {/* ── 7. DEPOIMENTOS — review style ── */}
        <ProvaWrap>
          <Container>
            <Reveal>
              <Eyebrow $dark>Depoimentos</Eyebrow>
              <ProvaH2>O que pacientes dizem sobre o IBR.</ProvaH2>
            </Reveal>
            <ReviewsGrid>
              {HOME_TESTIMONIALS.map((t, i) => (
                <Reveal key={i} delay={i * 0.09}>
                  <ReviewCardComp {...t} />
                </Reveal>
              ))}
            </ReviewsGrid>
            <Reveal delay={0.2}>
              <ReviewDisclaimer>
                Relatos de pacientes do IBR, utilizados com consentimento.
                Resultados variam conforme avaliação individual.
              </ReviewDisclaimer>
            </Reveal>
          </Container>
        </ProvaWrap>

        {/* ── 8. JORNADA STEPPER ANIMADO ── */}
        <JornadaWrap>
          <Container>
            <Reveal>
              <Eyebrow $dark>Próximos passos</Eyebrow>
              <JornadaH2>Como funciona o caminho até a visão livre.</JornadaH2>
            </Reveal>

            <div ref={stepperRef}>
              <StepperTrack
                style={{ position: 'relative' }}
              >
                <StepperLine $animate={stepperInView} aria-hidden="true" />
                {JORNADA.map(({ title, body }, i) => (
                  <StepItem
                    key={i}
                    variants={stepItemVariants}
                    initial="hidden"
                    animate={stepperInView ? 'visible' : 'hidden'}
                    custom={i}
                  >
                    <StepCircle $active={i === 0}>
                      <StepNum $active={i === 0}>{i + 1}</StepNum>
                    </StepCircle>
                    <StepContent>
                      <StepTitle>{title}</StepTitle>
                      <StepBody>{body}</StepBody>
                    </StepContent>
                  </StepItem>
                ))}
              </StepperTrack>
            </div>
          </Container>
        </JornadaWrap>

        {/* ── 6A. FAQ ── */}
        <FaqWrap>
          <Container>
            <Reveal>
              <Eyebrow>Dúvidas frequentes</Eyebrow>
              <FaqH2>As perguntas que todo candidato faz antes de começar.</FaqH2>
            </Reveal>
            <FaqSection items={HUB_FAQ} />
          </Container>
        </FaqWrap>

        {/* ── 6B. LOCALIZAÇÃO + MAPA ── */}
        <LocalWrap>
          <Container>
            <Reveal>
              <Eyebrow>Onde estamos</Eyebrow>
            </Reveal>
            <LocalGrid>
              <Reveal delay={0.05}>
                <LocalH2>IBR São Paulo.</LocalH2>
                <LocalInfo>
                  <p>
                    <strong>Av. Brigadeiro Luís Antônio, 3097</strong><br />
                    Jardim Paulista, São Paulo – SP<br />
                    CEP 01401-000
                  </p>
                  <p>
                    WhatsApp: +55 11 5028-4894<br />
                    Instagram: @drluisfelipebortolan
                  </p>
                  <p>
                    Atendimento com horário agendado.<br />
                    Avaliação inicial gratuita e online.
                  </p>
                </LocalInfo>
              </Reveal>
              <Reveal delay={0.1}>
                <MapFrame>
                  <iframe
                    src="https://www.google.com/maps?q=Av.+Brigadeiro+Lu%C3%ADs+Ant%C3%B4nio,+3097+-+Jardim+Paulista,+S%C3%A3o+Paulo+-+SP,+01401-000&output=embed"
                    title="Localização do IBR — Instituto Brasileiro de Refrativa"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </MapFrame>
              </Reveal>
            </LocalGrid>
          </Container>
        </LocalWrap>

        {/* ── CTA FINAL ── */}
        <CtaFinalWrap>
          <Container>
            <Reveal>
              <CtaFinalCenter>
                <CtaFinalH2>O primeiro passo é entender se você é candidato.</CtaFinalH2>
                <CtaFinalSub>
                  A avaliação é gratuita, online e sem compromisso.
                  Se fizer sentido avançar, a equipe do IBR explica cada etapa.
                </CtaFinalSub>
                <CtaPrimary
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fazer avaliação gratuita online pelo WhatsApp"
                >
                  Faça sua avaliação gratuita online
                  <ArrowRight size={18} aria-hidden="true" />
                </CtaPrimary>
                <MicroCopy $dark style={{ marginTop: '18px' }}>
                  Grátis · Online · Sem compromisso
                </MicroCopy>
              </CtaFinalCenter>
            </Reveal>
          </Container>
        </CtaFinalWrap>
      </main>

      <Footer />
    </>
  )
}

/* Exportar para compatibilidade com outras páginas */
export function TestimonialCards({ testimonials, cols = 2 }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols},1fr)`,
      gap: '20px',
    }}>
      {testimonials.map(({ quote, meta }, i) => (
        <Reveal key={i} delay={i * 0.09}>
          <ReviewCardComp quote={quote} meta={meta || 'Paciente do IBR'} />
        </Reveal>
      ))}
    </div>
  )
}
