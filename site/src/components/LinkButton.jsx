import styled from 'styled-components'

const Button = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;

  &:hover {
    background: #FEB161;
    border-color: #FEB161;
    transform: translateY(-1px);
  }

  &:hover span,
  &:hover strong {
    color: #1C2632;
  }

  &:active {
    transform: translateY(0);
  }
`

const Icon = styled.span`
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
  transition: color 0.2s ease;
`

const Label = styled.strong`
  font-family: var(--font-ui);
  font-size: 15px;
  font-weight: 600;
  color: #EDE9DE;
  letter-spacing: 0.1px;
  transition: color 0.2s ease;
`

const Arrow = styled.span`
  margin-left: auto;
  font-size: 14px;
  color: rgba(237, 233, 222, 0.35);
  transition: color 0.2s ease, transform 0.2s ease;

  ${Button}:hover & {
    color: #1C2632;
    transform: translateX(2px);
  }
`

export default function LinkButton({ href, icon, label }) {
  return (
    <Button href={href} target="_blank" rel="noopener noreferrer">
      <Icon>{icon}</Icon>
      <Label>{label}</Label>
      <Arrow>→</Arrow>
    </Button>
  )
}
