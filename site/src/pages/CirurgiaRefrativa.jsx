import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GlobalLP, Page } from './cirurgiaRefrativa/estilos'
import {
  WA_NUMERO, PRECO, waMsgs, KICKER_TOPO, TOPO, FOTOS, DEPOIMENTOS, VIDEOS,
  PASSOS, FAQ, MOTIVOS_FORA,
} from './cirurgiaRefrativa/conteudo'

const SITE = 'https://ibrefrativa.com.br'
const CANONICAL = `${SITE}/cirurgia-refrativa`
const TITLE = 'Cirurgia refrativa a laser em SP · Av. Paulista | IBR'
const DESCRIPTION =
  'Cirurgia refrativa a laser na Av. Paulista: os 2 olhos em 12x de R$ 625 sem juros. Indicada de 21 a 39 anos, até 10 graus de miopia. Fale no WhatsApp.'
const OG_IMAGE = `${SITE}/fotos/lp/og-dr.jpg`
const MAPS_EMBED = 'https://www.google.com/maps?q=IOP+Instituto+Oftalmol%C3%B3gico+Paulista,+Av.+Paulista,+1499,+S%C3%A3o+Paulo&output=embed'
const MAPS_ROTA = 'https://www.google.com/maps/dir/?api=1&destination=IOP+Instituto+Oftalmol%C3%B3gico+Paulista,+Av.+Paulista,+1499,+S%C3%A3o+Paulo'
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

function avaliar({ idade, grau, cornea }, msgs) {
  if (!idade || !grau || !cornea) return null
  let motivo = ''
  if (idade === 'Menos de 21') motivo = MOTIVOS_FORA.menor
  else if (idade === '40 ou mais') motivo = MOTIVOS_FORA.maior
  else if (grau === 'Mais de 10') motivo = MOTIVOS_FORA.grau
  else if (cornea === 'Tenho') motivo = MOTIVOS_FORA.cornea
  // 24/nov: a mensagem leva idade + grau + córnea como foram marcados, e diz se o caso está dentro ou fora da indicação.
  const i = { 'Menos de 21': 'menos de 21 anos', '21 a 39': 'de 21 a 39 anos', '40 ou mais': '40 anos ou mais' }[idade]
  const g = { 'Até 10': 'uso até 10 graus', 'Mais de 10': 'uso mais de 10 graus', 'Não sei': 'não sei o meu grau certinho' }[grau]
  const c = { 'Não tenho': 'não tenho ceratocone', Tenho: 'tenho ceratocone ou outro problema na córnea', 'Não sei': 'não sei se tenho algo na córnea' }[cornea]
  const dentro = !motivo
  return { dentro, motivo, msg: msgs.checador(i, g, c, dentro) }
}

// Visita de anúncio do Google: o auto-tagging põe gclid/gbraid/wbraid/gad_source na URL.
function veioDoGoogle(params) {
  if (['gclid', 'gbraid', 'wbraid', 'gad_source'].some((k) => params.has(k))) return true
  return (params.get('utm_source') || '').toLowerCase() === 'google'
}

function IconeWa() {
  return (
    <svg className="wa-ic" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      />
    </svg>
  )
}

