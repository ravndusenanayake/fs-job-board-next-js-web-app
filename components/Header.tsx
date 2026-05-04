import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <span>CCA Job Board</span>
        </Link>
        
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/jobs">Find Jobs</Link></li>
          </ul>
        </nav>
        
        <div className={styles.actions}>
          <Link href="#" className={styles.signIn}>Sign In</Link>
          <Link href="#" className="btn-primary">Post a Job</Link>
        </div>
        
        <button className={styles.mobileMenuBtn} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
