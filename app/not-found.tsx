import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.errorCode} text-gradient`}>404</h1>
      <h2 className={styles.title}>Page Not Found</h2>
      <p className={styles.description}>
        Oops! The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
      </p>
      <div className={styles.actions}>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
        <Link href="/jobs" className="btn-secondary">
          Browse Jobs
        </Link>
      </div>
    </div>
  );
}