export default function CirurgiaRefrativa() {
  const [params] = useSearchParams()
  const gRaw = (params.get('g') || 'refrativa').toLowerCase()
  const g = TOPO[gRaw] ? gRaw : 'refrativa'
  const topo = TOPO[g]
  const google = useMemo(() => veioDoGoogle(params), [params])
  const msgs = useMemo(() => waMsgs(google), [google])

  useHeadTags()
  const desktop = useMedia('(min-width: 900px)')

  // Rastreamento: todo clique que abre o WhatsApp (gatilho das conversões no GTM)
  const track = (origem, extra) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'whatsapp_click', origem, g, canal: google ? 'google' : 'direto', ...extra })
  }

  // Botão que abre o WhatsApp direto, com a mensagem já escrita
  const wa = (origem, { msg = msgs.geral, className = 'cta', label = 'Quero me livrar dos óculos', tabIndex, resultado } = {}) => (
    <a
      href={waLink(msg)}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(origem, resultado ? { resultado } : undefined)}
      {...(tabIndex !== undefined ? { tabIndex } : {})}
    >
      <IconeWa />
      <span>{label}</span>
    </a>
  )

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

  // Checador (opcional: os outros botões já abrem o WhatsApp)
  const [resp, setResp] = useState({ idade: '', grau: '', cornea: '' })
  const res = avaliar(resp, msgs)
  const [aberta, setAberta] = useState(0)

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

  const nav = (className) => (
    <nav aria-label="Seções" className={`nav ${className || ''}`}>
      <a href="#valor">Valor</a>
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

  /* ───────── seções (a ordem muda no ?g=tecnica) ───────── */

  const secValor = (n) => (
    <section id="valor" className="sec" key="valor">
      <div className="ct">
        <Reveal className="row sec-head">
          <p className="num c3" aria-hidden="true">{n}</p>
          <div className="c9 stack">
            <p className="k terra">Valor e parcelamento</p>
            <h2 className="h2">O que entra nos {PRECO.parcela}</h2>
            <ul className="valor-lista">
              <li className="p"><b>A cirurgia dos 2 olhos,</b> no mesmo dia, com o Dr. Luis.</li>
              <li className="p"><b>À parte: o exame com a consulta,</b> no mesmo dia, na IOP. O Pentacam mapeia a sua córnea e o médico já analisa o resultado com você. Os dois saem por R$ 250.</li>
              <li className="p"><b>Sem juros, no cartão.</b> A cirurgia só precisa estar quitada até o dia dela.</li>
            </ul>
            <div className="valor-cta">{wa('valor', { msg: msgs.valor })}</div>
            <p className="s muted">Valor de {PRECO.mes} para a cirurgia particular dos 2 olhos. A cirurgia não é feita pelo convênio nem pelo SUS.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )

  const secDepo = () => (
    <section className="sec" key="depo">
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
            A pergunta agora é prática: dá para fazer no seu olho?
          </p>
          <div className="acoes">
            {wa('ponte')}
            <a href="#quem-pode-fazer" className="link-sec">Ou veja antes em 3 perguntas</a>
          </div>
        </Reveal>
      </div>
    </section>
  )

  const secTecnica = (n) => (
    <section className="sec" key="tecnica">
      <div className="ct">
        <Reveal className="row sec-head">
          <p className="num c3" aria-hidden="true">{n}</p>
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
  )

  const secChecador = (n) => (
    <section id="quem-pode-fazer" className="sec" ref={checadorRef} key="checador">
      <div className="ct">
        <div className="row" style={{ rowGap: 0 }}>
          <Reveal className="c7 stack">
            <p className="num" aria-hidden="true">{n}</p>
            <h2 className="h2">Quem pode fazer: idade e grau</h2>
            <p className="p">Quer saber antes de chamar? Marque as 3 respostas e o WhatsApp abre com elas já escritas.</p>
            {escolha('idade', 'Sua idade')}
            {escolha('grau', 'Seu grau de miopia')}
            {escolha('cornea', 'Ceratocone ou outro problema na córnea?')}
            <div aria-live="polite" className="stack" style={{ gap: 0 }}>
              {res && res.dentro && (
                <div className="res-in" data-resultado="dentro">
                  <p className="h3">Pelas suas respostas, faz sentido seguir para o exame.</p>
                  <div className="msg">{res.msg}</div>
                  {wa('checador', { msg: res.msg, label: 'Abrir o WhatsApp com essas respostas', resultado: 'dentro' })}
                </div>
              )}
              {res && !res.dentro && (
                <div className="res-out" data-resultado="fora">
                  <p className="h3">Pelo que você marcou, a refrativa a laser pode não ser o caminho do seu olho. O primeiro passo continua o mesmo.</p>
                  <p className="p">{res.motivo}</p>
                  <p className="p">No exame com a consulta, os dois no mesmo dia, o médico vê o seu olho e te diz o melhor caminho: outra técnica, outra cirurgia ou outro tratamento.</p>
                  {wa('checador', { msg: res.msg, label: 'Abrir o WhatsApp com essas respostas', resultado: 'fora' })}
                </div>
              )}
            </div>
          </Reveal>
          <Reveal className="c5">
            <div className="crit crit-box sticky">
              <p className="s" style={{ fontWeight: 700 }}>A indicação completa do Dr. Luis:</p>
              <p className="s">21 a 39 anos · miopia de até 10 graus, com ou sem astigmatismo · grau parado, sem aumentar · sem ceratocone · nunca operou os olhos · não está grávida nem amamentando.</p>
              <p className="s">Não sabe o seu grau certinho, ou se tem algo na córnea? Tudo bem. A receita do óculos já dá uma ideia, e quem confirma é o exame.</p>
              <p className="s muted">Se o que você quer é largar o óculos de leitura, a refrativa a laser não serve para isso. A vista cansada chega para todo mundo lá pelos 40 e poucos anos, operado ou não. Mesmo assim, o exame com a consulta mostra o que dá para fazer no seu caso.</p>
              <p className="s">Ficou fora da lista? Chama a gente do mesmo jeito. No exame com a consulta, o médico te diz o melhor caminho para o seu olho.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )

  const secDr = (n) => (
    <section className="sec" key="dr">
      <div className="ct">
        <Reveal className="row" style={{ rowGap: 16 }}>
          <div className="c4 stack">
            <p className="num" aria-hidden="true">{n}</p>
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
  )

  const secPassos = (n) => (
    <section id="como-funciona" className="sec" key="passos">
      <div className="ct">
        <Reveal className="row sec-head">
          <p className="num c3" aria-hidden="true">{n}</p>
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
  )

  const secOnde = (n) => (
    <section id="onde-fica" className="sec" key="onde">
      <div className="ct">
        <Reveal className="row" style={{ rowGap: 16 }}>
          <div className="c5 stack">
            <p className="num" aria-hidden="true">{n}</p>
            <h2 className="h2">Av. Paulista, 1499, 9º andar</h2>
            <p className="k">IOP · do lado do metrô Trianon-MASP · São Paulo</p>
            <p className="p">O exame e a consulta são no mesmo dia, no mesmo lugar.</p>
            <p className="s">Mora fora de São Paulo? Exame e consulta saem no mesmo dia, então dá para resolver numa vinda só.</p>
          </div>
          <div className="c7 stack" style={{ alignSelf: 'end' }}>
            <div className="mapa">
              <iframe
                title="Mapa: IOP, Av. Paulista, 1499, São Paulo"
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
  )

  const secFaq = (n) => (
    <section id="perguntas" className="sec" key="faq">
      <div className="ct">
        <Reveal className="row">
          <p className="num c3" aria-hidden="true">{n}</p>
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
  )

  const SECOES = {
    valor: secValor, depo: secDepo, tecnica: secTecnica, checador: secChecador,
    dr: secDr, passos: secPassos, onde: secOnde, faq: secFaq,
  }
  const ordem = g === 'tecnica'
    ? ['tecnica', 'valor', 'depo', 'checador', 'dr', 'passos', 'onde', 'faq']
    : ['valor', 'depo', 'tecnica', 'checador', 'dr', 'passos', 'onde', 'faq']
  let conta = 0
  const numera = () => String(++conta).padStart(2, '0')

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
              href={waLink(msgs.geral)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('header')}
            >
              <span className="sm">WhatsApp</span>
              <span className="lg">Falar no WhatsApp</span>
            </a>
          </div>
        </div>
        {nav('m')}
      </header>

      <main id="topo">
        {/* Abertura: responde a busca na primeira tela */}
        <section className="hero" ref={heroRef}>
          <div className="hero-top">
            <p className="k">{KICKER_TOPO}</p>
            <h1 className="h1">{topo.h1}</h1>
          </div>

          {desktop && (
            <div className="hero-img ph" style={{ position: 'relative' }}>
              <img
                src="/fotos/lp/dr-editorial.webp"
                width={800}
                height={1200}
                alt="Dr. Luis Felipe Bortolan"
                style={{ objectPosition: '50% 18%', position: 'absolute', inset: 0 }}
                fetchpriority="high"
              />
              <p className="hero-foto-leg">Dr. Luis Felipe Bortolan · oftalmologista</p>
            </div>
          )}

          <div className="hero-body">
            <p className={g === 'valor' ? 'preco-linha' : 'hero-lead'}>{topo.apoio}</p>
            {g !== 'valor' && <p className="preco-linha">{PRECO.linha}</p>}
            <div className="hero-cta">
              {wa('topo', { msg: g === 'valor' ? msgs.valor : msgs.geral })}
              <a href="#quem-pode-fazer" className="link-sec">Ver em 3 perguntas se eu posso operar</a>
            </div>
            <div className="prova">
              <div><p className="big">2.000+</p><p className="s">cirurgias refrativas</p></div>
              <div><p className="big">HC-USP</p><p className="s">fellowship em refrativa</p></div>
              <div><p className="mid">CRM-SP 205675</p><p className="s">RQE 148991</p></div>
            </div>
          </div>
        </section>

        {ordem.map((id) => SECOES[id](id === 'depo' ? null : numera()))}

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
                <p className="p">Se você tem de 21 a 39 anos e o seu grau parou de aumentar, o primeiro passo é uma conversa no WhatsApp.</p>
                {wa('fechamento')}
                <p className="s sand">
                  <a href={waLink(msgs.geral)} target="_blank" rel="noopener noreferrer" onClick={() => track('telefone')} style={{ textDecoration: 'underline' }}>WhatsApp (11) 5028-4894</a>
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

      {/* Barra fixa do celular: abre o WhatsApp direto */}
      <div className={`barra ${barraOn ? 'on' : ''}`} aria-hidden={!barraOn}>
        {wa('fixo', { tabIndex: barraOn ? 0 : -1 })}
      </div>
    </Page>
  )
}
