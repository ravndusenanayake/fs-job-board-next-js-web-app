import { getJobs } from "../../../../lib/jobs";
import JobsTable from "../../../../components/JobsTable";
import styles from "./ManageJobs.module.css";

export const metadata = {
  title: "Manage Jobs | CCA Recruiter",
};

export default async function ManageJobsPage() {
  // Fetch all jobs for the table (client-side pagination handling for smooth UX)
  // In a massive production app, we would use server-side pagination
  const { jobs } = await getJobs({ limit: 500 });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Manage Jobs</h1>
          <p className={styles.pageDescription}>
            View, edit, and manage all your active and closed job postings.
          </p>
        </div>
        <button className="btn-primary">
          Post New Job
        </button>
      </div>

      <JobsTable data={jobs} />
    </div>
  );
}
