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
          
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>For Students</h4>
            <ul className={styles.linksList}>
              <li><Link href="#">Browse Jobs</Link></li>
              <li><Link href="#">Resume Review</Link></li>
              <li><Link href="#">Interview Prep</Link></li>
              <li><Link href="#">Career Events</Link></li>
            </ul>
          </div>
          
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>For Employers</h4>
            <ul className={styles.linksList}>
              <li><Link href="#">Post a Job</Link></li>
              <li><Link href="#">Browse Candidates</Link></li>
              <li><Link href="#">Pricing</Link></li>
            </ul>
          </div>
          
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>CCA</h4>
            <ul className={styles.linksList}>
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className={styles.bottomBar}>
          <p>&copy; {currentYear} CCA Job Board. All rights reserved.</p>
          <div className={styles.socialLinks}>
            {/* Social icons placeholders */}
            <Link href="#" aria-label="Twitter">
              <div className={styles.socialIcon}></div>
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <div className={styles.socialIcon}></div>
            </Link>
            <Link href="#" aria-label="GitHub">
              <div className={styles.socialIcon}></div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
