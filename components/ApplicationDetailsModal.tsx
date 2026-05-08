"use client";

import { useEffect, useState } from 'react';
import styles from './ApplicationDetailsModal.module.css';

interface Application {
  id: string;
  name: string;
  email: string;
  portfolioUrl?: string | null;
  coverLetter?: string | null;
  status: string;
  createdAt: string | Date;
  job: {
    title: string;
  };
}

interface Props {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: string, newStatus: string) => Promise<void>;
}

export default function ApplicationDetailsModal({ application, isOpen, onClose, onStatusUpdate }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !application) return null;

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    await onStatusUpdate(application.id, newStatus);
    setIsUpdating(false);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        
        <div className={styles.header}>
          <div className={styles.avatar}>
            {application.name.charAt(0)}
          </div>
          <div className={styles.headerText}>
            <h2 className={styles.name}>{application.name}</h2>
            <p className={styles.email}>{application.email}</p>
          </div>
          <div className={`${styles.statusBadge} ${styles[(application.status || 'Pending').toLowerCase()]}`}>
            {application.status || 'Pending'}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Applied For</h3>
            <p className={styles.jobTitle}>{application.job.title}</p>
            <p className={styles.date}>Applied on {formatDate(application.createdAt)}</p>
          </div>

          {application.portfolioUrl && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Portfolio / Link</h3>
              <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {application.portfolioUrl}
              </a>
            </div>
          )}

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Cover Letter / Message</h3>
            <div className={styles.coverLetter}>
              {application.coverLetter || "No cover letter provided."}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.statusActions}>
            <span>Update Status:</span>
            <button 
              className={`${styles.actionBtn} ${styles.btnReviewed}`}
              onClick={() => handleStatusChange('Reviewed')}
              disabled={isUpdating}
            >
              Reviewed
            </button>
            <button 
              className={`${styles.actionBtn} ${styles.btnShortlisted}`}
              onClick={() => handleStatusChange('Shortlisted')}
              disabled={isUpdating}
            >
              Shortlist
            </button>
            <button 
              className={`${styles.actionBtn} ${styles.btnRejected}`}
              onClick={() => handleStatusChange('Rejected')}
              disabled={isUpdating}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
