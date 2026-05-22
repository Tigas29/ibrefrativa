import styled from 'styled-components'

const Card = styled.a`
  display: block;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.10);
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(254, 177, 97, 0.35);
    background: rgba(255, 255, 255, 0.08);
  }

  &:active {
    transform: translateY(0);
  }
`

const Image = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #1a2230;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.03);
  }
`

const Body = styled.div`
  padding: 16px 18px 18px;
`

const Label = styled.span`
  display: inline-block;
  font-family: var(--font-ui);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #FEB161;
  margin-bottom: 10px;
`

const Title = styled.h2`
  font-family: var(--font-serif);
  font-size: 17px;
  font-weight: 400;
  line-height: 1.35;
  color: #EDE9DE;
  margin: 0 0 8px;
  letter-spacing: -0.2px;
`

const Description = styled.p`
  font-family: var(--font-ui);
  font-size: 13px;
  line-height: 1.6;
  color: #C9C2B2;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export default function ArticleCard({ href, image, label, title, description }) {
  return (
    <Card href={href} target="_blank" rel="noopener noreferrer">
      <Image>
        <img src={image} alt={title} loading="lazy" />
      </Image>
      <Body>
        <Label>{label}</Label>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Body>
    </Card>
  )
}
