import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { getJobs } from "../../lib/jobs";
import JobCard from "../../components/JobCard";

export default async function Home() {
  // Fetch latest 6 jobs for the homepage
  const { jobs: currentJobs } = await getJobs({ page: 1, limit: 6 });

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
              <Link href="/jobs" className="btn-primary">
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
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className={styles.viewAllWrapper}>
             <Link href="/jobs" className="btn-secondary">
                View All Jobs
             </Link>
          </div>

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
