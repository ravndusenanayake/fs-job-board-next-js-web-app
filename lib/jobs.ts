import { jobs, Job } from "../data/jobs";

export interface GetJobsOptions {
  query?: string;
  type?: string;
  locationType?: string;
  skill?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedJobs {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getJobs(options: GetJobsOptions = {}): Promise<PaginatedJobs> {
  // Simulate network delay for realism if desired, but keeping it fast for now
  // await new Promise(resolve => setTimeout(resolve, 100));

  const {
    query = "",
    type = "",
    locationType = "",
    skill = "",
    page = 1,
    limit = 10,
  } = options;

  let filteredJobs = jobs;

  if (query) {
    const lowerQuery = query.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(lowerQuery) ||
        job.company.toLowerCase().includes(lowerQuery)
    );
  }

  if (type) {
    filteredJobs = filteredJobs.filter((job) => job.type === type);
  }

  if (locationType) {
    // If the data provides exact strings (like from a dropdown), exact match or includes works.
    filteredJobs = filteredJobs.filter((job) =>
      job.location.toLowerCase().includes(locationType.toLowerCase())
    );
  }

  if (skill) {
    const lowerSkill = skill.toLowerCase();
    filteredJobs = filteredJobs.filter((job) =>
      job.tags.some((tag) => tag.toLowerCase().includes(lowerSkill))
    );
  }

  const total = filteredJobs.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const safePage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (safePage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  return {
    jobs: paginatedJobs,
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

export async function getJobById(id: string): Promise<Job | null> {
  const job = jobs.find((j) => j.id === id);
  return job || null;
}

export async function getUniqueLocations(): Promise<string[]> {
  const allLocations = Array.from(new Set(jobs.map((job) => job.location))).sort();
  return allLocations;
}
