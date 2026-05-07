"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import styles from './RecruiterHeader.module.css';

export default function RecruiterHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/recruiter-dashboard" className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <span>CCA Recruiter</span>
        </Link>
        
        <div className={`${styles.navWrapper} ${isMenuOpen ? styles.isOpen : ''}`}>
          <nav className={styles.nav}>
            <ul className={styles.navLinks}>
              <li>
                <Link 
                  href="/recruiter-dashboard" 
                  className={pathname === '/recruiter-dashboard' ? styles.active : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/recruiter-dashboard/manage-jobs"
                  className={pathname?.includes('/manage-jobs') ? styles.active : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Jobs
                </Link>
              </li>
              <li>
                <Link 
                  href="/recruiter-dashboard/manage-applications"
                  className={pathname?.includes('/manage-applications') ? styles.active : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Applications
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className={styles.mobileActions}>
             <Link href="/recruiter-dashboard/settings" onClick={() => setIsMenuOpen(false)}>Settings</Link>
             <button onClick={() => { setIsMenuOpen(false); alert('Log out functionality coming soon'); }}>Log out</button>
          </div>
        </div>
        
        <div className={styles.actions}>
          <ThemeToggle />
          
          <div className={styles.profileContainer}>
            {/* Dummy Profile Picture */}
            <div className={styles.profilePic} style={{ 
                backgroundImage: 'url("https://ui-avatars.com/api/?name=Recruiter&background=3b82f6&color=fff")',
                backgroundSize: 'cover'
            }} />
            
            {/* Dropdown Menu */}
            <div className={styles.dropdown}>
              <Link href="/recruiter-dashboard/settings">Settings</Link>
              <div className={styles.dropdownDivider}></div>
              <button onClick={() => alert('Log out functionality coming soon')}>Log out</button>
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
      </div>
    </header>
  );
}
