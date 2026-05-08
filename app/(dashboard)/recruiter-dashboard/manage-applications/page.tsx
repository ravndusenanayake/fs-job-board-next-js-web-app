import Link from 'next/link';
import Image from 'next/image';
import { getApplications } from '../../../../lib/applications';
import styles from './ManageApplications.module.css';
import ApplicationsTable from '../../../../components/ApplicationsTable';

export const metadata = {
  title: 'Manage Applications | CCA Recruiter',
};

export default async function ManageApplicationsPage() {
  const { applications, total } = await getApplications();

  if (total === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.illustrationWrapper}>
          <div className={styles.bgShape}></div>
          <Image 
            src="/images/no-applications.png" 
            alt="No applications" 
            width={280} 
            height={280} 
            className={styles.illustration}
            priority
          />
        </div>
        <h1 className={styles.title}>No applications yet</h1>
        <p className={styles.subtitle}>
          Your job postings haven't received any applications yet. 
          Make sure your job descriptions are clear and attractive!
        </p>
        <Link href="/recruiter-dashboard/manage-jobs" className={styles.backButton}>
          <span>←</span> Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manage Applications</h1>
        <p className={styles.pageDescription}>
          Review and manage all applications received for your job postings.
        </p>
      </div>
      
      <ApplicationsTable applications={applications as any} />
    </div>
  );
}
