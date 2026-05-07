import Link from "next/link";
import styles from "./page.module.css";
import { getJobs } from "../../../lib/jobs";
import JobCard, { JobWithRecruiter } from "../../../components/JobCard";
import JobFilters from "../../../components/JobFilters";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  
  // Extract search params
  const query = (resolvedSearchParams?.query as string) || "";
  const type = (resolvedSearchParams?.type as string) || "";
  const locationType = (resolvedSearchParams?.locationType as string) || "";
  const skill = (resolvedSearchParams?.skill as string) || "";
  const page = parseInt((resolvedSearchParams?.page as string) || "1", 10);
  const limit = 8;
  
  // Use data access layer
  const { jobs: currentJobs, total: totalJobs, totalPages, page: safePage } = await getJobs({
    query,
    type,
    locationType,
    skill,
    page,
    limit
  });

  // Preserve existing filters for pagination links
  const createPaginationUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (type) params.set('type', type);
    if (locationType) params.set('locationType', locationType);
    if (skill) params.set('skill', skill);
    params.set('page', pageNum.toString());
    return `/jobs?${params.toString()}`;
  };

  return (
    <div className={styles.jobsPageWrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Find Your Dream Job</h1>
          <p className={styles.pageDescription}>
            Browse curated opportunities for software engineering students.
          </p>
        </div>
      </div>

      <div className={`container ${styles.mainLayout}`}>
        <aside className={styles.sidebar}>
          <JobFilters />
        </aside>

        <section className={styles.resultsArea}>
          <div className={styles.resultsHeader}>
            <h2>{totalJobs} Opportunities Found</h2>
          </div>

          {currentJobs.length > 0 ? (
            <div className={styles.jobsGrid}>
              {currentJobs.map((job: JobWithRecruiter) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}></div>
              <h3>No jobs found matching your criteria</h3>
              <p>Try adjusting your filters or search terms.</p>
              <Link href="/jobs" className="btn-secondary">
                Clear Filters
              </Link>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              {safePage > 1 ? (
                <Link href={createPaginationUrl(safePage - 1)} className={styles.pageBtn}>
                  Previous
                </Link>
              ) : (
                <span className={`${styles.pageBtn} ${styles.pageBtnDisabled}`}>Previous</span>
              )}
              
              <div className={styles.pageInfo}>
                Page {safePage} of {totalPages}
              </div>
              
              {safePage < totalPages ? (
                <Link href={createPaginationUrl(safePage + 1)} className={styles.pageBtn}>
                  Next
                </Link>
              ) : (
                <span className={`${styles.pageBtn} ${styles.pageBtnDisabled}`}>Next</span>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
