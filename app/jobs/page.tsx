import Link from "next/link";
import styles from "./page.module.css";
import { jobs } from "../../data/jobs";
import JobCard from "../../components/JobCard";
import JobFilters from "../../components/JobFilters";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  
  // Extract search params
  const query = (resolvedSearchParams?.query as string)?.toLowerCase() || "";
  const type = (resolvedSearchParams?.type as string) || "";
  const locationType = (resolvedSearchParams?.locationType as string) || "";
  const skill = (resolvedSearchParams?.skill as string)?.toLowerCase() || "";
  
  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    // Search query matching (title or company)
    const matchesQuery = query 
      ? job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query)
      : true;
      
    // Type matching
    const matchesType = type ? job.type === type : true;
    
    // Location matching (simple substring match since we have hybrid/remote/on-site in the string)
    const matchesLocation = locationType 
      ? job.location.toLowerCase().includes(locationType.toLowerCase()) 
      : true;
      
    // Skill matching
    const matchesSkill = skill 
      ? job.tags.some(tag => tag.toLowerCase().includes(skill))
      : true;
      
    return matchesQuery && matchesType && matchesLocation && matchesSkill;
  });

  // Pagination logic
  const currentPage = parseInt((resolvedSearchParams?.page as string) || "1", 10);
  const jobsPerPage = 8;
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage) || 1;
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  
  const startIndex = (safePage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  // Preserve existing filters for pagination links
  const createPaginationUrl = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (type) params.set('type', type);
    if (locationType) params.set('locationType', locationType);
    if (skill) params.set('skill', skill);
    params.set('page', page.toString());
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
              {currentJobs.map((job) => (
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
