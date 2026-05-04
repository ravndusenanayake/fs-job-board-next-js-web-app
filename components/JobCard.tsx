import Link from 'next/link';
import styles from './JobCard.module.css';
import { Job } from '../data/jobs';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className={styles.jobCard}>
      <div className={styles.jobCardHeader}>
        <div className={styles.jobCompanyLogo} style={{ backgroundColor: job.logoColor || '#7c3aed' }}>
          {job.company.charAt(0)}
        </div>
        <div className={styles.jobBasicInfo}>
          <h3>{job.title}</h3>
          <p className={styles.jobCompany}>{job.company} &bull; {job.location}</p>
        </div>
      </div>
      
      <div className={styles.jobTags}>
        <span className={styles.jobType}>{job.type}</span>
        {job.salaryRange && (
          <span className={styles.jobSalary}>{job.salaryRange}</span>
        )}
        {job.tags.slice(0, 3).map(tag => (
          <span key={tag} className={styles.jobTechTag}>{tag}</span>
        ))}
      </div>
      
      <div className={styles.jobCardFooter}>
        <span className={styles.jobDate}>
          Posted {new Date(job.postedAt).toLocaleDateString()}
        </span>
        <Link href={`/jobs/${job.id}`} className={styles.applyBtn}>
          View Details
        </Link>
      </div>
    </div>
  );
}
