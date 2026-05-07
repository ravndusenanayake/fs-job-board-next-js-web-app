'use client';

import { useState } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <span>CCA Job Board</span>
        </Link>
        
        <div className={`${styles.mobileWrapper} ${isMenuOpen ? styles.isOpen : ''}`}>
          <nav className={styles.nav}>
            <ul className={styles.navLinks}>
              <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link href="/jobs" onClick={() => setIsMenuOpen(false)}>Find Jobs</Link></li>
            </ul>
          </nav>
          
          <div className={styles.actions}>
            <Link href="#" className={styles.signIn}>Sign In</Link>
            <Link href="#" className="btn-primary">Post a Job</Link>
          </div>
        </div>
        
        <button 
          className={`${styles.mobileMenuBtn} ${isMenuOpen ? styles.btnActive : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
