import RecruiterHeader from "../../components/RecruiterHeader";
import styles from "./DashboardLayout.module.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.dashboardWrapper}>
      <RecruiterHeader />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
