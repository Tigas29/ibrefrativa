import styled from 'styled-components'
import Logo from '../components/Logo.jsx'
import { AccentLine, Eyebrow, H2, NoteBox } from './shared.js'

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

const NoteText = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--navy-deep);
`

export default function S06() {
  return (
    <>
      <Logo variant="light" />
      <AccentLine $color="var(--terra)" />
      <div style={{ width: '100%' }}>
        <Eyebrow $theme="light">Landscape Competitivo</Eyebrow>
        <H2 $theme="light">Quem está no jogo</H2>
        <Table>
          <thead>
            <tr>
              <Th>Player</Th>
              <Th>Tipo</Th>
              <Th>Presença</Th>
              <Th>Força</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><strong>Opty / HOBrasil / Eye Care</strong></Td>
              <Td>Rede integrada</Td>
              <Td>Nacional (+40 clínicas)</Td>
              <Td>Volume e estrutura</Td>
            </tr>
            <tr>
              <Td><strong>CBV Hospital de Olhos</strong></Td>
              <Td>Hospital especializado</Td>
              <Td>Brasília + SP</Td>
              <Td>Institucional</Td>
            </tr>
            <tr>
              <Td><strong>Dr. Gabriel Castro / Galilei</strong></Td>
              <Td>Médico com marca pessoal</Td>
              <Td>SP — Instagram forte</Td>
              <Td>Conteúdo digital variado</Td>
            </tr>
            <tr>
              <Td><strong>Ocular Laser / UNICO</strong></Td>
              <Td>Centro de laser premium</Td>
              <Td>SP + MG</Td>
              <Td>Experiência e tecnologia</Td>
            </tr>
          </tbody>
        </Table>
        <NoteBox $mt="20px" $bg="rgba(163,81,57,.1)" $borderColor="var(--terra)">
          <NoteText>
            <strong>O espaço livre:</strong> especialista técnico de alto padrão que fala com o paciente como gente e mostra o resultado real de perto. Nenhum dos players acima ocupa essa posição.
          </NoteText>
        </NoteBox>
      </div>
    </>
  )
}
