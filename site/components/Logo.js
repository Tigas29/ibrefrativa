import Image from 'next/image';
import styles from './Logo.module.css';

/**
 * Logo — adapta automaticamente ao tema do slide
 * variant: 'dark' | 'light' | 'navy'
 * - dark/navy: logo branco (02.png — letras brancas, fundo transparente)
 * - light:     logo navy  (03.png — letras navy-deep, fundo transparente)
 * position: 'corner' (default) | 'hero' (maior, para capa)
 */
export default function Logo({ variant = 'dark', position = 'corner', alt = 'IBR — Instituto Brasileiro de Refrativa' }) {
  const isDark = variant === 'dark' || variant === 'navy';
  const src = isDark ? '/logos/02.png' : '/logos/03.png';

  return (
    <div className={`${styles.logo} ${styles[position]}`}>
      <Image
        src={src}
        alt={alt}
        width={position === 'hero' ? 320 : 180}
        height={position === 'hero' ? 80 : 44}
        style={{ objectFit: 'contain', objectPosition: 'left' }}
        priority
      />
    </div>
  );
}
