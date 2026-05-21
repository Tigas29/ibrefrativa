import styled from 'styled-components'

const NavWrapper = styled.div`
  position: fixed;
  bottom: 28px;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 100;
`

const Counter = styled.span`
  font-family: var(--font-ui);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--creme);
  background: var(--navy-deep);
  padding: 5px 10px;
  border-radius: 3px;
  opacity: 0.85;
`

const Btn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--navy-deep);
  color: var(--creme);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background 0.2s, transform 0.15s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);

  &:hover {
    background: var(--terra);
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.95);
  }
`

export default function Nav({ current, total, onPrev, onNext }) {
  return (
    <NavWrapper>
      <Counter>{current + 1} / {total}</Counter>
      <Btn onClick={onPrev} aria-label="Slide anterior">&#8592;</Btn>
      <Btn onClick={onNext} aria-label="Próximo slide">&#8594;</Btn>
    </NavWrapper>
  )
}
