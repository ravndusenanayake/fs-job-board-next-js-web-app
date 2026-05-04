import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { jobs } from "../data/jobs";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt((resolvedSearchParams?.page as string) || "1", 10);
  const jobsPerPage = 6;
  
  // Calculate pagination
  const totalJobs = jobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  
  // Ensure valid page number
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  
  // Slice jobs for current page
  const startIndex = (safePage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  return (
    <>
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.pill}>Now open for 2026 graduates</div>
            <h1 className={styles.heroTitle}>
              Launch Your <span className="text-gradient">Software Career</span>
            </h1>
            <p className={styles.heroDescription}>
              The exclusive job board for CCA software engineering students. Find internships, entry-level positions, and connect with top tech companies looking for fresh talent.
            </p>
            <div className={styles.heroButtons}>
              <Link href="#jobs-section" className="btn-primary">
                Explore Jobs
              </Link>
              <Link href="#" className="btn-secondary">
                Upload Resume
              </Link>
            </div>
            
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Active Jobs</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>120+</span>
                <span className={styles.statLabel}>Partner Companies</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>85%</span>
                <span className={styles.statLabel}>Placement Rate</span>
              </div>
            </div>
          </div>
          
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageBg}></div>
            <Image 
              src="/hero_graphic.png" 
              alt="Abstract illustration of software development career growth" 
              width={600} 
              height={500} 
              className={styles.heroImage}
              priority
            />
          </div>
        </div>
      </section>

      <section id="jobs-section" className={`section ${styles.jobsSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Latest Opportunities</h2>
            <p>Discover internships and entry-level roles tailored for you.</p>
          </div>
          
          <div className={styles.jobsList}>
            {currentJobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobCardHeader}>
                  <div className={styles.jobCompanyLogo} style={{ backgroundColor: job.logoColor }}>
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
                  {job.tags.slice(0, 2).map(tag => (
                    <span key={tag} className={styles.jobTechTag}>{tag}</span>
                  ))}
                </div>
                
                <div className={styles.jobCardFooter}>
                  <span className={styles.jobDate}>
                    Posted {new Date(job.postedAt).toLocaleDateString()}
                  </span>
                  <Link href={`#`} className={styles.applyBtn}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              {safePage > 1 ? (
                <Link href={`/?page=${safePage - 1}#jobs-section`} className={styles.pageBtn}>
                  Previous
                </Link>
              ) : (
                <span className={`${styles.pageBtn} ${styles.pageBtnDisabled}`}>Previous</span>
              )}
              
              <div className={styles.pageInfo}>
                Page {safePage} of {totalPages}
              </div>
              
              {safePage < totalPages ? (
                <Link href={`/?page=${safePage + 1}#jobs-section`} className={styles.pageBtn}>
                  Next
                </Link>
              ) : (
                <span className={`${styles.pageBtn} ${styles.pageBtnDisabled}`}>Next</span>
              )}
            </div>
          )}
        </div>
      </section>

      <section className={`section ${styles.featuresSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why Use CCA Job Board?</h2>
            <p>Designed specifically for software students, providing the tools you need to stand out.</p>
          </div>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <div className={styles.featureIcon}></div>
              </div>
              <h3>Curated Opportunities</h3>
              <p>Every job posted is vetted and specifically targeted towards students and recent grads. No more filtering through senior roles.</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <div className={styles.featureIcon}></div>
              </div>
              <h3>Direct Company Access</h3>
              <p>Our partner companies are actively looking for CCA talent. Apply directly and skip the general applicant tracking systems.</p>
            </div>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <div className={styles.featureIcon}></div>
              </div>
              <h3>Portfolio Integration</h3>
              <p>Showcase your GitHub projects, personal website, and coding skills in a unified profile designed for tech recruiters.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to start your journey?</h2>
            <p>Join hundreds of students who have already found their dream roles.</p>
            <Link href="#" className={styles.ctaButton}>
              Create Your Profile
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
