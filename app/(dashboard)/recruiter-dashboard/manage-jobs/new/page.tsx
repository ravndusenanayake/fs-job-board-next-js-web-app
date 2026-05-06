import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostJobForm from "./PostJobForm";
import styles from "./PostJobForm.module.css";

export const metadata = {
  title: "Post New Job | CCA Recruiter",
  description: "Create and publish a new job listing",
};

export default function PostNewJobPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Post New Job</h1>
          <p className={styles.pageDescription}>
            Fill in the details below to create a new job listing.
          </p>
        </div>
        <Link
          href="/recruiter-dashboard/manage-jobs"
          className="btn-secondary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </Link>
      </div>

      <PostJobForm />
    </div>
  );
}
