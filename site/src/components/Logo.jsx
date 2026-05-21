import styled from 'styled-components'

const LogoImg = styled.img`
  position: absolute;
  top: 36px;
  right: 52px;
  height: 32px;
  opacity: 0.9;
`

// light theme => navy logo (03.png)
// dark/navy theme => white logo (02.png)
export default function Logo({ variant = 'dark' }) {
  const src = variant === 'light' ? '/logos/03.png' : '/logos/02.png'
  return <LogoImg src={src} alt="IBR" />
}
