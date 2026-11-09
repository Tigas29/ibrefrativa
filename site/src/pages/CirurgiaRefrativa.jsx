import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GlobalLP, Page } from './cirurgiaRefrativa/estilos'
import {
  WA_NUMERO, WA_MSG_HEADER, TITULOS, KICKERS, FOTOS, DORES, DEPOIMENTOS, VIDEOS,
  PASSOS, FAQ, MOTIVOS_FORA,
} from './cirurgiaRefrativa/conteudo'

const SITE = 'https://ibrefrativa.com.br'
const CANONICAL = `${SITE}/cirurgia-refrativa`
const TITLE = 'Cirurgia refrativa a laser em SP · Av. Paulista | IBR'
const DESCRIPTION =
  'Pare de usar óculos com cirurgia refrativa a laser na Av. Paulista. Indicada de 21 a 39 anos, até 10 graus de miopia. Veja em 3 perguntas se o seu caso dá.'
const OG_IMAGE = `${SITE}/fotos/lp/og-dr.jpg`
const MAPS_EMBED = 'https://www.google.com/maps?q=Av.+Paulista,+91,+S%C3%A3o+Paulo&output=embed'
const MAPS_ROTA = 'https://www.google.com/maps/dir/?api=1&destination=Av.+Paulista,+91,+S%C3%A3o+Paulo'
const waLink = (msg) => `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(msg)}`

/* ───────── pequenos componentes ───────── */

// Pendência visível, fácil de achar e de tirar antes de publicar.
function Pendente({ children }) {
  return <mark className="pend">{children}</mark>
}

function Partes({ partes }) {
  return partes.map((p, i) =>
    typeof p === 'string' ? <span key={i}>{p}</span> : <Pendente key={i}>{p.pend}</Pendente>,
  )
}

function Foto({ id, alt = '', className = '', pos = '50% 50%', eager = false, sizes = '(min-width: 900px) 50vw, 100vw' }) {
  const f = FOTOS[id]
  const base = `/fotos/lp/${f.n}`
  const props = f.multi
    ? { src: `${base}-800.webp`, srcSet: `${base}-800.webp 800w, ${base}-1600.webp 1600w`, sizes }
    : { src: `${base}.webp` }
  return (
    <div className={`ph ${className}`}>
      <img
        {...props}
        width={f.w}
        height={f.h}
        alt={alt}
        style={{ objectPosition: pos }}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'auto' : 'async'}
        {...(eager ? { fetchpriority: 'high' } : {})}
      />
    </div>
  )
}

// Reveal discreto: fade + 16px. Respeita prefers-reduced-motion (via CSS) e some se não houver IntersectionObserver.
function Reveal({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setOn(true); return }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`rv ${on ? 'in' : ''} ${className}`} {...rest}>{children}</Tag>
}

function useMedia(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches
  const [m, setM] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const fn = () => setM(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [query])
  return m
}

function useVisivel(ref) {
  const [vis, setVis] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return vis
}

// Canonical, Open Graph e Twitter. Limpa ao sair da rota.
function useHeadTags() {
  useEffect(() => {
    const created = []
    const add = (tag, attrs) => {
      const el = document.createElement(tag)
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
      document.head.appendChild(el)
      created.push(el)
    }
    add('link', { rel: 'canonical', href: CANONICAL })
    const og = {
      'og:type': 'website', 'og:locale': 'pt_BR', 'og:site_name': 'IBR · Instituto Brasileiro de Refrativa',
      'og:title': TITLE, 'og:description': DESCRIPTION, 'og:url': CANONICAL,
      'og:image': OG_IMAGE, 'og:image:width': '1200', 'og:image:height': '630',
      'og:image:alt': 'Dr. Luis Felipe Bortolan, oftalmologista',
    }
    Object.entries(og).forEach(([property, content]) => add('meta', { property, content }))
    add('meta', { name: 'twitter:card', content: 'summary_large_image' })
    add('meta', { name: 'twitter:image', content: OG_IMAGE })
    // Título e description (o PageMeta do site puxa o framer-motion junto; aqui fica leve)
    const prevTitle = document.title
    document.title = TITLE
    let md = document.querySelector('meta[name="description"]')
    if (!md) { md = document.createElement('meta'); md.setAttribute('name', 'description'); document.head.appendChild(md); created.push(md) }
    const prevDesc = md.getAttribute('content')
    md.setAttribute('content', DESCRIPTION)
    return () => {
      created.forEach((el) => el.remove())
      document.title = prevTitle
      const m = document.querySelector('meta[name="description"]')
      if (m && prevDesc) m.setAttribute('content', prevDesc)
    }
  }, [])
}

