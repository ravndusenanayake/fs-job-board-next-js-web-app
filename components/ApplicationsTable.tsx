"use client";

import { useState } from 'react';
import styles from './ApplicationsTable.module.css';
import ApplicationDetailsModal from './ApplicationDetailsModal';
import { useRouter } from 'next/navigation';

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
  applications: Application[];
}

export default function ApplicationsTable({ applications: initialApplications }: Props) {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setApplications(prev =>
          prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
        );

        // Update the selected application if it's the one we're viewing
        if (selectedApplication?.id === id) {
          setSelectedApplication({ ...selectedApplication, status: newStatus });
        }

        // Optionally refresh the page data
        router.refresh();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Applicant</th>
            <th className={styles.th}>Applied For</th>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className={styles.tr}>
              <td className={styles.td}>
                <div className={styles.applicantInfo}>
                  <span className={styles.applicantName}>{app.name}</span>
                  <span className={styles.applicantEmail}>{app.email}</span>
                </div>
              </td>
              <td className={styles.td}>
                <span className={styles.jobTitle}>{app.job.title}</span>
              </td>
              <td className={styles.td}>{formatDate(app.createdAt)}</td>
              <td className={styles.td}>
                <span className={`${styles.badge} ${styles[(app.status || 'Pending').toLowerCase()]}`}>
                  {app.status || 'Pending'}
                </span>
              </td>
              <td className={styles.td}>
                <div className={styles.actions}>
                  <button
                    className={styles.viewBtn}
                    onClick={() => handleViewDetails(app)}
                  >
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ApplicationDetailsModal
        isOpen={isModalOpen}
        application={selectedApplication}
        onClose={() => setIsModalOpen(false)}
        onStatusUpdate={handleUpdateStatus}
      />
    </div>
  );
}
