import prisma from "./prisma";

export interface GetJobsOptions {
  query?: string;
  type?: string;
  locationType?: string;
  skill?: string;
  page?: number;
  limit?: number;
}

export async function getJobs(options: GetJobsOptions = {}) {
  const {
    query = "",
    type = "",
    locationType = "",
    skill = "",
    page = 1,
    limit = 10,
  } = options;

  const where: any = {};

  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { recruiter: { companyName: { contains: query, mode: "insensitive" } } },
    ];
  }

  if (type) {
    where.type = type;
  }

  if (locationType) {
    where.location = { contains: locationType, mode: "insensitive" };
  }

  if (skill) {
    where.tags = { has: skill };
  }

  const total = await prisma.job.count({ where });
  const totalPages = Math.ceil(total / limit) || 1;
  const safePage = Math.max(1, Math.min(page, totalPages));

  const skip = (safePage - 1) * limit;

  const jobs = await prisma.job.findMany({
    where,
    skip,
    take: limit,
    orderBy: { postedAt: "desc" },
    include: {
      recruiter: true,
    },
  });

  return {
    jobs,
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

export async function getJobById(id: string) {
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      recruiter: true,
    },
  });
  return job;
}

export async function getUniqueLocations() {
  const locations = await prisma.job.findMany({
    distinct: ["location"],
    select: {
      location: true,
    },
    orderBy: {
      location: "asc",
    },
  });
  return locations.map((l) => l.location);
}