/* ───────── página ───────── */

const OPCOES = {
  idade: ['Menos de 21', '21 a 39', '40 ou mais'],
  grau: ['Até 10', 'Mais de 10', 'Não sei'],
  cornea: ['Não tenho', 'Tenho', 'Não sei'],
}

function avaliar({ idade, grau, cornea }) {
  if (!idade || !grau || !cornea) return null
  let motivo = ''
  if (idade === 'Menos de 21') motivo = MOTIVOS_FORA.menor
  else if (idade === '40 ou mais') motivo = MOTIVOS_FORA.maior
  else if (grau === 'Mais de 10') motivo = MOTIVOS_FORA.grau
  else if (cornea === 'Tenho') motivo = MOTIVOS_FORA.cornea
  const g = grau === 'Não sei' ? 'não sei o meu grau certinho' : 'uso até 10 graus'
  const c = cornea === 'Não sei' ? 'não sei se tenho algo na córnea' : 'não tenho ceratocone'
  const msg = `Olá! Vim pela página do IBR. Tenho de 21 a 39 anos, ${g} e ${c}. Quero saber se posso fazer a cirurgia refrativa.`
  return { dentro: !motivo, motivo, msg }
}

const brl = (v) => 'R$ ' + v.toLocaleString('pt-BR')

