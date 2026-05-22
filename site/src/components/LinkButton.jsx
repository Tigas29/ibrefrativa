import styled from 'styled-components'
import { ArrowRight } from 'lucide-react'

const Button = styled.a`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 16px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;

  &:hover {
    background: var(--amber);
    border-color: var(--amber);
    transform: translateY(-1px);
  }

  &:hover .btn-label,
  &:hover .btn-icon,
  &:hover .btn-arrow {
    color: var(--navy-deep);
  }

  &:active {
    transform: translateY(0);
  }
`

const IconWrap = styled.span`
  display: flex;
  align-items: center;
  color: rgba(237, 233, 222, 0.6);
  flex-shrink: 0;
  transition: color 0.2s ease;
`

const Label = styled.strong`
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 500;
  color: var(--creme);
  letter-spacing: 0.2px;
  transition: color 0.2s ease;
`

const ArrowWrap = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: rgba(237, 233, 222, 0.25);
  transition: color 0.2s ease, transform 0.2s ease;

  ${Button}:hover & {
    color: var(--navy-deep);
    transform: translateX(2px);
  }
`

export default function LinkButton({ href, icon: Icon, label }) {
  return (
    <Button href={href} target="_blank" rel="noopener noreferrer">
      <IconWrap className="btn-icon">
        <Icon size={17} strokeWidth={1.75} />
      </IconWrap>
      <Label className="btn-label">{label}</Label>
      <ArrowWrap className="btn-arrow">
        <ArrowRight size={14} strokeWidth={1.75} />
      </ArrowWrap>
    </Button>
  )
}
