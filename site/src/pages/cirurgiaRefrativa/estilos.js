import styled, { createGlobalStyle } from 'styled-components'

export const GlobalLP = createGlobalStyle`
  /* Helvetica Now Display em subset latino (woff2): ~12 KB cada em vez de ~150 KB */
  @font-face {
    font-family: 'HN LP';
    src: url('/fonts/lp/HNDisplay-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'HN LP';
    src: url('/fonts/lp/HNDisplay-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'HN LP';
    src: url('/fonts/lp/HNDisplay-Black.woff2') format('woff2');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
  }
`

// Linguagem A · Clínica suíça. Cantos retos, filetes de 2px navy, sem gradiente nem sombra.
export const Page = styled.div`
  --navy: #1c2632;
  --navy2: #2c3b4d;
  --sand: #c9c2b2;
  --terra: #a35139;
  --amber: #feb161;
  --amber-hover: #ffa23e;
  --muted: #4b5563;
  --hdr: 118px;
  font-family: 'HN LP', 'Helvetica Now Display', Helvetica, Arial, sans-serif;
  background: #fff;
  color: var(--navy);
  width: 100%;
  overflow-x: clip;
  padding-top: var(--hdr);

  a { color: var(--navy); text-decoration: none; }
  a:hover { color: var(--terra); }
  p, h1, h2, h3, ol, ul, blockquote, figure { margin: 0; padding: 0; }
  b { font-weight: 700; }

  .ct { max-width: 1328px; margin: 0 auto; padding: 0 24px; box-sizing: border-box; }
  .row { display: flex; flex-direction: column; gap: 16px; }
  .stack { display: flex; flex-direction: column; gap: 16px; }

  .k { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; }
  .terra { color: var(--terra); }
  .muted { color: var(--muted); }
  .h1 { font-size: 42px; line-height: 0.98; font-weight: 900; letter-spacing: -0.035em; }
  .h2 { font-size: 32px; line-height: 1.02; font-weight: 900; letter-spacing: -0.03em; }
  .h3 { font-size: 22px; line-height: 1.1; font-weight: 700; letter-spacing: -0.015em; }
  .p { font-size: 17px; line-height: 1.5; }
  .s { font-size: 14px; line-height: 1.45; }
  .num { font-size: 96px; line-height: 0.8; font-weight: 900; letter-spacing: -0.05em; color: var(--sand); }
  .sec { padding-top: 72px; }

  /* Pendência visível: sai antes de publicar */
  .pend { background: #fff3a8; color: var(--navy); padding: 1px 4px; font-weight: 400; }

  /* Botões */
  .cta {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    min-height: 56px; background: var(--amber); color: var(--navy);
    font-weight: 700; font-size: 17px; border: 0; width: 100%;
    box-sizing: border-box; padding: 0 20px; text-align: center; cursor: pointer;
    font-family: inherit; transition: background 0.2s;
  }
  .cta:hover { background: var(--amber-hover); color: var(--navy); }
  .cta.dark { background: var(--navy); color: #fff; }
  .cta.dark:hover { background: var(--navy2); color: #fff; }

  /* Fotos */
  .ph { position: relative; overflow: hidden; background: #eceae4; }
  .ph img, .ph picture { display: block; width: 100%; height: 100%; }
  .ph img { object-fit: cover; transition: transform 0.6s ease; max-width: none; }
  .ph:hover img { transform: scale(1.04); }

  /* Reveal on scroll */
  .rv { opacity: 0; transform: translateY(16px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .rv.in { opacity: 1; transform: none; }
  @media (prefers-reduced-motion: reduce) {
    .rv { opacity: 1; transform: none; transition: none; }
    .ph img { transition: none; }
    .ph:hover img { transform: none; }
    .barra { transition: none; }
  }

  /* Header fixo */
  .hdr { position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: #fff; border-bottom: 2px solid var(--navy); }
  .hdr-in { display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; max-width: 1440px; margin: 0 auto; box-sizing: border-box; }
  .hdr-logo { height: 24px; width: auto; }
  .hdr-wa { display: flex; align-items: center; min-height: 44px; padding: 0 14px; background: var(--amber); color: var(--navy); font-weight: 700; font-size: 14px; transition: background 0.2s; }
  .hdr-wa:hover { background: var(--amber-hover); color: var(--navy); }
  .hdr-wa .lg { display: none; }
  .nav { display: flex; gap: 20px; padding: 0 24px; overflow-x: auto; white-space: nowrap; scrollbar-width: none; border-top: 1px solid var(--sand); }
  .nav::-webkit-scrollbar { display: none; }
  .nav a { display: flex; align-items: center; min-height: 44px; font-size: 14px; font-weight: 700; flex: none; }
  .hdr-r { display: flex; align-items: center; gap: 36px; }
  .hdr-r .nav { display: none; }

  /* Hero */
  .hero { display: block; }
  .hero-top { padding: 28px 24px 0; display: flex; flex-direction: column; gap: 18px; }
  .hero-img { height: 250px; margin: 24px 0; }
  .hero-body { padding: 0 24px; display: flex; flex-direction: column; gap: 16px; }
  .hero-lead { font-size: 17px; line-height: 1.5; }
  .hero-note { font-size: 14px; line-height: 1.45; color: var(--muted); }
  .prova { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; border-top: 2px solid var(--navy); padding-top: 16px; margin-top: 8px; }
  .prova .big { font-size: 28px; font-weight: 900; letter-spacing: -0.03em; }
  .prova .mid { font-size: 15px; font-weight: 700; line-height: 1.3; }
  .hero-foto-leg { display: none; }

  /* Dores */
  .dores { display: flex; flex-direction: column; gap: 40px; margin-top: 32px; }
  .dor { display: flex; flex-direction: column; gap: 12px; }
  .dor .ph { height: 200px; }

  /* Depoimentos */
  .vids { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .vid { height: 240px; background: var(--navy); color: #fff; display: flex; flex-direction: column; justify-content: space-between; padding: 14px; box-sizing: border-box; }
  .vid.b { background: var(--navy2); }
  .quotes { display: flex; flex-direction: column; gap: 20px; }
  .q { display: flex; flex-direction: column; gap: 8px; padding-top: 16px; border-top: 2px solid var(--navy); }
  .q p.t { font-size: 22px; line-height: 1.25; font-weight: 700; letter-spacing: -0.01em; }
  .salto { height: 300px; margin: 32px 0 24px; }
  .ponte-cta { display: flex; flex-direction: column; gap: 16px; }

  /* Córnea */
  .cornea-foto { height: 280px; margin: 28px 0; }
  .tecs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2px; background: var(--navy); border: 2px solid var(--navy); }
  .tec { background: #fff; padding: 16px; display: flex; flex-direction: column; gap: 8px; }
  .tec .nm { font-size: 28px; font-weight: 900; }
  .stats3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; padding-top: 16px; border-top: 2px solid var(--navy); }
  .stats3 .big { font-size: 30px; font-weight: 900; letter-spacing: -0.03em; }

  /* Checador */
  .opts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
  .opt { min-height: 48px; border: 2px solid var(--navy); background: #fff; color: var(--navy); font-family: inherit; font-size: 14px; font-weight: 700; padding: 0 6px; cursor: pointer; transition: background 0.15s, color 0.15s; }
  .opt:hover { background: #eceae4; }
  .opt[aria-pressed='true'] { background: var(--navy); color: #fff; }
  .res-in { background: var(--navy); color: #fff; padding: 20px; display: flex; flex-direction: column; gap: 14px; }
  .res-in .msg { background: #fff; color: var(--navy); padding: 14px; font-size: 15px; line-height: 1.45; }
  .res-out { background: #f2f2ef; padding: 20px; display: flex; flex-direction: column; gap: 10px; border-top: 6px solid var(--terra); }
  .crit { display: flex; flex-direction: column; gap: 6px; padding-top: 12px; }

  /* Calculadora */
  .calc { border: 2px solid var(--navy); padding: 20px; display: flex; flex-direction: column; gap: 16px; }
  .rng { width: 100%; accent-color: var(--navy); height: 28px; }
  .calc label { display: flex; flex-direction: column; gap: 4px; }
  .total { border-top: 2px solid var(--navy); padding-top: 14px; }
  .total .v { font-size: 48px; font-weight: 900; letter-spacing: -0.04em; }

  /* Dr. */
  .dr-foto { height: 400px; }
  .dr-lista { display: flex; flex-direction: column; border-top: 2px solid var(--navy); }
  .dr-lista p { padding: 12px 0; border-bottom: 1px solid var(--sand); }
  .dr-lista p:last-child { border-bottom: 0; }

  /* Passos */
  .passos { list-style: none; display: flex; flex-direction: column; margin-top: 8px; }
  .passo { display: grid; grid-template-columns: 44px 1fr; gap: 12px; padding: 16px 0; border-top: 2px solid var(--navy); }
  .passo:last-child { border-bottom: 2px solid var(--navy); }
  .passo .n { font-size: 28px; font-weight: 900; }
  .lampada { height: 220px; margin-top: 28px; }

  /* Mapa */
  .mapa { height: 240px; background: #f2f2ef; }
  .mapa iframe { display: block; width: 100%; height: 100%; border: 0; }

  /* FAQ */
  .faq-lista { display: flex; flex-direction: column; border-bottom: 2px solid var(--navy); margin-top: 8px; }
  .faq-b { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: none; border: 0; border-top: 2px solid var(--navy); padding: 20px 0; min-height: 44px; font-family: inherit; font-size: 18px; font-weight: 700; color: var(--navy); text-align: left; cursor: pointer; }
  .faq-b:hover { color: var(--terra); }
  .faq-b .sinal { font-size: 26px; font-weight: 400; line-height: 1; flex: none; }
  .faq-r { padding: 0 0 20px; }

  /* Fechamento */
  .fecha { margin-top: 72px; background: var(--navy); color: #fff; padding: 56px 0; }
  .fecha .num { color: var(--amber); }
  .fecha a { color: #fff; }
  .fecha a.cta { color: var(--navy); }
  .fecha .sand { color: var(--sand); }
  .fecha-q { font-size: 24px; line-height: 1.25; font-weight: 700; }

  /* Rodapé */
  .foot { background: #141c26; color: var(--sand); padding: 40px 0 96px; }
  .foot .ct { display: flex; flex-direction: column; gap: 10px; }
  .foot a { color: var(--sand); text-decoration: underline; }
  .foot a:hover { color: #fff; }
  .foot .fino { color: #9aa3ae; }
  .foot-logo { height: 24px; width: auto; align-self: flex-start; margin-bottom: 8px; }

  /* Barra fixa do celular */
  .barra { position: fixed; left: 0; right: 0; bottom: 0; z-index: 40; background: #fff; border-top: 2px solid var(--navy); padding: 10px 12px; transform: translateY(110%); visibility: hidden; transition: transform 0.3s ease, visibility 0.3s; }
  .barra.on { transform: none; visibility: visible; }
  .barra .cta { min-height: 52px; }

  [id] { scroll-margin-top: calc(var(--hdr) + 12px); }

  /* ===== Computador ===== */
  @media (min-width: 768px) {
    .barra { display: none; }
    .foot { padding-bottom: 56px; }
  }

  @media (min-width: 900px) {
    --hdr: 90px;
    .ct { padding: 0 64px; }
    .row { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 0 24px; }
    .c3 { grid-column: span 3; }
    .c4 { grid-column: span 4; }
    .c5 { grid-column: span 5; }
    .c6 { grid-column: span 6; }
    .c7 { grid-column: span 7; }
    .c8 { grid-column: span 8; }
    .c9 { grid-column: span 9; }
    .c12 { grid-column: 1 / -1; }
    .k { font-size: 13px; }
    .h1 { font-size: clamp(52px, 5.3vw, 76px); line-height: 0.96; letter-spacing: -0.04em; }
    .h2 { font-size: clamp(38px, 3.6vw, 52px); }
    .h3 { font-size: 24px; }
    .p { font-size: 18px; }
    .s { font-size: 15px; }
    .num { font-size: 128px; }
    .sec { padding-top: 112px; }
    .sec-head { align-items: start; }
    .sec-head .num { padding-top: 4px; }
    .hdr-in { padding: 22px 64px; max-width: 1328px; }
    .hdr-logo { height: 34px; }
    .nav.m { display: none; }
    .hdr-r .nav { display: flex; gap: 36px; padding: 0; border: 0; overflow: visible; }
    .hdr-r .nav a { min-height: 44px; font-size: 15px; }
    .hdr-wa { font-size: 15px; padding: 0 18px; }
    .hdr-wa .sm { display: none; }
    .hdr-wa .lg { display: inline; }

    .hero { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 24px; max-width: 1328px; margin: 0 auto; padding: 0 64px; box-sizing: border-box; min-height: max(640px, calc(100vh - var(--hdr))); align-content: center; grid-template-rows: auto auto; }
    .hero-top { grid-column: 1 / span 7; grid-row: 1; padding: 48px 0 0; align-self: end; gap: 26px; }
    .hero-body { grid-column: 1 / span 7; grid-row: 2; padding: 26px 0 48px; align-self: start; gap: 26px; }
    .hero-img { grid-column: 9 / span 4; grid-row: 1 / span 2; margin: 0; height: auto; }
    .hero-lead { font-size: 20px; max-width: 640px; }
    .hero-cta { display: flex; align-items: center; gap: 24px; }
    .hero-cta .cta { width: auto; min-height: 60px; padding: 0 32px; font-size: 18px; flex: none; }
    .hero-cta .hero-note { max-width: 380px; }
    .prova { max-width: 720px; gap: 24px; padding-top: 20px; margin-top: 0; }
    .prova .big { font-size: 36px; }
    .prova .mid { font-size: 18px; padding-top: 8px; }
    .hero-foto-leg { display: block; position: absolute; left: 0; bottom: 0; padding: 12px 16px; background: #fff; font-size: 14px; font-weight: 700; }

    .sec-body { margin-top: 48px; }
    .dores { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px 24px; margin-top: 48px; }
    .dor .ph { height: 260px; }
    .vids { gap: 24px; }
    .vid { height: 320px; padding: 20px; }
    .quotes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; margin-top: 40px; }
    .q p.t { font-size: 24px; }
    .salto { height: 440px; margin: 56px 0 40px; }
    .ponte-cta { flex-direction: row; align-items: center; justify-content: space-between; gap: 48px; }
    .ponte-cta .cta { width: auto; min-width: 360px; flex: none; }
    .cornea-foto { height: 100%; min-height: 560px; margin: 0; }
    .cornea-txt { gap: 20px; }
    .tec { padding: 24px; }
    .dr-foto { height: 560px; }
    .passos-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; margin-top: 48px; }
    .passos-4 .passo { grid-template-columns: 1fr; gap: 12px; border-bottom: 0 !important; }
    .passos-4 .passo .n { font-size: 40px; }
    .lampada { height: 340px; margin-top: 56px; }
    .mapa { height: 440px; }
    .faq-col { max-width: 760px; }
    .fecha { padding: 96px 0; margin-top: 112px; }
    .fecha-q { font-size: 30px; }
    .res-in, .res-out { padding: 28px; }
    .sticky { position: sticky; top: calc(var(--hdr) + 24px); }
    .crit-box { border-top: 2px solid var(--navy); padding-top: 16px; }
  }
`
