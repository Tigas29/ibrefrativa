/**
 * IBR — Funil Atleta de Contato (PRK)
 * Página 2 · SEO: PRK São Paulo · PRK para atletas
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
  FaqSection, CtaFinal, MetodoPilulaSection, DorSection, MecanismoSection, PageMeta,
} from '../components/shared'

const WA_LINK = 'https://wa.me/551150284894'

/* ── Seção identificação / dores do atleta ── */
const IdentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
`
const ClinicaImg = styled.div`
  aspect-ratio: 3 / 4;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(44,59,77,0.08);
  img { width:100%; height:100%; object-fit:cover; display:block; filter: saturate(0.9); }
  @media (max-width: 900px) { aspect-ratio: 4/3; max-height: 320px; }
`
const DorList = styled.ul`
  display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px;
`
const DorItem = styled.li`
  display: flex; align-items: flex-start; gap: 16px;
  font-family: var(--font-ui);
  font-size: clamp(15px, 1.4vw, 17px);
  color: var(--navy); line-height: 1.65;
  &::before {
    content: ''; width: 6px; height: 6px; border-radius: 50%;
    background: var(--terra); flex-shrink: 0; margin-top: 8px;
  }
`

/* ── Mecanismo PRK vs LASIK ── */
const MecGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
  margin-top: 48px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`
const MecCard = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 5px;
  padding: 32px 28px;
`
const MecLabel = styled.p`
  font-family: var(--font-ui); font-size: 11px; font-weight: 700;
  letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 12px;
`
const MecTitle = styled.h3`
  font-family: var(--font-serif); font-size: clamp(20px, 2vw, 26px);
  font-weight: 400; color: var(--creme); line-height: 1.25; margin-bottom: 16px;
`
const MecBody = styled.p`
  font-family: var(--font-ui); font-size: clamp(14px, 1.3vw, 16px);
  color: var(--bege); line-height: 1.7;
`

/* ── Jornada do atleta ── */
const JornadaAtletaWrap = styled(SectionLight)`background: var(--white);`
const JornadaList = styled.ol`
  display: flex; flex-direction: column; gap: 20px; max-width: 680px;
  counter-reset: jornada;
`
const JornadaItem = styled.li`
  display: flex; gap: 20px; align-items: flex-start;
  counter-increment: jornada;
  &::before {
    content: counter(jornada);
    font-family: var(--font-serif); font-style: italic;
    font-size: 28px; color: rgba(254,177,97,0.35); line-height: 1.1;
    flex-shrink: 0; width: 32px;
  }
`
const JornadaItemBody = styled.div`
  p { font-family: var(--font-ui); font-size: clamp(14px,1.3vw,16px); color: var(--navy); line-height: 1.7; }
  strong { font-weight: 700; color: var(--navy-deep); }
