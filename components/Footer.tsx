import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerGrid}>
          
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}></div>
              <span>CCA Job Board</span>
            </div>
            <p className={styles.description}>
              The premier destination for software engineering students to launch their careers, connect with top companies, and find internships or entry-level positions.
            </p>
          </div>
          
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; {currentYear} CCA Job Board. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
