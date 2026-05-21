// Shared styled primitives reused across slides
import styled from 'styled-components'

// ── Layout ──────────────────────────────────────────────────
export const SlideContent = styled.div`
  width: 100%;
`

export const Col2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ $gap }) => $gap ?? '48px'};
  width: 100%;
  align-items: ${({ $align }) => $align ?? 'start'};
`

export const Col3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  width: 100%;
  margin-top: ${({ $mt }) => $mt ?? '0'};
`

// ── Typography ──────────────────────────────────────────────
export const Eyebrow = styled.span`
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 20px;
  display: block;
  color: ${({ $theme }) =>
    $theme === 'light' ? 'var(--terra)' : 'var(--amber)'};
  opacity: ${({ $invisible }) => ($invisible ? 0 : 1)};
`

export const H2 = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.5px;
  margin-bottom: 32px;
  color: ${({ $theme }) =>
    $theme === 'light' ? 'var(--navy-deep)' : 'var(--creme)'};
`

export const Quote = styled.p`
  font-family: var(--font-serif);
  font-style: italic;
  font-size: ${({ $size }) => $size ?? 'clamp(22px, 3vw, 36px)'};
  line-height: 1.4;
  letter-spacing: -0.3px;
  max-width: 800px;
  color: ${({ $color }) => $color ?? 'var(--creme)'};
`

// ── Divider ─────────────────────────────────────────────────
export const Divider = styled.div`
  width: 48px;
  height: 2px;
  margin-bottom: 28px;
  background: ${({ $theme }) =>
    $theme === 'light' ? 'var(--terra)' : 'var(--amber)'};
`

// ── Accent line ─────────────────────────────────────────────
export const AccentLine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: ${({ $color }) => $color ?? 'var(--terra)'};
`

// ── Tags ────────────────────────────────────────────────────
const tagVariants = {
  amber: { bg: 'var(--amber)', color: 'var(--navy-deep)' },
  terra: { bg: 'var(--terra)', color: 'var(--white)' },
  navy:  { bg: 'var(--navy)', color: 'var(--creme)' },
  bege:  { bg: 'var(--bege)', color: 'var(--navy-deep)' },
}

export const Tag = styled.span`
  display: inline-block;
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 5px 12px;
  border-radius: 2px;
  background: ${({ $v }) => tagVariants[$v]?.bg ?? 'var(--amber)'};
  color: ${({ $v }) => tagVariants[$v]?.color ?? 'var(--navy-deep)'};
`

// ── Stat row ────────────────────────────────────────────────
export const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
  margin-top: 8px;
`

export const StatBox = styled.div`
  padding: 28px 24px;
  border-radius: 4px;
  background: ${({ $dark, $custom }) =>
    $custom ?? ($dark
      ? 'rgba(255,255,255,.07)'
      : 'rgba(255,255,255,.6)')};
  border: ${({ $dark }) =>
    $dark ? '1px solid rgba(255,255,255,.12)' : 'none'};
`

export const StatNum = styled.div`
  font-family: var(--font-serif);
  font-size: clamp(36px, 4vw, 52px);
  line-height: 1;
  letter-spacing: -1px;
  margin-bottom: 6px;
  color: ${({ $theme, $color }) =>
    $color ?? ($theme === 'light' ? 'var(--terra)' : 'var(--amber)')};
`

export const StatLabel = styled.div`
  font-family: var(--font-ui);
  font-size: 12px;
  line-height: 1.5;
  color: ${({ $theme, $color }) =>
    $color ?? ($theme === 'light' ? 'var(--navy)' : 'var(--bege)')};
`

// ── BigNumber ────────────────────────────────────────────────
export const BigNumber = styled.div`
  font-family: var(--font-serif);
  font-size: ${({ $size }) => $size ?? 'clamp(64px, 9vw, 120px)'};
  line-height: 1;
  letter-spacing: -2px;
  color: ${({ $color }) => $color ?? 'var(--amber)'};
`

// ── Cards ────────────────────────────────────────────────────
export const Card = styled.div`
  padding: ${({ $p }) => $p ?? '28px 32px'};
  border-radius: 4px;
  background: ${({ $bg }) => $bg ?? 'rgba(255,255,255,.06)'};
  border: ${({ $border }) => $border ?? 'none'};
  display: ${({ $flex }) => ($flex ? 'flex' : 'block')};
  flex-direction: ${({ $col }) => ($col ? 'column' : 'row')};
  justify-content: ${({ $justify }) => $justify ?? 'flex-start'};
  align-items: ${({ $align }) => $align ?? 'flex-start'};
  height: ${({ $full }) => ($full ? '100%' : 'auto')};
  gap: ${({ $gap }) => $gap ?? '0'};
`

// ── Gap badge ────────────────────────────────────────────────
export const GapBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 24px;
`

export const GapNum = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-family: var(--font-serif);
  font-weight: 400;
  background: ${({ $bg }) => $bg ?? 'var(--amber)'};
  color: ${({ $color }) => $color ?? 'var(--navy-deep)'};
  border: ${({ $border }) => $border ?? 'none'};
  flex-shrink: 0;
`

// ── Persona ──────────────────────────────────────────────────
export const PersonaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
`

export const PersonaCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 22px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

export const PersonaIcon = styled.div`
  font-size: 28px;
  flex-shrink: 0;
`

// ── Info row (horizontal boxes) ──────────────────────────────
export const InfoRow = styled.div`
  margin-top: ${({ $mt }) => $mt ?? '24px'};
  display: flex;
  gap: 24px;
`

export const InfoBox = styled.div`
  padding: ${({ $p }) => $p ?? '16px 24px'};
  background: ${({ $bg }) => $bg ?? 'rgba(0,0,0,.05)'};
  border-radius: 4px;
  flex: 1;
  border-left: ${({ $borderLeft }) => $borderLeft ?? 'none'};
`

// ── Steps ────────────────────────────────────────────────────
export const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`

export const Step = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);

  &:last-child {
    border-bottom: none;
  }
`

export const StepNum = styled.span`
  font-family: var(--font-serif);
  font-size: 13px;
  font-style: italic;
  width: 24px;
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--terra);
`

export const StepTitle = styled.p`
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 700;
  color: var(--navy-deep);
  margin-bottom: 3px;
`

export const StepDesc = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--navy);
  line-height: 1.55;
  opacity: 0.8;
`

// ── Highlight note box ───────────────────────────────────────
export const NoteBox = styled.div`
  margin-top: ${({ $mt }) => $mt ?? '20px'};
  padding: 16px 24px;
  background: ${({ $bg }) => $bg ?? 'rgba(254,177,97,.1)'};
  border-left: 3px solid ${({ $borderColor }) => $borderColor ?? 'var(--amber)'};
  border-radius: 0 4px 4px 0;
`

// ── Separator line ───────────────────────────────────────────
export const Sep = styled.div`
  height: 1px;
  background: ${({ $color }) => $color ?? 'rgba(255,255,255,.1)'};
  margin: ${({ $m }) => $m ?? '24px 0'};
`
