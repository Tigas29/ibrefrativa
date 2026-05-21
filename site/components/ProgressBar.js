import styles from './ProgressBar.module.css';

export default function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;
  return (
    <div
      className={styles.bar}
      style={{ width: `${pct}%` }}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
    />
  );
}