`

const ATLETA_DOR = [
  'O suor embaça o óculos no meio do round.',
  'A lente descentraliza no clinch e você perde o foco na hora em que mais precisa.',
  'No sparring de grappling, o dedo do parceiro vai direto no olho. A lente vira risco.',
  'Na academia de natação, fora d\'água você enxerga mal. Dentro, pior ainda.',
  'No dia de competição, o ritual de lente consome energia que deveria ir para o tatame.',
]

const ATLETA_FAQ = [
  {
    q: 'Depois do PRK, um soco pode deslocar a córnea?',
    a: 'Depois do período de cicatrização, não. O PRK não cria flap, então não há essa estrutura para deslocar. A superfície da córnea cicatriza completamente. O retorno ao contato pleno é liberado pelo Dr. Luis com base no exame de cicatrização de cada paciente, não em um número fixo de dias.',
  },
  {
    q: 'Dói? Vou estar acordado durante a cirurgia?',
    a: 'Sim, você estará acordado. A anestesia é feita com colírio, então não há agulha nem sedação geral. O procedimento dura alguns minutos. Há uma sensação de pressão e de luz forte, que é normal. O desconforto maior no PRK costuma ocorrer nas primeiras 24 a 48 horas após a cirurgia, não durante ela.',
  },
  {
    q: 'Quando posso voltar a treinar?',
    a: 'Para atividades sem contato (treino de força, corrida), a liberação costuma ser mais rápida. Para sparring, clinch e luta com contato, a volta é definida pelo Dr. Luis conforme a cicatrização de cada paciente. Em geral, atletas planejam uma janela de 4 a 6 semanas sem contato direto no rosto.',
  },
  {
    q: 'Meu grau é alto. Consigo fazer PRK?',
    a: 'Depende da espessura da sua córnea e do seu grau específico. Grau alto não descarta automaticamente a cirurgia. Pode indicar PRK, LASIK ou lente fácica, conforme os exames. É exatamente para isso que existe a avaliação.',
  },
  {
    q: 'Quanto tempo antes de uma competição devo fazer a cirurgia?',
    a: 'A recomendação é planejar a cirurgia com pelo menos 60 dias de antecedência em relação a competições que envolvam contato. Isso garante tempo para a cicatrização, para os retornos e para o ajuste da visão antes de você voltar a competir de verdade.',
  },
]

const ATLETA_TESTIMONIALS = [
  {
    quote: 'Um dia pós-cirurgia já consigo ler todas as placas e faixas.',
    meta: 'Paciente do IBR',
  },
]

export default function Atleta() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroBgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <>
      <ReducedMotion />
      <PageMeta
        title="PRK São Paulo para Atletas de Contato | IBR — Instituto Brasileiro de Refrativa"
        description="PRK para atletas de MMA, jiu-jitsu e boxe em São Paulo. Sem flap na córnea, sem risco de deslocamento por impacto. Avaliação gratuita online — IBR, Dr. Luis Felipe Bortolan."
      />
      <Header />

      <main>
        {/* ── HERO ── */}
        <HeroWrap ref={heroRef}>
          <motion.div style={{ y: heroBgY, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <HeroBg />
            <HeroGrain aria-hidden="true" />
            <LensArc aria-hidden="true" />
          </motion.div>
          <HeroInner>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                <Eyebrow $dark>Para quem treina, luta e precisa da visão para competir</Eyebrow>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
                <HeroH1>PRK em São Paulo: a técnica sem flap na córnea, pensada para quem leva impacto.</HeroH1>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.22}>
                <HeroSub>
                  Se você pratica MMA, jiu-jitsu, boxe ou qualquer esporte de contato e ainda
                  depende de óculos ou lente, existe uma razão técnica pela qual o LASIK não é
                  a indicação mais segura para o seu caso. E existe outra técnica que resolve
                  isso, se você for candidato.
                </HeroSub>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.34}>
                <CtaPrimary href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  aria-label="Fazer avaliação gratuita online pelo WhatsApp">
                  Faça sua avaliação gratuita online
                  <ArrowRight size={18} aria-hidden="true" />
                </CtaPrimary>
                <MicroCopy $dark>
                  O primeiro passo é a equipe do IBR ver se você é candidato ao PRK. Grátis e online.
                </MicroCopy>
              </motion.div>
            </div>

            {/* Hero visual — atleta.png quando disponível; fallback gracioso */}
            <motion.div variants={fadeIn} initial="hidden" animate="visible" custom={0.45}
              style={{ position: 'relative', zIndex: 2 }}>
              <HeroVisual $hasImage>
                <img
                  src="/fotos/atleta.png"
                  alt="Atleta de contato — visão livre para competir"
                  loading="eager"
                  onError={e => { e.target.style.display = 'none' }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover',
                    objectPosition: 'center', display: 'block' }}
                />
              </HeroVisual>
            </motion.div>
          </HeroInner>
        </HeroWrap>

        {/* ── IDENTIFICAÇÃO ── */}
        <SectionLight $bg="var(--creme)">
          <Container>
            <IdentGrid>
              <Reveal>
                <ClinicaImg>
                  <img src="/fotos/clinica-4.jpg"
                    alt="Sala de exame IBR — equipamento de avaliação ocular"
                    loading="lazy" />
                </ClinicaImg>
              </Reveal>
              <Reveal delay={0.1}>
                <Eyebrow>Identificação</Eyebrow>
                <Divider />
                <H2Light $mb="28px">Você luta e ainda depende de óculos ou lente. Conhece essa situação?</H2Light>
                <DorList>
                  {ATLETA_DOR.map((d, i) => <DorItem key={i}>{d}</DorItem>)}
                </DorList>
                <BodyText>
                  <p>
                    Não é frescura. É uma limitação real que interfere na performance e no
                    risco de lesão ocular. A boa notícia: existe uma técnica desenvolvida para
                    esse perfil. A pergunta é se você é candidato a ela.
                  </p>
                </BodyText>
              </Reveal>
            </IdentGrid>
          </Container>
        </SectionLight>

        {/* ── MECANISMO PRK vs LASIK ── */}
        <SectionDark $bg="var(--navy-deep)">
          <Container>
            <Reveal>
              <Eyebrow $dark>Por que PRK e não LASIK para quem leva impacto</Eyebrow>
              <H2Dark $mb="28px">LASIK cria um flap na córnea. PRK não. Para quem recebe impacto no rosto, essa diferença importa.</H2Dark>
            </Reveal>
            <Reveal delay={0.08}>
              <BodyText $dark style={{ maxWidth: '760px' }}>
                <p>
                  O LASIK é a técnica mais comum de cirurgia refrativa. Funciona muito bem para a maioria
                  das pessoas. O procedimento cria um flap — uma fina camada de tecido na superfície da córnea
                  que é levantada, o laser aplica a correção embaixo, e o flap é reposicionado.
                </p>
                <p>
                  Na maior parte dos casos, esse flap se integra bem e não representa problema. Para quem
                  pratica esporte de contato, porém, existe uma preocupação específica: um impacto forte na
                  região do olho pode, em teoria, deslocar o flap, especialmente nos primeiros anos. É um
                  evento raro, mas é um risco que existe e que o médico precisa considerar na indicação.
                </p>
                <p>
                  O PRK funciona de forma diferente. Não há flap. O laser age diretamente na superfície da
                  córnea, que cicatriza por cima. O resultado visual é comparável ao LASIK. A córnea fica
                  estruturalmente intacta. Para o atleta de contato, essa é a técnica que elimina a
                  preocupação específica do impacto, depois do período de cicatrização.
                </p>
                <p>
                  A recuperação visual no PRK é mais gradual: em geral, a visão estabiliza em 30 a 60 dias.
                  O planejamento da janela de recuperação faz parte da indicação para atletas. A técnica
                  certa para o seu caso depende dos seus exames.
                </p>
              </BodyText>
            </Reveal>
            <MecGrid>
              <Reveal delay={0.1}>
                <MecCard>
                  <MecLabel style={{ color: 'rgba(201,194,178,0.45)' }}>LASIK</MecLabel>
                  <MecTitle>Cria flap na córnea</MecTitle>
                  <MecBody>
                    Recuperação visual rápida. Indicado para a maioria dos candidatos. Para atletas de
                    contato, o flap representa uma preocupação específica com impacto.
                  </MecBody>
                </MecCard>
              </Reveal>
              <Reveal delay={0.18}>
                <MecCard style={{ borderColor: 'rgba(254,177,97,0.2)' }}>
                  <MecLabel style={{ color: 'var(--amber)' }}>PRK · Indicação para atletas</MecLabel>
                  <MecTitle style={{ color: 'var(--amber)' }}>Sem flap — córnea intacta</MecTitle>
                  <MecBody>
                    Recuperação visual mais gradual (30–60 dias). Após a cicatrização, a córnea fica
                    estruturalmente intacta. Elimina a preocupação específica do impacto no flap.
                  </MecBody>
                </MecCard>
              </Reveal>
            </MecGrid>
          </Container>
        </SectionDark>

        {/* ── AUTORIDADE ── */}
        <DrAutoridade variant="atleta"
          note="O Dr. Luis é o especialista que avalia, opera e acompanha cada atleta pessoalmente. A indicação de técnica — PRK, LASIK ou lente fácica — parte dos exames do seu caso." />

        {/* ── JORNADA DO ATLETA ── */}
        <JornadaAtletaWrap>
          <Container>
            <Reveal>
              <Eyebrow>Como funciona</Eyebrow>
              <H2Light $mb="40px">Como é o caminho, do primeiro contato à volta ao treino.</H2Light>
            </Reveal>
            <JornadaList>
              {[
                { label: 'Avaliação gratuita e online', body: 'Você descreve seu caso (esporte, grau, rotina). A equipe do IBR analisa e dá um retorno.' },
                { label: 'Consulta com exames', body: 'Mapeamento de córnea, avaliação da espessura, visão detalhada. É aqui que se confirma se PRK é a indicação para o seu caso.' },
                { label: 'Plano com o Dr. Luis', body: 'Técnica, data, cuidados pré e pós-operatórios, janela de recuperação para o atleta.' },
                { label: 'A cirurgia', body: 'Conduzida pelo Dr. Luis Felipe Bortolan.' },
                { label: 'Pós-operatório acompanhado', body: 'Retornos programados. Para o atleta, a liberação para contato é definida pelo Dr. Luis com base na cicatrização de cada caso.' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <JornadaItem>
                    <JornadaItemBody>
                      <p><strong>{item.label}</strong> — {item.body}</p>
                    </JornadaItemBody>
                  </JornadaItem>
                </Reveal>
              ))}
            </JornadaList>
          </Container>
        </JornadaAtletaWrap>

        {/* ── PROVA SOCIAL ── */}
        <SectionLight $bg="var(--white)">
          <Container>
            <Reveal>
              <Eyebrow>Depoimentos</Eyebrow>
              <H2Light $mb="48px">O que pacientes do IBR dizem.</H2Light>
            </Reveal>
            <TestimonialCards testimonials={ATLETA_TESTIMONIALS} />
            <Reveal delay={0.15}>
              <TestimonialDisclaimer>
                Relato de paciente do IBR, utilizado com consentimento.
                Resultados variam conforme avaliação individual.
              </TestimonialDisclaimer>
            </Reveal>
          </Container>
        </SectionLight>

        {/* ── FAQ ── */}
        <FaqSection
          title="As perguntas que todo atleta faz antes de decidir."
          items={ATLETA_FAQ}
        />

        {/* ── MÉTODO PÍLULA ── */}
        <MetodoPilulaSection />

        {/* ── CTA FINAL ── */}
        <CtaFinal
          ctaLabel="Agende sua avaliação gratuita online"
          microcopy="O primeiro passo é a equipe do IBR ver se você é candidato ao PRK. Grátis e online."
        />
      </main>

      <Footer />
    </>
  )
}
