"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import styles from './RecruiterHeader.module.css';

export default function RecruiterHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/recruiter-dashboard" className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <span>CCA Recruiter</span>
        </Link>
        
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            <li>
              <Link 
                href="/recruiter-dashboard" 
                className={pathname === '/recruiter-dashboard' ? styles.active : ''}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/recruiter-dashboard/manage-jobs"
                className={pathname?.includes('/manage-jobs') ? styles.active : ''}
              >
                Manage Jobs
              </Link>
            </li>
            <li>
              <Link 
                href="/recruiter-dashboard/manage-applications"
                className={pathname?.includes('/manage-applications') ? styles.active : ''}
              >
                Applications
              </Link>
            </li>
          </ul>
        </nav>
        
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
        </div>
      </div>
    </header>
  );
}
