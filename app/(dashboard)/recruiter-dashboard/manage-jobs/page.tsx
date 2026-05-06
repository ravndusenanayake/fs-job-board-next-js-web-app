import Link from "next/link";
import { getJobs, getJobStats } from "../../../../lib/jobs";
import JobsTable from "../../../../components/JobsTable";
import SuccessBanner from "../../../../components/SuccessBanner";
import styles from "./ManageJobs.module.css";

export const metadata = {
  title: "Manage Jobs | CCA Recruiter",
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ManageJobsPage(props: Props) {
  const searchParams = await props.searchParams;

  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;
  const query = typeof searchParams.query === "string" ? searchParams.query : "";
  const type = typeof searchParams.type === "string" ? searchParams.type : "";
  const status = typeof searchParams.status === "string" ? searchParams.status : "";
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "postedAt_desc";
  const showSuccess = searchParams.success === "1";

  const limit = 10;

  const { jobs, totalPages, total } = await getJobs({
    page,
    limit,
    query,
    type,
    status,
    sort,
  });

  const stats = await getJobStats();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Manage Jobs</h1>
          <p className={styles.pageDescription}>
            View, edit, and manage all your active and closed job postings.
          </p>
        </div>
        <Link href="/recruiter-dashboard/manage-jobs/new" className="btn-primary">
          Post New Job
        </Link>
      </div>

      {/* Success banner after posting a job */}
      {showSuccess && (
        <SuccessBanner message="Your job listing has been successfully posted!" />
      )}

      <JobsTable
        data={jobs}
        stats={stats}
        totalItems={total}
        totalPages={totalPages}
        currentPage={page}
        currentQuery={query}
        currentType={type}
        currentStatus={status}
        currentSort={sort}
      />
    </div>
  );
}
