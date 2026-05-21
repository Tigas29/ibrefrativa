import { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Slide from '../components/Slide';
import Nav from '../components/Nav';
import Logo from '../components/Logo';
import ProgressBar from '../components/ProgressBar';
import styles from '../styles/Deck.module.css';

const TOTAL = 13;

// slide state: 'idle' | 'active' | 'exit-left' | 'enter-from-left'
function buildStates(cur) {
  return Array.from({ length: TOTAL }, (_, i) =>
    i === cur ? 'active' : 'idle'
  );
}

export default function Deck() {
  const [cur, setCur] = useState(0);
  const [states, setStates] = useState(() => buildStates(0));
  const animating = useRef(false);

  const go = useCallback((dir) => {
    if (animating.current) return;
    animating.current = true;

    const leaving = cur;
    const entering = (cur + dir + TOTAL) % TOTAL;

    setStates((prev) => {
      const next = [...prev];
      next[leaving] = dir > 0 ? 'exit-left' : 'idle';
      return next;
    });

    if (dir < 0) {
      // Posiciona o novo slide à esquerda sem transição
      setStates((prev) => {
        const next = [...prev];
        next[leaving] = 'idle';
        next[entering] = 'enter-from-left';
        return next;
      });

      // Double rAF para garantir que enterFromLeft seja aplicado antes da transição
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStates((prev) => {
            const next = [...prev];
            next[entering] = 'active';
            return next;
          });
          setCur(entering);
        });
      });
    } else {
      setStates((prev) => {
        const next = [...prev];
        next[entering] = 'active';
        return next;
      });
      setCur(entering);
    }

    setTimeout(() => {
      setStates((prev) => {
        const next = [...prev];
        next[leaving] = 'idle';
        return next;
      });
      animating.current = false;
    }, 450);
  }, [cur]);

  // Teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  // Touch swipe
  useEffect(() => {
    let tx = 0;
    const onTouchStart = (e) => { tx = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
      const dx = tx - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 50) go(dx > 0 ? 1 : -1);
    };
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [go]);

  return (
    <>
      <Head>
        <title>IBR — Estudo de Mercado | Toka Company</title>
        <meta name="description" content="Análise de mercado, público-alvo, concorrentes e oportunidades estratégicas para o IBR — Instituto Brasileiro de Refrativa." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProgressBar current={cur + 1} total={TOTAL} />

      <div className={styles.deck}>

        {/* ── SLIDE 1 — CAPA ── */}
        <Slide variant="dark" state={states[0]}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <Logo variant="dark" position="hero" />
            <span className="eyebrow">Toka Company · Maio 2026</span>
            <h1 style={{ maxWidth: 700, marginBottom: 20 }}>
              Estudo de Mercado<br />
              <span className="highlight">Cirurgia Refrativa</span>
            </h1>
            <div className="divider" />
            <p style={{ maxWidth: 480, opacity: .7 }}>
              Análise de mercado, público-alvo, concorrentes e oportunidades estratégicas para o IBR — Instituto Brasileiro de Refrativa.
            </p>
          </div>
          <Image
            src="/logos/02.png"
            alt=""
            width={320}
            height={320}
            className="watermark"
            aria-hidden="true"
          />
        </Slide>

        {/* ── SLIDE 2 — O MERCADO EM NÚMEROS ── */}
        <Slide variant="light" state={states[1]}>
          <Logo variant="light" position="corner" />
          <div className="accentLine accentTerra" />
          <div style={{ width: '100%' }}>
            <span className="eyebrow">Tamanho de Mercado</span>
            <h2>Um mercado enorme.<br />Quase intacto.</h2>
            <div className="statRow">
              <div className="statBox statBoxLight">
                <div className="statNum">85M</div>
                <div className="statLabel">brasileiros usam<br />óculos ou lentes</div>
              </div>
              <div className="statBox statBoxLight">
                <div className="statNum">18–19M</div>
                <div className="statLabel">só no estado<br />de São Paulo</div>
              </div>
              <div className="statBox statBoxLight" style={{ background: 'var(--terra)' }}>
                <div className="statNum" style={{ color: 'var(--amber)' }}>~170k</div>
                <div className="statLabel" style={{ color: 'rgba(255,255,255,.8)' }}>
                  cirurgias refrativas<br />realizadas por ano no Brasil
                </div>
              </div>
            </div>
            <div style={{ marginTop: 28, padding: '20px 28px', background: 'var(--navy-deep)', borderRadius: 4, display: 'inline-block' }}>
              <p style={{ color: 'var(--amber)', fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700 }}>
                Menos de 0,2% do público potencial é operado por ano.{' '}
                <span style={{ color: 'var(--bege)', fontWeight: 400 }}>
                  Os EUA realizam 3× mais cirurgias refrativas per capita.
                </span>
              </p>
            </div>
          </div>
        </Slide>

        {/* ── SLIDE 3 — TAM/SAM/SOM ── */}
        <Slide variant="light" state={states[2]}>
          <Logo variant="light" position="corner" />
          <div className="accentLine accentTerra" />
          <div style={{ width: '100%' }}>
            <span className="eyebrow">Dimensionamento</span>
            <h2>Onde está o dinheiro</h2>
            <table>
              <thead>
                <tr>
                  <th>Nível</th>
                  <th>Universo</th>
                  <th>Contexto</th>
                  <th>Valor estimado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="tag tagBege">TAM</span></td>
                  <td><strong>85M</strong> usuários de correção visual</td>
                  <td>Brasil — todos que usam óculos ou lentes</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td><span className="tag tagTerra">SAM</span></td>
                  <td><strong>28–53M</strong> míopes candidatos</td>
                  <td>Foco em SP — maior renda e acesso</td>
                  <td>R$ 1,3–1,5 bi/ano</td>
                </tr>
                <tr>
                  <td><span className="tag tagNavy">SOM</span></td>
                  <td>Particulares cirúrgicos em SP</td>
                  <td>Nicho premium — Dr. Luis Felipe</td>
                  <td>A definir por metas</td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: 24, display: 'flex', gap: 24 }}>
              <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,.05)', borderRadius: 4, flex: 1 }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 4, fontFamily: 'var(--font-ui)' }}>Ticket por olho</p>
                <p style={{ fontSize: 22, fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>R$ 4.000</p>
              </div>
              <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,.05)', borderRadius: 4, flex: 1 }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 4, fontFamily: 'var(--font-ui)' }}>Ticket por paciente</p>
                <p style={{ fontSize: 22, fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>R$ 6–10k</p>
              </div>
              <div style={{ padding: '16px 24px', background: 'var(--navy-deep)', borderRadius: 4, flex: 1 }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 4, fontFamily: 'var(--font-ui)' }}>Mercado privado Brasil</p>
                <p style={{ fontSize: 22, fontFamily: 'var(--font-serif)', color: 'var(--creme)' }}>R$ 1,3–1,5 bi/ano</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* ── SLIDE 4 — PERSONA ── */}
        <Slide variant="dark" state={states[3]}>
          <Logo variant="dark" position="corner" />
          <div style={{ width: '100%' }}>
            <span className="eyebrow">Público-Alvo</span>
            <h2 style={{ marginBottom: 8 }}>Quem está pronto<br />para operar</h2>
            <p style={{ marginBottom: 28, opacity: .6, fontSize: 14, fontFamily: 'var(--font-ui)' }}>
              25–40 anos · Superior completo · Classe média-alta · SP
            </p>
            <div className="personaGrid">
              <div className="personaCard">
                <div className="personaIcon">💻</div>
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--amber)', fontSize: 14, marginBottom: 4 }}>Profissional de tela pesada</p>
                  <p style={{ fontSize: 13, opacity: .75 }}>TI, finanças, jurídico, marketing. 10h/dia na tela. Lente resseca às 23h. Cansado.</p>
                </div>
              </div>
              <div className="personaCard">
                <div className="personaIcon">🏃</div>
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--amber)', fontSize: 14, marginBottom: 4 }}>Esportista urbano</p>
                  <p style={{ fontSize: 13, opacity: .75 }}>Corrida, crossfit, artes marciais, ciclismo. Óculos atrapalha a performance e segurança.</p>
                </div>
              </div>
              <div className="personaCard">
                <div className="personaIcon">😤</div>
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--amber)', fontSize: 14, marginBottom: 4 }}>Saturado da dependência</p>
                  <p style={{ fontSize: 13, opacity: .75 }}>Usando óculos desde a adolescência. Quer liberdade. Renda para investir. Só faltava confiança.</p>
                </div>
              </div>
              <div className="personaCard">
                <div className="personaIcon">📸</div>
                <div>
                  <p style={{ fontWeight: 700, color: 'var(--amber)', fontSize: 14, marginBottom: 4 }}>Estético-consciente</p>
                  <p style={{ fontSize: 13, opacity: .75 }}>Imagem importa. Odeia aparecer em foto com óculos. Mas sem eles não enxerga nada.</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* ── SLIDE 5 — DORES & GATILHOS ── */}
        <Slide variant="light" state={states[4]}>
          <Logo variant="light" position="corner" />
          <div className="accentLine accentTerra" />
          <div className="col2" style={{ alignItems: 'start' }}>
            <div>
              <span className="eyebrow">Dores reais</span>
              <h2>O que trava<br />a vida de quem usa óculos</h2>
              <ul>
                <li>Óculos embaça no treino. Frame bate na cara.</li>
                <li>Lente resseca depois de 8h de tela.</li>
                <li>Dependência diária — perde óculos, viagem complicada.</li>
                <li>Vergonha de foto sem óculos — e odeia aparecer com.</li>
                <li>34% dos brasileiros nunca foram ao oftalmologista.</li>
              </ul>
            </div>
            <div>
              <span className="eyebrow" style={{ opacity: 0 }}>x</span>
              <div style={{ padding: 32, background: 'var(--navy-deep)', borderRadius: 4, height: '100%' }}>
                <p style={{ color: 'var(--amber)', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-ui)' }}>
                  Gatilho financeiro
                </p>
                <p className="quote" style={{ color: 'var(--creme)', fontSize: 22 }}>
                  &ldquo;Em 12 anos você vai gastar R$ 12.000 em óculos, lentes e consultas.
                </p>
                <div style={{ height: 1, background: 'rgba(255,255,255,.1)', margin: '20px 0' }} />
                <p className="quote" style={{ color: 'var(--amber)', fontSize: 22 }}>
                  Ou você investe R$ 8.000 hoje e não gasta mais nada.&rdquo;
                </p>
                <p style={{ marginTop: 20, fontSize: 12, color: 'var(--bege)', opacity: .6, fontFamily: 'var(--font-ui)' }}>
                  Argumento de ROI. Nenhum concorrente usa isso. Gap aberto.
                </p>
              </div>
            </div>
          </div>
        </Slide>

        {/* ── SLIDE 6 — CONCORRENTES ── */}
        <Slide variant="light" state={states[5]}>
          <Logo variant="light" position="corner" />
          <div className="accentLine accentTerra" />
          <div style={{ width: '100%' }}>
            <span className="eyebrow">Landscape Competitivo</span>
            <h2>Quem está no jogo</h2>
            <table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Tipo</th>
                  <th>Presença</th>
                  <th>Força</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Opty / HOBrasil / Eye Care</strong></td>
                  <td>Rede integrada</td>
                  <td>Nacional (+40 clínicas)</td>
                  <td>Volume e estrutura</td>
                </tr>
                <tr>
                  <td><strong>CBV Hospital de Olhos</strong></td>
                  <td>Hospital especializado</td>
                  <td>Brasília + SP</td>
                  <td>Institucional</td>
                </tr>
                <tr>
                  <td><strong>Dr. Gabriel Castro / Galilei</strong></td>
                  <td>Médico com marca pessoal</td>
                  <td>SP — Instagram forte</td>
                  <td>Conteúdo digital variado</td>
                </tr>
                <tr>
                  <td><strong>Ocular Laser / UNICO</strong></td>
                  <td>Centro de laser premium</td>
                  <td>SP + MG</td>
                  <td>Experiência e tecnologia</td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: 20, padding: '16px 24px', background: 'rgba(163,81,57,.1)', borderLeft: '3px solid var(--terra)', borderRadius: '0 4px 4px 0' }}>
              <p style={{ fontSize: 13, color: 'var(--navy-deep)', fontFamily: 'var(--font-ui)' }}>
                <strong>O espaço livre:</strong> especialista técnico de alto padrão que fala com o paciente como gente e mostra o resultado real de perto. Nenhum dos players acima ocupa essa posição.
              </p>
            </div>
          </div>
        </Slide>

        {/* ── SLIDE 7 — MAPA DE CONTEÚDO ── */}
        <Slide variant="light" state={states[6]}>
          <Logo variant="light" position="corner" />
          <div className="accentLine accentTerra" />
          <div style={{ width: '100%' }}>
            <span className="eyebrow">Mapa de Conteúdo</span>
            <h2>O que os concorrentes estão fazendo</h2>
            <table>
              <thead>
                <tr>
                  <th>Formato</th>
                  <th>CBV</th>
                  <th>Eye Care</th>
                  <th>Dr. Gabriel</th>
                  <th>IBR pode fazer?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Depoimento (texto/vídeo)</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td style={{ color: 'var(--terra)', fontWeight: 700 }}>Sim — melhor</td>
                </tr>
                <tr>
                  <td>Estudo de caso narrativo</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td><span className="check">✓</span></td>
                  <td style={{ color: 'var(--terra)', fontWeight: 700 }}>Sim — mais próximo</td>
                </tr>
                <tr>
                  <td>Lo-fi / bastidor / trending</td>
                  <td><span className="check">✓</span></td>
                  <td><span className="cross">–</span></td>
                  <td><span className="check">✓</span></td>
                  <td style={{ color: 'var(--terra)', fontWeight: 700 }}>Sim</td>
                </tr>
                <tr>
                  <td>Série por profissão (nicho)</td>
                  <td style={{ fontSize: 12, color: 'var(--bege)' }}>só estático</td>
                  <td><span className="cross">–</span></td>
                  <td><span className="cross">–</span></td>
                  <td style={{ color: 'var(--amber)', fontWeight: 700, background: 'var(--navy-deep)', padding: '4px 8px', borderRadius: 2 }}>GAP aberto</td>
                </tr>
                <tr>
                  <td>Série documental pós-operatório</td>
                  <td><span className="cross">–</span></td>
                  <td><span className="cross">–</span></td>
                  <td><span className="cross">–</span></td>
                  <td style={{ color: 'var(--amber)', fontWeight: 700, background: 'var(--navy-deep)', padding: '4px 8px', borderRadius: 2 }}>GAP aberto</td>
                </tr>
                <tr>
                  <td>ROI financeiro (custo vs cirurgia)</td>
                  <td><span className="cross">–</span></td>
                  <td><span className="cross">–</span></td>
                  <td><span className="cross">–</span></td>
                  <td style={{ color: 'var(--amber)', fontWeight: 700, background: 'var(--navy-deep)', padding: '4px 8px', borderRadius: 2 }}>GAP aberto</td>
                </tr>
                <tr>
                  <td>YouTube / SEO orgânico</td>
                  <td><span className="cross">–</span></td>
                  <td><span className="cross">–</span></td>
                  <td><span className="cross">–</span></td>
                  <td style={{ color: 'var(--amber)', fontWeight: 700, background: 'var(--navy-deep)', padding: '4px 8px', borderRadius: 2 }}>GAP aberto</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Slide>

        {/* ── SLIDE 8 — GAP #1 ROI ── */}
        <Slide variant="dark" state={states[7]}>
          <Logo variant="dark" position="corner" />
          <div style={{ width: '100%' }}>
            <div className="gapBadge">
              <div className="gapNum" style={{ background: 'var(--amber)', color: 'var(--navy-deep)' }}>1</div>
              <span style={{ color: 'var(--amber)', letterSpacing: 2, fontFamily: 'var(--font-ui)' }}>Gap mais fácil de explorar</span>
            </div>
            <h2>Ninguém faz o cálculo na tela.</h2>
            <div className="col2" style={{ marginTop: 24, alignItems: 'stretch' }}>
              <div style={{ padding: 32, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 4 }}>
                <p style={{ color: 'var(--bege)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-ui)' }}>
                  Lente mensal — 10 anos
                </p>
                <div className="bigNumber" style={{ fontSize: 64, color: 'rgba(255,255,255,.3)' }}>R$ 20k+</div>
                <p style={{ color: 'var(--bege)', opacity: .5, marginTop: 8, fontSize: 13, fontFamily: 'var(--font-ui)' }}>
                  R$ 1.800–2.400/ano × 10 anos.<br />Custo eterno. Invisível.
                </p>
              </div>
              <div style={{ padding: 32, background: 'var(--terra)', borderRadius: 4 }}>
                <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-ui)' }}>
                  Cirurgia IBR — uma vez
                </p>
                <div className="bigNumber" style={{ fontSize: 64, color: 'var(--amber)' }}>R$ 8k</div>
                <p style={{ color: 'rgba(255,255,255,.8)', marginTop: 8, fontSize: 13, fontFamily: 'var(--font-ui)' }}>
                  Investimento único. Pago em 4–8 anos.<br />Depois disso: lucro todos os anos.
                </p>
              </div>
            </div>
            <div style={{ marginTop: 20, padding: '16px 24px', background: 'rgba(254,177,97,.1)', borderLeft: '3px solid var(--amber)', borderRadius: '0 4px 4px 0' }}>
              <p style={{ color: 'var(--bege)', fontSize: 13, fontFamily: 'var(--font-ui)' }}>
                <strong style={{ color: 'var(--amber)' }}>Formatos:</strong> Reel com número crescendo na tela · Calculadora interativa no site · Argumento de vendas no WhatsApp
              </p>
            </div>
          </div>
        </Slide>

        {/* ── SLIDE 9 — GAP #2 PÓS-OP ── */}
        <Slide variant="light" state={states[8]}>
          <Logo variant="light" position="corner" />
          <div className="accentLine accentTerra" />
          <div className="col2" style={{ alignItems: 'start' }}>
            <div>
              <div className="gapBadge">
                <div className="gapNum" style={{ background: 'var(--terra)', color: 'var(--white)' }}>2</div>
                <span style={{ color: 'var(--terra)', fontFamily: 'var(--font-ui)' }}>Série documental</span>
              </div>
              <h2>O pós-operatório não existe como conteúdo em SP.</h2>
              <p style={{ marginTop: 16, fontFamily: 'var(--font-ui)' }}>
                Todos os concorrentes vivem no pré-op. O pós — onde mora a maior ansiedade do candidato — não existe como conteúdo seriado em nenhum player de SP.
              </p>
              <div style={{ marginTop: 24, padding: '20px 24px', background: 'rgba(163,81,57,.08)', borderRadius: 4 }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 12, fontFamily: 'var(--font-ui)' }}>Estrutura da série</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    'Antes — decisão, medo, expectativa',
                    'Dia da cirurgia — bastidor real',
                    'Semana 1 — como está a visão?',
                    'Mês 1 — resultado final, sem óculos',
                  ].map((label, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ background: 'var(--terra)', color: 'white', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                        {i + 1}
                      </span>
                      <p style={{ fontSize: 13, color: 'var(--navy)', fontFamily: 'var(--font-ui)' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding: 32, background: 'var(--navy-deep)', borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ color: 'var(--amber)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20, fontFamily: 'var(--font-ui)' }}>
                Por que isso converte
              </p>
              <p className="quote" style={{ fontSize: 20 }}>&ldquo;E se não funcionar?&rdquo;</p>
              <p style={{ color: 'var(--bege)', fontSize: 13, marginTop: 16, opacity: .8, fontFamily: 'var(--font-ui)' }}>
                Essa é a objeção #1. O pós-operatório documentado em vídeo real destrói esse medo melhor do que qualquer copy.
              </p>
              <div style={{ height: 1, background: 'rgba(255,255,255,.1)', margin: '24px 0' }} />
              <p style={{ color: 'var(--bege)', fontSize: 12, opacity: .6, fontFamily: 'var(--font-ui)' }}>
                <strong style={{ color: 'var(--amber)' }}>Reaproveitamento:</strong> cada série de 4 vídeos vira Reels, YouTube, anúncio de remarketing e prova social no WhatsApp.
              </p>
            </div>
          </div>
        </Slide>

        {/* ── SLIDE 10 — GAP #3 YOUTUBE/SEO ── */}
        <Slide variant="dark" state={states[9]}>
          <Logo variant="dark" position="corner" />
          <div style={{ width: '100%' }}>
            <div className="gapBadge">
              <div className="gapNum" style={{ background: 'var(--navy)', border: '1px solid var(--amber)', color: 'var(--amber)' }}>3</div>
              <span style={{ color: 'var(--amber)', fontFamily: 'var(--font-ui)' }}>YouTube + SEO</span>
            </div>
            <h2>Nenhum especialista de SP<br />tem YouTube relevante em refrativa.</h2>
            <div className="col2" style={{ marginTop: 28, gap: 24 }}>
              <div>
                <p style={{ color: 'var(--amber)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-ui)' }}>
                  Termos com volume alto e zero conteúdo de qualidade
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    '"sou candidato à cirurgia refrativa"',
                    '"LASIK vs PRK qual o melhor"',
                    '"pós-operatório LASIK dia a dia"',
                    '"cirurgia refrativa vale a pena"',
                  ].map((term, i) => (
                    <div key={i} style={{ padding: '12px 16px', background: 'rgba(255,255,255,.06)', borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: 13, color: 'var(--creme)', fontFamily: 'var(--font-ui)' }}>{term}</p>
                      <span className="tag tagAmber" style={{ fontSize: 10 }}>Alto volume</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: 32, background: 'var(--terra)', borderRadius: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, fontFamily: 'var(--font-ui)' }}>Meta realista</p>
                  <div className="bigNumber" style={{ fontSize: 56, color: 'var(--amber)' }}>20</div>
                  <p style={{ color: 'rgba(255,255,255,.9)', fontSize: 14, marginTop: 8, fontFamily: 'var(--font-ui)' }}>vídeos nos primeiros 6 meses</p>
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,.2)', margin: '20px 0' }} />
                <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 13, fontFamily: 'var(--font-ui)' }}>
                  Cada vídeo → 3 Reels + SEO no Google. Concorrente do Rio (Dr. Gustavo Bonfadini) já ranqueia nos termos de SP. O campo está aberto.
                </p>
              </div>
            </div>
          </div>
        </Slide>

        {/* ── SLIDE 11 — GAP #4 NICHOS ── */}
        <Slide variant="light" state={states[10]}>
          <Logo variant="light" position="corner" />
          <div className="accentLine accentTerra" />
          <div style={{ width: '100%' }}>
            <div className="gapBadge">
              <div className="gapNum" style={{ background: 'var(--navy-deep)', color: 'var(--creme)' }}>4</div>
              <span style={{ color: 'var(--terra)', fontFamily: 'var(--font-ui)' }}>Prova social espelhada</span>
            </div>
            <h2>Ninguém fala com<br />tribos específicas.</h2>
            <div className="col3" style={{ marginTop: 20 }}>
              <div style={{ padding: 24, background: 'var(--navy-deep)', borderRadius: 4 }}>
                <p style={{ fontSize: 28, marginBottom: 12 }}>🥊</p>
                <p style={{ color: 'var(--amber)', fontSize: 13, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-ui)' }}>Lutador / esportista de contato</p>
                <p style={{ color: 'var(--bege)', fontSize: 12, lineHeight: 1.6, fontFamily: 'var(--font-ui)' }}>
                  &ldquo;Eu levei o nocaute da minha vida. Não foi soco — foi porque não enxergava direito.&rdquo;<br /><br />
                  PRK para atleta de contato. Sem flap. Volta em 30 dias.
                </p>
              </div>
              <div style={{ padding: 24, background: 'rgba(163,81,57,.1)', border: '1px solid var(--terra)', borderRadius: 4 }}>
                <p style={{ fontSize: 28, marginBottom: 12 }}>💻</p>
                <p style={{ color: 'var(--terra)', fontSize: 13, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-ui)' }}>Dev / profissional de TI</p>
                <p style={{ color: 'var(--navy)', fontSize: 12, lineHeight: 1.6, fontFamily: 'var(--font-ui)' }}>
                  &ldquo;São 23h. Mais 2h de PR open. A lente ressecou às 19h. Trabalho mal. Durmo mal.&rdquo;<br /><br />
                  Série específica. Copy que entra na dor exata.
                </p>
              </div>
              <div style={{ padding: 24, background: 'rgba(44,59,77,.08)', border: '1px solid rgba(44,59,77,.2)', borderRadius: 4 }}>
                <p style={{ fontSize: 28, marginBottom: 12 }}>🏃</p>
                <p style={{ color: 'var(--navy)', fontSize: 13, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-ui)' }}>Corredor urbano</p>
                <p style={{ color: 'var(--navy)', fontSize: 12, lineHeight: 1.6, fontFamily: 'var(--font-ui)' }}>
                  &ldquo;No km 5 o óculos caiu. Parei. Perdi o ritmo. De novo.&rdquo;<br /><br />
                  Ativação em corridas de SP. Presença onde o público-alvo literalmente está.
                </p>
              </div>
            </div>
            <div style={{ marginTop: 20, padding: '16px 24px', background: 'var(--navy-deep)', borderRadius: 4 }}>
              <p style={{ fontSize: 13, color: 'var(--bege)', fontFamily: 'var(--font-ui)' }}>
                <strong style={{ color: 'var(--amber)' }}>Resultado:</strong> custo de aquisição mais baixo · prova social espelhada · taxa de conversão mais alta · nenhum concorrente está fazendo isso.
              </p>
            </div>
          </div>
        </Slide>

        {/* ── SLIDE 12 — POSICIONAMENTO ── */}
        <Slide variant="dark" state={states[11]}>
          <Logo variant="dark" position="corner" />
          <div style={{ width: '100%', maxWidth: 860 }}>
            <span className="eyebrow">Posicionamento</span>
            <div className="divider" />
            <p className="quote" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'var(--creme)' }}>
              Os hospitais comunicam <span className="highlight">institucional.</span><br />
              O Dr. Gabriel Castro comunica <span className="highlight">entretenimento.</span><br />
              A Opty comunica <span className="highlight">volume.</span>
            </p>
            <div style={{ height: 1, background: 'rgba(255,255,255,.15)', margin: '40px 0' }} />
            <p className="quote" style={{ fontSize: 'clamp(22px, 2.8vw, 36px)' }}>
              O espaço livre:
              <span style={{ color: 'var(--amber)', fontStyle: 'normal', fontFamily: 'var(--font-sans)', fontSize: '80%', fontWeight: 700, display: 'block', marginTop: 12, letterSpacing: 0.5 }}>
                especialista técnico de alto padrão<br />
                que fala com o paciente como gente<br />
                e mostra o resultado real de perto.
              </span>
            </p>
            <div style={{ marginTop: 32 }}>
              <span className="tag tagAmber">Esse é o IBR</span>
            </div>
          </div>
        </Slide>

        {/* ── SLIDE 13 — PRÓXIMOS PASSOS ── */}
        <Slide variant="light" state={states[12]}>
          <Logo variant="light" position="corner" />
          <div className="accentLine accentTerra" />
          <div className="col2" style={{ alignItems: 'start', gap: 64 }}>
            <div>
              <span className="eyebrow">Próximos Passos</span>
              <h2>O que fazer agora</h2>
              <div className="steps">
                <div className="step">
                  <span className="stepNum">01</span>
                  <div>
                    <p className="stepTitle">Definir nicho de entrada</p>
                    <p className="stepDesc">Escolher qual público atacar primeiro nos ads. Lutador, corredor ou profissional de tela?</p>
                  </div>
                </div>
                <div className="step">
                  <span className="stepNum">02</span>
                  <div>
                    <p className="stepTitle">Persona detalhada</p>
                    <p className="stepDesc">Rotina, dores, gatilhos, canais e mensagem. Uma persona real, não um template.</p>
                  </div>
                </div>
                <div className="step">
                  <span className="stepNum">03</span>
                  <div>
                    <p className="stepTitle">Estruturar o funil</p>
                    <p className="stepDesc">Topo: conteúdo educativo. Meio: avaliação gratuita. Fundo: cirurgia agendada.</p>
                  </div>
                </div>
                <div className="step">
                  <span className="stepNum">04</span>
                  <div>
                    <p className="stepTitle">Testar criativos Meta Ads</p>
                    <p className="stepDesc">Mínimo 3 ângulos por nicho. ROI financeiro, depoimento espelhado, pós-op real.</p>
                  </div>
                </div>
                <div className="step">
                  <span className="stepNum">05</span>
                  <div>
                    <p className="stepTitle">Iniciar canal YouTube</p>
                    <p className="stepDesc">20 vídeos nos primeiros 6 meses. SEO + reaproveitamento como Reels.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="eyebrow" style={{ opacity: 0 }}>x</span>
              <div style={{ padding: 32, background: 'var(--navy-deep)', borderRadius: 4, marginBottom: 16 }}>
                <p style={{ color: 'var(--amber)', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-ui)' }}>
                  Gaps prioritários
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { bg: 'var(--amber)', color: 'var(--navy-deep)', border: '', label: 'ROI financeiro — reel + calculadora' },
                    { bg: 'var(--terra)', color: 'white', border: '', label: 'Série documental pós-op em vídeo' },
                    { bg: 'var(--navy)', color: 'var(--amber)', border: '1px solid var(--amber)', label: 'YouTube como motor de SEO' },
                    { bg: 'var(--navy-deep)', color: 'var(--bege)', border: '1px solid var(--bege)', label: 'Campanhas por nicho/profissão' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ background: item.bg, color: item.color, border: item.border || 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                        {i + 1}
                      </span>
                      <p style={{ color: 'var(--creme)', fontSize: 13, fontFamily: 'var(--font-ui)' }}>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '20px 24px', background: 'rgba(163,81,57,.1)', borderLeft: '3px solid var(--terra)', borderRadius: '0 4px 4px 0' }}>
                <p style={{ fontSize: 13, color: 'var(--navy-deep)', lineHeight: 1.6, fontFamily: 'var(--font-ui)' }}>
                  <strong>Toka Company · Maio 2026</strong><br />
                  Fontes: IBGE PNS 2019 · SBO · Scielo · Clínica Vizon · SEGS
                </p>
              </div>
            </div>
          </div>
        </Slide>

      </div>

      <Nav
        current={cur + 1}
        total={TOTAL}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
      />
    </>
  );
}
