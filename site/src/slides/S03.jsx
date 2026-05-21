import styled from 'styled-components'
import Logo from '../components/Logo.jsx'
import { AccentLine, Eyebrow, H2, Tag, InfoRow, InfoBox } from './shared.js'

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-ui);
  font-size: 13px;
`

const Th = styled.th`
  padding: 10px 16px;
  text-align: left;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: var(--navy-deep);
  color: var(--creme);
`

const Td = styled.td`
  padding: 11px 16px;
  vertical-align: top;
  line-height: 1.5;
  color: var(--navy);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`

const MetaLabel = styled.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ $dark }) => ($dark ? 'var(--amber)' : 'var(--terra)')};
  margin-bottom: 4px;
`

const MetaValue = styled.p`
  font-size: 22px;
  font-family: var(--font-serif);
  color: ${({ $dark }) => ($dark ? 'var(--creme)' : 'var(--navy-deep)')};
`

export default function S03() {
  return (
    <>
      <Logo variant="light" />
      <AccentLine $color="var(--terra)" />
      <div style={{ width: '100%' }}>
        <Eyebrow $theme="light">Dimensionamento</Eyebrow>
        <H2 $theme="light">Onde está o dinheiro</H2>
        <Table>
          <thead>
            <tr>
              <Th>Nível</Th>
              <Th>Universo</Th>
              <Th>Contexto</Th>
              <Th>Valor estimado</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><Tag $v="bege">TAM</Tag></Td>
              <Td><strong>85M</strong> usuários de correção visual</Td>
              <Td>Brasil — todos que usam óculos ou lentes</Td>
              <Td>—</Td>
            </tr>
            <tr>
              <Td><Tag $v="terra">SAM</Tag></Td>
              <Td><strong>28–53M</strong> míopes candidatos</Td>
              <Td>Foco em SP — maior renda e acesso</Td>
              <Td>R$ 1,3–1,5 bi/ano</Td>
            </tr>
            <tr>
              <Td><Tag $v="navy">SOM</Tag></Td>
              <Td>Particulares cirúrgicos em SP</Td>
              <Td>Nicho premium — Dr. Luis Felipe</Td>
              <Td>A definir por metas</Td>
            </tr>
          </tbody>
        </Table>
        <InfoRow $mt="24px">
          <InfoBox>
            <MetaLabel>Ticket por olho</MetaLabel>
            <MetaValue>R$ 4.000</MetaValue>
          </InfoBox>
          <InfoBox>
            <MetaLabel>Ticket por paciente</MetaLabel>
            <MetaValue>R$ 6–10k</MetaValue>
          </InfoBox>
          <InfoBox $bg="var(--navy-deep)">
            <MetaLabel $dark>Mercado privado Brasil</MetaLabel>
            <MetaValue $dark>R$ 1,3–1,5 bi/ano</MetaValue>
          </InfoBox>
        </InfoRow>
      </div>
    </>
  )
}
