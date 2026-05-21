import { useState, useEffect, useCallback, useRef } from 'react'
import ProgressBar from './components/ProgressBar.jsx'
import Nav from './components/Nav.jsx'
import Slide from './components/Slide.jsx'

import S01 from './slides/S01.jsx'
import S02 from './slides/S02.jsx'
import S03 from './slides/S03.jsx'
import S04 from './slides/S04.jsx'
import S05 from './slides/S05.jsx'
import S06 from './slides/S06.jsx'
import S07 from './slides/S07.jsx'
import S08 from './slides/S08.jsx'
import S09 from './slides/S09.jsx'
import S10 from './slides/S10.jsx'
import S11 from './slides/S11.jsx'
import S12 from './slides/S12.jsx'
import S13 from './slides/S13.jsx'

const SLIDES = [
  { component: S01, variant: 'dark' },
  { component: S02, variant: 'light' },
  { component: S03, variant: 'light' },
  { component: S04, variant: 'dark' },
  { component: S05, variant: 'light' },
  { component: S06, variant: 'light' },
  { component: S07, variant: 'light' },
  { component: S08, variant: 'dark' },
  { component: S09, variant: 'light' },
  { component: S10, variant: 'dark' },
  { component: S11, variant: 'light' },
  { component: S12, variant: 'dark' },
  { component: S13, variant: 'light' },
]

const TOTAL = SLIDES.length

export default function App() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  // direction: 1 = forward, -1 = backward
  const [direction, setDirection] = useState(1)
  // exiting index during animation
  const [exiting, setExiting] = useState(null)
  const timerRef = useRef(null)

  const go = useCallback((dir) => {
    if (animating) return
    setAnimating(true)
    setDirection(dir)
    setExiting(current)

    const next = (current + dir + TOTAL) % TOTAL
    setCurrent(next)

    timerRef.current = setTimeout(() => {
      setExiting(null)
      setAnimating(false)
    }, 450)
  }, [animating, current])

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); go(1) }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(-1) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go])

  // Touch swipe
  useEffect(() => {
    let tx = 0
    const onStart = (e) => { tx = e.touches[0].clientX }
    const onEnd = (e) => {
      const dx = tx - e.changedTouches[0].clientX
      if (Math.abs(dx) > 50) go(dx > 0 ? 1 : -1)
    }
    window.addEventListener('touchstart', onStart)
    window.addEventListener('touchend', onEnd)
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [go])

  const getState = (index) => {
    if (index === current) {
      // Entering — what direction are we coming from?
      if (animating && direction < 0) return 'entering-left'
      return 'active'
    }
    if (index === exiting) {
      // Exiting — direction determines exit direction
      if (direction > 0) return 'exiting-left'
      return 'idle' // exits right (default translateX(40px))
    }
    return 'idle'
  }

  return (
    <>
      <ProgressBar current={current} total={TOTAL} />
      <div className="deck">
        {SLIDES.map(({ component: Component, variant }, i) => (
          <Slide key={i} variant={variant} state={getState(i)}>
            <Component />
          </Slide>
        ))}
      </div>
      <Nav
        current={current}
        total={TOTAL}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
      />
    </>
  )
}
