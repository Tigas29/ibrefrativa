// variant: "light" | "dark" | "navy"
// state: "active" | "entering-left" | "exiting-left" | "idle"
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const themes = {
  light: {
    background: 'var(--creme)',
  },
  dark: {
    background: 'var(--navy)',
  },
  navy: {
    background: 'var(--navy-deep)',
  },
}

const SlideWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 64px 80px;
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  pointer-events: ${({ $state }) => ($state === 'active' ? 'all' : 'none')};
  background: ${({ $variant }) => themes[$variant]?.background ?? themes.dark.background};
`

export default function Slide({ variant = 'dark', state = 'idle', children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (state === 'entering-left') {
      el.style.transition = 'none'
      el.style.opacity = '0'
      el.style.transform = 'translateX(-40px)'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = ''
          el.style.opacity = '1'
          el.style.transform = 'translateX(0)'
        })
      })
    } else if (state === 'active') {
      el.style.transition = ''
      el.style.opacity = '1'
      el.style.transform = 'translateX(0)'
    } else if (state === 'exiting-left') {
      el.style.transition = ''
      el.style.opacity = '0'
      el.style.transform = 'translateX(-40px)'
    } else {
      el.style.transition = ''
      el.style.opacity = '0'
      el.style.transform = 'translateX(40px)'
    }
  }, [state])

  return (
    <SlideWrapper ref={ref} $variant={variant} $state={state} className={`slide ${variant}`}>
      {children}
    </SlideWrapper>
  )
}
