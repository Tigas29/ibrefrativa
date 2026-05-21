import styled from 'styled-components'
import Logo from '../components/Logo.jsx'
import { AccentLine, Eyebrow, H2, Col3, GapBadge, GapNum, NoteBox } from './shared.js'

const TribeCard = styled.div`
  padding: 24px;
  background: ${({ $bg }) => $bg ?? 'rgba(255,255,255,.06)'};
  border: ${({ $border }) => $border ?? 'none'};
  border-radius: 4px;
`

const TribeIcon = styled.p`
  font-size: 28px;
  margin-bottom: 12px;
`

const TribeName = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 700;
  color: ${({ $color }) => $color ?? 'var(--amber)'};
  margin-bottom: 8px;
`

const TribeDesc = styled.p`
  font-family: var(--font-ui);
  font-size: 12px;
  line-height: 1.6;
  color: ${({ $color }) => $color ?? 'var(--bege)'};
`

const NoteText = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--bege);
`

export default function S11() {
  return (
    <>
      <Logo variant="light" />
      <AccentLine $color="var(--terra)" />
      <div style={{ width: '100%' }}>
        <GapBadge>
          <GapNum $bg="var(--navy-deep)" $color="var(--creme)">4</GapNum>
          <span style={{ color: 'var(--terra)' }}>Prova social espelhada</span>
        </GapBadge>
        <H2 $theme="light">Ninguém fala com<br />tribos específicas.</H2>
        <Col3 $mt="20px">
          <TribeCard $bg="var(--navy-deep)">
            <TribeIcon>🥊</TribeIcon>
            <TribeName>Lutador / esportista de contato</TribeName>
            <TribeDesc>
              "Eu levei o nocaute da minha vida. Não foi soco — foi porque não enxergava direito."<br /><br />
              PRK para atleta de contato. Sem flap. Volta em 30 dias.
            </TribeDesc>
          </TribeCard>
          <TribeCard $bg="rgba(163,81,57,.1)" $border="1px solid var(--terra)">
            <TribeIcon>💻</TribeIcon>
            <TribeName $color="var(--terra)">Dev / profissional de TI</TribeName>
            <TribeDesc $color="var(--navy)">
              "São 23h. Mais 2h de PR open. A lente ressecou às 19h. Trabalho mal. Durmo mal."<br /><br />
              Série específica. Copy que entra na dor exata.
            </TribeDesc>
          </TribeCard>
          <TribeCard $bg="rgba(44,59,77,.08)" $border="1px solid rgba(44,59,77,.2)">
            <TribeIcon>🏃</TribeIcon>
            <TribeName $color="var(--navy)">Corredor urbano</TribeName>
            <TribeDesc $color="var(--navy)">
              "No km 5 o óculos caiu. Parei. Perdi o ritmo. De novo."<br /><br />
              Ativação em corridas de SP. Presença onde o público-alvo literalmente está.
            </TribeDesc>
          </TribeCard>
        </Col3>
        <NoteBox $mt="20px" $bg="var(--navy-deep)" $borderColor="var(--amber)">
          <NoteText>
            <strong style={{ color: 'var(--amber)' }}>Resultado:</strong> custo de aquisição mais baixo · prova social espelhada · taxa de conversão mais alta · nenhum concorrente está fazendo isso.
          </NoteText>
        </NoteBox>
      </div>
    </>
  )
}
