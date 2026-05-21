import styles from './Slide.module.css';

/**
 * Slide — wrapper reutilizável do deck
 * variant: 'light' | 'dark' | 'navy'
 * state:   'active' | 'exit-left' | 'enter-from-left' | 'idle'
 */
export default function Slide({ variant = 'dark', state = 'idle', children }) {
  const classes = [
    styles.slide,
    styles[variant],
    state === 'active' ? styles.active : '',
    state === 'exit-left' ? styles.exitLeft : '',
    state === 'enter-from-left' ? styles.enterFromLeft : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
