import styled from 'styled-components'
import Logo from '../components/Logo.jsx'
import { GapBadge, GapNum, H2, Col2, BigNumber, NoteBox } from './shared.js'

const CardDark = styled.div`
  padding: 32px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
`

const CardTerra = styled.div`
  padding: 32px;
  background: var(--terra);
  border-radius: 4px;
`

const CardLabel = styled.p`
  font-family: var(--font-ui);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
  color: ${({ $color }) => $color ?? 'var(--bege)'};
`

const CardNote = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  margin-top: 8px;
  color: ${({ $color }) => $color ?? 'var(--bege)'};
  opacity: ${({ $dim }) => ($dim ? 0.5 : 1)};
`

const NoteStrong = styled.strong`
  color: var(--amber);
`

export default function S08() {
  return (
    <>
      <Logo variant="dark" />
      <div style={{ width: '100%' }}>
        <GapBadge>
          <GapNum $bg="var(--amber)" $color="var(--navy-deep)">1</GapNum>
          <span style={{ color: 'var(--amber)', letterSpacing: '2px' }}>Gap mais fácil de explorar</span>
        </GapBadge>
        <H2 $theme="dark">Ninguém faz o cálculo na tela.</H2>
        <Col2 $mt="24px" style={{ marginTop: '24px', alignItems: 'stretch' }}>
          <CardDark>
            <CardLabel>Lente mensal — 10 anos</CardLabel>
            <BigNumber $size="64px" $color="rgba(255,255,255,.3)">R$ 20k+</BigNumber>
            <CardNote $dim>R$ 1.800–2.400/ano × 10 anos.<br />Custo eterno. Invisível.</CardNote>
          </CardDark>
          <CardTerra>
            <CardLabel $color="rgba(255,255,255,.7)">Cirurgia IBR — uma vez</CardLabel>
            <BigNumber $size="64px" $color="var(--amber)">R$ 8k</BigNumber>
            <CardNote $color="rgba(255,255,255,.8)">Investimento único. Pago em 4–8 anos.<br />Depois disso: lucro todos os anos.</CardNote>
          </CardTerra>
        </Col2>
        <NoteBox $mt="20px" $bg="rgba(254,177,97,.1)" $borderColor="var(--amber)">
          <p style={{ color: 'var(--bege)', fontSize: '13px' }}>
            <NoteStrong>Formatos:</NoteStrong> Reel com número crescendo na tela · Calculadora interativa no site · Argumento de vendas no WhatsApp
          </p>
        </NoteBox>
      </div>
    </>
  )
}
