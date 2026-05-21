import styled from 'styled-components'

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--amber);
  transition: width 0.4s ease;
  z-index: 100;
  width: ${({ $pct }) => $pct}%;
`

export default function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100
  return <Bar $pct={pct} />
}
