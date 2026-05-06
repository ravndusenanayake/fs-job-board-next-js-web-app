import prisma from "./prisma";

export interface GetJobsOptions {
  query?: string;
  type?: string;
  locationType?: string;
  skill?: string;
  status?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function getJobs(options: GetJobsOptions = {}) {
  const {
    query = "",
    type = "",
    locationType = "",
    skill = "",
    status = "",
    sort = "postedAt_desc",
    page = 1,
    limit = 10,
  } = options;

  const where: any = {};

  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { location: { contains: query, mode: "insensitive" } },
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

  if (status) {
    where.status = status;
  }

  const total = await prisma.job.count({ where });
  const totalPages = Math.ceil(total / limit) || 1;
  const safePage = Math.max(1, Math.min(page, totalPages));
  const skip = (safePage - 1) * limit;

  // Sorting
  let orderBy: any = { postedAt: "desc" };
  if (sort) {
    const [field, direction] = sort.split("_");
    if (field && direction) {
      const sortableFields = ["title", "type", "location", "status", "postedAt"];
      if (sortableFields.includes(field)) {
        orderBy = { [field]: direction };
      }
    }
  }

  const jobs = await prisma.job.findMany({
    where,
    skip,
    take: limit,
    orderBy,
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

export async function getJobStats(recruiterId?: string) {
  const where = recruiterId ? { recruiterId } : {};

  const [total, published, drafts, closed] = await Promise.all([
    prisma.job.count({ where }),
    prisma.job.count({ where: { ...where, status: "Published" } }),
    prisma.job.count({ where: { ...where, status: "Draft" } }),
    prisma.job.count({ where: { ...where, status: "Closed" } }),
  ]);

  return { total, published, drafts, closed };
}

export async function deleteJob(id: string) {
  return await prisma.job.delete({
    where: { id },
  });
}

export async function updateJob(id: string, data: any) {
  return await prisma.job.update({
    where: { id },
    data,
  });
}
