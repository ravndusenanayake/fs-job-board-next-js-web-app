"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import styles from "./JobDetailsModal.module.css";

interface JobDetailsModalProps {
  job: any; // We'll pass the full job object fetched from the table
  onClose: () => void;
}

export default function JobDetailsModal({ job, onClose }: JobDetailsModalProps) {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!job) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div 
              className={styles.companyLogo} 
              style={{ backgroundColor: job.recruiter?.companyLogoColor || 'var(--primary)' }}
            >
              {job.recruiter?.companyName?.charAt(0) || 'C'}
            </div>
            <div className={styles.jobTitles}>
              <h2 className={styles.jobTitle}>{job.title}</h2>
              <span className={styles.companyName}>{job.recruiter?.companyName}</span>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Location</span>
              <span className={styles.metaValue}>{job.location}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Job Type</span>
              <span className={styles.metaValue}>{job.type}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Salary Range</span>
              <span className={styles.metaValue}>{job.salaryRange || 'Not specified'}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Posted Date</span>
              <span className={styles.metaValue}>{new Date(job.postedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>About the Role</h3>
            <p className={styles.sectionText}>
              {/* Mock description since it's not in the DB schema currently */}
              We are looking for a passionate {job.title} to join our team in {job.location}. 
              In this role, you will work closely with cross-functional teams to design, develop, 
              and deliver high-quality solutions. You will have the opportunity to work with modern 
              technologies and directly contribute to the success of our core products.
            </p>
          </div>

          {job.tags && job.tags.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Skills / Tags</h3>
              <div className={styles.tags}>
                {job.tags.map((tag: string) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.footer}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={() => alert('Edit functionality coming soon')}>Edit Job</button>
        </div>
      </div>
    </div>
  );
}
