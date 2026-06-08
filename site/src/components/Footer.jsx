/**
 * IBR — Footer v2
 * Logo maior (48px), layout 3 colunas, links redes sociais,
 * CRM e disclaimer CFM.
 */

import styled from 'styled-components'
import { MessageCircle, MapPin } from 'lucide-react'

const InstagramIcon = ({ size = 15 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const WA_LINK   = 'https://wa.me/551150284894'
const IG_LINK   = 'https://www.instagram.com/drluisfelipebortolan'

const Foot = styled.footer`
  background: var(--navy-deep);
  padding: 72px var(--gutter) 44px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`

const Inner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`

const Top = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 56px;
  padding-bottom: 52px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const Brand = styled.div``

/* Logo aumentada */
const FootLogo = styled.img`
  height: 64px;
  margin-bottom: 24px;
  display: block;
`

const FootTagline = styled.p`
  font-family: var(--font-ui);
  font-size: 14px;
  color: rgba(201, 194, 178, 0.7);
  line-height: 1.7;
  max-width: 280px;
`

const Column = styled.div``

const ColTitle = styled.p`
  font-family: var(--font-ui);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 20px;
`

const FootLink = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: var(--font-ui);
  font-size: 14px;
  color: rgba(201, 194, 178, 0.7);
  margin-bottom: 14px;
  transition: color 0.2s;
  line-height: 1.5;

  &:hover { color: var(--creme); }

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    opacity: 0.55;
    transition: opacity 0.2s;
  }

  &:hover svg { opacity: 0.85; }
`

const Address = styled.span`
  font-family: var(--font-ui);
  font-size: 14px;
  color: rgba(201, 194, 178, 0.7);
  line-height: 1.75;
`

const Bottom = styled.div`
  padding-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Crm = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  color: rgba(201, 194, 178, 0.5);
`

const Compliance = styled.p`
  font-family: var(--font-ui);
  font-size: 12px;
  font-style: italic;
  color: rgba(201, 194, 178, 0.38);
  line-height: 1.65;
  max-width: 720px;
`

export default function Footer() {
  return (
    <Foot>
      <Inner>
        <Top>
          <Brand>
            <FootLogo
              src="/logos/logo-branca-trim.png"
              alt="IBR — Instituto Brasileiro de Refrativa"
            />
            <FootTagline>
              Instituto dedicado exclusivamente à cirurgia refrativa em São Paulo.
              Indicação criteriosa. Acompanhamento do começo ao fim.
            </FootTagline>
          </Brand>

          <Column>
            <ColTitle>Contato</ColTitle>
            <FootLink href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={15} />
              +55 11 5028-4894
            </FootLink>
            <FootLink href={IG_LINK} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={15} />
              @drluisfelipebortolan
            </FootLink>
          </Column>

          <Column>
            <ColTitle>Localização</ColTitle>
            <FootLink as="div" style={{ cursor: 'default' }}>
              <MapPin size={15} style={{ marginTop: '3px' }} />
              <Address>
                Av. Brigadeiro Luís Antônio, 3097<br />
                Jardim Paulista, São Paulo – SP<br />
                CEP 01401-000
              </Address>
            </FootLink>
          </Column>
        </Top>

        <Bottom>
          <Crm>
            Responsável técnico: Dr. Luis Felipe Bortolan — CRM 205675 (SP) · RQE 148991
          </Crm>
          <Compliance>
            Resultados variam conforme avaliação individual. Não há promessa ou garantia de resultado.
            A indicação cirúrgica é definida após exames específicos realizados pelo médico responsável.
            Informações divulgadas em conformidade com a Resolução CFM nº 1.974/2011 e normas do Conselho Federal de Medicina.
          </Compliance>
        </Bottom>
      </Inner>
    </Foot>
  )
}
