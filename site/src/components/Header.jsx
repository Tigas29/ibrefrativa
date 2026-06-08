/**
 * IBR — Header v3
 * Clean/premium — mais respiro, logo bem posicionada,
 * botão CTA amber vivo com glow sutil no hover.
 * Aplica a todas as páginas.
 */

import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'
import { ArrowRight } from 'lucide-react'

const WA_LINK = 'https://wa.me/551150284894'

/* pulse de atenção no botão CTA — só enquanto não scrollou */
const ctaPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(254,177,97,0); }
  50%        { box-shadow: 0 0 0 6px rgba(254,177,97,0.22); }
`

const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.35s ease, box-shadow 0.35s ease, padding 0.25s ease;

  ${({ $scrolled }) =>
    $scrolled
      ? css`
          background: rgba(28, 38, 50, 0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06);
        `
      : css`
          background: linear-gradient(
            to bottom,
            rgba(28, 38, 50, 0.72) 0%,
            rgba(28, 38, 50, 0) 100%
          );
        `}
`

const Inner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--gutter);
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
`

const LogoLink = styled(Link)`
  flex-shrink: 0;
  display: flex;
  align-items: center;

  img {
    height: 46px;
    display: block;
    transition: opacity 0.2s;
  }
  @media (max-width: 768px) { img { height: 38px; } }

  &:hover img { opacity: 0.85; }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 36px;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavItem = styled(NavLink)`
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(237, 233, 222, 0.65);
  transition: color 0.2s;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--amber);
    transition: width 0.22s ease;
  }

  &:hover,
  &.active {
    color: var(--creme);
    &::after { width: 100%; }
  }
`

const CtaBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--amber);
  color: var(--navy-deep);
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.3px;
  padding: 11px 22px;
  border-radius: 3px;
  transition: background 0.2s, transform 0.18s, box-shadow 0.22s;
  white-space: nowrap;
  flex-shrink: 0;

  /* Pulse sutil de atenção */
  animation: ${ctaPulse} 3s ease-in-out infinite;

  &:hover {
    background: #ffca80;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(254, 177, 97, 0.45);
    animation: none;
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid var(--amber);
    outline-offset: 3px;
  }

  svg { transition: transform 0.2s; }
  &:hover svg { transform: translateX(3px); }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px 16px;
    gap: 6px;
  }
`

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;

  span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--creme);
    border-radius: 1px;
    transition: all 0.25s ease;
    transform-origin: center;
  }

  ${({ $open }) =>
    $open &&
    css`
      span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
      span:nth-child(2) { opacity: 0; transform: scaleX(0); }
      span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    `}

  @media (max-width: 768px) { display: flex; }
`

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    gap: 0;
    background: rgba(28, 38, 50, 0.98);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    padding: 12px var(--gutter) 24px;
  }
`

const MobileNavItem = styled(NavLink)`
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--bege);
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: color 0.2s;

  &:last-of-type { margin-bottom: 16px; }

  &:hover, &.active { color: var(--creme); }
`

const MobileCtaBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--amber);
  color: var(--navy-deep);
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 800;
  padding: 15px 20px;
  border-radius: 3px;
  margin-top: 8px;
  transition: background 0.2s;

  &:hover { background: #ffca80; }
`

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    handler() // Estado inicial
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <Bar $scrolled={scrolled || menuOpen}>
      <Inner>
        <LogoLink to="/" onClick={closeMenu} aria-label="IBR — Instituto Brasileiro de Refrativa">
          <img src="/logos/logo-branca-trim.png" alt="IBR — Instituto Brasileiro de Refrativa" />
        </LogoLink>

        <Nav>
          <NavItem to="/#solucoes">Soluções</NavItem>
          <NavItem to="/metodo">Método</NavItem>
        </Nav>

        <CtaBtn
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fazer avaliação gratuita online pelo WhatsApp"
        >
          Avaliação gratuita
          <ArrowRight size={14} aria-hidden="true" />
        </CtaBtn>

        <Hamburger
          $open={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </Hamburger>
      </Inner>

      <MobileMenu $open={menuOpen}>
        <MobileNavItem to="/" onClick={closeMenu} end>Início</MobileNavItem>
        <MobileNavItem to="/metodo" onClick={closeMenu}>Método</MobileNavItem>
        <MobileCtaBtn
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          Faça sua avaliação gratuita online
          <ArrowRight size={15} aria-hidden="true" />
        </MobileCtaBtn>
      </MobileMenu>
    </Bar>
  )
}