export default function CirurgiaRefrativa() {
  const [params] = useSearchParams()
  const vRaw = (params.get('v') || 'a').toLowerCase()
  const gRaw = (params.get('g') || 'refrativa').toLowerCase()
  const v = TITULOS[vRaw] ? vRaw : 'a'
  const g = KICKERS[gRaw] ? gRaw : 'refrativa'

  useHeadTags()
  const desktop = useMedia('(min-width: 900px)')

  // Rastreamento: todo clique que abre o WhatsApp
  const track = (origem) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'whatsapp_click', origem, v, g })
    // TODO Google Ads: gtag('event','conversion',{send_to:'AW-XXXX/YYYY'})
  }

  // Âncora na carga (a SPA monta depois do scroll nativo)
  useEffect(() => {
    if (!window.location.hash) return
    const t = setTimeout(() => document.getElementById(window.location.hash.slice(1))?.scrollIntoView(), 150)
    return () => clearTimeout(t)
  }, [])

  // Barra fixa do celular
  const heroRef = useRef(null)
  const checadorRef = useRef(null)
  const heroVis = useVisivel(heroRef)
  const checVis = useVisivel(checadorRef)
  const barraOn = !heroVis && !checVis

  // Checador
  const [resp, setResp] = useState({ idade: '', grau: '', cornea: '' })
  const res = avaliar(resp)
  const [anos, setAnos] = useState(12)
  const [gasto, setGasto] = useState(1500)
  const [aberta, setAberta] = useState(0)

  const dores = useMemo(() => (v === 'b' ? [DORES[1], DORES[0], DORES[2], DORES[3]] : DORES), [v])

  const jsonLd = useMemo(
    () => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map(([q, partes]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: partes.filter((p) => typeof p === 'string').join('').replace(/\s+/g, ' ').trim(),
        },
      })),
    }),
    [],
  )

  const nota1 = 'São 3 perguntas: idade, grau e se você tem algo na córnea.'
  const nota2 = 'O valor a gente te passa logo depois, na conversa, com parcelamento em até 12 vezes sem juros.'
  const valor = g === 'valor'

  const nav = (className) => (
    <nav aria-label="Seções" className={`nav ${className || ''}`}>
      <a href="#quem-pode-fazer">Quem pode fazer</a>
      <a href="#como-funciona">Como funciona</a>
      <a href="#perguntas">Dúvidas</a>
      <a href="#onde-fica">Onde fica</a>
    </nav>
  )

  const escolha = (campo, titulo) => (
    <div className="stack" style={{ gap: 10 }} role="group" aria-label={titulo}>
      <p className="s" style={{ fontWeight: 700 }}>{titulo}</p>
      <div className="opts">
        {OPCOES[campo].map((o) => (
          <button
            key={o}
            type="button"
            className="opt"
            aria-pressed={resp[campo] === o}
            onClick={() => setResp((r) => ({ ...r, [campo]: o }))}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <Page>
      <GlobalLP />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* Header fixo, só desta página */}
      <header className="hdr">
        <div className="hdr-in">
          <a href="#topo" aria-label="IBR · Instituto Brasileiro de Refrativa">
            <img className="hdr-logo" src="/fotos/lp/logo-navy.webp" width="340" height="75" alt="IBR · Instituto Brasileiro de Refrativa" />
          </a>
          <div className="hdr-r">
            {nav()}
            <a
              className="hdr-wa"
              href={waLink(WA_MSG_HEADER)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('header')}
            >
              <span className="sm">WhatsApp</span>
              <span className="lg">Falar no WhatsApp</span>
            </a>
          </div>
        </div>
        {nav("m")}
      </header>

      <main id="topo">
        {/* Abertura */}
        <section className="hero" ref={heroRef}>
          <div className="hero-top">
            <p className="k">{KICKERS[g]}</p>
            <h1 className="h1">{TITULOS[v]}</h1>
          </div>

          <div className="hero-img ph" style={{ position: 'relative' }}>
            {desktop ? (
              <>
                <img
                  src="/fotos/lp/dr-editorial.webp"
                  width={800}
                  height={1200}
                  alt="Dr. Luis Felipe Bortolan"
                  style={{ objectPosition: '50% 18%', position: 'absolute', inset: 0 }}
                  fetchpriority="high"
                />
                <p className="hero-foto-leg">Dr. Luis Felipe Bortolan · oftalmologista</p>
              </>
            ) : (
              <img
                src="/fotos/lp/cena-criado-mudo-800.webp"
                srcSet="/fotos/lp/cena-criado-mudo-800.webp 800w, /fotos/lp/cena-criado-mudo-1600.webp 1600w"
                sizes="100vw"
                width={1600}
                height={1067}
                alt="Óculos numa bandeja ao lado da cama, ao amanhecer"
                fetchpriority="high"
              />
            )}
          </div>

          <div className="hero-body">
            <p className="hero-lead">
              Cirurgia refrativa a laser para miopia e astigmatismo, os dois olhos no mesmo dia, com o Dr. Luis Felipe Bortolan. Se você tem de 21 a 39 anos, descubra em 3 perguntas no WhatsApp se você é um candidato para realizar essa cirurgia.
            </p>
            {valor && <p className="hero-note" style={{ color: 'inherit', fontWeight: 700 }}>{nota2}</p>}
            <div className="hero-cta">
              <a href="#quem-pode-fazer" className="cta">Quero me livrar dos óculos</a>
              <p className="hero-note">{valor ? nota1 : `${nota1} ${nota2}`}</p>
            </div>
            <div className="prova">
              <div><p className="big">2.000+</p><p className="s">cirurgias refrativas</p></div>
              <div><p className="big">HC-USP</p><p className="s">fellowship em refrativa</p></div>
              <div><p className="mid">CRM-SP 205675</p><p className="s">RQE 148991</p></div>
            </div>
          </div>
        </section>

        {/* 01 · Dores */}
        <section className="sec">
          <div className="ct">
            <Reveal className="row sec-head">
              <p className="num c3" aria-hidden="true">01</p>
              <h2 className="h2 c9">Em qual destas você se reconhece?</h2>
            </Reveal>
            <div className="dores">
              {dores.map((d) => (
                <Reveal as="article" className="dor" key={d.id}>
                  <Foto id={d.foto} pos={d.pos} />
                  <p className="k terra">{d.kicker}</p>
                  <h3 className="h3">{d.titulo}</h3>
                  <p className="p">{d.texto}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="sec">
          <div className="ct">
            <Reveal className="stack" style={{ gap: 20 }}>
              <h2 className="h2" style={{ maxWidth: 820 }}>O que quem operou com o Dr. Luis conta depois</h2>
              <p className="s muted">Vídeos e mensagens de pacientes do IBR, publicados com autorização.</p>
            </Reveal>
            <Reveal className="depo">
              <div className="vids">
                {VIDEOS.map((v) => (
                  <figure className="vid" key={v.id}>
                    <video
                      controls
                      playsInline
                      preload="none"
                      poster={`/videos/lp/depoimento-${v.id}.webp`}
                      width="540"
                      height="960"
                      onPlay={() => { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: 'video_play', video: v.id }) }}
                    >
                      <source src={`/videos/lp/depoimento-${v.id}.mp4`} type="video/mp4" />
                    </video>
                    <figcaption>{v.legenda}</figcaption>
                  </figure>
                ))}
              </div>
              <div className="quotes">
                {DEPOIMENTOS.map((d) => (
                  <blockquote className="q" key={d.texto}>
                    <p className="t">{d.texto}</p>
                    <p className="k muted"><Partes partes={d.fonte} /></p>
                  </blockquote>
                ))}
              </div>
            </Reveal>
          </div>
          <Foto id="salto" className="salto" pos="50% 35%" sizes="100vw" />
          <div className="ct">
            <Reveal className="ponte-cta">
              <p className="p" style={{ fontWeight: 700, maxWidth: 640 }}>
                Se você se reconheceu em algum desses momentos, a pergunta agora é prática: dá para fazer no seu olho?
              </p>
              <a href="#quem-pode-fazer" className="cta">Quero me livrar dos óculos</a>
            </Reveal>
          </div>
        </section>

        {/* 02 · Como funciona a cirurgia */}
        <section className="sec">
          <div className="ct">
            <Reveal className="row sec-head">
              <p className="num c3" aria-hidden="true">02</p>
              <div className="c9 stack">
                <p className="k terra">Como funciona a cirurgia de miopia a laser</p>
                <h2 className="h2">Quem escolhe a técnica é a sua córnea.</h2>
              </div>
            </Reveal>
            <div className="row" style={{ marginTop: desktop ? 48 : 0, rowGap: 0 }}>
              <div className="c5">
                <Foto id="cornea" className="cornea-foto" alt="Olho de perfil, com a curva da córnea à mostra" />
              </div>
              <Reveal className="c7 stack cornea-txt">
                <p className="p">A cirurgia refrativa, que muita gente chama de cirurgia de miopia, corrige o grau com um laser que remodela a córnea, a camada transparente na frente do olho. Para isso, a córnea precisa ter espessura e formato que aguentem a correção.</p>
                <p className="p">É isso que o Pentacam mede. Ele mapeia a córnea e mostra se existe ceratocone ou outra coisa que contraindique a cirurgia. Com esse mapa na mão, o Dr. Luis vê o que dá para fazer no seu olho e qual técnica serve:</p>
                <div className="tecs">
                  <div className="tec"><p className="nm">PRK</p><p className="s">O laser trabalha direto na superfície da córnea, sem levantar lâmina nenhuma. É a técnica que o Dr. Luis indica na maioria dos casos, e a que pesa a favor de quem leva impacto no rosto.</p></div>
                  <div className="tec"><p className="nm">LASIK</p><p className="s">O cirurgião levanta uma lâmina fina da córnea e aplica o laser por baixo. Entra quando o exame mostra que o seu olho permite.</p></div>
                </div>
                <p className="p">Se o exame mostrar que a cirurgia não serve para você, o Dr. Luis te diz isso também.</p>
                <div className="stats3">
                  <div><p className="big">10 a 15</p><p className="s">minutos de cirurgia</p></div>
                  <div><p className="big">2</p><p className="s">olhos no mesmo dia, com colírio anestésico</p></div>
                  <div><p className="big">1</p><p className="s">dia: você vai para casa no mesmo dia</p></div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 03 · Checador + critérios */}
        <section id="quem-pode-fazer" className="sec" ref={checadorRef}>
          <div className="ct">
            <div className="row" style={{ rowGap: 0 }}>
              <Reveal className="c7 stack">
                <p className="num" aria-hidden="true">03</p>
                <h2 className="h2">Quem pode fazer: idade e grau</h2>
                <p className="p">Marque as 3 respostas. Se o seu caso entrar, o WhatsApp abre com elas já escritas.</p>
                {escolha("idade", "Sua idade")}
                {escolha("grau", "Seu grau de miopia")}
                {escolha("cornea", "Ceratocone ou outro problema na córnea?")}
                <div aria-live="polite" className="stack" style={{ gap: 0 }}>
                  {res && res.dentro && (
                    <div className="res-in" data-resultado="dentro">
                      <p className="h3">Pelas suas respostas, faz sentido seguir para o exame.</p>
                      <div className="msg">{res.msg}</div>
                      <a
                        href={waLink(res.msg)}
                        className="cta"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track('checador')}
                      >
                        Abrir o WhatsApp com essas respostas
                      </a>
                    </div>
                  )}
                  {res && !res.dentro && (
                    <div className="res-out" data-resultado="fora">
                      <p className="h3">Pelo que você marcou, a cirurgia a laser que o Dr. Luis faz não é indicada para o seu caso.</p>
                      <p className="p">{res.motivo}</p>
                      <a href="#perguntas" className="s" style={{ fontWeight: 700, textDecoration: 'underline' }}>Ver as perguntas sobre idade e grau</a>
                    </div>
                  )}
                </div>
              </Reveal>
              <Reveal className="c5">
                <div className="crit crit-box sticky">
                  <p className="s" style={{ fontWeight: 700 }}>A indicação completa do Dr. Luis:</p>
                  <p className="s">21 a 39 anos · miopia de até 10 graus, com ou sem astigmatismo · grau parado, sem aumentar · sem ceratocone · nunca operou os olhos · não está grávida nem amamentando.</p>
                  <p className="s">Não sabe o seu grau certinho, ou se tem algo na córnea? Tudo bem. A receita do óculos já dá uma ideia, e quem confirma é o exame.</p>
                  <p className="s muted">Se o que você quer é largar o óculos de leitura, a refrativa a laser não serve para isso. A vista cansada chega para todo mundo lá pelos 40 e poucos anos, operado ou não.</p>
                  <p className="s">Se o seu caso fica fora da lista, melhor saber agora do que depois de uma tarde no consultório.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 04 · A conta */}
        <section className="sec">
          <div className="ct">
            <Reveal className="row sec-head">
              <p className="num c3" aria-hidden="true">04</p>
              <div className="c9 stack">
                <h2 className="h2">Quanto você já gastou para enxergar?</h2>
                <p className="p" style={{ maxWidth: 760 }}>Some o último ano: o óculos, a lente nova porque o grau subiu, a armação, as lentes de contato, a solução, o colírio, a consulta para trocar o grau. Agora multiplique pelos anos que você já usa, e pelos que ainda tem pela frente.</p>
              </div>
            </Reveal>
            <Reveal className="row" style={{ marginTop: desktop ? 40 : 16, rowGap: 16 }}>
              <div className="c7 calc">
                <label>
                  <span className="s" style={{ fontWeight: 700 }}>Há quantos anos você usa óculos ou lente: {anos} anos</span>
                  <input className="rng" type="range" min="1" max="30" step="1" value={anos} onChange={(e) => setAnos(Number(e.target.value))} />
                </label>
                <label>
                  <span className="s" style={{ fontWeight: 700 }}>Quanto gasta por ano, somando tudo: {brl(gasto)}</span>
                  <input className="rng" type="range" min="300" max="5000" step="100" value={gasto} onChange={(e) => setGasto(Number(e.target.value))} />
                </label>
                <div className="total" aria-live="polite">
                  <p className="s">Até hoje, mais ou menos</p>
                  <p className="v">{brl(anos * gasto)}</p>
                </div>
              </div>
              <p className="p c5" style={{ alignSelf: 'center' }}>Essa conta não para enquanto você depender deles. A cirurgia é paga uma vez só, e dá para parcelar em até 12 vezes sem juros no cartão.</p>
            </Reveal>
          </div>
        </section>

        {/* 05 · Dr. */}
        <section className="sec">
          <div className="ct">
            <Reveal className="row" style={{ rowGap: 16 }}>
              <div className="c4 stack">
                <p className="num" aria-hidden="true">05</p>
                <Foto id="drHeadshot" className="dr-foto" alt="Dr. Luis Felipe Bortolan" pos="50% 25%" />
              </div>
              <div className="c8 stack" style={{ alignSelf: desktop ? 'end' : 'auto' }}>
                <h2 className="h2">Dr. Luis Felipe Bortolan</h2>
                <p className="k">Oftalmologista · CRM-SP 205675 · RQE 148991</p>
                <div className="dr-lista">
                  <p className="p"><b>Mais de 2.000</b> cirurgias refrativas</p>
                  <p className="p">Fellowship em catarata e cirurgia refrativa no <b>Hospital das Clínicas da USP</b></p>
                  <p className="p">Residência em oftalmologia no Instituto Suel Abujamra</p>
                  <p className="p">Formado em medicina pela FAMINAS-BH</p>
                </div>
                <p className="p">No IBR, quem analisa o seu Pentacam na consulta é o Dr. Luis. É ele quem opera e quem te acompanha nos retornos depois da cirurgia.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 06 · Passos */}
        <section id="como-funciona" className="sec">
          <div className="ct">
            <Reveal className="row sec-head">
              <p className="num c3" aria-hidden="true">06</p>
              <h2 className="h2 c9">Do WhatsApp à cirurgia, em 4 passos</h2>
            </Reveal>
            <Reveal>
              <ol className="passos passos-4">
                {PASSOS.map((p, i) => (
                  <li className="passo" key={p.t}>
                    <span className="n">{i + 1}</span>
                    <div>
                      <p className="h3" style={{ fontSize: desktop ? 21 : 19 }}>{p.t}</p>
                      <p className="s" style={{ marginTop: 6 }}>{p.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Foto id="lampada" className="lampada" alt="Lâmpada de fenda num consultório" pos="50% 60%" sizes="100vw" />
          </div>
        </section>

        {/* 07 · Onde fica */}
        <section id="onde-fica" className="sec">
          <div className="ct">
            <Reveal className="row" style={{ rowGap: 16 }}>
              <div className="c5 stack">
                <p className="num" aria-hidden="true">07</p>
                <h2 className="h2">Av. Paulista, 91, sala 1001</h2>
                <p className="k">10º andar · Bela Vista · São Paulo</p>
                <p className="p">O exame e a consulta com o Dr. Luis são no mesmo prédio.</p>
                <p className="s">Mora fora de São Paulo? O exame pode ser feito na sua cidade, se tiver Pentacam por aí. A consulta e a cirurgia são aqui.</p>
              </div>
              <div className="c7 stack" style={{ alignSelf: 'end' }}>
                <div className="mapa">
                  <iframe
                    title="Mapa: IBR, Av. Paulista, 91, São Paulo"
                    src={MAPS_EMBED}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <a href={MAPS_ROTA} className="cta dark" target="_blank" rel="noopener noreferrer">Como chegar</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 08 · Perguntas */}
        <section id="perguntas" className="sec">
          <div className="ct">
            <Reveal className="row">
              <p className="num c3" aria-hidden="true">08</p>
              <div className="c9 stack">
                <h2 className="h2" style={{ maxWidth: 820 }}>Cirurgia de miopia: o que todo mundo pergunta antes de operar</h2>
                <div className="faq-col">
                  <div className="faq-lista">
                    {FAQ.map(([q, partes], i) => {
                      const open = aberta === i
                      return (
                        <div key={q}>
                          <button
                            type="button"
                            className="faq-b"
                            aria-expanded={open}
                            aria-controls={`faq-r-${i}`}
                            id={`faq-b-${i}`}
                            onClick={() => setAberta(open ? -1 : i)}
                          >
                            <span>{q}</span>
                            <span className="sinal" aria-hidden="true">{open ? '−' : '+'}</span>
                          </button>
                          <div id={`faq-r-${i}`} role="region" aria-labelledby={`faq-b-${i}`} hidden={!open} className="faq-r">
                            <p className="p"><Partes partes={partes} /></p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Fechamento */}
        <section className="fecha">
          <div className="ct">
            <Reveal className="row" style={{ rowGap: 24 }}>
              <div className="c7 stack" style={{ gap: 18 }}>
                <p className="num" aria-hidden="true">39</p>
                <h2 className="h2">A cirurgia a laser tem idade certa.</h2>
                <p className="p">O Dr. Luis indica a refrativa a laser até os 39 anos. Lá pelos 40 e poucos chega a vista cansada, e a indicação muda. Cada ano adiado é mais um ano de óculos, lente e colírio, e um ano a menos dentro dessa janela.</p>
              </div>
              <div className="c5 stack" style={{ gap: 18, alignSelf: 'end' }}>
                <p className="s sand">A paciente que passou 29 anos de óculos escreveu isto depois de operar:</p>
                <blockquote><p className="fecha-q">"Depois de 29 anos dependendo de óculos e lentes, finalmente fiquei livre dos meus +7 graus de miopia. O único arrependimento foi não ter feito antes."</p></blockquote>
                <p className="p">Se você tem de 21 a 39 anos e o seu grau parou de aumentar, o primeiro passo são 3 perguntas no WhatsApp.</p>
                <a href="#quem-pode-fazer" className="cta">Quero me livrar dos óculos</a>
                <p className="s sand">
                  <a href={waLink(WA_MSG_HEADER)} target="_blank" rel="noopener noreferrer" onClick={() => track('fechamento')} style={{ textDecoration: 'underline' }}>WhatsApp (11) 5028-4894</a>
                </p>
                <p className="s"><b>P.S.</b> Fazer o exame não te compromete com a cirurgia. Você sai sabendo o que dá para fazer no seu olho e decide depois.</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="ct">
          <img className="foot-logo" src="/fotos/lp/logo-branca.webp" width="340" height="75" alt="IBR" loading="lazy" />
          <p className="s">Av. Paulista, 91, sala 1001, 10º andar · Bela Vista · São Paulo, SP</p>
          <p className="s">WhatsApp (11) 5028-4894 · Instagram <a href="https://www.instagram.com/drluisfelipebortolan/" target="_blank" rel="noopener noreferrer">@drluisfelipebortolan</a></p>
          <p className="s">Responsável técnico: Dr. Luis Felipe Bortolan · CRM-SP 205675 · RQE 148991</p>
          <p className="s fino">Os resultados variam de pessoa para pessoa. A indicação da cirurgia depende de exames e da avaliação do médico.</p>
        </div>
      </footer>

      {/* Barra fixa do celular */}
      <div className={`barra ${barraOn ? 'on' : ''}`} aria-hidden={!barraOn}>
        <a href="#quem-pode-fazer" className="cta" tabIndex={barraOn ? 0 : -1}>Quero me livrar dos óculos</a>
      </div>
    </Page>
  )
}
