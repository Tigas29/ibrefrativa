import styled from 'styled-components'
import Logo from '../components/Logo.jsx'
import { AccentLine, Eyebrow, H2 } from './shared.js'

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

const Check = styled.span`
  color: var(--amber);
  font-size: 15px;
`

const Cross = styled.span`
  color: var(--bege);
  opacity: 0.3;
  font-size: 15px;
`

const GapCell = styled.td`
  padding: 11px 16px;
  vertical-align: top;
  line-height: 1.5;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`

const GapBadgeInline = styled.span`
  color: var(--amber);
  font-weight: 700;
  background: var(--navy-deep);
  padding: 4px 8px;
  border-radius: 2px;
  font-family: var(--font-ui);
  font-size: 13px;
`

const GapYes = styled.span`
  color: var(--terra);
  font-weight: 700;
  font-family: var(--font-ui);
  font-size: 13px;
`

export default function S07() {
  return (
    <>
      <Logo variant="light" />
      <AccentLine $color="var(--terra)" />
      <div style={{ width: '100%' }}>
        <Eyebrow $theme="light">Mapa de Conteúdo</Eyebrow>
        <H2 $theme="light">O que os concorrentes estão fazendo</H2>
        <Table>
          <thead>
            <tr>
              <Th>Formato</Th>
              <Th>CBV</Th>
              <Th>Eye Care</Th>
              <Th>Dr. Gabriel</Th>
              <Th>IBR pode fazer?</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>Depoimento (texto/vídeo)</Td>
              <Td><Check>✓</Check></Td>
              <Td><Check>✓</Check></Td>
              <Td><Check>✓</Check></Td>
              <GapCell><GapYes>Sim — melhor</GapYes></GapCell>
            </tr>
            <tr>
              <Td>Estudo de caso narrativo</Td>
              <Td><Check>✓</Check></Td>
              <Td><Check>✓</Check></Td>
              <Td><Check>✓</Check></Td>
              <GapCell><GapYes>Sim — mais próximo</GapYes></GapCell>
            </tr>
            <tr>
              <Td>Lo-fi / bastidor / trending</Td>
              <Td><Check>✓</Check></Td>
              <Td><Cross>–</Cross></Td>
              <Td><Check>✓</Check></Td>
              <GapCell><GapYes>Sim</GapYes></GapCell>
            </tr>
            <tr>
              <Td>Série por profissão (nicho)</Td>
              <Td style={{ fontSize: '12px', color: 'var(--bege)' }}>só estático</Td>
              <Td><Cross>–</Cross></Td>
              <Td><Cross>–</Cross></Td>
              <GapCell><GapBadgeInline>GAP aberto</GapBadgeInline></GapCell>
            </tr>
            <tr>
              <Td>Série documental pós-operatório</Td>
              <Td><Cross>–</Cross></Td>
              <Td><Cross>–</Cross></Td>
              <Td><Cross>–</Cross></Td>
              <GapCell><GapBadgeInline>GAP aberto</GapBadgeInline></GapCell>
            </tr>
            <tr>
              <Td>ROI financeiro (custo vs cirurgia)</Td>
              <Td><Cross>–</Cross></Td>
              <Td><Cross>–</Cross></Td>
              <Td><Cross>–</Cross></Td>
              <GapCell><GapBadgeInline>GAP aberto</GapBadgeInline></GapCell>
            </tr>
            <tr>
              <Td>YouTube / SEO orgânico</Td>
              <Td><Cross>–</Cross></Td>
              <Td><Cross>–</Cross></Td>
              <Td><Cross>–</Cross></Td>
              <GapCell><GapBadgeInline>GAP aberto</GapBadgeInline></GapCell>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  )
}
