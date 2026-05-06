import { notFound } from "next/navigation";
import { getJobById } from "../../../../../../lib/jobs";
import PostJobForm from "../../new/PostJobForm";
import styles from "../../new/PostJobForm.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage(props: Props) {
  const params = await props.params;
  const job = await getJobById(params.id);

  if (!job) {
    notFound();
  }

  // Map database job to form data structure
  const initialData = {
    id: job.id,
    title: job.title,
    location: job.location,
    type: job.type,
    status: job.status as "Published" | "Draft" | "Closed",
    salaryRange: job.salaryRange || "",
    tags: job.tags,
    description: job.description || "",
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Edit Job</h1>
          <p className={styles.pageDescription}>
            Update your job listing details and requirements.
          </p>
        </div>
      </div>

      <PostJobForm initialData={initialData} isEdit={true} />
    </div>
  );
}
