import Link from 'next/link';
import styles from './DashboardPage.module.css';

export default function RecruiterDashboardPage() {
  // Mock data for the dashboard since authentication is not set up yet
  const stats = {
    activeJobs: 12,
    totalApplications: 148,
    interviewsScheduled: 7,
    newMessages: 5,
  };

  const recentActivity = [
    {
      id: 1,
      type: 'application',
      title: 'New application for Frontend Developer',
      details: 'Alex Johnson applied 2 hours ago',
      time: '2h ago',
      initials: 'AJ'
    },
    {
      id: 2,
      type: 'application',
      title: 'New application for Backend Engineer',
      details: 'Sarah Williams applied 5 hours ago',
      time: '5h ago',
      initials: 'SW'
    },
    {
      id: 3,
      type: 'job',
      title: 'Job posting expiring soon',
      details: 'UI/UX Designer role expires in 2 days',
      time: '1d ago',
      initials: 'UI'
    }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>Welcome back, Recruiter!</h1>
        <p className={styles.welcomeSubtitle}>Here's what's happening with your job postings today.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Active Jobs</span>
            <div className={`${styles.statIcon} ${styles.iconBlue}`}>💼</div>
          </div>
          <div className={styles.statValue}>{stats.activeJobs}</div>
          <div className={styles.statFooter}>
            <span className={styles.trendUp}>+2</span> this week
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Total Applications</span>
            <div className={`${styles.statIcon} ${styles.iconGreen}`}>📄</div>
          </div>
          <div className={styles.statValue}>{stats.totalApplications}</div>
          <div className={styles.statFooter}>
            <span className={styles.trendUp}>+14</span> since yesterday
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Interviews Scheduled</span>
            <div className={`${styles.statIcon} ${styles.iconBlue}`}>📅</div>
          </div>
          <div className={styles.statValue}>{stats.interviewsScheduled}</div>
          <div className={styles.statFooter}>
            <span className={styles.trendUp}>+3</span> upcoming this week
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>New Messages</span>
            <div className={`${styles.statIcon} ${styles.iconPurple}`}>💬</div>
          </div>
          <div className={styles.statValue}>{stats.newMessages}</div>
          <div className={styles.statFooter}>
            <span className={styles.trendNeutral}>Requires your attention</span>
          </div>
        </div>
      </div>

      <div className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          <Link href="/recruiter-dashboard/manage-applications" className={styles.viewAllBtn}>
            View All
          </Link>
        </div>
        
        <div className={styles.activityList}>
          {recentActivity.map((activity) => (
            <div key={activity.id} className={styles.activityItem}>
              <div className={styles.activityIcon}>
                {activity.initials}
              </div>
              <div className={styles.activityContent}>
                <div className={styles.activityTitle}>{activity.title}</div>
                <div className={styles.activityDetails}>{activity.details}</div>
              </div>
              <div className={styles.activityTime}>{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
