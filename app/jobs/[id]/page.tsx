import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobById } from "../../../lib/jobs";
import styles from "./page.module.css";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const job = await getJobById(resolvedParams.id);

  if (!job) {
    notFound();
  }

  // Placeholder content for demonstration since our data file only has basic metadata
  const aboutCompany = `At ${job.company}, we are driven by innovation and our passion for building products that matter. We believe in empowering our teams to take ownership and solve complex problems in a collaborative environment. Join us to make a real impact.`;
  
  const description = `We are looking for a passionate ${job.title} to join our growing team in ${job.location}. In this role, you will work closely with cross-functional teams to design, develop, and deliver high-quality software solutions. You will have the opportunity to work with modern technologies and directly contribute to the success of our core products.`;
  
  const responsibilities = [
    "Collaborate with engineers, designers, and product managers to ship new features.",
    "Write clean, maintainable, and efficient code.",
    "Participate in code reviews and contribute to architectural discussions.",
    "Troubleshoot, debug, and upgrade existing software.",
    "Continuously discover, evaluate, and implement new technologies to maximize development efficiency."
  ];

  return (
    <div className={styles.jobDetailsPage}>
      <div className={styles.pageHeader}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/jobs" className={styles.backLink}>
            &larr; Back to Jobs
          </Link>
          
          <div className={styles.headerContent}>
            <div className={styles.companyLogoLarge} style={{ backgroundColor: job.logoColor || '#7c3aed' }}>
              {job.company.charAt(0)}
            </div>
            <div className={styles.headerInfo}>
              <h1 className={styles.jobTitle}>{job.title}</h1>
              <p className={styles.companyName}>{job.company}</p>
              
              <div className={styles.metaTags}>
                <span className={styles.tag}><span className={styles.iconLocation}></span> {job.location}</span>
                <span className={styles.tag}><span className={styles.iconType}></span> {job.type}</span>
                {job.salaryRange && (
                  <span className={styles.tag}><span className={styles.iconSalary}></span> {job.salaryRange}</span>
                )}
                <span className={styles.tag}><span className={styles.iconDate}></span> Posted {new Date(job.postedAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className={styles.headerActions}>
              <button className="btn-primary">Apply Now</button>
              <button className="btn-secondary">Save Job</button>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.mainContent}`}>
        <div className={styles.contentLeft}>
          <section className={styles.detailSection}>
            <h2>About the Role</h2>
            <p>{description}</p>
          </section>

          <section className={styles.detailSection}>
            <h2>Key Responsibilities</h2>
            <ul className={styles.responsibilitiesList}>
              {responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={styles.detailSection}>
            <h2>Tech Stack / Skills</h2>
            <div className={styles.skillsList}>
              {job.tags.map(tag => (
                <span key={tag} className={styles.skillTag}>{tag}</span>
              ))}
            </div>
          </section>
          
          <div className={styles.bottomActions}>
             <button className="btn-primary">Apply for this position</button>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.companyCard}>
            <div className={styles.companyCardHeader}>
              <div className={styles.companyLogoSmall} style={{ backgroundColor: job.logoColor || '#7c3aed' }}>
                {job.company.charAt(0)}
              </div>
              <h3>{job.company}</h3>
            </div>
            <p className={styles.companyDescription}>
              {aboutCompany}
            </p>
            <a href="#" className={styles.companyLink}>View Company Profile &rarr;</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
