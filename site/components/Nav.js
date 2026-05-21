import styles from './Nav.module.css';

export default function Nav({ current, total, onPrev, onNext }) {
  return (
    <nav className={styles.nav}>
      <span className={styles.counter}>{current} / {total}</span>
      <button className={styles.btn} onClick={onPrev} aria-label="Slide anterior">
        ←
      </button>
      <button className={styles.btn} onClick={onNext} aria-label="Próximo slide">
        →
      </button>
    </nav>
  );
}
