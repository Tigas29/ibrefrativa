import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrap = styled.div`
  min-height: 100vh;
  background: var(--navy-deep);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  text-align: center;
`

const Logo = styled.img`
  height: 48px;
  margin-bottom: 48px;
  opacity: 0.9;
`

const Title = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 400;
  color: var(--creme);
  margin-bottom: 16px;
  letter-spacing: -0.5px;
`

const Sub = styled.p`
  font-family: var(--font-ui);
  font-size: 18px;
  color: var(--bege);
  margin-bottom: 48px;
`

const Tag = styled.span`
  display: inline-block;
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--amber);
  border: 1px solid rgba(254, 177, 97, 0.4);
  padding: 6px 16px;
  border-radius: 2px;
  margin-bottom: 48px;
`

const BackLink = styled(Link)`
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--bege);
  text-decoration: underline;
  text-underline-offset: 4px;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    color: var(--creme);
  }
`

export default function StubPage({ title, subtitle }) {
  return (
    <Wrap>
      <Logo src="/logos/Branca-horizontal-nome-completo.png" alt="IBR — Instituto Brasileiro de Refrativa" />
      <Tag>Em breve</Tag>
      <Title>{title}</Title>
      <Sub>{subtitle}</Sub>
      <BackLink to="/">Voltar para o site</BackLink>
    </Wrap>
  )
}
