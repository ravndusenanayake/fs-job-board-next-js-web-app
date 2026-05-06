import Link from 'next/link';
import styles from '../../../not-found.module.css';

export default function JobNotFound() {
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.jobNotFoundCard}>
        <div className={styles.iconWrapper}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        <h2 className={`${styles.title} text-gradient`}>Job Not Found</h2>
        
        <p className={styles.description}>
          This position may have been filled, the listing could have expired, or the URL might be incorrect. 
          Don't worry though—there are plenty of other opportunities waiting for you!
        </p>
        
        <div className={styles.actions}>
          <Link href="/jobs" className="btn-primary">
            Browse All Jobs
          </Link>
          <Link href="/" className="btn-secondary">
            Return to Homepage
          </Link>
        </div>

        <h3 className={styles.suggestionsTitle}>Popular Searches</h3>
        <ul className={styles.suggestionsList}>
          <li>
            <Link href="/jobs?search=Frontend" className={styles.suggestionPill}>
              Frontend Developer
            </Link>
          </li>
          <li>
            <Link href="/jobs?search=Backend" className={styles.suggestionPill}>
              Backend Developer
            </Link>
          </li>
          <li>
            <Link href="/jobs?search=Intern" className={styles.suggestionPill}>
              Internships
            </Link>
          </li>
          <li>
            <Link href="/jobs?search=Remote" className={styles.suggestionPill}>
              Remote Jobs
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
