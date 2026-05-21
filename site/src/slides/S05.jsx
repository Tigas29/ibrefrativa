import styled from 'styled-components'
import Logo from '../components/Logo.jsx'
import { AccentLine, Eyebrow, H2, Col2, Sep, Quote } from './shared.js'

const List = styled.ul`
  list-style: none;
  padding: 0;
`

const ListItem = styled.li`
  font-family: var(--font-ui);
  font-size: clamp(14px, 1.5vw, 17px);
  line-height: 1.65;
  color: var(--navy);
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: flex-start;
  gap: 12px;

  &:last-child {
    border-bottom: none;
  }

  &::before {
    content: "—";
    font-family: var(--font-serif);
    flex-shrink: 0;
    margin-top: 2px;
    opacity: 0.5;
  }
`

const QuoteBox = styled.div`
  padding: 32px;
  background: var(--navy-deep);
  border-radius: 4px;
  height: 100%;
`

const QuoteLabel = styled.p`
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 20px;
`

const QuoteAlt = styled(Quote)`
  color: var(--amber);
`

const QuoteNote = styled.p`
  font-family: var(--font-ui);
  font-size: 12px;
  color: var(--bege);
  opacity: 0.6;
  margin-top: 20px;
`

export default function S05() {
  return (
    <>
      <Logo variant="light" />
      <AccentLine $color="var(--terra)" />
      <Col2>
        <div>
          <Eyebrow $theme="light">Dores reais</Eyebrow>
          <H2 $theme="light">O que trava<br />a vida de quem usa óculos</H2>
          <List>
            <ListItem>Óculos embaça no treino. Frame bate na cara.</ListItem>
            <ListItem>Lente resseca depois de 8h de tela.</ListItem>
            <ListItem>Dependência diária — perde óculos, viagem complicada.</ListItem>
            <ListItem>Vergonha de foto sem óculos — e odeia aparecer com.</ListItem>
            <ListItem>34% dos brasileiros nunca foram ao oftalmologista.</ListItem>
          </List>
        </div>
        <div>
          <Eyebrow $invisible>x</Eyebrow>
          <QuoteBox>
            <QuoteLabel>Gatilho financeiro</QuoteLabel>
            <Quote $size="22px">"Em 12 anos você vai gastar R$ 12.000 em óculos, lentes e consultas.</Quote>
            <Sep />
            <QuoteAlt $size="22px">Ou você investe R$ 8.000 hoje e não gasta mais nada."</QuoteAlt>
            <QuoteNote>Argumento de ROI. Nenhum concorrente usa isso. Gap aberto.</QuoteNote>
          </QuoteBox>
        </div>
      </Col2>
    </>
  )
}
